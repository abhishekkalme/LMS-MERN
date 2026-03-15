import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  Trash2, Edit3, Save, X, Search, RefreshCw, FileText, 
  PlusCircle, BookOpen, GraduationCap, Settings, Link as LinkIcon, Briefcase 
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Common/Breadcrumbs";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const departments = [
  { name: "Computer Science and Engineering", code: "CS" },
  { name: "Information Technology", code: "IT" },
  { name: "Civil Engineering", code: "CE" },
  { name: "Electrical Engineering", code: "EE" },
  { name: "Electronics & Communication", code: "EC" },
  { name: "Mechanical Engineering", code: "ME" },
];

const resetForm = {
  name: "",
  code: "",
  program: "B.Tech",
  grading: "Grading",
  system: "Semester",
  pdfs: Array(8).fill(""),
};

const SyllabusManager = () => {
  const navigate = useNavigate();
  // View state: 'list' or 'form'
  const [view, setView] = useState("list");
  
  // List state
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form/Edit state
  const [form, setForm] = useState(resetForm);
  const [editingId, setEditingId] = useState(null); // If null, we are adding new. If set, we are editing.

  // --- Auth Helper ---
  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
    setTimeout(() => {
      navigate("/login");
    }, 1800); 
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logoutAndRedirect();
      return null;
    }
    return token;
  };

  // --- Data Fetching ---
  const fetchEntries = async () => {
    const tid = toast.loading("Fetching syllabus data...");
    try {
      const res = await axios.get(`${Backurl}/api/syllabus`);
      setEntries(res.data);
      toast.success("Data loaded!", { id: tid });
    } catch (err) {
      toast.error("Failed to fetch data", { id: tid });
      if (err.response?.status === 401) logoutAndRedirect();
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // --- Handlers ---
  const handleSwitchToadd = () => {
    setEditingId(null);
    setForm(resetForm);
    setView("form");
  };

  const handleEditClick = (entry) => {
    setEditingId(entry._id);
    
    // Map pdfs object to array for the form
    const pdfsArray = Array(8).fill("");
    if (entry.pdfs) {
        Object.keys(entry.pdfs).forEach(key => {
            pdfsArray[key - 1] = entry.pdfs[key];
        });
    }

    setForm({
      ...entry,
      pdfs: pdfsArray,
    });
    setView("form");
  };

  const handleBackToList = () => {
    setView("list");
    setEditingId(null);
    setForm(resetForm);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDFChange = (index, value) => {
    const updatedPDFs = [...form.pdfs];
    updatedPDFs[index] = value;
    setForm({ ...form, pdfs: updatedPDFs });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    const tid = toast.loading("Deleting...");
    const token = checkToken();
    if (!token) return;

    try {
      await axios.delete(`${Backurl}/api/syllabus/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEntries();
      toast.success("Deleted", { id: tid });
    } catch (err) {
      toast.error("Delete failed", { id: tid });
    }
  };

  const handleCleanupDuplicates = async () => {
    const confirm = window.confirm("⚠️ Remove all duplicate syllabus entries?");
    if (!confirm) return;

    const tid = toast.loading("Cleaning up...");
    const token = checkToken();
    if (!token) return;

    try {
      const res = await axios.delete(`${Backurl}/api/syllabus/cleanup/duplicates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message, { id: tid });
      fetchEntries();
    } catch (err) {
      toast.error("Cleanup failed", { id: tid });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = checkToken();
    if (!token) return;

    const pdfObject = {};
    form.pdfs.forEach((url, i) => {
        if (url && url.trim()) pdfObject[i + 1] = url.trim();
    });

    const payload = { ...form, pdfs: pdfObject };
    const tid = toast.loading(editingId ? "Updating..." : "Saving...");

    try {
      if (editingId) {
        // Update existing
        await axios.put(`${Backurl}/api/syllabus/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Updated successfully", { id: tid });
      } else {
        // Create new
        await axios.post(`${Backurl}/api/syllabus`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Created successfully", { id: tid });
      }
      handleBackToList();
      fetchEntries();
    } catch (err) {
       // Duplicate handling logic from AddSyllabus
       if (!editingId && err.response?.status === 400 && err.response.data?.error?.includes("Duplicate")) {
            // Try to merge if duplicate
             try {
                const { data } = await axios.get(`${Backurl}/api/syllabus`, {
                    params: {
                    code: form.code,
                    program: form.program,
                    grading: form.grading,
                    system: form.system,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                });

                const existingEntry = data[0];
                if (!existingEntry?._id) throw new Error("Syllabus not found.");

                const mergedPDFs = { ...existingEntry.pdfs, ...pdfObject };
                const updatePayload = { ...form, pdfs: mergedPDFs };

                await axios.put(
                    `${Backurl}/api/syllabus/${existingEntry._id}`,
                    updatePayload,
                    {
                    headers: { Authorization: `Bearer ${token}` },
                    }
                );

                toast.success("Merged with existing entry!", { id: tid });
                handleBackToList();
                fetchEntries();
                return;
            } catch (mergeErr) {
                console.error(mergeErr);
            }
       }
       toast.error("Operation failed", { id: tid });
    }
  };

  const filteredEntries = entries.filter(e => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
       {/* Blobs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 -left-40 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Breadcrumbs 
          items={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Manage Syllabus" }
          ]} 
        />

        <motion.div {...fadeUp} className="mt-12 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                {view === 'list' ? "Manage Syllabus" : (editingId ? "Edit Syllabus" : "Add Syllabus")}
            </h1>
            <p className="text-gray-600 dark:text-indigo-200/70">
                {view === 'list' ? "View, edit, or remove course syllabus records." : "Enter syllabus details and links."}
            </p>
          </div>
          
          <div className="flex gap-3">
            {view === 'list' ? (
                <>
                    <button
                        onClick={handleCleanupDuplicates}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                    >
                        <RefreshCw size={16} /> Cleanup
                    </button>
                    <button
                        onClick={handleSwitchToadd}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all text-sm font-bold shadow-lg shadow-indigo-500/20"
                    >
                        <PlusCircle size={16} /> Add New
                    </button>
                </>
            ) : (
                <button
                    onClick={handleBackToList}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-all text-sm font-bold"
                >
                    Back to List
                </button>
            )}
          </div>
        </motion.div>

        {view === 'list' ? (
             /* TABLE VIEW */
            <>
                {/* Search Bar */}
                <div className="relative mb-8 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                />
                </div>

                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[32px] overflow-hidden shadow-xl backdrop-blur-xl"
                >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Code</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Name</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Program</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Semesters</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {filteredEntries.map((entry) => (
                            <motion.tr 
                            key={entry._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="hover:bg-gray-50/30 dark:hover:bg-white/[0.02] transition-colors"
                            >
                            <td className="px-6 py-4">
                                <span className="text-sm font-bold dark:text-white">{entry.code}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-sm text-gray-600 dark:text-indigo-200/80">{entry.name}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold">{entry.program}</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-1 flex-wrap">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i}>
                                    {entry.pdfs?.[i + 1] ? (
                                        <a
                                        href={entry.pdfs?.[i + 1]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-6 h-6 flex items-center justify-center rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
                                        title={`Sem ${i+1}`}
                                        >
                                        <FileText size={12} />
                                        </a>
                                    ) : (
                                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-50 dark:bg-white/5 text-gray-300 dark:text-gray-600">
                                        <span className="text-[10px]">{i+1}</span>
                                        </div>
                                    )}
                                    </div>
                                ))}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                <button onClick={() => handleEditClick(entry)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"><Edit3 size={18} /></button>
                                <button onClick={() => handleDelete(entry._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18} /></button>
                                </div>
                            </td>
                            </motion.tr>
                        ))}
                        {filteredEntries.length === 0 && (
                             <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    No syllabus entries found.
                                </td>
                             </tr>
                        )}
                    </tbody>
                    </table>
                </div>
                </motion.div>
            </>
        ) : (
            /* FORM VIEW */
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[32px] shadow-xl p-8 backdrop-blur-xl mb-32"
            >
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Briefcase size={16} /> Department Name
                    </label>
                    <div className="relative">
                        <select
                        name="name"
                        value={form.name}
                        onChange={(e) => {
                            const selected = departments.find((d) => d.name === e.target.value);
                            if (selected) setForm({ ...form, name: selected.name, code: selected.code });
                            else handleFormChange(e); // Allow custom if needed, or strict?
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50/50 dark:bg-gray-900 dark:border-white/10 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                        >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.code} value={dept.name}>{dept.name}</option>
                        ))}
                        </select>
                    </div>
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Code</label>
                    <input
                        name="code"
                        value={form.code}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border bg-gray-200/50 dark:bg-gray-800 dark:border-white/5 dark:text-gray-400 cursor-not-allowed"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <GraduationCap size={16} /> Program
                    </label>
                    <select
                        name="program"
                        value={form.program}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50/50 dark:bg-gray-900 dark:border-white/10 dark:text-white"
                    >
                        {["B.Tech", "M.Tech", "MCA", "MCA Dual Degree"].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <Settings size={16} /> System Type
                    </label>
                    <select
                        name="system"
                        value={form.system}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50/50 dark:bg-gray-900 dark:border-white/10 dark:text-white"
                    >
                        <option>Semester</option>
                        <option>Annual</option>
                    </select>
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <BookOpen size={16} /> Grading System
                    </label>
                    <select
                        name="grading"
                        value={form.grading}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 rounded-xl border bg-gray-50/50 dark:bg-gray-900 dark:border-white/10 dark:text-white"
                    >
                        {["CBCS", "CBGS", "Non Grading System", "Grading"].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    </div>
                </div>

                <div className="md:col-span-2 mt-6">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-4">
                    <LinkIcon size={16} /> PDF Semester Links
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {form.pdfs.map((link, index) => (
                        <div key={index} className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Sem {index + 1}</span>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={link}
                            onChange={(e) => handlePDFChange(index, e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border text-sm bg-gray-50/50 dark:bg-gray-900/50 dark:border-white/10 dark:text-white focus:ring-1 focus:ring-indigo-500"
                        />
                        </div>
                    ))}
                    </div>
                </div>

                <div className="md:col-span-2 mt-8 flex gap-4">
                     <button
                        type="button"
                        onClick={handleBackToList}
                        className="w-1/3 py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-white font-bold transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-2/3 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 text-white font-bold shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        {editingId ? "Update Syllabus Entry" : "Save Syllabus Entry"}
                    </button>
                </div>
                </form>
            </motion.div>
        )}

      </div>
    </div>
  );
};

export default SyllabusManager;
