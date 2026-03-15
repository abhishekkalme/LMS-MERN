import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { Users, FileText, TrendingUp, Award, Download } from "lucide-react";

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch admin stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    if (loading) return <div className="p-8 text-center text-indigo-500 animate-pulse">Loading Analytics...</div>;
    if (!stats) return <div className="p-8 text-center text-red-500">Failed to load stats.</div>;

    const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B"];

    const platformData = [
        { name: "GitHub", value: stats.platforms.github },
        { name: "LeetCode", value: stats.platforms.leetcode },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Users size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Users</span>
                    </div>
                    <div className="text-2xl font-bold dark:text-white">{stats.summary.totalUsers}</div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-lg bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400">
                            <FileText size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Notes</span>
                    </div>
                    <div className="text-2xl font-bold dark:text-white">{stats.summary.totalNotes}</div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Growth</span>
                    </div>
                    <div className="text-2xl font-bold dark:text-white">+{stats.userGrowth[stats.userGrowth.length - 1]?.count || 0}</div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400">
                            <Award size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Subject</span>
                    </div>
                    <div className="text-sm font-bold dark:text-white line-clamp-1">{stats.topNotes[0]?.subject || "N/A"}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Growth Chart */}
                <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Users size={20} className="text-indigo-500" /> User Growth Trends
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.userGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                                <XAxis dataKey="_id" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Platform Distribution */}
                <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-pink-500" /> Platform Connections
                    </h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={platformData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {platformData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Downloaded Notes */}
            <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Download size={20} className="text-emerald-500" /> Most Downloaded Notes
                </h3>
                <div className="space-y-4">
                    {stats.topNotes.map((note, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                                    {idx + 1}
                                </div>
                                <div>
                                    <div className="font-bold text-sm dark:text-white">{note.subject}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{note.branch} · Unit {note.unit}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                                <Download size={14} />
                                <span>{note.downloadCount}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
