import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaCheckCircle, FaTimesCircle, FaSync, FaSave, FaTrash } from "react-icons/fa";
import { SiLeetcode, SiCodeforces, SiCodechef, SiHackerrank } from "react-icons/si";
import toast from "react-hot-toast";
import Breadcrumbs from "../Common/Breadcrumbs";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const Platforms = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loadingPlatform, setLoadingPlatform] = useState("");
  const [inputs, setInputs] = useState({});

  const handleConnect = async (platform) => {
    const username = inputs[platform];
    if (!username) return toast.error(`Please enter your ${platform} username`);

    setLoadingPlatform(platform);
    try {
        const token = localStorage.getItem("token");
        const res = await axios.post(`${Backurl}/api/auth/platform/${platform}`, 
            { username },
            { headers: { "Authorization": token } }
        );
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(`${platform} connected and synced!`);
    } catch (err) {
        toast.error(err.response?.data?.message || "Connection failed");
    } finally {
        setLoadingPlatform("");
    }
  };

  const handleDisconnect = async (platform) => {
    if (!window.confirm(`Are you sure you want to disconnect your ${platform} account?`)) return;
    
    setLoadingPlatform(platform);
    try {
        const token = localStorage.getItem("token");
        const res = await axios.delete(`${Backurl}/api/auth/platform/${platform}`, {
            headers: { "Authorization": token }
        });
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(`${platform} disconnected successfully`);
    } catch (err) {
        toast.error(err.response?.data?.message || "Disconnection failed");
    } finally {
        setLoadingPlatform("");
    }
  };

  const platformsList = [
    { id: "github", label: "GitHub", icon: <FaGithub />, color: "text-gray-900 dark:text-white" },
    { id: "leetcode", label: "LeetCode", icon: <SiLeetcode />, color: "text-yellow-500" },
    { id: "codeforces", label: "Codeforces", icon: <SiCodeforces />, color: "text-blue-500" },
    { id: "codechef", label: "CodeChef", icon: <SiCodechef />, color: "text-amber-700" },
    { id: "hackerrank", label: "HackerRank", icon: <SiHackerrank />, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: "Profile", path: "/profile" }, { label: "Connect Platforms" }]} />
        
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Connect Platforms</h1>
                <p className="text-gray-500 dark:text-gray-400">Add your coding handles to sync your stats and build your developer identity.</p>
            </div>

            <div className="space-y-6">
                {platformsList.map((p) => {
                    const connected = user?.platforms?.[p.id]?.username;
                    const stats = user?.platforms?.[p.id]?.stats;
                    
                    return (
                        <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-zinc-800/30 border border-gray-100 dark:border-zinc-800 hover:border-indigo-500/30 transition-all group">
                            <div className={`text-3xl ${p.color} transition-transform group-hover:scale-110`}>
                                {p.icon}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    {p.label}
                                    {connected && <FaCheckCircle className="text-green-500 text-sm" />}
                                </h3>
                                {connected ? (
                                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-medium text-indigo-500">@{connected}</span>
                                        <span>•</span>
                                        <span>Last synced: {user.platforms[p.id].lastSyncedAt ? new Date(user.platforms[p.id].lastSyncedAt).toLocaleDateString() : "Never"}</span>
                                    </div>
                                ) : (
                                    <p className="text-xs text-gray-400">Enter your {p.label} username to sync achievements.</p>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                {!connected ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                                            onChange={(e) => setInputs({...inputs, [p.id]: e.target.value})}
                                        />
                                        <button 
                                            onClick={() => handleConnect(p.id)}
                                            disabled={loadingPlatform === p.id}
                                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                                        >
                                            {loadingPlatform === p.id ? "Syncing..." : "Connect"}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <button 
                                            className="p-2 text-gray-400 hover:text-indigo-500 transition-colors"
                                            title="Sync Now"
                                            disabled={loadingPlatform === p.id}
                                            onClick={() => handleConnect(p.id)}
                                        >
                                            <FaSync size={16} className={`${loadingPlatform === p.id ? "animate-spin" : ""}`} />
                                        </button>
                                        <button 
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            title="Disconnect"
                                            disabled={loadingPlatform === p.id}
                                            onClick={() => handleDisconnect(p.id)}
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20">
                <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-400 uppercase tracking-wider mb-2">Pro Tip</h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-300">Connecting your GitHub and LeetCode accounts gives you a 100+ points boost to your Developer Score instantly!</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
