import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe, 
    FaCode, FaTrophy, FaFire, FaChartPie, FaUsers, FaChartBar
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { 
    PieChart, Pie, Cell, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import CountUp from 'react-countup';

const Backurl = import.meta.env.VITE_API_BASE_URL;

const groupActivityByDate = (activity) => {
    if (!activity) return {};
    const groups = {};
    activity.forEach(act => {
        const date = new Date(act.date);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        let label = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        if (date.toDateString() === today.toDateString()) label = "Today";
        else if (date.toDateString() === yesterday.toDateString()) label = "Yesterday";

        if (!groups[label]) groups[label] = [];
        groups[label].push(act);
    });
    return groups;
};

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${Backurl}/api/auth/profile/${username}`);
        setProfile(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Profile not found or private");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  const difficultyData = useMemo(() => {
    if (!profile?.platforms?.leetcode?.stats) return [];
    const stats = profile.platforms.leetcode.stats;
    return [
      { name: 'Easy', value: stats.easy || 0, color: '#10b981' },
      { name: 'Medium', value: stats.medium || 0, color: '#f59e0b' },
      { name: 'Hard', value: stats.hard || 0, color: '#ef4444' },
    ];
  }, [profile]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">{error}</h1>
        <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
    </div>
  );

  const totalSolved = (profile.platforms?.leetcode?.stats?.totalSolved || 0) + (profile.platforms?.codeforces?.stats?.solvedCount || 0);
  const activeStreak = profile.platforms?.leetcode?.stats?.streak || 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black/95 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center text-4xl font-bold text-indigo-500 overflow-hidden uppercase">
                        {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : profile.name[0]}
                    </div>
                </div>
                <div>
                  <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-1">{profile.name}</h1>
                  <p className="text-indigo-500 font-bold">@{profile.username}</p>
                  <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl italic">"{profile.bio}"</p>
                </div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/10 px-10 py-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/20 text-center">
                <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                    <CountUp end={profile.developerScore} duration={2} />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-1">Dev Score</div>
            </div>
          </div>
        </motion.div>

        {/* Momentum Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={<FaCode className="text-blue-500"/>} label="Total Solved" value={totalSolved} color="blue" />
            <StatCard icon={<FaFire className="text-orange-500" />} label="Current Streak" value={`${activeStreak} Days`} color="orange" pulse={activeStreak > 0} />
            <StatCard icon={<FaChartBar className="text-green-500" />} label="Ranking" value={profile.platforms?.leetcode?.stats?.ranking || 0} color="green" />
            <StatCard icon={<FaUsers className="text-purple-500" />} label="Followers" value={profile.platforms?.github?.stats?.followers || 0} color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* LeetCode Heatmap */}
                {profile.platforms?.leetcode?.username && !profile.hideHeatmap && (
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 border-l-4 border-yellow-500 pl-4 uppercase tracking-tighter">LeetCode Consistency</h3>
                        <div className="overflow-x-auto">
                            <img 
                                src={`https://leetcode-stats-six.vercel.app/api?username=${profile.platforms.leetcode.username}&ext=heatmap&theme=dark`} 
                                className="w-full min-w-[600px] opacity-90" 
                                alt="leetcode heatmap" 
                            />
                        </div>
                    </div>
                )}

                {/* Custom Sections */}
                {profile.customSections?.sort((a,b) => a.order - b.order).map((section) => (
                    <div key={section.id} className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 border-l-4 border-purple-500 pl-4 uppercase tracking-tighter">{section.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">{section.content}</p>
                    </div>
                ))}

                {/* Academic Panel */}
                {profile.academic && profile.privacySettings?.academic && (
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 border-l-4 border-green-500 pl-4 uppercase tracking-tighter">Academic Path</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <AcademicItem label="College" value={profile.academic.college} />
                                <AcademicItem label="Branch" value={profile.academic.branch} />
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-8">
                                    <AcademicItem label="Semester" value={`${profile.academic.semester}th`} />
                                    <AcademicItem label="CGPA" value={profile.academic.cgpa} highlight />
                                </div>
                                {profile.academic.resumeUrl && (
                                    <a href={profile.academic.resumeUrl} target="_blank" className="inline-block px-6 py-2 bg-zinc-800 hover:bg-black text-white rounded-xl text-xs font-bold transition-all">VIEW RESUME</a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="space-y-8">
                {/* Visual Stats */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                    <h3 className="text-xs font-black text-gray-400 uppercase mb-6 tracking-widest text-center">Problem Breakdown</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={difficultyData} innerRadius={60} outerRadius={80} 
                                    paddingAngle={5} dataKey="value" stroke="none"
                                >
                                    {difficultyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                    <h3 className="text-xs font-black text-gray-400 uppercase mb-8 tracking-widest border-b border-gray-50 dark:border-zinc-800 pb-4">Activity Timeline</h3>
                    <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2 scrollbar-none">
                        {Object.entries(groupActivityByDate(profile.activityFeed)).map(([label, activities]) => (
                            <div key={label} className="space-y-4">
                                <h4 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{label}</h4>
                                {activities.map((act, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug">{act.message}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Badges */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 text-center uppercase tracking-tighter">Growth Milestones</h3>
            <div className="flex flex-wrap justify-center gap-6">
                {profile.badges?.map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 group">
                        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-500/5 flex items-center justify-center text-amber-500 border border-amber-100 dark:border-amber-500/20 group-hover:scale-110 transition-transform">
                            <FaTrophy size={28} />
                        </div>
                        <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase">{badge.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

const AcademicItem = ({ label, value, highlight }) => (
    <div>
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
        <p className={`text-sm font-bold ${highlight ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>{value || 'Not Disclosed'}</p>
    </div>
);

const StatCard = ({ icon, label, value, color, pulse }) => {
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';
    const colors = {
        blue: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 border-blue-100",
        orange: "bg-orange-50 dark:bg-orange-900/10 text-orange-600 border-orange-100",
        green: "bg-green-50 dark:bg-green-900/10 text-green-600 border-green-100",
        purple: "bg-purple-50 dark:bg-purple-900/10 text-purple-600 border-purple-100"
    };
    return (
        <div className={`p-5 rounded-2xl border ${colors[color]} dark:border-zinc-800 ${pulse ? 'animate-pulse' : ''}`}>
            <div className="flex items-center gap-3">
                <div className="text-xl">{icon}</div>
                <div>
                    <div className="text-xl font-black"><CountUp end={numericValue || 0} />{suffix}</div>
                    <div className="text-[9px] font-black opacity-60 uppercase tracking-widest">{label}</div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
