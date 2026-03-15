import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Filter, GraduationCap, Layers, BookOpen, Download, AlertCircle, Calendar } from "lucide-react";
import Breadcrumbs from "../Common/Breadcrumbs";
import { logActivity } from "../../utils/activityLogger";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const ViewPYQs = () => {
    const [pyqs, setPyqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        branch: "CSE",
        year: "First Year",
        semester: "Semester 1",
    });

    const branches = ["CSE", "ECE", "ME", "CE", "EE"];
    const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];
    const yearSemesterMap = {
        "First Year": ["Semester 1", "Semester 2"],
        "Second Year": ["Semester 3", "Semester 4"],
        "Third Year": ["Semester 5", "Semester 6"],
        "Fourth Year": ["Semester 7", "Semester 8"],
    };

    const fetchPYQs = async () => {
        setLoading(true);
        try {
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const res = await axios.get(`${API_BASE_URL}/api/pyqs/search`, { params: filters });
            setPyqs(res.data || []);
        } catch (err) {
            console.error("Failed to fetch PYQs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPYQs();
    }, [filters]);

    return (
        <div className="relative min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
                <Breadcrumbs items={[{ label: "Study Tools", path: "/study/tools" }, { label: "Previous Year Papers" }]} />

                <motion.div {...fadeUp} className="mt-12 mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                        RGPV Previous Year Papers
                    </h1>
                    <p className="text-gray-600 dark:text-indigo-200/70 max-w-2xl mx-auto">
                        Review actual exam papers from previous sessions to understand question patterns and exam difficulty.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:border-indigo-300">
                        <GraduationCap className="text-indigo-500" size={20} />
                        <select
                            value={filters.branch}
                            onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                            className="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium dark:text-white"
                        >
                            {branches.map(b => <option key={b} value={b} className="bg-white dark:bg-gray-900">{b} Branch</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:border-purple-300">
                        <Layers className="text-purple-500" size={20} />
                        <select
                            value={filters.year}
                            onChange={(e) => setFilters({ ...filters, year: e.target.value, semester: yearSemesterMap[e.target.value][0] })}
                            className="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium dark:text-white"
                        >
                            {years.map(y => <option key={y} value={y} className="bg-white dark:bg-gray-900">{y}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm transition-all hover:border-blue-300">
                        <BookOpen className="text-blue-500" size={20} />
                        <select
                            value={filters.semester}
                            onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                            className="w-full bg-transparent border-0 focus:ring-0 text-sm font-medium dark:text-white"
                        >
                            {yearSemesterMap[filters.year].map(s => <option key={s} value={s} className="bg-white dark:bg-gray-900">{s}</option>)}
                        </select>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-gray-500 dark:text-indigo-300">Loading PYQs...</p>
                    </div>
                ) : pyqs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pyqs.map((q) => (
                            <motion.div
                                key={q._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ y: -5 }}
                                className="group p-6 rounded-[24px] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <Calendar size={24} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/20 text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                                        {q.examSession}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-indigo-600 transition-colors">
                                    {q.subject}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-indigo-200/60 mb-6">
                                    {q.branch} · {q.semester} · PYQ Paper
                                </p>
                                <a
                                    href={q.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => logActivity("academic", `Downloaded PYQ: ${q.subject} (${q.examSession})`, window.location.pathname)}
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-50 hover:bg-blue-600 dark:bg-white/5 dark:hover:bg-blue-600 text-gray-700 dark:text-white hover:text-white font-semibold transition-all"
                                >
                                    <Download size={18} /> Download PDF
                                </a>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-white/5 rounded-[40px] border border-dashed border-gray-200 dark:border-white/10">
                        <div className="flex justify-center mb-6">
                            <div className="p-6 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-300">
                                <AlertCircle size={48} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No Papers Found</h3>
                        <p className="text-gray-500 dark:text-indigo-200/50 max-w-sm mx-auto">
                            We haven't uploaded PYQ papers for {filters.branch} {filters.semester} yet. Stay tuned!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPYQs;
