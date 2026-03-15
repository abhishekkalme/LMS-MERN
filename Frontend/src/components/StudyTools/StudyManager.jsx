import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Highlighter as HighlighterIcon } from "lucide-react";
import Planner from "./Planner";
import HighlighterTool from "./Highlighter";
import { useSearchParams, useNavigate } from "react-router-dom";

const StudyManager = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get initial tab from URL or default to 'planner'
  const initialTab = searchParams.get("tab") === "highlighter" ? "highlighter" : "planner";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Sync state with URL
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab !== activeTab) {
       // if URL changes (e.g. back button), update state
       if (currentTab === "planner" || currentTab === "highlighter") {
           setActiveTab(currentTab);
       } else {
           // if no tab in URL, set default
           setSearchParams({ tab: activeTab }, { replace: true });
       }
    }
  }, [searchParams, activeTab, setSearchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        <div className="mb-8 text-center">
             <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 mb-2">
                Study Tools
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your tasks and quick notes in one place.</p>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-zinc-900 p-1.5 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 flex space-x-2">
                <button
                    onClick={() => handleTabChange("planner")}
                    className={`relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center ${
                        activeTab === "planner" 
                            ? "text-indigo-600 dark:text-white shadow-sm" 
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                    {activeTab === "planner" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-indigo-50 dark:bg-zinc-800 rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center">
                        <Layout size={16} className="mr-2" /> Planner
                    </span>
                </button>

                <button
                    onClick={() => handleTabChange("highlighter")}
                    className={`relative px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center ${
                        activeTab === "highlighter" 
                            ? "text-purple-600 dark:text-white shadow-sm" 
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                    {activeTab === "highlighter" && (
                        <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-purple-50 dark:bg-zinc-800 rounded-xl"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                     <span className="relative z-10 flex items-center">
                        <HighlighterIcon size={16} className="mr-2" /> Notes
                    </span>
                </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-1 md:p-2 border border-white/20 dark:border-white/5 shadow-2xl shadow-indigo-500/10">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full"
                >
                    {activeTab === "planner" ? (
                        <Planner embedded={true} />
                    ) : (
                        <HighlighterTool embedded={true} />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};

export default StudyManager;
