import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CountUp from "react-countup";
import FloatingLines from '../Home/particles';
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import toast from "react-hot-toast";
// import TextReveal from "../ui/TextReveal";
import BlurFade from "../ui/BlurFade";
import {
  GraduationCap,
  BookText,
  Brain,
  FileText,
  Bot,
  Terminal,
  Upload,
  Target,
  Timer,
  Calculator,
  Layout,
  Highlighter,
  XCircle,
  CheckCircle2,
  Flame,
  Star,
  TrendingUp,
  Flag,
  Rocket,
  ShieldCheck,
  Zap,
  FileCheck,
  Award,
  Trophy,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import hero3d from "../../assets/hero_3d.png";

const float = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};



const DEFAULT_STATS = [
  { key: "notes", b: "Verified Notes", icon: FileCheck, color: "text-indigo-500", pos: "top-0 left-0", delay: 0 },
  { key: "pyqs", b: "Previous Years", icon: FileText, color: "text-amber-500", pos: "top-10 right-0", delay: 0.2 },
  { key: "questions", b: "Imp Questions", icon: HelpCircle, color: "text-emerald-500", pos: "bottom-10 left-4", delay: 0.4 },
  { key: "users", b: "Active Students", icon: GraduationCap, color: "text-purple-500", pos: "bottom-0 right-4", delay: 0.6 },
];



const STUDY_TOOLS = [
  { label: "Exam Prep", icon: Brain, path: "/notes", color: "text-indigo-500", desc: "Topic-wise focus items" },
  { label: "Pomodoro", icon: Timer, path: "/study/pomodoro", color: "text-red-500", desc: "Deep work sessions" },
  { label: "GPA Calc", icon: Calculator, path: "/study/gpa-calculator", color: "text-blue-500", desc: "Track performance" },
  { label: "Syllabus", icon: FileText, path: "/syllabus", color: "text-emerald-500", desc: "Official RGPV curriculum" }
];

const HOW_IT_WORKS = [
  "Choose your branch",
  "Select semester",
  "Use Practice Center for PYQs & Questions",
  "Download Notes & revise",
];

const STUDENTS_TYPE = [
  [GraduationCap, "First Year", "I don’t know what to study.", "text-indigo-500"],
  [BookText, "Mid Sem", "I need exam-focused units.", "text-blue-500"],
  [Flag, "Final Year", "I want quick revision.", "text-emerald-500"],
];

const ROADMAP = [
  { label: "AI Study Planner", icon: Brain, color: "text-purple-500" },
  { label: "Virtual Labs", icon: Terminal, color: "text-indigo-500" },
  { label: "Personal Dashboard", icon: Layout, color: "text-blue-500" },
  { label: "Mobile App", icon: Target, color: "text-emerald-500" },
];

const ENABLED_WAVES = ["middle", "bottom", "top"];

function Home() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [recentNotes, setRecentNotes] = useState([]);
  const [stats, setStats] = useState({
    notes: 0,
    pyqs: 0,
    questions: 0,
    users: 0
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/notes/recent`)
      .then((res) => setRecentNotes(res.data || []))
      .catch(() => { });

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/stats`)
      .then((res) => setStats(res.data))
      .catch(() => { });
  }, []);

  const go = (path) => {
    if (!user) {
      toast.error("Please log in to access this content.");
      navigate("/login");
      return;
    }
    navigate(path);
  };

  const handleNoteClick = (n) => {
    if (!user) {
      toast.error("Please log in to view this document.");
      navigate("/login");
      return;
    }

    const subjectCode = (n.subjectCode || n.subject || "").toUpperCase();
    navigate(`/notes/${subjectCode}`, {
      state: {
        branch: n.branch,
        year: n.year,
        semester: n.semester
      }
    });
  };

  return (
    <div className="relative">
      {/* ===== Global Waves Background ===== */}
      {darkMode && (
        <div className="fixed inset-0 z-0 pointer-events-none w-screen h-screen">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <FloatingLines
              enabledWaves={ENABLED_WAVES}
              lineCount={5}
              lineDistance={5}
              bendRadius={5}
              bendStrength={-0.5}
              interactive={true}
              parallax={true}
            />
          </div>
        </div>
      )}
      <main className="relative z-10 text-gray-900 dark:text-white overflow-hidden">

        {/* ================= HERO ================= */}
        <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-32">

          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/30 blur-[80px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-pink-500/20 blur-[80px] rounded-full pointer-events-none z-0" />

          <BlurFade
            inView
            className="grid lg:grid-cols-2 gap-20 items-center relative z-20"
          >
            <div>
              <span className="inline-flex items-center mb-5 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-gray-100 text-xs tracking-wide">
                <GraduationCap size={16} className="mr-2" /> RGPV Academic Platform
              </span>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Study with
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-amber-200 dark:to-cyan-200">
                  clarity, not chaos.
                </span>
              </h1>

              <p className="mt-6 text-gray-600 dark:text-indigo-200 max-w-xl">
                Verified notes, unit-wise important questions, and previous year papers —
                everything you need to ace your RGPV examinations.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => go("/branch")}
                  className="flex items-center px-6 py-4 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 hover:scale-105 transition"
                >
                  <BookText size={18} className="mr-2" /> Browse Notes
                </button>
                <button
                  onClick={() => go("/important-questions")}
                  className="flex items-center px-6 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20 transition"
                >
                  <HelpCircle size={18} className="mr-2" /> Important Questions
                </button>
                <button
                  onClick={() => go("/pyqs")}
                  className="flex items-center px-6 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20 transition"
                >
                  <FileText size={18} className="mr-2" /> PYQs
                </button>
                <button
                  onClick={() => go("/syllabus")}
                  className="flex items-center px-6 py-4 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-white/10 dark:border-white/20 dark:text-white dark:hover:bg-white/20 transition"
                >
                  <FileText size={18} className="mr-2" /> Syllabus
                </button>

              </div>
            </div>

            <div className="relative h-auto md:h-[500px] flex flex-col items-center justify-center mt-12 md:mt-0">
              {/* Center Piece 3D Illustration */}
              <motion.div
                {...float}
                className="relative z-10 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px]"
              >
                <img
                  src={hero3d}
                  alt="AI Study Platform"
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
                />
              </motion.div>

              {/* Floating Stat Cards (Desktop only) */}
              {DEFAULT_STATS.map((s, idx) => (
                <BlurFade
                  key={s.key}
                  delay={s.delay}
                  className={`absolute ${s.pos} z-20 hidden lg:block`}
                >
                  <motion.div
                    animate={{
                      y: [0, idx % 2 === 0 ? -10 : 10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="flex items-center gap-3 rounded-2xl bg-white/80 border border-white/20 shadow-xl dark:bg-white/10 p-4 backdrop-blur-xl hover:scale-110 transition cursor-default"
                  >
                    <div className={`p-2 rounded-lg bg-gray-50 dark:bg-white/5 ${s.color}`}>
                      <s.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                        <CountUp end={stats[s.key] || 0} duration={2} />+
                      </h3>
                      <p className="text-[10px] text-gray-500 dark:text-indigo-200 mt-1 uppercase tracking-wider">{s.b}</p>
                    </div>
                  </motion.div>
                </BlurFade>
              ))}

              {/* Mobile Grid Fallback (Visible on mobile/tablet) */}
              <div className="lg:hidden grid grid-cols-2 gap-4 w-full mt-12">
                {DEFAULT_STATS.map((s) => (
                  <div key={s.key} className="p-4 rounded-2xl bg-white border border-gray-100 dark:bg-white/5 dark:border-white/10 backdrop-blur-md flex flex-col items-start gap-2">
                    <div className={`p-2 rounded-lg bg-gray-50 dark:bg-white/5 ${s.color}`}>
                      <s.icon size={20} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white leading-none">
                        <CountUp end={stats[s.key] || 0} duration={2} />+
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-indigo-300 uppercase mt-1">{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </BlurFade>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        {user?.role?.toLowerCase() === "admin" && (
          <section className="max-w-7xl mx-auto px-6 -mt-16 mb-24 relative z-10">
            <BlurFade delay={0.2} inView>
              <div className="rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-white/5 dark:border-white/10 backdrop-blur-xl px-6 py-4 flex flex-wrap gap-3 items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-indigo-200 font-medium">
                  Quick actions
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center px-4 py-2 rounded-lg bg-emerald-400/20 text-emerald-500 border border-emerald-300/30 text-sm"
                  >
                    <Terminal size={14} className="mr-2" /> Admin Panel
                  </button>

                  <button
                    onClick={() => navigate("/admin/upload-notes")}
                    className="flex items-center px-4 py-2 rounded-lg bg-fuchsia-400/20 text-fuchsia-500 border border-fuchsia-300/30 text-sm"
                  >
                    <Upload size={14} className="mr-2" /> Upload Notes
                  </button>
                </div>
              </div>
            </BlurFade>
          </section>
        )}
        {/* ================= YOUR GROWTH JOURNEY ================= */}
        <section className="max-w-7xl mx-auto px-6 mb-24 transition-all">
          <BlurFade inView delay={0.25}>
            <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-1 shadow-xl">
              <div className="bg-white dark:bg-gray-900 rounded-[20px] p-6 md:p-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-bold tracking-wide uppercase">
                      <Trophy size={14} className="mr-2" />
                      {user ? "Your Progress" : "Student Leveling System"}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {user ? `Keep passing, ${user.name.split(" ")[0]}!` : "Turn your study stats into specific achievements."}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto md:mx-0">
                      {user
                        ? "You're building a great learning habit. Check your recent badges and activity."
                        : "Track your notes read, syllabus completed, and problems solved. Compete with friends and earn badges."}
                    </p>

                    {user ? (
                      <button
                        onClick={() => navigate("/profile")}
                        className="inline-flex items-center px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                      >
                        View Full Profile <ArrowRight size={18} className="ml-2" />
                      </button>
                    ) : (
                      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button
                          onClick={() => navigate("/login")}
                          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/30"
                        >
                          Login to Track
                        </button>
                        <button
                          onClick={() => navigate("/register")}
                          className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                        >
                          Create Account
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Stats Card / Teaser */}
                  <div className="md:w-[400px] w-full">
                    {user ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 text-center">
                          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                            <CountUp end={user.developerScore || 0} duration={2} />
                          </div>
                          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mt-1">Dev Score</div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-500/20 text-center">
                          <div className="text-3xl font-black text-amber-500">
                            {user.badges?.length || 0}
                          </div>
                          <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mt-1">Badges Earned</div>
                        </div>
                        <div className="col-span-2 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center justify-between px-8">
                          <div className="text-left">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              #{user.platforms?.leetcode?.stats?.ranking || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500 uppercase font-bold">Current Rank</div>
                          </div>
                          <div className="h-10 w-px bg-gray-200 dark:bg-gray-700"></div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-500">
                              {user.platforms?.leetcode?.stats?.streak || 0}
                            </div>
                            <div className="text-xs text-green-500 uppercase font-bold">Day Streak</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 p-6 text-center border border-gray-200 dark:border-gray-700">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                          <Trophy size={80} />
                        </div>
                        <div className="space-y-4 relative z-10">
                          <div className="flex justify-center gap-4 opacity-50 blur-[1px]">
                            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                          </div>
                          <div className="font-bold text-gray-400 uppercase tracking-widest text-sm">
                            Locked Content
                          </div>
                          <p className="text-xs text-gray-500">
                            Join 1000+ students tracking their progress.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </section>

        {/* ================= EXAM TOOLKIT ================= */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <BlurFade inView>
            <h2 className="text-3xl font-bold mb-10 text-center dark:text-white">
              Essential Exam Toolkit
            </h2>
          </BlurFade>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STUDY_TOOLS.map(
              ({ label, icon: Icon, path, color, desc }, idx) => (
                <BlurFade
                  key={label}
                  delay={0.2 + idx * 0.05}
                  inView
                  className="h-full"
                >
                  <div
                    onClick={() => go(path)}
                    className="group relative h-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl dark:bg-white/10 dark:border-white/20 p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
                  >
                    <div className={`p-3 rounded-xl bg-gray-50 dark:bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300 ${color}`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{label}</h3>
                    <p className="text-xs text-gray-500 dark:text-indigo-200">{desc}</p>

                    {/* Hover effect gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-indigo-50/50 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </BlurFade>
              )
            )}
          </div>
        </section>
        {/* ================= PRACTICE CENTER ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20 bg-indigo-50/50 dark:bg-white/5 rounded-[48px] mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 blur-[100px] pointer-events-none" />

          <BlurFade inView className="relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-white uppercase tracking-tight">
                Practice Center
              </h2>
              <p className="text-gray-600 dark:text-indigo-200/70">Master your exams with actual resources.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div
                onClick={() => go("/important-questions")}
                className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 hover:border-indigo-500 transition-all cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-500/10 text-rose-500 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <HelpCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">Important Questions</h3>
                <p className="text-gray-500 dark:text-indigo-200/50 text-sm leading-relaxed mb-6">
                  Unit-wise curated lists of questions that are most likely to appear in your exams. Prepared by experts.
                </p>
                <div className="flex items-center text-rose-500 font-bold text-sm">
                  Start Practicing <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div
                onClick={() => go("/pyqs")}
                className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-indigo-100 dark:border-white/10 hover:border-blue-500 transition-all cursor-pointer"
              >
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 w-fit mb-6 group-hover:scale-110 transition-transform">
                  <FileText size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">Previous Year Papers</h3>
                <p className="text-gray-500 dark:text-indigo-200/50 text-sm leading-relaxed mb-6">
                  Solve actual RGPV papers from the last 5 years. Understand the pattern and time management.
                </p>
                <div className="flex items-center text-blue-500 font-bold text-sm">
                  Browse Papers <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </BlurFade>
        </section>

        {/* ================= FEATURED RECOMMENDATION ================= */}{" "}
        <section className="max-w-7xl mx-auto px-6 mb-28">
          <BlurFade inView>
            <div className="grid md:grid-cols-5 gap-8 items-stretch">
              <div className="md:col-span-3 relative rounded-[32px] bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-500/40 dark:to-purple-600/40 p-10 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-300/40 dark:bg-indigo-400/40 blur-[100px] pointer-events-none" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  <Flame size={32} className="mr-3 text-orange-500" /> Most Important Units
                </h3>
                <p className="mt-3 text-gray-600 dark:text-indigo-200 max-w-md">
                  Based on last 5 years of RGPV exams and student performance
                  trends.
                </p>
                <button
                  onClick={() => go("/notes")}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 rounded-xl font-semibold"
                >
                  View Now →
                </button>
              </div>
              <div className="md:col-span-2 flex flex-col gap-6">
                {[
                  { label: "Frequently repeated questions", icon: Star, color: "text-amber-500" },
                  { label: "Top downloaded notes", icon: TrendingUp, color: "text-blue-500" },
                ].map(({ label, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="rounded-2xl bg-white border border-gray-100 shadow-sm dark:bg-white/10 dark:border-white/20 p-6 hover:scale-105 transition text-gray-900 dark:text-white flex items-center"
                  >
                    <Icon size={18} className={`mr-2 ${color}`} /> {label}
                  </div>
                ))}
              </div>
            </div>
          </BlurFade>
        </section>




        {/* ================= MOST DOWNLOADED (FEATURED LAYOUT) ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <span className="text-sm font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">trending now</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              Most Downloaded Notes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl">
              Discover the most popular study materials shared by students across our platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNotes.slice(0, 3).map((n, idx) => (
              <div
                key={n._id}
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.03]"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.15}s both`,
                }}
              >
                {/* Gradient background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/40 dark:via-gray-900 dark:to-purple-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Border gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-500/20 dark:to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px]">
                  <div className="inset-0 rounded-2xl bg-white dark:bg-gray-900"></div>
                </div>

                {/* Content */}
                <div className="relative rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 h-full flex flex-col backdrop-blur-sm">
                  {/* Top badge */}
                  <div className="inline-flex w-fit mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 text-xs font-semibold">
                      <Flame size={14} /> #{idx + 1} Most Downloaded
                    </span>
                  </div>

                  {/* Subject with icon */}
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
                      <BookText size={18} className="text-indigo-600 dark:text-indigo-300" />
                    </span>
                    {n.subject}
                  </h3>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {n.branch}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {n.semester}
                    </span>
                    <span className="px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                      Unit {n.unit}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleNoteClick(n)}
                    className="mt-auto inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 group/btn"
                  >
                    <span>View Notes</span>
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        </section>

        {/* ================= RECENTLY UPLOADED (MASONRY LAYOUT) ================= */}
        <section className="max-w-7xl mx-auto px-6 py-28 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent dark:via-gray-900/20">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <span className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">latest uploads</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight">
              Recently Added
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNotes.slice(0, 6).map((n, idx) => {
              // Vary card heights for visual interest
              const heights = ['md:row-span-1', 'md:row-span-1', 'md:row-span-1', 'md:row-span-1', 'md:row-span-1', 'md:row-span-1'];

              return (
                <div
                  key={n._id}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
                  style={{
                    animation: `slideIn 0.5s ease-out ${idx * 0.08}s both`,
                  }}
                >
                  {/* Soft glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>

                  {/* Card */}
                  <div className="relative rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 p-6 h-full flex flex-col hover:border-blue-300/50 dark:hover:border-blue-400/30 transition-colors">
                    {/* Index number */}
                    <div className="text-5xl font-black text-gray-100 dark:text-gray-800 mb-2 leading-none">
                      {String(idx + 1).padStart(2, '0')}
                    </div>

                    {/* Subject */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 flex items-start gap-2">
                      <BookText size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>{n.subject}</span>
                    </h3>

                    {/* Metadata compact */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span>{n.branch}</span>
                      <span>·</span>
                      <span>{n.semester}</span>
                      <span>·</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{n.unit}</span>
                    </div>

                    {/* Small CTA */}
                    <button
                      onClick={() => handleNoteClick(n)}
                      className="mt-auto text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors group/link"
                    >
                      <span>Read</span>
                      <span className="transform group-hover/link:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
        </section>

        {/* ================= STUDENTS LIKE YOU (3-COLUMN SHOWCASE) ================= */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Study Paths for Every Student
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find your perfect study style and connect with students following similar paths
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STUDENTS_TYPE.map(([Icon, title, description, color], idx) => (
              <div
                key={title}
                className="group relative"
                style={{
                  animation: `popIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + idx * 0.12}s both`,
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 -z-10" style={{
                  backgroundImage: `linear-gradient(135deg, currentColor, currentColor)`,
                }}></div>

                {/* Card */}
                <div
                  onClick={() => {
                    const paths = {
                      "First Year": "/notes/firstyear",
                      "Mid Sem": "/branch",
                      "Final Year": "/pyqs"
                    };
                    go(paths[title] || "/branch");
                  }}
                  className="relative cursor-pointer rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-8 h-full flex flex-col backdrop-blur-sm hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-gray-900/50"
                >
                  {/* Icon container */}
                  <div className="inline-flex w-fit mb-6">
                    <div className={`p-4 rounded-2xl ${color.replace('text-', 'bg-').replace('500', '100').replace('600', '100').replace('-500', '-50')} dark:${color.replace('text-', 'bg-').replace('500', '950').replace('600', '950').replace('-500', '-900')}/20`}>
                      <Icon size={28} className={color} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                    {description}
                  </p>

                  {/* Footer link */}
                  <div className="flex items-center gap-2 text-sm font-semibold group/cta">
                    <span className={color}>Explore Path</span>
                    <span className={`${color} transform group-hover/cta:translate-x-1 transition-transform`}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <style>{`
          @keyframes popIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>
        </section>

        {/* ================= ROADMAP ================= */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <BlurFade inView>
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white flex items-center justify-center">
              What’s Coming Next <Rocket size={32} className="ml-3 text-indigo-500" />
            </h2>
          </BlurFade>

          <div className="grid md:grid-cols-4 gap-6">
            {ROADMAP.map(({ label, icon: Icon, color }, idx) => (
              <BlurFade
                key={label}
                delay={0.2 + idx * 0.1}
                inView
                className="h-full"
              >
                <div
                  className="rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-700 dark:bg-white/10 dark:border-white/20 dark:text-white p-6 text-center hover:scale-105 transition flex flex-col items-center justify-center gap-3 h-full"
                >
                  <Icon size={32} className={color} />
                  {label}
                </div>
              </BlurFade>
            ))}
          </div>
        </section>
        {/* ================= FINAL CTA ================= */}
        <section className="relative text-center py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-3xl" />
          <BlurFade inView>
            <div className="relative">
              <h2 className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
                Ready to study smarter?
              </h2>
              <p className="text-gray-600 dark:text-indigo-200 mb-10">
                Stop wasting time. Focus only on what matters.
              </p>
              <button
                onClick={() => go("/branch")}
                className="flex items-center mx-auto px-10 py-4 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 font-semibold shadow-xl hover:scale-105 transition"
              >
                Get Started <Rocket size={20} className="ml-2" />
              </button>
            </div>
          </BlurFade>
        </section>
      </main>

    </div>
  );
}

export default Home;
