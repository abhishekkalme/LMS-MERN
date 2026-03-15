import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaExchangeAlt } from "react-icons/fa";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const CompareView = () => {
    const [searchParams] = useSearchParams();
    const u1 = searchParams.get("u1");
    const u2 = searchParams.get("u2");

    const [profiles, setProfiles] = useState({ p1: null, p2: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            if (!u1 || !u2) {
                setError("Please provide two usernames to compare.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const [r1, r2] = await Promise.all([
                    axios.get(`${Backurl}/api/auth/profile/${u1}`),
                    axios.get(`${Backurl}/api/auth/profile/${u2}`)
                ]);
                setProfiles({ p1: r1.data, p2: r2.data });
            } catch (err) {
                console.error("Comparison load error:", err);
                setError("One or both profiles could not be found or are private.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfiles();
    }, [u1, u2]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-500">Comparing developers...</div>;
    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{error}</h1>
            <p className="text-gray-500">Usage: /compare?u1=user1&u2=user2</p>
            <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
        </div>
    );

    const ComparisonCard = ({ profile, opponent }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-zinc-800 space-y-8"
        >
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center text-3xl font-bold text-indigo-600 dark:text-indigo-400 overflow-hidden">
                        {profile.avatar ? <img src={profile.avatar} className="w-full h-full object-cover" /> : profile.name[0]}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
                    <p className="text-indigo-500 font-medium">@{profile.username}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className={`p-6 rounded-2xl text-center transition-colors ${profile.developerScore >= opponent.developerScore ? 'bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-900/50' : 'bg-gray-50 dark:bg-zinc-800/50'}`}>
                    <div className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">Developer Score</div>
                    <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{profile.developerScore}</div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800/30 rounded-xl">
                        <span className="text-sm text-gray-500 font-medium">GitHub Repos</span>
                        <span className="font-bold dark:text-white">{profile.platforms?.github?.stats?.repos || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800/30 rounded-xl">
                        <span className="text-sm text-gray-500 font-medium">LeetCode Solved</span>
                        <span className="font-bold dark:text-white">{profile.platforms?.leetcode?.stats?.totalSolved || 0}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800/30 rounded-xl">
                        <span className="text-sm text-gray-500 font-medium">Badges</span>
                        <span className="font-bold dark:text-white">{profile.badges?.length || 0}</span>
                    </div>
                </div>
            </div>

             {/* Smaller Heatmap */}
             {profile.platforms?.leetcode?.username && !profile.hideHeatmap && (
                 <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                    <img
                        src={`https://leetcode-stats-six.vercel.app/api?username=${profile.platforms.leetcode.username}&ext=heatmap&theme=dark`}
                        alt="LeetCode Activity"
                        className="w-full h-auto opacity-80"
                    />
                 </div>
             )}
        </motion.div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black/95 transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-stretch gap-8 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-16 h-16 bg-white dark:bg-zinc-900 rounded-full shadow-2xl border-4 border-indigo-500">
                    <span className="text-indigo-600 font-black text-xl italic pointer-events-none select-none">VS</span>
                </div>
                
                <ComparisonCard profile={profiles.p1} opponent={profiles.p2} />
                <ComparisonCard profile={profiles.p2} opponent={profiles.p1} />
            </div>
        </div>
    );
};

export default CompareView;
