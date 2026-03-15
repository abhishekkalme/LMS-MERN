const axios = require("axios");
const User = require("../models/User");

const fetchGitHubStats = async (username) => {
  try {
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const { public_repos, followers, created_at } = userRes.data;
    
    // Total commits is hard to get without token, using repos as proxy or searching
    // For now, let's assume commits = repos * 10 for score calculation if not available
    return {
      repos: public_repos,
      commits: public_repos * 15, // Synthetic for demo, would use better API in prod
      followers: followers,
    };
  } catch (err) {
    console.error(`Error fetching GitHub stats for ${username}:`, err.message);
    return null;
  }
};

const fetchLeetCodeStats = async (username) => {
  try {
    const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    if (res.data.status === "success") {
      return {
        totalSolved: res.data.totalSolved,
        easy: res.data.easySolved,
        medium: res.data.mediumSolved,
        hard: res.data.hardSolved,
        streak: res.data.streak || 0,
        ranking: res.data.ranking,
        topics: res.data.submissionNum || {} // Using submissionNum as topic proxy if available
      };
    }
    return null;
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
  const user = await User.findById(userId);
  if (!user) return;

  const p = user.platforms;
  let changed = false;

  if (p.github?.username) {
    const stats = await fetchGitHubStats(p.github.username);
    if (stats) {
        p.github.stats = stats;
        p.github.lastSyncedAt = new Date();
        changed = true;
    }
  }

  if (p.leetcode?.username) {
    const stats = await fetchLeetCodeStats(p.leetcode.username);
    if (stats) {
        p.leetcode.stats = stats;
        p.leetcode.lastSyncedAt = new Date();
        changed = true;
    }
  }

  if (p.codeforces?.username) {
      const stats = await fetchCodeforcesStats(p.codeforces.username);
      if (stats) {
          p.codeforces.stats = stats;
          p.codeforces.lastSyncedAt = new Date();
          changed = true;
      }
  }

  if (changed) {
    user.developerScore = calculateScore(user);
    user.badges = awardBadges(user);
    user.lastSyncedAt = new Date();
    updateOnboarding(user);
    await user.save();
  }
};

const syncAllUsers = async () => {
    const users = await User.find({});
    for (const user of users) {
        await syncUserStats(user._id);
    }
};

module.exports = { syncUserStats, syncAllUsers, logActivity, updateOnboarding };
