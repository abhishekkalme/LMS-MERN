import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Highlighter, Copy, Trash2, Save } from "lucide-react";
import { toast } from "react-hot-toast";

const HighlighterTool = ({ embedded = false }) => {
    const [text, setText] = useState(() => {
        return localStorage.getItem("highlighterText") || "";
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
             localStorage.setItem("highlighterText", text);
        }, 500); // Debounce save
        return () => clearTimeout(timeout);
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const handleClear = () => {
        if (window.confirm("Are you sure you want to clear your notes?")) {
             setText("");
             toast.success("Notes cleared!");
        }
    };
    
    // Simulate a manual save for user reassurance
    const handleSave = () => {
        localStorage.setItem("highlighterText", text);
        toast.success("Notes saved!");
    }

    const Container = embedded ? "div" : "div";
    const containerProps = embedded 
        ? { className: "w-full h-full" } 
        : { className: "min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center" };

    const MotionWrapper = embedded ? "div" : motion.div;
    const motionProps = embedded 
        ? { className: "w-full h-full flex flex-col" } 
        : { 
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800 flex flex-col h-[70vh]"
          };

    return (
        <Container {...containerProps}>
            <MotionWrapper {...motionProps}>
                <div className="flex items-center justify-between mb-6">
                    {!embedded && (
                        <div className="flex items-center">
                            <Highlighter className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-2" />
                            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Quick Notes</h1>
                        </div>
                    )}
                    <div className="flex space-x-2">
                        <button
                            onClick={handleSave}
                            className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                            title="Save"
                        >
                            <Save size={20} />
                        </button>
                        <button
                            onClick={handleCopy}
                            className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                            title="Copy to Clipboard"
                        >
                            <Copy size={20} />
                        </button>
                         <button
                            onClick={handleClear}
                            className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
                             title="Clear"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <textarea
                        className="w-full h-full p-4 rounded-xl bg-yellow-50 dark:bg-zinc-800/50 border border-yellow-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 dark:focus:ring-indigo-500/50 resize-none font-mono text-sm leading-relaxed"
                        placeholder="Paste text here or start typing to take efficient notes..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                 <div className="mt-2 text-xs text-gray-400 text-right">
                    {text.length} characters
                 </div>
            </MotionWrapper>
        </Container>
    );
};

export default HighlighterTool;
