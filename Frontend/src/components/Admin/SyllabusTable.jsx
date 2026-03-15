import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2, Edit3, Save, X, Search, RefreshCw, FileText } from "lucide-react";
import Breadcrumbs from "../Common/Breadcrumbs";
import toast from "react-hot-toast";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const SyllabusTable = () => {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchEntries = async () => {
    const tid = toast.loading("Fetching syllabus data...");
    try {
      const res = await axios.get(`${Backurl}/api/syllabus`);
      setEntries(res.data);
      toast.success("Data loaded!", { id: tid });
    } catch (err) {
      toast.error("Failed to fetch data", { id: tid });
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditForm({ ...entry });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const tid = toast.loading("Saving changes...");
    try {
      const token = localStorage.getItem("token");

      const cleanedPDFs = {};
      Object.entries(editForm.pdfs).forEach(([sem, url]) => {
        if (url.trim()) cleanedPDFs[sem] = url;
      });

      const updatedForm = { ...editForm, pdfs: cleanedPDFs };

      await axios.put(`${Backurl}/api/syllabus/${editingId}`, updatedForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEditingId(null);
      fetchEntries();
      toast.success("Updated successfully", { id: tid });
    } catch (err) {
      toast.error("Update failed", { id: tid });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    const tid = toast.loading("Deleting...");
    try {
      const token = localStorage.getItem("token");
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
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${Backurl}/api/syllabus/cleanup/duplicates`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message, { id: tid });
      fetchEntries();
    } catch (err) {
      toast.error("Cleanup failed", { id: tid });
    }
  };

  const filteredEntries = entries.filter(e => 
    e.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen">
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
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Manage Syllabus</h1>
            <p className="text-gray-600 dark:text-indigo-200/70">Edit or remove course syllabus records.</p>
          </div>
          <button
            onClick={handleCleanupDuplicates}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
          >
            <RefreshCw size={16} /> Cleanup Duplicates
          </button>
        </motion.div>

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
                {filteredEntries.map((entry) => {
                  const isEditing = editingId === entry._id;
                  return (
                    <motion.tr 
                      key={entry._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50/30 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input name="code" value={editForm.code} onChange={handleChange} className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm dark:text-white" />
                        ) : <span className="text-sm font-bold dark:text-white">{entry.code}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input name="name" value={editForm.name} onChange={handleChange} className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm dark:text-white" />
                        ) : <span className="text-sm text-gray-600 dark:text-indigo-200/80">{entry.name}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input name="program" value={editForm.program} onChange={handleChange} className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm dark:text-white" />
                        ) : <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold">{entry.program}</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {[...Array(8)].map((_, i) => (
                            <div key={i}>
                              {isEditing ? (
                                <input
                                  type="text"
                                  placeholder={`S${i+1}`}
                                  value={editForm.pdfs?.[i + 1] || ""}
                                  onChange={(e) => {
                                    const updated = { ...editForm.pdfs, [i + 1]: e.target.value };
                                    setEditForm({ ...editForm, pdfs: updated });
                                  }}
                                  className="w-10 px-1 py-0.5 text-[10px] bg-white dark:bg-gray-800 border rounded"
                                />
                              ) : entry.pdfs?.[i + 1] ? (
                                <a
                                  href={entry.pdfs[i + 1]}
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
                          {isEditing ? (
                            <>
                              <button onClick={handleSave} className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition-all"><Save size={18} /></button>
                              <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"><X size={18} /></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEdit(entry)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all"><Edit3 size={18} /></button>
                              <button onClick={() => handleDelete(entry._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SyllabusTable;
