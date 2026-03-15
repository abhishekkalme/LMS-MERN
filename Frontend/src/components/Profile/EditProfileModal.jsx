import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine, RiSave3Line } from "react-icons/ri";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { toast } from "react-hot-toast";
import axios from "axios";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const EditProfileModal = ({ isOpen, onClose, currentUser, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    username: currentUser?.username || "",
    bio: currentUser?.bio || "",
    avatar: currentUser?.avatar || "",
    isPublic: currentUser?.isPublic || false,
    privacySettings: {
      github: currentUser?.privacySettings?.github ?? true,
      leetcode: currentUser?.privacySettings?.leetcode ?? true,
      codeforces: currentUser?.privacySettings?.codeforces ?? true,
      heatmap: currentUser?.privacySettings?.heatmap ?? true,
      socials: currentUser?.privacySettings?.socials ?? true,
      academic: currentUser?.privacySettings?.academic ?? true,
      customSections: currentUser?.privacySettings?.customSections ?? true,
    },
    academic: {
      semester: currentUser?.academic?.semester || 1,
      cgpa: currentUser?.academic?.cgpa || 0,
      enrollmentNo: currentUser?.academic?.enrollmentNo || "",
      college: currentUser?.academic?.college || "",
      branch: currentUser?.academic?.branch || "",
      resumeUrl: currentUser?.academic?.resumeUrl || "",
    },
    socialProfiles: {
      linkedin: currentUser?.socialProfiles?.linkedin || "",
      twitter: currentUser?.socialProfiles?.twitter || "",
      instagram: currentUser?.socialProfiles?.instagram || "",
      website: currentUser?.socialProfiles?.website || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["name", "bio", "avatar", "username"].includes(name)) {
      setFormData({ ...formData, [name]: value });
    } else if (name === "isPublic") {
      setFormData({ ...formData, [name]: checked });
    } else if (name.startsWith("privacy_")) {
        const settingName = name.replace("privacy_", "");
        setFormData({
            ...formData,
            privacySettings: { ...formData.privacySettings, [settingName]: checked }
        });
    } else if (name.startsWith("academic_")) {
        const fieldName = name.replace("academic_", "");
        setFormData({
            ...formData,
            academic: { ...formData.academic, [fieldName]: value }
        });
    } else {
      setFormData({
        ...formData,
        socialProfiles: { ...formData.socialProfiles, [name]: value },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const token = localStorage.getItem("token");
        const response = await axios.put(`${Backurl}/api/auth/update-profile`, formData, {
            headers: {
                "Authorization": token
            },
            withCredentials: true
        });

        if (response.status === 200) {
            toast.success("Profile updated successfully!");
            onUpdate(response.data.user);
            onClose();
        } else {
            toast.error(response.data.message || "Failed to update profile");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        const msg = error.response?.data?.message || "An error occurred. Please try again.";
        toast.error(msg);
    } finally {
        setLoading(false);
    }
  };

  const socialInputs = [
    { name: "linkedin", label: "LinkedIn URL", icon: <FaLinkedin />, placeholder: "https://linkedin.com/in/username" },
    { name: "twitter", label: "Twitter URL", icon: <FaTwitter />, placeholder: "https://twitter.com/username" },
    { name: "instagram", label: "Instagram URL", icon: <FaInstagram />, placeholder: "https://instagram.com/username" },
    { name: "website", label: "Website / Portfolio", icon: <FaGlobe />, placeholder: "https://yourwebsite.com" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center bg-gray-50 dark:bg-zinc-900/50">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors text-gray-500 dark:text-gray-400"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700">
              <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                       Username
                       {currentUser?.usernameChanged && <span className="text-[10px] ml-2 text-amber-500 font-normal">(Cannot change again)</span>}
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      disabled={currentUser?.usernameChanged}
                      placeholder="username"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                   <textarea
                     name="bio"
                     value={formData.bio}
                     onChange={handleChange}
                     rows="2"
                     maxLength={200}
                     placeholder="Tell us about yourself..."
                     className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                   />
                </div>

                <div>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        Make Profile Public
                    </span>
                  </label>
                  <p className="text-[11px] text-gray-500 mt-1 ml-8">Allows anyone with the link to view your developer profile at /u/{formData.username}</p>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 pt-6">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Privacy Settings</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "github", label: "Show GitHub" },
                      { id: "leetcode", label: "Show LeetCode" },
                      { id: "codeforces", label: "Show Codeforces" },
                      { id: "heatmap", label: "Show Heatmap" },
                      { id: "socials", label: "Show Socials" },
                      { id: "academic", label: "Show Academic" },
                      { id: "customSections", label: "Show Custom Blocks" }
                    ].map(setting => (
                      <label key={setting.id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          name={`privacy_${setting.id}`}
                          checked={formData.privacySettings[setting.id]}
                          onChange={handleChange}
                          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                          {setting.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Avatar URL</label>
                  <input
                    type="url"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 pt-6">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Academic & Career Info</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">College/University</label>
                        <input type="text" name="academic_college" value={formData.academic.college} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Branch/Branch</label>
                        <input type="text" name="academic_branch" value={formData.academic.branch} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Current Semester</label>
                        <input type="number" name="academic_semester" value={formData.academic.semester} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm" />
                     </div>
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">CGPA</label>
                        <input type="number" step="0.1" name="academic_cgpa" value={formData.academic.cgpa} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm" />
                     </div>
                     <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-500 mb-1">Resume Link (Drive/Portfolio)</label>
                        <input type="url" name="academic_resumeUrl" value={formData.academic.resumeUrl} onChange={handleChange} className="w-full px-3 py-2 rounded-lg border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-sm" placeholder="https://..." />
                     </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-zinc-800 pt-6">
                  <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Social & Coding Profiles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialInputs.map((input) => (
                      <div key={input.name}>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                           {input.icon} {input.label}
                        </label>
                        <input
                          type="url"
                          name={input.name}
                          value={formData.socialProfiles[input.name]}
                          onChange={handleChange}
                          placeholder={input.placeholder}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-zinc-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="edit-profile-form"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        <RiSave3Line size={18} />
                        Save Changes
                    </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
