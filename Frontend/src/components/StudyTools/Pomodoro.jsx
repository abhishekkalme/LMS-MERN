import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Play, Pause, RotateCcw, Settings, CheckCircle2, 
    Maximize, Minimize, Volume2, VolumeX, Music, 
    ListTodo, BarChart3, Clock, X, Save, Plus
} from "lucide-react";
import { toast } from "react-hot-toast";

const quotes = [
    "You said ‘I’ll start in 5 minutes’ three hours ago. Sit down and work.",
    "Your deadline is closer than your GPA is to safe.",
    "If procrastination burned calories, you’d be an athlete.",
    "Open the textbook. No, the other tab doesn’t count.",
    "You’re not tired — you’re avoiding responsibility.",
    "That assignment isn’t going to do itself. It barely tolerates you.",
    "Study like your Wi-Fi is about to be shut off.",
    "You check your phone like it’s going to apologize.",
    "Future-you is already disappointed. Prove them wrong.",
    "You don’t need motivation — you need discipline and fewer snacks.",
    "If excuses earned degrees, you’d have a PhD.",
    "The timer started. Try doing actual work for once.",
    "You’ve researched everything except the topic.",
    "Your brain has RAM. Try using it.",
    "Pomodoro started — panic productively."
];



const themes = {
    minimalLight: { 
        name: "Minimal Light",
        bg: "bg-gray-50", 
        text: "text-gray-900", 
        accent: "text-indigo-600",
        overlay: "bg-white/80"
    },
    minimalDark: { 
        name: "Minimal Dark",
        bg: "bg-zinc-950", 
        text: "text-white", 
        accent: "text-indigo-400",
        overlay: "bg-black/40"
    },
    nature: { 
        name: "Nature",
        bg: "bg-[url('https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center", 
        text: "text-white", 
        accent: "text-emerald-300",
        overlay: "bg-black/30 backdrop-blur-sm"
    },
    ocean: { 
        name: "Ocean",
        bg: "bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop')] bg-cover bg-center", 
        text: "text-white", 
        accent: "text-cyan-300",
        overlay: "bg-black/20 backdrop-blur-sm"
    },
    city: { 
        name: "City Night",
        bg: "bg-[url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center", 
        text: "text-white", 
        accent: "text-amber-300",
        overlay: "bg-black/50 backdrop-blur-sm"
    },
    gradient: { 
        name: "Gradient Focus",
        bg: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500", 
        text: "text-white", 
        accent: "text-white",
        overlay: "bg-white/10 backdrop-blur-md"
    }
};

const Pomodoro = () => {
    // State: Timer
    const [timerSettings, setTimerSettings] = useState(() => {
        const saved = localStorage.getItem("pomodoroSettings");
        return saved ? JSON.parse(saved) : { work: 25, shortBreak: 5, longBreak: 15 };
    });
    const [mode, setMode] = useState("work");
    const [timeLeft, setTimeLeft] = useState(timerSettings.work * 60);
    const [isActive, setIsActive] = useState(false);
    
    // State: UI & Features
    const [themeKey, setThemeKey] = useState(() => localStorage.getItem("pomodoroTheme") || "nature");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("pomodoroTasks");
        return saved ? JSON.parse(saved) : [];
    });
    const [newTask, setNewTask] = useState("");
    const [stats, setStats] = useState(() => {
        const saved = localStorage.getItem("pomodoroStats");
        return saved ? JSON.parse(saved) : { sessions: 0, today: new Date().toDateString() };
    });
    
    const containerRef = useRef(null);
    const theme = themes[themeKey];

    // Initialize Timer on mode change
    useEffect(() => {
        setTimeLeft(timerSettings[mode] * 60);
        setIsActive(false);
    }, [mode, timerSettings]);

    const [currentQuote, setCurrentQuote] = useState(quotes[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }, 15000); // Change quote every 15 seconds
        return () => clearInterval(interval);
    }, []);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (mode === "work") {
                const newStats = { 
                    sessions: stats.sessions + 1, 
                    today: new Date().toDateString() 
                };
                if (stats.today !== new Date().toDateString()) {
                     newStats.sessions = 1;
                }
                setStats(newStats);
                localStorage.setItem("pomodoroStats", JSON.stringify(newStats));
                toast.success("Session completed! Take a break.");
                new Audio("/sounds/complete.mp3").play().catch(() => {}); // Placeholder
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode, stats]);

    // Persistence
    useEffect(() => {
        localStorage.setItem("pomodoroSettings", JSON.stringify(timerSettings));
        localStorage.setItem("pomodoroTheme", themeKey);
        localStorage.setItem("pomodoroTasks", JSON.stringify(tasks));
    }, [timerSettings, themeKey, tasks]);

    // Handlers
    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(timerSettings[mode] * 60);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
        setNewTask("");
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const currentProgress = ((timerSettings[mode] * 60 - timeLeft) / (timerSettings[mode] * 60)) * 100;

    return (
        <div ref={containerRef} className={`relative min-h-screen transition-all duration-500 ${theme.bg} ${theme.text} overflow-hidden`}>
            {/* Overlay for readability on image backgrounds */}
            <div className={`absolute inset-0 ${theme.overlay} transition-all duration-500`} />
            
            <div className="relative z-10 w-full h-full flex flex-col">
                
                {/* Header */}
                <header className="flex justify-between items-center p-6">
                    <div className="flex items-center gap-4">
                       <Clock className="w-6 h-6 opacity-80" />
                       <div className="text-xl font-medium tracking-wide">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                         <button 
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
                            title="Settings"
                        >
                            <Settings size={20} />
                        </button>
                        <button 
                            onClick={toggleFullscreen}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all"
                            title="Fullscreen"
                        >
                            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center p-6">
                    
                    {/* Timer Circle */}
                    <div className="relative w-80 h-80 sm:w-96 sm:h-96 mb-12 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="opacity-20"
                            />
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * (window.innerWidth < 640 ? 144 : 172)} // Approx radius
                                strokeDashoffset={2 * Math.PI * (window.innerWidth < 640 ? 144 : 172) * (1 - currentProgress / 100)}
                                className={`transition-all duration-1000 ease-linear ${theme.accent}`}
                                strokeLinecap="round"
                            />
                        </svg>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <div className="text-8xl font-bold tracking-tighter tabular-nums drop-shadow-lg">
                                {formatTime(timeLeft)}
                             </div>
                             <div className="mt-4 flex gap-2">
                                 {["work", "shortBreak", "longBreak"].map((m) => (
                                     <button
                                        key={m}
                                        onClick={() => handleModeChange(m)}
                                        className={`px-3 py-1 rounded-full text-xs uppercase font-bold tracking-wider transition-all
                                            ${mode === m ? `bg-white text-black` : `bg-white/10 text-white/60 hover:bg-white/20`}
                                        `}
                                     >
                                        {m === "work" ? "Focus" : m === "shortBreak" ? "Short" : "Long"}
                                     </button>
                                 ))}
                             </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-8 mb-12">
                         <button
                            onClick={toggleTimer}
                            className={`p-6 rounded-full transition-all duration-300 hover:scale-110 shadow-xl
                                ${isActive ? "bg-white text-black" : `bg-indigo-600 text-white hover:bg-indigo-500`}
                            `}
                        >
                            {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                        </button>
                         <button
                            onClick={resetTimer}
                            className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all"
                        >
                            <RotateCcw size={24} />
                        </button>
                    </div>

                    {/* Footer Widgets (Tasks & Quote) */}
                    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Tasks Widget */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center gap-2"><ListTodo size={18} /> Focus Tasks</h3>
                                <span className="text-xs opacity-60">{tasks.filter(t => t.completed).length}/{tasks.length} Done</span>
                            </div>
                            <form onSubmit={addTask} className="flex gap-2 mb-4">
                                <input 
                                    type="text" 
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Add a task..."
                                    className="flex-1 bg-black/20 border-none rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-white/50 outline-none placeholder-white/30 text-white"
                                />
                                <button type="submit" className="p-2 bg-white/20 hover:bg-white/30 rounded-lg"><Plus size={18} /></button>
                            </form>
                            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                                {tasks.length === 0 && <p className="text-center text-xs opacity-40 py-2">No tasks added</p>}
                                {tasks.map(task => (
                                    <div key={task.id} className="flex items-center gap-3 group">
                                        <button onClick={() => toggleTask(task.id)} className={`transition-colors ${task.completed ? "text-green-400" : "opacity-40 hover:opacity-100"}`}>
                                            {task.completed ? <CheckCircle2 size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-current" />}
                                        </button>
                                        <span className={`flex-1 text-sm truncate ${task.completed ? "opacity-40 line-through" : ""}`}>{task.text}</span>
                                        <button onClick={() => removeTask(task.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400"><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quote & Stats Widget */}
                        <div className="flex flex-col gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/10 flex-1 flex flex-col justify-center text-center relative overflow-hidden">
                                <p className="font-serif italic text-lg leading-relaxed opacity-90">"{currentQuote}"</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex-1 flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg"><BarChart3 size={20} /></div>
                                    <div>
                                        <div className="text-xl font-bold">{stats.sessions}</div>
                                        <div className="text-xs opacity-60">Sessions Today</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>

            {/* Settings Modal */}
            <AnimatePresence>
                {showSettings && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setShowSettings(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings size={20} /> Settings</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium opacity-60 mb-2 block">Background Theme</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Object.entries(themes).map(([key, t]) => (
                                            <button
                                                key={key}
                                                onClick={() => setThemeKey(key)}
                                                className={`h-10 rounded-lg border-2 transition-all ${key === themeKey ? "border-indigo-500 scale-105" : "border-transparent hover:scale-105 opacity-70 hover:opacity-100"}`}
                                                style={{ background: key === "gradient" ? "linear-gradient(to right, #6366f1, #ec4899)" : "" }}
                                            >
                                                {key !== "gradient" && <div className={`w-full h-full rounded-md ${t.bg.includes("url") ? "bg-cover" : t.bg} ${t.bg}`} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium opacity-60 mb-2 block">Timer Duration (minutes)</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {Object.entries(timerSettings).map(([key, val]) => (
                                            <div key={key}>
                                                <div className="text-xs opacity-50 mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                                <input 
                                                    type="number" 
                                                    value={val}
                                                    onChange={(e) => setTimerSettings({...timerSettings, [key]: parseInt(e.target.value) || 0})}
                                                    className="w-full bg-gray-100 dark:bg-zinc-800 rounded-lg px-3 py-2 text-center font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setShowSettings(false)}
                                className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Pomodoro;
