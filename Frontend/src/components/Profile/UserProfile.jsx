import React, { useContext, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGithub, FaCode, FaTrophy, FaExternalLinkAlt, FaSync,
    FaCheckCircle, FaCircle, FaUsers, FaFire, FaChartBar, FaShieldAlt,
    FaLinkedin, FaTwitter, FaInstagram, FaGlobe, FaProjectDiagram,
    FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaCodeBranch,
    FaDesktop, FaMobile, FaServer, FaDatabase, FaCloud, FaBrain,
    FaGraduationCap, FaBriefcase, FaAward, FaHeart, FaLightbulb,
    FaRocket, FaRunning, FaCrown, FaGem, FaTools, FaUserFriends
} from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiJavascript, SiPython, SiOpenjdk, SiCplusplus, SiReact, SiNodedotjs, SiMongodb, SiGit, SiDocker, SiAmazonwebservices, SiFigma, SiFlutter } from "react-icons/si";
import EditProfileModal from "./EditProfileModal";
import SectionManager from "./SectionManager";
import { Link, useNavigate } from "react-router-dom";
import CountUp from 'react-countup';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {
    PieChart, Pie, Cell, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Legend, CartesianGrid
} from 'recharts';
import axios from "axios";
import toast from "react-hot-toast";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const SKILL_CATEGORIES = {
    languages: { label: "Languages", icon: FaCode, colors: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600", border: "border-blue-200 dark:border-blue-800" } },
    frontend: { label: "Frontend", icon: FaDesktop, colors: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600", border: "border-purple-200 dark:border-purple-800" } },
    backend: { label: "Backend", icon: FaServer, colors: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-600", border: "border-green-200 dark:border-green-800" } },
    database: { label: "Database", icon: FaDatabase, colors: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600", border: "border-orange-200 dark:border-orange-800" } },
    devops: { label: "DevOps", icon: FaCloud, colors: { bg: "bg-cyan-50 dark:bg-cyan-900/20", text: "text-cyan-600", border: "border-cyan-200 dark:border-cyan-800" } },
    tools: { label: "Tools", icon: FaTools, colors: { bg: "bg-gray-50 dark:bg-gray-800/30", text: "text-gray-600", border: "border-gray-200 dark:border-gray-700" } },
    soft: { label: "Soft Skills", icon: FaUserFriends, colors: { bg: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-600", border: "border-pink-200 dark:border-pink-800" } }
};

const TECH_STACK = {
    JavaScript: { icon: SiJavascript, color: "#f7df1e" },
    Python: { icon: SiPython, color: "#3776ab" },
    Java: { icon: SiOpenjdk, color: "#b07219" },
    "C++": { icon: SiCplusplus, color: "#00599c" },
    React: { icon: SiReact, color: "#61dafb" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    MongoDB: { icon: SiMongodb, color: "#47a248" },
    Git: { icon: SiGit, color: "#f05032" },
    Docker: { icon: SiDocker, color: "#2496ed" },
    AWS: { icon: SiAmazonwebservices, color: "#ff9900" },
    Figma: { icon: SiFigma, color: "#f24e1e" },
    Flutter: { icon: SiFlutter, color: "#02569b" }
};

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
    const [activeHeatmapTab, setActiveHeatmapTab] = useState("leetcode");
    const [activeSkillTab, setActiveSkillTab] = useState("all");
    const [timelineFilter, setTimelineFilter] = useState("all");
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
        const topics = user.platforms?.leetcode?.stats?.topics;
        
        if (!topics || (Array.isArray(topics) && topics.length === 0)) {
            return [
                { name: 'Arrays', count: 0 }, { name: 'Strings', count: 0 }, { name: 'DP', count: 0 }, { name: 'Trees', count: 0 }
            ];
        }

        if (Array.isArray(topics)) {
            return topics.slice(0, 5).map(t => ({
                name: t.difficulty || t.topicName || 'Other',
                count: t.count || t.submissions || 0
            }));
        }

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
    const totalCommits = user.platforms?.github?.stats?.commits || 0;

    const userSkills = user.skills || {};
    const allSkills = [...(userSkills.languages || []), ...(userSkills.frontend || []), ...(userSkills.backend || []), ...(userSkills.database || []), ...(userSkills.devops || []), ...(userSkills.tools || [])];
    
    const filteredSkills = activeSkillTab === "all" 
        ? allSkills 
        : userSkills[activeSkillTab] || [];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-black dark:via-zinc-900 dark:to-black transition-all duration-500">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Hero Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-1"
                >
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPjxwYXRoIGQ9Ik0wIDBoNnY2SDB6bSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2U9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    <div className="relative bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                            {/* Avatar Section */}
                            <div className="flex-shrink-0">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="relative"
                                >
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl shadow-purple-500/25">
                                        <div className="w-full h-full rounded-[1.75rem] bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
                                            {user.avatar ? (
                                                <img src={user.avatar} className="w-full h-full object-cover" alt={user.name} />
                                            ) : (
                                                <span className="text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600">
                                                    {user.name?.[0]}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {user.isPublic && (
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-xl border-4 border-white dark:border-zinc-900 shadow-lg flex items-center justify-center"
                                        >
                                            <FaCheckCircle className="text-white" size={16} />
                                        </motion.div>
                                    )}
                                    {totalSolved > 500 && (
                                        <div className="absolute -top-2 -left-2 w-10 h-10 bg-amber-500 rounded-xl border-4 border-white dark:border-zinc-900 shadow-lg flex items-center justify-center">
                                            <FaCrown className="text-white" size={16} />
                                        </div>
                                    )}
                                </motion.div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                                                {user.name}
                                            </h1>
                                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">@{user.username}</span>
                                                <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-xs rounded-full font-bold uppercase text-gray-500">{user.role}</span>
                                                {user.isPublic && (
                                                    <Link to={`/u/${user.username}`} className="flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
                                                        <FaExternalLinkAlt /> PUBLIC
                                                    </Link>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg leading-relaxed">
                                            {user.bio || "Add a bio to tell others about yourself..."}
                                        </p>

                                        {/* Quick Stats */}
                                        <div className="flex flex-wrap gap-4 pt-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <FaMapMarkerAlt className="text-pink-500" />
                                                <span>{user.location || "Add location"}</span>
                                            </div>
                                            {user.academic?.college && (
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <FaGraduationCap className="text-blue-500" />
                                                    <span>{user.academic.college}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <FaCalendarAlt className="text-purple-500" />
                                                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                            </div>
                                        </div>

                                        {/* Social Links */}
                                        {user.privacySettings?.socials !== false && user.socialProfiles && (
                                            <div className="flex flex-wrap gap-3 pt-2">
                                                {user.socialProfiles.linkedin && (
                                                    <a href={user.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer" 
                                                        className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all border border-blue-100 dark:border-blue-800 hover:scale-110">
                                                        <FaLinkedin size={20} />
                                                    </a>
                                                )}
                                                {user.socialProfiles.twitter && (
                                                    <a href={user.socialProfiles.twitter} target="_blank" rel="noopener noreferrer"
                                                        className="p-2.5 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-all border border-sky-100 dark:border-sky-800 hover:scale-110">
                                                        <FaTwitter size={20} />
                                                    </a>
                                                )}
                                                {user.socialProfiles.instagram && (
                                                    <a href={user.socialProfiles.instagram} target="_blank" rel="noopener noreferrer"
                                                        className="p-2.5 bg-pink-50 dark:bg-pink-900/20 rounded-xl text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-all border border-pink-100 dark:border-pink-800 hover:scale-110">
                                                        <FaInstagram size={20} />
                                                    </a>
                                                )}
                                                {user.socialProfiles.website && (
                                                    <a href={user.socialProfiles.website} target="_blank" rel="noopener noreferrer"
                                                        className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all border border-emerald-100 dark:border-emerald-800 hover:scale-110">
                                                        <FaGlobe size={20} />
                                                    </a>
                                                )}
                                                {user.email && (
                                                    <a href={`mailto:${user.email}`}
                                                        className="p-2.5 bg-gray-50 dark:bg-zinc-800/30 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all border border-gray-100 dark:border-zinc-700 hover:scale-110">
                                                        <FaEnvelope size={20} />
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Dev Score Card */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        data-tooltip-id="score-tooltip"
                                        className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-3xl border border-indigo-100 dark:border-indigo-800 cursor-help shadow-lg"
                                    >
                                        <div className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                            <CountUp end={user.developerScore || 0} duration={2} />
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mt-1">Dev Score</div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsEditModalOpen(true)}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-purple-500/25 transition-all"
                            >
                                Edit Profile
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate("/platforms")}
                                className="px-6 py-3 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all"
                            >
                                Platforms
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsSectionManagerOpen(true)}
                                className="px-6 py-3 bg-zinc-800 hover:bg-black text-white rounded-2xl font-bold transition-all"
                            >
                                Customize
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="p-3.5 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-2xl hover:text-indigo-600 transition-all disabled:opacity-50"
                            >
                                <FaSync className={`text-xl ${isRefreshing ? 'animate-spin' : ''}`} />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                <FaCode size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-gray-900 dark:text-white">
                                    <CountUp end={totalSolved} duration={1.5} />
                                </div>
                                <div className="text-xs font-bold uppercase text-gray-400">Problems Solved</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500">
                                <FaFire size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-gray-900 dark:text-white">
                                    {activeStreak}
                                </div>
                                <div className="text-xs font-bold uppercase text-gray-400">Day Streak</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                                <FaChartBar size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-gray-900 dark:text-white">
                                    #{user.platforms?.leetcode?.stats?.ranking || 'N/A'}
                                </div>
                                <div className="text-xs font-bold uppercase text-gray-400">LeetCode Rank</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                                <FaCodeBranch size={24} />
                            </div>
                            <div>
                                <div className="text-2xl font-black text-gray-900 dark:text-white">
                                    <CountUp end={totalCommits} duration={1.5} />
                                </div>
                                <div className="text-xs font-bold uppercase text-gray-400">GitHub Commits</div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Tech Stack / Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
                            Tech Stack
                        </h2>
                    </div>

                    {allSkills.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {['all', 'languages', 'frontend', 'backend', 'database', 'devops', 'tools'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveSkillTab(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                                            activeSkillTab === cat
                                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                                : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                                        }`}
                                    >
                                        {cat === 'all' ? 'All' : SKILL_CATEGORIES[cat]?.label || cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <AnimatePresence>
                                    {filteredSkills.map((skill, idx) => {
                                        const SkillIcon = TECH_STACK[skill]?.icon || FaCode;
                                        const skillColor = TECH_STACK[skill]?.color || '#6366f1';
                                        return (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.03 }}
                                                whileHover={{ scale: 1.1 }}
                                                className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer group"
                                            >
                                                <SkillIcon style={{ color: skillColor }} size={18} />
                                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                    {skill}
                                                </span>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center">
                                <FaBrain className="text-4xl text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Showcase Your Skills</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto">Add your tech stack to highlight your expertise</p>
                            <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all">
                                Add Skills
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Custom Sections */}
                <AnimatePresence>
                    {user.customSections?.sort((a, b) => a.order - b.order).map((section, sidx) => (
                        <motion.div
                            key={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                        >
                            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 border-l-4 border-purple-500 pl-4">{section.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-relaxed">{section.content}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Activity Heatmaps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></span>
                            Activity
                        </h2>
                        <div className="flex bg-gray-100 dark:bg-zinc-800 p-1.5 rounded-2xl">
                            {['leetcode', 'github'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveHeatmapTab(tab)}
                                    className={`px-5 py-2 rounded-xl text-sm font-bold uppercase transition-all ${
                                        activeHeatmapTab === tab 
                                            ? 'bg-white dark:bg-zinc-700 text-white shadow-lg' 
                                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                >
                                    {tab === 'leetcode' ? <SiLeetcode className="inline mr-2" /> : <FaGithub className="inline mr-2" />}
                                    {tab.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeHeatmapTab === "leetcode" ? (
                            <motion.div
                                key="leetcode"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {user.platforms?.leetcode?.username ? (
                                    <div className="overflow-x-auto pb-4">
                                        <div className="min-w-[700px] bg-gray-50 dark:bg-zinc-800/30 rounded-2xl p-4">
                                            <img
                                                src={`https://leetcard.jacoblin.cool/${user.platforms.leetcode.username}?ext=heatmap`}
                                                className="w-full h-auto"
                                                alt="LeetCode activity"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <EmptyState 
                                        icon={<SiLeetcode size={40} />}
                                        title="Connect LeetCode"
                                        desc="Track your coding streaks and problem solving activity"
                                        action={() => navigate("/platforms")}
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="github"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {user.platforms?.github?.username ? (
                                    <div className="overflow-x-auto pb-4">
                                        <div className="min-w-[700px] bg-gray-50 dark:bg-zinc-800/30 rounded-2xl p-4">
                                            <img
                                                src={`https://ghchart.rshah.org/4f46e5/${user.platforms.github.username}`}
                                                className="w-full h-auto filter dark:invert dark:hue-rotate-180 dark:brightness-200"
                                                alt="GitHub activity"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <EmptyState 
                                        icon={<FaGithub size={40} />}
                                        title="Connect GitHub"
                                        desc="Showcase your open source contributions"
                                        action={() => navigate("/platforms")}
                                    />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                    >
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Problem Difficulty</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={difficultyData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {difficultyData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Legend iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                    >
                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6">Topic Breakdown</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topicData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#8884d822" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                    <YAxis hide />
                                    <RechartsTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                                    <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                >
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
                        Recent Activity
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Latest Commit */}
                        <div className="p-6 bg-gray-50 dark:bg-zinc-800/30 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                                    <FaGithub className="text-indigo-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Latest Commit</h4>
                                    <p className="text-xs text-gray-500">
                                        {user.platforms?.github?.stats?.latestCommit?.date 
                                            ? new Date(user.platforms.github.stats.latestCommit.date).toLocaleDateString()
                                            : 'No data'}
                                    </p>
                                </div>
                            </div>
                            {user.platforms?.github?.stats?.latestCommit?.message ? (
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
                                        {user.platforms.github.stats.latestCommit.message}
                                    </p>
                                    <a 
                                        href={user.platforms.github.stats.latestCommit.url}
                                        target="_blank"
                                        className="text-xs text-indigo-600 hover:underline"
                                    >
                                        View on GitHub →
                                    </a>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-400 italic">No recent commits</p>
                            )}
                        </div>

                        {/* Recent LeetCode Solves */}
                        <div className="p-6 bg-gray-50 dark:bg-zinc-800/30 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
                                    <SiLeetcode className="text-yellow-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Recent Solves</h4>
                                    <p className="text-xs text-gray-500">
                                        {user.platforms?.leetcode?.stats?.recentSolves?.length || 0} problems
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {user.platforms?.leetcode?.stats?.recentSolves?.slice(0, 3).map((solve, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-700 dark:text-gray-300">{solve.title}</span>
                                        <span className="text-xs text-green-500 font-medium">Solved</span>
                                    </div>
                                )) || <p className="text-sm text-gray-400 italic">No recent solves</p>}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Academic & Career */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
                            Education & Experience
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {user.academic?.college && (
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
                                    <FaGraduationCap className="text-blue-500 mb-2" size={24} />
                                    <p className="text-xs text-gray-400 uppercase font-bold">College</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic.college}</p>
                                </div>
                            )}
                            {user.academic?.branch && (
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
                                    <FaCode className="text-purple-500 mb-2" size={24} />
                                    <p className="text-xs text-gray-400 uppercase font-bold">Branch</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic.branch}</p>
                                </div>
                            )}
                            {user.academic?.cgpa && (
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
                                    <FaStar className="text-amber-500 mb-2" size={24} />
                                    <p className="text-xs text-gray-400 uppercase font-bold">CGPA</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic.cgpa}</p>
                                </div>
                            )}
                            {user.academic?.semester && (
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
                                    <FaCalendarAlt className="text-green-500 mb-2" size={24} />
                                    <p className="text-xs text-gray-400 uppercase font-bold">Semester</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user.academic.semester}th</p>
                                </div>
                            )}
                            {user.academic?.resumeUrl && (
                                <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl">
                                    <FaProjectDiagram className="text-indigo-500 mb-2" size={24} />
                                    <p className="text-xs text-gray-400 uppercase font-bold">Resume</p>
                                    <a href={user.academic.resumeUrl} target="_blank" className="text-sm font-bold text-indigo-600 hover:underline">View →</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Rank Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-16 opacity-10">
                            <FaTrophy size={120} />
                        </div>
                        <div className="relative">
                            <h4 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Current Rank</h4>
                            <div className="text-4xl font-black mb-2">
                                {totalSolved > 1000 ? 'Grandmaster' : totalSolved > 500 ? 'Master' : totalSolved > 100 ? 'Expert' : 'Rising Star'}
                            </div>
                            <p className="text-sm opacity-80">
                                {totalSolved > 0 ? `${1000 - totalSolved} more to next rank!` : 'Start solving to rank up'}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Onboarding Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8"
                >
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">Profile Progress</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {onboardingSteps.map((step) => (
                            <div key={step.id} className={`p-4 rounded-2xl border ${step.done ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-zinc-800/30 border-gray-100 dark:border-zinc-700'}`}>
                                <div className="flex items-center gap-3">
                                    {step.done ? (
                                        <FaCheckCircle className="text-green-500 text-xl" />
                                    ) : (
                                        <FaCircle className="text-gray-300 dark:text-zinc-600 text-xl" />
                                    )}
                                    <span className={`text-sm font-bold ${step.done ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {step.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            <ReactTooltip id="score-tooltip" />
            <SectionManager isOpen={isSectionManagerOpen} onClose={() => setIsSectionManagerOpen(false)} sections={user.customSections || []} onSave={handleSaveSections} />
            <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} currentUser={user} onUpdate={(updatedUser) => updateUser(updatedUser)} />
        </div>
    );
};

const EmptyState = ({ icon, title, desc, action }) => (
    <div className="py-16 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 mb-4 bg-gray-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-gray-400">
            {icon}
        </div>
        <h4 className="text-xl font-black text-gray-900 dark:text-white mb-2">{title}</h4>
        <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-sm">{desc}</p>
        <button onClick={action} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all">
            Connect Now
        </button>
    </div>
);

export default UserProfile;