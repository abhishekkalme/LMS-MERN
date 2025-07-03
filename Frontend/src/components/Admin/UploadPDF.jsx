import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const subjectMap = {
  CSE: {
    "Semester 1": [
      "BT-101",
      "BT-102",
      "BT-103",
      "BT-104",
      "BT-105",
      "BT-106",
      "BT-107",
      "BT-108",
    ],
    "Semester 2": ["BT-201", "BT-202", "BT-203", "BT-204", "BT-205", "BT-206"],
    "Semester 3": [
      "ES-301",
      "CS-302",
      "CS-303",
      "CS-304",
      "CS-305",
      "CS-306",
      "CS-307",
      "CS-308",
    ],
    "Semester 4": [
      "BT-401",
      "CS-402",
      "CS-403",
      "CS-404",
      "CS-405",
      "CS-406",
      "CS-407",
      "CS-408",
    ],
    "Semester 5": [
      "CS-501",
      "CS-502",
      "CS-503(A)",
      "CS-503(B)",
      "CS-503(C)",
      "CS-504(A)",
      "CS-504(B)",
      "CS-504(C)",
      "CS-505",
      "CS-506",
      "CS-507",
      "CS-508",
    ],
    "Semester 6": [
      "CS-601",
      "CS-602",
      "CS-603(A)",
      "CS-603(B)",
      "CS-603(C)",
      "CS-604(A)",
      "CS-604(B)",
      "CS-604(C)",
      "CS-605",
      "CS-606",
    ],
    "Semester 7": [
      "CS-701",
      "CS-702(A)",
      "CS-702(B)",
      "CS-702(C)",
      "CS-702(D)",
      "CS-703(A)",
      "CS-703(B)",
      "CS-703(C)",
      "CS-703(D)",
    ],
    "Semester 8": [
      "CS-801",
      "CS-802(A)",
      "CS-802(B)",
      "CS-802(C)",
      "CS-802(D)",
      "CS-803(A)",
      "CS-803(B)",
      "CS-803(C)",
      "CS-803(D)",
    ],
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

    const toastId = toast.loading("⏳ Uploading...");

    progressInterval = setInterval(() => {
      simulatedProgress += 10;
      if (simulatedProgress <= 70) {
        setProgress(simulatedProgress);
      } else {
        clearInterval(progressInterval);
      }
    }, 300); 

    try {
      await axios.post(
        `${API_BASE_URL}/api/upload/upload?${queryParams}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 10000,
          onUploadProgress: () => {
          },
        }
      );

      clearInterval(progressInterval);
      setProgress(100); 

      toast.update(toastId, {
        render: "✅ Upload successful!",
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });

      // Reset state
      setTimeout(() => {
        setProgress(0);
        setSelectedFile(null);
        setFileKey(Date.now()); 

        setBranch("");
        setYear("");
        setSemester("");
        setSubject("");
        setUnit("");
      }, 1500);
    } catch (err) {
      console.error("Upload error:", err);
      toast.update(toastId, {
        render: "❌ Upload failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="upload-container mt-16 mb-32 max-w-md w-full mx-auto p-4 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload PDF</h2>

      <input
        key={fileKey} 
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded mb-4 bg-white dark:bg-gray-800"
      />

      <div className="mb-4">
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        >
          <option value="">Select Branch</option>
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setSemester("");
          }}
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        >
          <option value="">Select Semester</option>
          {availableSemesters.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          disabled={availableSubjects.length === 0}
        >
          <option value="">Select Subject Code</option>
          {availableSubjects.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
        >
          <option value="">Select Unit</option>
          {units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
      >
        Upload
      </button>

      {progress > 0 && (
        <div className="w-full mt-4">
          <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`
                h-full text-xs font-semibold flex items-center justify-center 
                transition-all duration-700 ease-in-out
                ${
                  progress < 30
                    ? "bg-red-500"
                    : progress < 70
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }
              `}
              style={{ width: `${progress}%` }}
            >
              <span className="text-white">{progress}%</span>
            </div>
          </div>
          <div className="mt-1 text-sm text-center text-gray-600 dark:text-gray-300">
            {progress < 100 ? "Uploading in progress..." : "Upload complete ✅"}
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UploadPDF;
