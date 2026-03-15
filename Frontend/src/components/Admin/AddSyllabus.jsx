import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Link as LinkIcon, Briefcase, GraduationCap, Settings, BookOpen } from "lucide-react";
import Breadcrumbs from "../Common/Breadcrumbs";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const departments = [
  { name: "Computer Science", code: "CSE" },
  { name: "Information Technology", code: "IT" },
  { name: "Civil Engineering", code: "CE" },
  { name: "Electrical Engineering", code: "EE" },
  { name: "Electronics & Communication", code: "EC" },
];

const resetForm = {
  name: "",
  code: "",
  program: "B.Tech",
  grading: "Grading",
  system: "Semester",
  pdfs: Array(8).fill(""),
};

const AddSyllabus = () => {
  const [form, setForm] = useState(resetForm);
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
    setTimeout(() => {
      navigate("/login");
    }, 1800); 
  };
  

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (!token) return logoutAndRedirect();

      try {
        await axios.get(`${Backurl}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logoutAndRedirect();
        }
      }
    };

    checkTokenValidity();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDFChange = (index, value) => {
    const updatedPDFs = [...form.pdfs];
    updatedPDFs[index] = value;
    setForm({ ...form, pdfs: updatedPDFs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const pdfObject = form.pdfs.reduce((acc, url, i) => {
      if (url.trim()) acc[i + 1] = url;
      return acc;
    }, {});

    const payload = { ...form, pdfs: pdfObject };

    const tid = toast.loading("⏳ Saving syllabus...");

    try {
      await axios.post(`${Backurl}/api/syllabus`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Syllabus added successfully!", { id: tid });
      setForm(resetForm);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logoutAndRedirect();
        toast.dismiss(tid);
        return;
      }

      const isDuplicate =
        err.response?.status === 400 &&
        err.response.data?.error?.includes("Duplicate");

      if (isDuplicate) {
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

          const mergedPDFs = { ...existingEntry.pdfs };
          form.pdfs.forEach((link, i) => {
            if (link.trim()) mergedPDFs[i + 1] = link;
          });

          const updatePayload = { ...form, pdfs: mergedPDFs };

          await axios.put(
            `${Backurl}/api/syllabus/${existingEntry._id}`,
            updatePayload,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          toast.success("✅ Syllabus updated with new links!", { id: tid });
          setForm(resetForm);
        } catch (updateErr) {
          toast.error("❌ Failed to update.", { id: tid });
        }
      } else {
        toast.error("❌ Action failed.", { id: tid });
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 -left-40 w-[400px] h-[400px] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-8 relative z-10">
        <Breadcrumbs 
          items={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Add Syllabus" }
          ]} 
        />

        <motion.div {...fadeUp} className="mt-12 mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            New Syllabus Registration
          </h1>
          <p className="text-gray-600 dark:text-indigo-200/70">
            Fill in the department details and provide Cloudinary or external PDF links.
          </p>
        </motion.div>

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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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

            <div className="md:col-span-2 mt-8">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 text-white font-bold shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle size={20} />
                Add / Update Syllabus Entry
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddSyllabus;
