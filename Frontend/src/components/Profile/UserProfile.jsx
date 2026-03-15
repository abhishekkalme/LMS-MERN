import React, { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FaGithub, FaCode, FaTrophy, FaExternalLinkAlt, FaSync, 
    FaCheckCircle, FaCircle, FaUsers, FaFire, FaChartBar, FaShieldAlt
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import EditProfileModal from "./EditProfileModal";
import SectionManager from "./SectionManager";
import { Link, useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from 'recharts';
import axios from "axios";
import toast from "react-hot-toast";

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

const UserProfile = () => {
  const { user, setUser, updateUser } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSectionManagerOpen, setIsSectionManagerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleSaveSections = async (newSections) => {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(`${Backurl}/api/auth/update-profile`, 
            { customSections: newSections },
            { headers: { "Authorization": token } }
        );
        updateUser(res.data.user);
        toast.success("Profile layout updated!");
    } catch (err) {
        toast.error("Failed to update sections");
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${Backurl}/api/auth/refresh`, {}, {
            headers: { "Authorization": token }
        });
        updateUser(res.data.user);
        toast.success("Stats synced successfully!");
    } catch (err) {
        toast.error("Failed to sync stats");
    } finally {
        setIsRefreshing(false);
    }
  };

  // Data Preparation for Charts
  const difficultyData = useMemo(() => {
    const stats = user.platforms?.leetcode?.stats;
    if (!stats) return [];
    return [
      { name: 'Easy', value: stats.easy || 0, color: '#10b981' },
      { name: 'Medium', value: stats.medium || 0, color: '#f59e0b' },
      { name: 'Hard', value: stats.hard || 0, color: '#ef4444' },
    ];
  }, [user]);

  const topicData = useMemo(() => {
    const topics = user.platforms?.leetcode?.stats?.topics || {};
    // LeetCode's submissionNum format: [{difficulty: 'Easy', count: 10}, ...]
    // or sometimes it's an object of { topicName: count }
    // Scaling for demo/placeholder if data is empty
    if (Object.keys(topics).length === 0) return [
        { name: 'Arrays', count: 0 }, { name: 'Strings', count: 0 }, { name: 'DP', count: 0 }, { name: 'Trees', count: 0 }
    ];
    
    return Object.entries(topics).slice(0, 5).map(([name, count]) => ({ name, count }));
  }, [user]);

  const onboardingSteps = [
    { id: 'avatar', label: 'Upload Avatar', done: user.onboarding?.hasAvatar },
    { id: 'bio', label: 'Add a Bio', done: user.onboarding?.hasBio },
    { id: 'platforms', label: 'Connect Coding Account', done: user.onboarding?.hasPlatform },
    { id: 'public', label: 'Enable Public Profile', done: user.isPublic },
  ];

  const totalSolved = (user.platforms?.leetcode?.stats?.totalSolved || 0) + (user.platforms?.codeforces?.stats?.solvedCount || 0);
  const activeStreak = user.platforms?.leetcode?.stats?.streak || 0;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black/95 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Identity Card */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-zinc-800 p-8"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                                     {user.avatar ? (
                                        <img src={user.avatar} className="w-full h-full object-cover" />
                                     ) : <span className="text-3xl font-bold uppercase">{user.name[0]}</span>}
                                </div>
                             </div>
                             {user.isPublic && (
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900 shadow-sm" title="Publicly visible" />
                             )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{user.name}</h1>
                            <div className="flex items-center gap-3">
                                <span className="text-indigo-500 font-bold">@{user.username}</span>
                                <span className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-[10px] rounded-md font-bold uppercase text-gray-500">{user.role}</span>
                            </div>
                            <div className="mt-3 flex gap-2">
                                {user.isPublic ? (
                                    <Link to={`/u/${user.username}`} className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-indigo-500 transition-colors">
                                        <FaExternalLinkAlt /> VIEW PUBLIC PROFILE
                                    </Link>
                                ) : (
                                    <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1"><FaShieldAlt /> PRIVATE PROFILE</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div 
                        data-tooltip-id="score-tooltip"
                        className="flex flex-col items-center md:items-end justify-center bg-indigo-50 dark:bg-indigo-900/10 px-8 py-4 rounded-3xl border border-indigo-100 dark:border-indigo-900/20 cursor-help"
                    >
                         <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                            <CountUp end={user.developerScore || 0} duration={2} />
                         </div>
                         <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mt-1">Dev Score</div>
                    </div>
                </div>
                
                <ReactTooltip 
                    id="score-tooltip" 
                    place="bottom"
                    className="!bg-zinc-900 !text-white !p-4 !rounded-2xl !shadow-2xl !opacity-100 z-50"
                    content={(
                        <div className="space-y-2 text-xs">
                            <p className="font-bold border-b border-zinc-700 pb-1 mb-2 uppercase">How it's calculated</p>
                            <p>• GitHub Commits: <span className="text-indigo-400 font-bold">2 pts / commit</span></p>
                            <p>• Solved Problems: <span className="text-green-400 font-bold">5 pts / solve</span></p>
                            <p>• Current Streak: <span className="text-orange-400 font-bold">10 pts / day</span></p>
                        </div>
                    )}
                />

                <div className="mt-8 pt-8 border-t border-gray-50 dark:border-zinc-800">
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl italic">"{user.bio || "No bio added yet. Tell the world what you're building!"}"</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button onClick={() => setIsEditModalOpen(true)} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-95">Edit Profile</button>
                        <button onClick={() => navigate("/platforms")} className="px-5 py-2 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all">Connections</button>
                        <button onClick={() => setIsSectionManagerOpen(true)} className="px-5 py-2 bg-zinc-800 hover:bg-black text-white rounded-xl text-sm font-bold transition-all border border-zinc-700">Manage Layout</button>
                        <button 
                            disabled={isRefreshing}
                            onClick={handleRefresh}
                            className="p-2.5 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-xl hover:text-indigo-500 transition-all disabled:opacity-50"
                        >
                            <FaSync className={`${isRefreshing ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Onboarding / Summary Card */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8 flex flex-col justify-between"
            >
                <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">Onboarding</h3>
                    <div className="space-y-4">
                        {onboardingSteps.map(step => (
                            <div key={step.id} className="flex items-center justify-between">
                                <span className={`text-sm font-medium ${step.done ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{step.label}</span>
                                {step.done ? <FaCheckCircle className="text-green-500" /> : <FaCircle className="text-gray-200 dark:text-zinc-800 text-xs" />}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white">
                     <h4 className="text-xs font-black uppercase opacity-70 mb-2 tracking-wide">Developer Growth</h4>
                     <div className="text-2xl font-bold">Top {100 - Math.min(Math.floor((user.developerScore || 0)/10), 99)}%</div>
                     <p className="text-[10px] opacity-80 mt-1">Connect more platforms to rank higher.</p>
                </div>
            </motion.div>
        </div>

        {/* Custom Sections Renderer */}
        <AnimatePresence>
            {user.customSections?.sort((a,b) => a.order - b.order).map((section) => (
                <motion.div 
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                >
                    <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 border-l-4 border-purple-500 pl-4 uppercase tracking-tighter">{section.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">{section.content}</p>
                </motion.div>
            ))}
        </AnimatePresence>

        {/* LeetCode Activity Heatmap */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
        >
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight border-l-4 border-yellow-500 pl-4">LeetCode Activity Heatmap</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                     <span>Less</span>
                     <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={i} className={`w-3 h-3 rounded-sm ${['bg-gray-100 dark:bg-zinc-800', 'bg-yellow-200', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600'][i]}`} />
                        ))}
                     </div>
                     <span>More</span>
                </div>
            </div>

            {user.platforms?.leetcode?.username ? (
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500/20 pb-4">
                    <img 
                        src={`https://leetcard.jacoblin.cool/${user.platforms.leetcode.username}?ext=heatmap`}
                        className="w-full min-w-[700px] h-auto transition-all cursor-help" 
                        alt="LeetCode coding activity heatmap"
                        title="Your coding activity across LeetCode"
                    />
                </div>
            ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50/50 dark:bg-zinc-800/20 rounded-2xl border-2 border-dashed border-gray-100 dark:border-zinc-800">
                    <div className="w-16 h-16 rounded-full bg-yellow-50 dark:bg-yellow-900/20 flex items-center justify-center text-yellow-500">
                        <SiLeetcode size={32} />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Connect LeetCode to see your activity heatmap</h4>
                        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Visualize your daily problem-solving streaks and contributions in a unified calendar view.</p>
                    </div>
                    <button onClick={() => navigate("/platforms")} className="text-xs font-black text-yellow-500 hover:underline uppercase tracking-widest">Connect Account</button>
                </div>
            )}
        </motion.div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<FaCode className="text-blue-500"/>} label="Total Solved" value={totalSolved} color="blue" />
            <StatCard icon={<FaFire className="text-orange-500" />} label="Current Streak" value={`${activeStreak} Days`} color="orange" />
            <StatCard icon={<FaChartBar className="text-green-500" />} label="Ranking" value={`#${user.platforms?.leetcode?.stats?.ranking || 'N/A'}`} color="green" />
            <StatCard icon={<FaUsers className="text-purple-500" />} label="Followers" value={user.platforms?.github?.stats?.followers || 0} color="purple" />
        </div>

        {/* Charts and Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual Analytics */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 border-l-4 border-indigo-500 pl-4">Platform Insights</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="h-64">
                         <h4 className="text-xs font-bold text-gray-500 uppercase text-center mb-4">Difficulty Mix</h4>
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
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                         </ResponsiveContainer>
                    </div>

                    <div className="h-64">
                         <h4 className="text-xs font-bold text-gray-500 uppercase text-center mb-4">DSA Specialization</h4>
                         <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={topicData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8884d822" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                                <YAxis hide />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                             </BarChart>
                         </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Combined Activity Feed */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-black text-gray-900 dark:text-white border-l-4 border-purple-500 pl-4 uppercase tracking-tighter">Unified Timeline</h3>
                    <Link to="#" className="text-[10px] font-black text-indigo-500 hover:underline uppercase tracking-widest">History</Link>
                </div>
                
                <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-indigo-500/20">
                    {Object.keys(groupActivityByDate(user.activityFeed)).length > 0 ? (
                        Object.entries(groupActivityByDate(user.activityFeed)).map(([dateLabel, activities], gIdx) => (
                            <div key={dateLabel} className="space-y-4">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-8 h-px bg-gray-100 dark:bg-zinc-800" />
                                    {dateLabel}
                                </h4>
                                {activities.map((act, idx) => (
                                    <div key={idx} className="flex gap-4 group ml-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center border border-gray-100 dark:border-zinc-800 group-hover:border-indigo-500/50 transition-colors">
                                                <SourceIcon source={act.source} />
                                            </div>
                                            <div className="flex-1 w-px bg-gray-100 dark:bg-zinc-800 my-1 group-last:hidden" />
                                        </div>
                                        <div className="pb-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium leading-snug">{act.message}</p>
                                            {act.link && <a href={act.link} target="_blank" className="text-[10px] text-indigo-500 hover:underline font-bold">Details →</a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 text-gray-400 italic text-sm">No recent moments recorded.</div>
                    )}
                </div>
            </div>
        </div>

        {/* Academic & Career Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                 <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 border-l-4 border-green-500 pl-4 uppercase tracking-tighter">Academic & Career</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">College / University</span>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic?.college || "Not set"}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Branch / Course</span>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic?.branch || "Not set"}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Semester</span>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic?.semester || "1"}th</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CGPA</span>
                        <p className="text-sm font-bold text-green-500">{user.academic?.cgpa || "0.0"}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Resume</span>
                        <div className="flex items-center gap-2">
                            {user.academic?.resumeUrl ? (
                                <a href={user.academic.resumeUrl} target="_blank" className="text-sm font-bold text-indigo-500 hover:underline">View Resume →</a>
                            ) : <span className="text-sm font-bold text-gray-300 italic">No link added</span>}
                        </div>
                    </div>
                 </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800 to-black rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <FaTrophy size={80} />
                 </div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">Platform Rank</h4>
                 <div className="text-4xl font-black mb-4">Master</div>
                 <p className="text-xs text-gray-400 leading-relaxed italic">"Keep pushing code to maintain your status and unlock exclusive developer perks."</p>
            </div>
        </div>

        {/* Achievement Milestones Expanded */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 border-l-4 border-amber-500 pl-4 uppercase tracking-tighter">Growth Milestones</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {/* Real Badges */}
                {user.badges?.map((badge, idx) => (
                    <MilestoneCard key={`unlocked-${idx}`} badge={badge} unlocked />
                ))}
                
                {/* Locked Badges Placeholder with Progress */}
                <MilestoneCard 
                    badge={{ label: '50 Problems Solved', description: 'Mastering the basics', icon: 'code' }}
                    progress={{ current: totalSolved, total: 50 }}
                />
                <MilestoneCard 
                    badge={{ label: '100 Commits', description: 'Active contributor', icon: 'github' }}
                    progress={{ current: user.platforms?.github?.stats?.commits || 0, total: 100 }}
                />
                <MilestoneCard 
                    badge={{ label: '7-Day Streak', description: 'Pure consistency', icon: 'fire' }}
                    progress={{ current: activeStreak, total: 7 }}
                />
            </div>
        </div>

      </div>

      <SectionManager 
        isOpen={isSectionManagerOpen}
        onClose={() => setIsSectionManagerOpen(false)}
        sections={user.customSections || []}
        onSave={handleSaveSections}
      />

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentUser={user}
        onUpdate={(updatedUser) => updateUser(updatedUser)}
      />
    </div>
  );
};

const MilestoneCard = ({ badge, unlocked, progress }) => (
    <motion.div 
        whileHover={unlocked ? { scale: 1.05 } : {}}
        className={`flex flex-col items-center text-center p-5 rounded-3xl transition-all relative overflow-hidden ${unlocked ? 'bg-amber-50/30 dark:bg-amber-500/5 border-amber-100 dark:border-amber-500/20' : 'bg-gray-50/50 dark:bg-white/5 border-gray-100 dark:border-white/5 opacity-60'}`}
    >
        {!unlocked && <div className="absolute inset-0 backdrop-blur-[2px] z-0" />}
        <div className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-3 shadow-inner ${unlocked ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600' : 'bg-gray-200 dark:bg-zinc-800 text-gray-400'}`}>
            <FaTrophy size={24} />
        </div>
        <span className="relative z-10 text-[11px] font-black uppercase mb-1 tracking-tight text-gray-900 dark:text-white">{badge.label}</span>
        <span className="relative z-10 text-[9px] text-gray-500 italic leading-tight mb-3">{badge.description}</span>
        
        {progress && !unlocked && (
            <div className="relative z-10 w-full px-2">
                <div className="h-1 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-indigo-500 transition-all duration-1000" 
                        style={{ width: `${Math.min((progress.current / progress.total) * 100, 100)}%` }}
                    />
                </div>
                <div className="text-[8px] font-black text-indigo-500 mt-1 uppercase">{progress.current} / {progress.total}</div>
            </div>
        )}
    </motion.div>
);

const StatCard = ({ icon, label, value, color, pulse }) => {
    const colors = {
        blue: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 border-blue-100 dark:border-blue-900/20",
        orange: "bg-orange-50 dark:bg-orange-900/10 text-orange-600 border-orange-100 dark:border-orange-900/20",
        green: "bg-green-50 dark:bg-green-900/10 text-green-600 border-green-100 dark:border-green-900/20",
        purple: "bg-purple-50 dark:bg-purple-900/10 text-purple-600 border-purple-100 dark:border-purple-900/20"
    };
    
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    const suffix = typeof value === 'string' ? value.replace(/[0-9]/g, '') : '';

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className={`p-6 rounded-3xl border ${colors[color]} transition-all shadow-sm shadow-${color}-600/5 ${pulse ? 'animate-pulse' : ''}`}
        >
            <div className="flex items-center gap-4">
                <div className="text-2xl">{icon}</div>
                <div>
                    <div className="text-2xl font-black">
                        <CountUp end={numericValue || 0} duration={2} />{suffix}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</div>
                </div>
            </div>
        </motion.div>
    );
};

const SourceIcon = ({ source }) => {
    switch(source?.toLowerCase()) {
        case 'github': return <FaGithub className="text-gray-900 dark:text-white" />;
        case 'leetcode': return <SiLeetcode className="text-yellow-500" />;
        case 'codeforces': return <SiCodeforces className="text-blue-500" />;
        default: return <FaCode className="text-indigo-500" />;
    }
};

export default UserProfile;

