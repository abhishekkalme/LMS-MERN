import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import FilterBar from "./FilterBar";

const Backurl = import.meta.env.VITE_API_BASE_URL;


const Syllabus = () => {
  const [filters, setFilters] = useState({
    uploadType: "Syllabus",
    program: "B.Tech",
    systemType: "Semester",
    gradingSystem: "Grading",
  });

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch syllabus data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${Backurl}/api/syllabus`, {
          params: {
            program: filters.program,
            system: filters.systemType,
            grading: filters.gradingSystem,
          },
        });
        setDepartments(res.data);
      } catch (err) {
        console.error("❌ Error fetching syllabus:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [filters]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-[100dvh] bg-white dark:bg-gray-900"
    >
      {/* Hero */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <h1 className="text-4xl font-extrabold mb-2">📘 RGPV Syllabus</h1>
        <p className="text-lg">
          Explore and download syllabus PDFs semester-wise
        </p>
      </section>

      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Syllabus Cards */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            Loading syllabus...
          </p>
        ) : departments.length === 0 ? (
          <div className="text-center text-red-500 font-semibold">
            No results match your filters.
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4 text-center">
                  {dept.name} ({dept.code})
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 8 }, (_, i) => {
                    const sem = i + 1;
                    const url = dept.pdfs?.[sem];

                    return (
                      <a
                        key={sem}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => !url && e.preventDefault()}
                        className={`text-sm text-center p-3 rounded-lg transition
                          ${
                            url
                              ? "bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-600 text-black dark:text-white"
                              : "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
                          }
                        `}
                      >
                        {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][i]}{" "}
                        – SEM
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
};

export default Syllabus;
