import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { MessageSquare, Send, Trash2, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DiscussionSection = ({ courseId }) => {
    const { user, token } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";

    useEffect(() => {
        fetchComments();
    }, [courseId]);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/comments/${courseId}`);
            setComments(res.data);
        } catch (err) {
            console.error("Failed to fetch comments:", err);
        } finally {
            setLoading(false);
        }
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || !token) return;

        setIsPosting(true);
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/comments`,
                { courseId, text: newComment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setComments([res.data, ...comments]);
            setNewComment("");
        } catch (err) {
            console.error("Failed to post comment:", err);
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeleteComment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this comment?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/comments/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setComments(comments.filter((c) => c._id !== id));
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    return (
        <div className="mt-16 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[32px] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <MessageSquare size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold dark:text-white">Discussion</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ask questions or share thoughts about this course.</p>
                </div>
            </div>

            {/* Post Comment */}
            {user ? (
                <form onSubmit={handlePostComment} className="mb-10">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0 flex items-center justify-center overflow-hidden">
                            {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : <User className="text-white w-5 h-5" />}
                        </div>
                        <div className="flex-1 relative">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="What's on your mind?"
                                className="w-full bg-gray-50 dark:bg-white/5 border border-transparent focus:border-indigo-500 rounded-2xl p-4 text-sm outline-none transition-all dark:text-white min-h-[100px] resize-none"
                            />
                            <button
                                type="submit"
                                disabled={isPosting || !newComment.trim()}
                                className="absolute bottom-3 right-3 p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-10 p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30 text-center">
                    <p className="text-indigo-700 dark:text-indigo-300 font-medium">Please login to participate in the discussion.</p>
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                <AnimatePresence>
                    {loading ? (
                        <div className="text-center py-10 text-gray-400 italic">Loading comments...</div>
                    ) : comments.length > 0 ? (
                        comments.map((comment) => (
                            <motion.div
                                key={comment._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group flex gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                    {comment.userId?.avatar ? <img src={comment.userId.avatar} alt="" className="w-full h-full object-cover" /> : <User className="text-gray-400 w-5 h-5" />}
                                </div>
                                <div className="flex-1 bg-gray-50 dark:bg-white/5 rounded-2xl p-4 transition-colors group-hover:bg-gray-100 dark:group-hover:bg-white/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold dark:text-white capitalize">{comment.userId?.name || "Anonymous"}</span>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{comment.text}</p>

                                    {(user?.id === comment.userId?._id || user?.role === "admin") && (
                                        <div className="mt-3 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleDeleteComment(comment._id)}
                                                className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500 dark:text-gray-400 italic">No comments yet. Be the first to start the conversation!</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DiscussionSection;
