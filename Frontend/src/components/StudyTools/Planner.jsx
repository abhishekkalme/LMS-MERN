import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Layout, Square, CheckSquare, Sparkles, Calendar, Clock, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const Planner = ({ embedded = false }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("plannerTasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [showAI, setShowAI] = useState(false);

    // AI Form State
    const [subjects, setSubjects] = useState("");
    const [examDate, setExamDate] = useState("");
    const [hours, setHours] = useState(4);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        localStorage.setItem("plannerTasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
    };

    const handleGenerateAI = async (e) => {
        e.preventDefault();
        if (!subjects.trim()) return toast.error("Please enter some subjects!");

        setIsGenerating(true);
        try {
            const subjectList = subjects.split(",").map(s => s.trim());
            const res = await axios.post(`${Backurl}/api/planner/generate`, {
                subjects: subjectList,
                examDate,
                targetHours: hours
            });

            const newTasks = res.data.schedule.map(item => ({
                id: Math.random().toString(36).substr(2, 9),
                text: `${item.task} (${item.duration})`,
                completed: false
            }));

            setTasks([...tasks, ...newTasks]);
            setShowAI(false);
            setSubjects("");
            toast.success("Study plan generated!");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Generation failed. Is API Key set?");
        } finally {
            setIsGenerating(false);
        }
    };

    const toggleTask = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const removeTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const containerProps = embedded
        ? { className: "w-full h-full" }
        : { className: "min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center" };

    return (
        <div {...containerProps}>
            <motion.div
                initial={embedded ? {} : { opacity: 0, y: 20 }}
                animate={embedded ? {} : { opacity: 1, y: 0 }}
                className={embedded ? "w-full h-full" : "w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800"}
            >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                        <Layout className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-2" />
                        <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Study Planner
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAI(!showAI)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${showAI ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 hover:bg-indigo-100'}`}
                    >
                        <Sparkles size={18} />
                        {showAI ? "Close AI" : "AI Assistant"}
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {showAI ? (
                        <motion.form
                            key="ai-form"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleGenerateAI}
                            className="mb-8 space-y-4 overflow-hidden bg-indigo-50/50 dark:bg-indigo-500/5 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-500/20"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">Subjects (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. OS, DBMS, Mathematics"
                                    value={subjects}
                                    onChange={(e) => setSubjects(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                                        <Calendar size={14} /> Exam Date
                                    </label>
                                    <input
                                        type="date"
                                        value={examDate}
                                        onChange={(e) => setExamDate(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                                        <Clock size={14} /> Hours/Day
                                    </label>
                                    <input
                                        type="number"
                                        min="1" max="15"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isGenerating}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transform active:scale-95 transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50"
                            >
                                {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                                {isGenerating ? "AI is Thinking..." : "Generate My Study Plan"}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="manual-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onSubmit={addTask}
                            className="flex gap-2 mb-8"
                        >
                            <input
                                type="text"
                                placeholder="Add a new task..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium flex items-center"
                            >
                                <Plus size={20} />
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                    {tasks.length === 0 && (
                        <div className="text-center py-12 flex flex-col items-center opacity-40">
                            <Layout size={48} className="mb-4 text-gray-300" />
                            <p className="italic">Your plan is empty. Start adding tasks or use the AI Assistant!</p>
                        </div>
                    )}
                    <AnimatePresence>
                        {tasks.map((task) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                key={task.id}
                                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${task.completed
                                        ? "bg-gray-50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800/50 opacity-60"
                                        : "bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className={`shrink-0 transition-colors ${task.completed ? "text-green-500" : "text-gray-400 hover:text-indigo-500"
                                            }`}
                                    >
                                        {task.completed ? <CheckSquare size={24} /> : <Square size={24} />}
                                    </button>
                                    <span
                                        className={`text-base md:text-lg transition-all truncate ${task.completed ? "line-through text-gray-400 dark:text-zinc-600" : "text-gray-800 dark:text-gray-200"
                                            }`}
                                    >
                                        {task.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => removeTask(task.id)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center text-sm">
                    <div className="text-gray-500 dark:text-zinc-500 font-medium">
                        {tasks.filter(t => !t.completed).length} items left
                    </div>
                    <div className="flex gap-4">
                        {tasks.length > 0 && (
                            <button
                                onClick={() => setTasks(tasks.filter(t => !t.completed))}
                                className="text-gray-500 hover:text-red-500 transition-colors"
                            >
                                Clear Completed
                            </button>
                        )}
                        {tasks.length > 0 && (
                            <button
                                onClick={() => { if (window.confirm("Nuclear option? This clears everything.")) setTasks([]) }}
                                className="text-red-400 hover:text-red-600 font-bold transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Planner;

