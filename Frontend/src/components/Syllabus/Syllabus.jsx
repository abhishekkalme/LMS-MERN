import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import FilterBar from "./FilterBar";
import Breadcrumbs from "../Common/Breadcrumbs";

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

  // Fetch syllabus data from API
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
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      {/* Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none fixed z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none fixed z-0" />
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs items={[{ label: "Syllabus" }]} />
      </div>

      {/* Hero */}
      <motion.section 
        className="text-center py-12 px-4 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
         <span className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-200 text-xs tracking-wide font-medium border border-indigo-200 dark:border-white/10">
            📄 Course Curriculum
          </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 dark:text-white">
           RGPV Syllabus
        </h1>
        <p className="text-lg text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
          Explore and download the official syllabus PDFs for your engineering coursework, organized semester-wise.
        </p>
      </motion.section>

      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Syllabus Cards */}
      <section className="py-8 px-4 max-w-7xl mx-auto w-full relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-gray-500 dark:text-gray-300">Loading syllabus...</p>
          </div>
        ) : departments.length === 0 ? (
          <div className="text-center py-20">
             <div className="bg-red-50 dark:bg-red-900/10 inline-block p-4 rounded-full mb-4">
                 <i className="ri-file-warning-line text-3xl text-red-500"></i>
             </div>
             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Results Found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to find what you're looking for.</p>
          </div>
        ) : (
          <motion.div 
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
                visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                className="bg-white/50 dark:bg-white/5 rounded-2xl shadow-lg border border-indigo-100 dark:border-white/10 p-6 backdrop-blur-sm hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/10 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                        {dept.code.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {dept.name}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            Code: {dept.code}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                        className={`text-xs font-semibold text-center py-2.5 px-2 rounded-lg transition-all duration-200 border
                          ${
                            url
                              ? "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 shadow-sm"
                              : "bg-gray-50 dark:bg-white/5 border-transparent text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-60"
                          }
                        `}
                      >
                        SEM {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"][i]}
                        {url && <i className="ri-download-line ml-1"></i>}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Syllabus;
