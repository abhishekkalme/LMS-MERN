import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Backurl = import.meta.env.VITE_API_BASE_URL;

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

    try {
      await axios.post(`${Backurl}/api/syllabus`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Syllabus added successfully!");
      setForm(resetForm);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logoutAndRedirect();
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

          toast.success("✅ Syllabus updated with new semester links!");
          setForm(resetForm);
        } catch (updateErr) {
          if (
            updateErr.response?.status === 401 ||
            updateErr.response?.status === 403
          ) {
            logoutAndRedirect();
          } else {
            toast.error("❌ Failed to update syllabus.");
          }
        }
      } else {
        toast.error("❌ Failed to add syllabus. Check your input.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          ➕ Add New Syllabus
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          {/* Department Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Department Name</label>
            <select
              name="name"
              value={form.name}
              onChange={(e) => {
                const selected = departments.find((d) => d.name === e.target.value);
                if (selected) {
                  setForm({ ...form, name: selected.name, code: selected.code });
                }
              }}
              required
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.code} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department Code */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Department Code</label>
            <input
              name="code"
              value={form.code}
              readOnly
              className="w-full px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Program */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Program</label>
            <select
              name="program"
              value={form.program}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>MCA</option>
              <option>MCA Dual Degree</option>
            </select>
          </div>

          {/* System Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">System Type</label>
            <select
              name="system"
              value={form.system}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <option>Semester</option>
              <option>Annual</option>
            </select>
          </div>

          {/* Grading System */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Grading System</label>
            <select
              name="grading"
              value={form.grading}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="">Select Grading</option>
              <option value="CBCS">CBCS</option>
              <option value="CBGS">CBGS</option>
              <option value="Non Grading System">Non Grading System</option>
              <option value="Grading">Grading</option>
            </select>
          </div>
        </form>

        {/* PDF Inputs */}
        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium mb-2">📎 PDF Links (Semesters 1–8)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {form.pdfs.map((link, index) => (
              <input
                key={index}
                type="url"
                placeholder={`Semester ${index + 1} PDF URL`}
                value={link}
                onChange={(e) => handlePDFChange(index, e.target.value)}
                className="px-4 py-2 rounded border bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
          >
            ➕ Add / Update Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSyllabus;
