import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { XCircle, Hand, Notebook, Plus, FolderOpen, Users, ArrowRight, HelpCircle, FileText, LayoutDashboard, Settings } from "lucide-react";
import Breadcrumbs from "../Common/Breadcrumbs";
import AdminOverview from "./AdminOverview";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" or "actions"

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-20 text-red-500 text-lg font-semibold flex flex-col items-center justify-center">
        <XCircle size={48} className="mb-4 animate-pulse" />
        Access Denied: Admins only
      </div>
    );
  }

  const adminActions = [
    {
      to: "/admin/upload-notes",
      icon: Notebook,
      title: "Upload Notes",
      desc: "Add comprehensive unit-wise PDF notes for students.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      to: "/admin/syllabus-table",
      icon: FolderOpen,
      title: "Manage Syllabus",
      desc: "Review, edit, or remove existing syllabus records.",
      color: "from-amber-500 to-orange-500",
    },
    {
      to: "/admin/users",
      icon: Users,
      title: "User Roles",
      desc: "Manage user permissions and administrative roles.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      to: "/admin/important-questions",
      icon: HelpCircle,
      title: "Important Questions",
      desc: "Upload and manage unit-wise important question papers.",
      color: "from-rose-500 to-pink-500",
    },
    {
      to: "/admin/pyqs",
      icon: FileText,
      title: "PYQ Manager",
      desc: "Upload and manage Previous Year Papers for exam prep.",
      color: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 -left-40 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        <Breadcrumbs items={[{ label: "Admin Dashboard" }]} />

        <motion.div {...fadeUp} className="mt-12 mb-8">
          <span className="inline-flex items-center mb-4 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-300 text-xs font-medium">
            Administrative Control Panel
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            Welcome, Admin
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Hand size={40} className="text-amber-400" />
            </motion.span>
          </h1>
          <p className="mt-4 text-gray-600 dark:text-indigo-200 max-w-2xl">
            Manage your platform content and user base efficiently using the integrated tools below.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 p-1 bg-gray-100 dark:bg-white/5 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "overview"
                ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button
            onClick={() => setActiveTab("actions")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === "actions"
                ? "bg-white dark:bg-white/10 text-indigo-600 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
          >
            <Settings size={18} /> Management
          </button>
        </div>

        <div className="relative">
          {activeTab === "overview" ? (
            <AdminOverview />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminActions.map((action, idx) => (
                <motion.div
                  key={action.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    to={action.to}
                    className="group relative block p-8 rounded-3xl bg-white border border-gray-100 dark:bg-white/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity blur-2xl`} />

                    <div className="flex items-start justify-between">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}>
                        <action.icon size={24} />
                      </div>
                      <ArrowRight size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="mt-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {action.title}
                      </h2>
                      <p className="text-gray-600 dark:text-indigo-200/70 text-sm leading-relaxed">
                        {action.desc}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
