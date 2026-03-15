import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Upload, FileText, BookOpen, GraduationCap, Layers, CheckCircle } from "lucide-react";
import Breadcrumbs from "../Common/Breadcrumbs";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const subjectMap = {
  CSE: {
    "Semester 1": ["BT-101", "BT-102", "BT-103", "BT-104", "BT-105", "BT-106", "BT-107", "BT-108"],
    "Semester 2": ["BT-201", "BT-202", "BT-203", "BT-204", "BT-205", "BT-206"],
    "Semester 3": ["ES-301", "CS-302", "CS-303", "CS-304", "CS-305", "CS-306", "CS-307", "CS-308"],
    "Semester 4": ["BT-401", "CS-402", "CS-403", "CS-404", "CS-405", "CS-406", "CS-407", "CS-408"],
    "Semester 5": ["CS-501", "CS-502", "CS-503(A)", "CS-503(B)", "CS-503(C)", "CS-504(A)", "CS-504(B)", "CS-504(C)", "CS-505", "CS-506", "CS-507", "CS-508"],
    "Semester 6": ["CS-601", "CS-602", "CS-603(A)", "CS-603(B)", "CS-603(C)", "CS-604(A)", "CS-604(B)", "CS-604(C)", "CS-605", "CS-606"],
    "Semester 7": ["CS-701", "CS-702(A)", "CS-702(B)", "CS-702(C)", "CS-702(D)", "CS-703(A)", "CS-703(B)", "CS-703(C)", "CS-703(D)"],
    "Semester 8": ["CS-801", "CS-802(A)", "CS-802(B)", "CS-802(C)", "CS-802(D)", "CS-803(A)", "CS-803(B)", "CS-803(C)", "CS-803(D)"],
  },
  CE: {
    "Semester 1": ["BT-101", "BT-102"],
    "Semester 2": ["BT-103"],
    "Semester 3": ["CE-301", "CE-302"],
    "Semester 4": ["CE-401", "CE-402"],
  },
};

const UploadPDF = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [progress, setProgress] = useState(0);

  const branches = ["CSE", "ECE", "ME", "CE", "EE"];
  const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];
  const units = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];

  const yearSemesterMap = {
    "First Year": ["Semester 1", "Semester 2"],
    "Second Year": ["Semester 3", "Semester 4"],
    "Third Year": ["Semester 5", "Semester 6"],
    "Fourth Year": ["Semester 7", "Semester 8"],
  };

  const availableSemesters = yearSemesterMap[year] || [];
  const availableSubjects =
    branch && semester ? subjectMap[branch]?.[semester] || [] : [];
  const [fileKey, setFileKey] = useState(Date.now());

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  let simulatedProgress = 0;
  let progressInterval;

  const handleUpload = async () => {
    if (
      !selectedFile ||
      branch.trim() === "" ||
      year.trim() === "" ||
      semester.trim() === "" ||
      subject.trim() === "" ||
      unit.trim() === ""
    ) {
      toast.error("⚠️ All fields are required!");
      return;
    }

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const formData = new FormData();
    formData.append("pdf", selectedFile);

    const queryParams = new URLSearchParams({
      branch,
      year,
      semester,
      subject,
      unit,
    }).toString();

    const toastId = toast.loading("⏳ Preparing upload...");

    progressInterval = setInterval(() => {
      simulatedProgress += 5;
      if (simulatedProgress <= 90) {
        setProgress(simulatedProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 200);

    try {
      await axios.post(
        `${API_BASE_URL}/api/upload/upload?${queryParams}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 30000,
        }
      );

      clearInterval(progressInterval);
      setProgress(100);

      toast.success("✅ Notes uploaded successfully!", {
        id: toastId,
        duration: 4000,
      });

      setTimeout(() => {
        setProgress(0);
        setSelectedFile(null);
        setFileKey(Date.now());
        setBranch("");
        setYear("");
        setSemester("");
        setSubject("");
        setUnit("");
      }, 2000);
    } catch (err) {
      clearInterval(progressInterval);
      setProgress(0);
      toast.error("❌ Upload failed. Please try again.", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 -left-40 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        <Breadcrumbs
          items={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "Upload Notes" }
          ]}
        />

        <motion.div {...fadeUp} className="mt-12 mb-16 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Upload Study Material
          </h1>
          <p className="text-gray-600 dark:text-indigo-200/70">
            Ensure the PDF follows the naming convention and select appropriate metadata.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[32px] shadow-xl p-8 backdrop-blur-xl mb-32"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* File Dropzone area */}
            <div className="relative group">
              <input
                key={fileKey}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className={`
                h-full min-h-[250px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 transition-all duration-300
                ${selectedFile 
                  ? "border-emerald-400 bg-emerald-50/30 dark:bg-emerald-500/5 shadow-inner" 
                  : "border-indigo-200 dark:border-white/10 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 bg-gray-50/50 dark:bg-transparent"}
              `}>
                <div className={`p-4 rounded-full mb-4 ${selectedFile ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20" : "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20"}`}>
                  {selectedFile ? <FileText size={32} /> : <Upload size={32} />}
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">
                  {selectedFile ? selectedFile.name : "Click or drag PDF to upload"}
                </h3>
                <p className="mt-2 text-xs text-gray-500 dark:text-indigo-200/50 text-center">
                  Maximum file size: 50MB
                </p>
              </div>
            </div>

            {/* Metadata Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <GraduationCap size={18} className="text-indigo-500" />
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm dark:text-white"
                >
                  <option value="">Select Branch</option>
                  {branches.map(b => <option key={b} value={b} className="bg-white dark:bg-gray-900">{b}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <Layers size={18} className="text-purple-500" />
                <select
                  value={year}
                  onChange={(e) => { setYear(e.target.value); setSemester(""); }}
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm dark:text-white"
                >
                  <option value="">Select Year</option>
                  {years.map(y => <option key={y} value={y} className="bg-white dark:bg-gray-900">{y}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-transparent border-0 focus:ring-0 text-sm dark:text-white"
                  >
                    <option value="">Semester</option>
                    {availableSemesters.map(s => <option key={s} value={s} className="bg-white dark:bg-gray-900">{s}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-transparent border-0 focus:ring-0 text-sm dark:text-white"
                  >
                    <option value="">Unit</option>
                    {units.map(u => <option key={u} value={u} className="bg-white dark:bg-gray-900">{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <BookOpen size={18} className="text-blue-500" />
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={availableSubjects.length === 0}
                  className="w-full bg-transparent border-0 focus:ring-0 text-sm dark:text-white disabled:opacity-50"
                >
                  <option value="">Select Subject Code</option>
                  {availableSubjects.map(code => <option key={code} value={code} className="bg-white dark:bg-gray-900">{code}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Progress and Upload Button */}
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
            {progress > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium dark:text-white flex items-center gap-2">
                    {progress < 100 ? <Upload size={14} className="animate-bounce" /> : <CheckCircle size={14} className="text-emerald-500" />}
                    {progress < 100 ? "Uploading..." : "Ready!"}
                  </span>
                  <span className="text-sm font-bold dark:text-white">{progress}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full bg-gradient-to-r ${progress < 70 ? 'from-indigo-500 to-purple-500' : 'from-emerald-400 to-teal-500'} transition-all`}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={progress > 0 && progress < 100}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 text-white font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Upload size={20} />
              Confirm Upload
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPDF;
