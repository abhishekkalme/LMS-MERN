import React, { useEffect, useState } from "react";
import axios from "axios";
const Backurl = import.meta.env.VITE_API_BASE_URL;

const SyllabusTable = () => {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchEntries = async () => {
    const res = await axios.get(`${Backurl}/api/syllabus`);
    setEntries(res.data);
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
    try {
      const token = localStorage.getItem("token");

      const cleanedPDFs = {};
      Object.entries(editForm.pdfs).forEach(([sem, url]) => {
        if (url.trim()) cleanedPDFs[sem] = url;
      });

      const updatedForm = { ...editForm, pdfs: cleanedPDFs };

      await axios.put(`${Backurl}/api/syllabus/${editingId}`, updatedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEditingId(null);
      fetchEntries();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Upload failed: Unauthorized or server error.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${Backurl}/api/syllabus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchEntries();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed: Unauthorized or server error.");
    }
  };

  const handleCleanupDuplicates = async () => {
    const confirm = window.confirm(
      "⚠️ Are you sure you want to remove all duplicate syllabus entries?"
    );
    if (!confirm) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(
        `${Backurl}/api/syllabus/cleanup/duplicates`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      fetchEntries();
    } catch (err) {
      console.error("Cleanup failed:", err);
      alert("❌ Failed to clean duplicates. Check admin access or server.");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleCleanupDuplicates}
            className="bg-red-600 text-white px-4 py-1 text-sm rounded hover:bg-red-700 transition"
          >
            🧹 Remove Duplicates
          </button>
        </div>
        <h2 className="text-xl font-bold mb-6">All Syllabus Entries</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-2 py-2 border">Code</th>
                <th className="px-2 py-2 border">Name</th>
                <th className="px-2 py-2 border">Program</th>
                <th className="px-2 py-2 border">System</th>
                <th className="px-2 py-2 border">Grading</th>
                {[...Array(8)].map((_, i) => (
                  <th key={i} className="px-2 py-2 border text-xs">
                    Sem {i + 1}
                  </th>
                ))}
                <th className="px-2 py-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {entries.map((entry) => {
                const isEditing = editingId === entry._id;

                return (
                  <tr key={entry._id}>
                    {/* Editable cells */}
                    {isEditing ? (
                      <>
                        <td className="border p-1">
                          <input
                            name="code"
                            value={editForm.code}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </td>
                        <td className="border p-1">
                          <input
                            name="name"
                            value={editForm.name}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </td>
                        <td className="border p-1">
                          <input
                            name="program"
                            value={editForm.program}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </td>
                        <td className="border p-1">
                          <input
                            name="system"
                            value={editForm.system}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </td>
                        <td className="border p-1">
                          <input
                            name="grading"
                            value={editForm.grading}
                            onChange={handleChange}
                            className="w-full"
                          />
                        </td>
                        {[...Array(8)].map((_, i) => (
                          <td key={i} className="border p-1">
                            <input
                              type="text"
                              placeholder={`Sem ${i + 1}`}
                              value={editForm.pdfs?.[i + 1] || ""}
                              onChange={(e) => {
                                const updated = {
                                  ...editForm.pdfs,
                                  [i + 1]: e.target.value,
                                };
                                setEditForm({ ...editForm, pdfs: updated });
                              }}
                              className="w-full text-xs"
                            />
                          </td>
                        ))}
                        <td className="border p-1 space-x-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-2 py-1 text-xs rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 text-white px-2 py-1 text-xs rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border px-2 py-1">{entry.code}</td>
                        <td className="border px-2 py-1">{entry.name}</td>
                        <td className="border px-2 py-1">{entry.program}</td>
                        <td className="border px-2 py-1">{entry.system}</td>
                        <td className="border px-2 py-1">{entry.grading}</td>
                        {[...Array(8)].map((_, i) => (
                          <td
                            key={i}
                            className="border px-2 py-1 text-xs text-blue-600 truncate max-w-[80px]"
                          >
                            {entry.pdfs?.[i + 1] ? (
                              <a
                                href={entry.pdfs[i + 1]}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </a>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        ))}
                        <td className="border px-2 py-1 space-x-2">
                          <button
                            onClick={() => handleEdit(entry)}
                            className="bg-blue-500 text-white px-2 py-1 text-xs rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(entry._id)}
                            className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SyllabusTable;
