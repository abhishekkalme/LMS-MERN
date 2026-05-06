const axios = require("axios");
const User = require("../models/User");

const fetchGitHubStats = async (username) => {
  const headers = { 'User-Agent': 'Codolio-App' };
  try {
    const [userRes, eventsRes, reposRes] = await Promise.allSettled([
        axios.get(`https://api.github.com/users/${username}`, { headers }),
        axios.get(`https://api.github.com/users/${username}/events/public`, { headers }),
        axios.get(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=1`, { headers })
    ]);

    const userStats = userRes.status === 'fulfilled' ? userRes.value.data : null;
    const events = eventsRes.status === 'fulfilled' ? eventsRes.value.data : [];
    const latestPushRepo = (reposRes.status === 'fulfilled' && reposRes.value.data?.length > 0) ? reposRes.value.data[0] : null;

    if (!userStats) {
        console.warn(`[GitHub] Primary user info failed for ${username}, possibly rate limited.`);
        return null;
    }

    const { public_repos, followers } = userStats;

    // Find latest commit from events
    let latestCommit = null;
    if (Array.isArray(events)) {
        const pushEvent = events.find(e => e.type === "PushEvent");
        if (pushEvent) {
            latestCommit = {
                message: pushEvent.payload.commits[0]?.message || "No message",
                repo: pushEvent.repo.name,
                date: new Date(pushEvent.created_at),
                url: `https://github.com/${pushEvent.repo.name}/commit/${pushEvent.payload.commits[0]?.sha}`
            };
        }
    }

    const latestPush = latestPushRepo ? {
        repo: latestPushRepo.full_name,
        date: new Date(latestPushRepo.pushed_at),
        url: latestPushRepo.html_url
    } : null;

    return {
      repos: public_repos,
      commits: public_repos * 15,
      followers: followers,
      latestCommit,
      latestPush
    };
  } catch (err) {
    console.error(`Error fetching GitHub stats for ${username}:`, err.message);
    return null;
  }
};

const fetchLeetCodeStats = async (username) => {
  try {
    const graphqlQuery = {
        query: `
            query userRecentSubmissions($username: String!, $limit: Int!) {
                recentSubmissionList(username: $username, limit: $limit) {
                    title
                    titleSlug
                    timestamp
                    statusDisplay
                }
            }
        `,
        variables: { username, limit: 10 }
    };

    const [statsRes, submissionsRes] = await Promise.allSettled([
        axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`),
        axios.post('https://leetcode.com/graphql', graphqlQuery, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    ]);

    const statsData = statsRes.status === 'fulfilled' ? statsRes.value.data : null;
    
    // If we can't get basic stats, we can't proceed with a partial update that's useful
    if (!statsData || statsData.status !== "success") {
        console.warn(`[LeetCode] Stats API failed for ${username}`);
        return null;
    }

    const submissionsData = (submissionsRes.status === 'fulfilled' && !submissionsRes.value.data.errors) ? submissionsRes.value.data : null;
    const recentSolves = submissionsData?.data?.recentSubmissionList
        ?.filter(s => s.statusDisplay === "Accepted")
        ?.map(s => ({
            title: s.title,
            titleSlug: s.titleSlug,
            timestamp: new Date(parseInt(s.timestamp) * 1000)
        })) || [];

    return {
        totalSolved: statsData.totalSolved,
        easy: statsData.easySolved,
        medium: statsData.mediumSolved,
        hard: statsData.hardSolved,
        streak: statsData.streak || 0,
        ranking: statsData.ranking,
        topics: statsData.submissionNum || {},
        recentSolves: recentSolves.length > 0 ? recentSolves.slice(0, 5) : undefined
    };
  } catch (err) {
    console.error(`Error fetching LeetCode stats for ${username}:`, err.message);
    return null;
  }
};

const fetchCodeforcesStats = async (username) => {
    try {
        const [userInfo, userStatus] = await Promise.all([
            axios.get(`https://codeforces.com/api/user.info?handles=${username}`),
            axios.get(`https://codeforces.com/api/user.status?handle=${username}`)
        ]);

        if (userInfo.data.status === "OK" && userStatus.data.status === "OK") {
            const info = userInfo.data.result[0];
            const submissions = userStatus.data.result;
            const solved = new Set(submissions.filter(s => s.verdict === "OK").map(s => s.problem.contestId + s.problem.index));
            
            return {
                rating: info.rating || 0,
                maxRating: info.maxRating || 0,
                rank: info.rank || "Unrated",
                solvedCount: solved.size
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Codeforces stats for ${username}:`, err.message);
        return null;
    }
};

const calculateScore = (user) => {
  const p = user.platforms;
  let score = 0;
  let totalSolved = 0;
  let totalCommits = 0;
  let maxStreak = 0;

  if (p.github?.stats) {
    totalCommits += p.github.stats.commits || 0;
  }
  if (p.leetcode?.stats) {
    totalSolved += p.leetcode.stats.totalSolved || 0;
    maxStreak = Math.max(maxStreak, p.leetcode.stats.streak || 0);
  }
  if (p.codeforces?.stats) {
    totalSolved += p.codeforces.stats.solvedCount || 0;
  }

  // developerScore = (commits * 2) + (solved * 5) + streakBonus
  score = (totalCommits * 2) + (totalSolved * 5) + (maxStreak * 10);
  
  return Math.min(score, 1000); 
};

const updateOnboarding = (user) => {
    const ob = user.onboarding;
    ob.hasAvatar = !!user.avatar;
    ob.hasBio = !!user.bio;
    
    const hasAnyPlatform = Object.values(user.platforms).some(p => !!p.username);
    ob.hasPlatform = hasAnyPlatform;
    
    ob.completed = ob.hasAvatar && ob.hasBio && ob.hasPlatform;
};

const awardBadges = (user) => {
  const newBadges = [...user.badges];
  const existingTypes = new Set(newBadges.map(b => b.type));
  const p = user.platforms;

  if (p.github?.stats?.repos > 0 && !existingTypes.has("first_repo")) {
    newBadges.push({
      type: "first_repo",
      label: "Open Sourcer",
      icon: "github",
      description: "Created your first GitHub repository!"
    });
  }

  if (p.leetcode?.stats?.totalSolved >= 100 && !existingTypes.has("leetcode_100")) {
    newBadges.push({
      type: "leetcode_100",
      label: "Centurion",
      icon: "code",
      description: "Solved 100 LeetCode problems!"
    });
  }

  // New Badge: Polyglot (Connecting 3 platforms)
  const connectedCount = Object.values(p).filter(plat => !!plat.username).length;
  if (connectedCount >= 3 && !existingTypes.has("polyglot")) {
    newBadges.push({
        type: "polyglot",
        label: "Polyglot",
        icon: "globe",
        description: "Connected 3 or more coding platforms!"
    });
  }

  return newBadges;
};

const logActivity = (user, source, message, link = "") => {
    user.activityFeed.unshift({ source, message, link, date: new Date() });
    if (user.activityFeed.length > 50) user.activityFeed.pop();
};

const syncUserStats = async (userId) => {
  console.log(`[Sync] Starting sync for user: ${userId}`);
  const user = await User.findById(userId);
  if (!user) return;

  const p = user.platforms;
  let changed = false;

  // Always mark overall sync time
  user.lastSyncedAt = new Date();
  changed = true;

  if (p.github?.username) {
    console.log(`[Sync] Fetching GitHub for: ${p.github.username}`);
    const stats = await fetchGitHubStats(p.github.username);
    if (stats) {
        console.log(`[Sync] GitHub stats fetched: Commits ${stats.latestCommit?.message || 'None'}`);
        p.github.stats = { 
            ...p.github.stats, 
            ...stats,
            latestCommit: stats.latestCommit || p.github.stats?.latestCommit,
            latestPush: stats.latestPush || p.github.stats?.latestPush
        };
        p.github.lastSyncedAt = new Date();
    }
  }

  if (p.leetcode?.username) {
    console.log(`[Sync] Fetching LeetCode for: ${p.leetcode.username}`);
    const stats = await fetchLeetCodeStats(p.leetcode.username);
    if (stats) {
        console.log(`[Sync] LeetCode stats fetched: Solves ${stats.recentSolves?.length || 0}`);
        p.leetcode.stats = { 
            ...p.leetcode.stats, 
            ...stats,
            recentSolves: stats.recentSolves || p.leetcode.stats?.recentSolves
        };
        p.leetcode.lastSyncedAt = new Date();
    }
  }

  if (p.codeforces?.username) {
      const stats = await fetchCodeforcesStats(p.codeforces.username);
      if (stats) {
          p.codeforces.stats = stats;
          p.codeforces.lastSyncedAt = new Date();
      }
  }

  if (changed) {
    user.developerScore = calculateScore(user);
    user.badges = awardBadges(user);
    updateOnboarding(user);
    
    // CRITICAL: Force Mongoose to recognize changes in nested objects
    user.markModified('platforms');
    user.markModified('lastSyncedAt');
    
    await user.save();
    console.log(`[Sync] User ${userId} saved successfully with new timestamp.`);
  }
};

const BATCH_SIZE = 20;
const syncAllUsers = async () => {
  console.log('[Sync] Starting batched user sync...');
  let skip = 0;
  let totalSynced = 0;

  while (true) {
    const users = await User.find({})
      .select('_id')
      .skip(skip)
      .limit(BATCH_SIZE)
      .lean();

    if (!users.length) break;

    await Promise.all(
      users.map(user => syncUserStats(user._id).catch(err =>
        console.error(`[Sync] Failed for user ${user._id}:`, err.message)
      ))
    );

    totalSynced += users.length;
    skip += BATCH_SIZE;
    console.log(`[Sync] Synced batch of ${users.length}, total: ${totalSynced}`);
  }

  console.log(`[Sync] Completed. Total users synced: ${totalSynced}`);
};

module.exports = { syncUserStats, syncAllUsers, logActivity, updateOnboarding };
