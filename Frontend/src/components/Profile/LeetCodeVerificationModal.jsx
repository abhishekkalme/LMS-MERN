import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiArrowLeftLine, RiExternalLinkLine } from "react-icons/ri";
import { FaCheckCircle, FaRegCopy, FaClipboardCheck } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import axios from "axios";
import toast from "react-hot-toast";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const LeetCodeVerificationModal = ({ isOpen, onClose, username, onVerified }) => {
    const [step, setStep] = useState(0); // 0: Intro, 1: Step 1, 2: Step 2, 3: Step 3
    const [verificationCode, setVerificationCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const fetchCode = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${Backurl}/api/auth/platform/leetcode/verify-code`, {
                headers: { "Authorization": token }
            });
            setVerificationCode(res.data.verificationCode);
        } catch (err) {
            toast.error("Failed to generate verification code");
            onClose();
        }
    };

    const handleVerify = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${Backurl}/api/auth/platform/leetcode/verify`,
                { username },
                { headers: { "Authorization": token } }
            );
            toast.success(res.data.message);
            onVerified(res.data.user);
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Verification failed. Please check your ReadMe.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(verificationCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success("Code copied!");
    };

    useEffect(() => {
        if (isOpen && step === 0) {
            fetchCode();
        }
    }, [isOpen, step]);

    if (!isOpen) return null;

    const steps = [
        {
            title: "Verify your LeetCode profile",
            description: "This helps us confirm that the LeetCode profile belongs to you and allows us to show your verified stats on Codolio.",
            footer: (
                <button
                    onClick={() => setStep(1)}
                    className="w-full py-4 bg-[#F8810A] hover:bg-[#E07208] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                >
                    Start Verification
                </button>
            ),
            content: (
                <div className="space-y-6">
                    <div className="text-center text-gray-500 flex items-center justify-center gap-2">
                        <span>⏱️</span> Takes less than 30 seconds
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 dark:text-white">What you'll need:</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <FaCheckCircle className="text-blue-500" />
                            <span>Access to your LeetCode profile</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <FaCheckCircle className="text-blue-500" />
                            <span>Ability to edit your profile ReadMe section</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Open your LeetCode profile",
            description: "Go to the following page while logged in to LeetCode:",
            footer: (
                <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-[#F8810A] hover:bg-[#E07208] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                >
                    Continue
                </button>
            ),
            content: (
                <div className="space-y-6">
                    <a
                        href="https://leetcode.com/settings/profile/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#F8810A] text-white rounded-xl font-bold hover:brightness-110 transition-all"
                    >
                        Open LeetCode Settings <RiExternalLinkLine />
                    </a>
                    <div className="text-center">
                        <a href="https://leetcode.com/settings/profile/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm break-all">
                            https://leetcode.com/settings/profile/
                        </a>
                    </div>
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        This is where you can edit your profile ReadMe section.
                    </p>
                </div>
            )
        },
        {
            title: "Paste the verification code in your ReadMe",
            description: "Edit the ReadMe section and paste the following code exactly as shown:",
            footer: (
                <button
                    onClick={() => setStep(3)}
                    className="w-full py-4 bg-[#F8810A] hover:bg-[#E07208] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95"
                >
                    I've pasted the code
                </button>
            ),
            content: (
                <div className="space-y-6">
                    <div className="relative group">
                        <input
                            readOnly
                            value={verificationCode}
                            className="w-full py-3 px-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl font-mono text-center text-xl tracking-widest text-[#F8810A]"
                        />
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#F8810A] transition-colors"
                        >
                            {copied ? <FaClipboardCheck className="text-green-500" /> : <FaRegCopy />}
                        </button>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        This code helps us confirm profile ownership. You can paste this code anywhere in your ReadMe.
                    </p>
                </div>
            )
        },
        {
            title: "Save your changes and verify",
            description: "Make sure you have saved your profile after adding the verification code.",
            footer: (
                <button
                    disabled={loading}
                    onClick={handleVerify}
                    className="w-full py-4 bg-[#F8810A] hover:bg-[#E07208] text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify LeetCode Profile"}
                </button>
            ),
            content: (
                <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">Once done, click verify below.</p>
                </div>
            )
        }
    ];

    const currentStep = steps[step];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-zinc-800"
                >
                    {/* Header */}
                    <div className="px-8 pt-8 flex justify-between items-center bg-white dark:bg-zinc-900">
                        {step > 0 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium"
                            >
                                <RiArrowLeftLine /> Back
                            </button>
                        )}
                        {step > 0 && <div className="flex-1 text-center text-sm font-black text-[#F8810A]">Step {step} <span className="text-gray-300">/ 3</span></div>}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-400"
                        >
                            <RiCloseLine size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 p-8 pt-6">
                        <h3 className="text-2xl font-black text-center text-gray-900 dark:text-white mb-6 leading-tight">
                            {currentStep.title}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 text-center mb-10 leading-relaxed font-medium">
                            {currentStep.description}
                        </p>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {currentStep.content}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="px-8 pb-8">
                        {currentStep.footer}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LeetCodeVerificationModal;
