import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../Common/Breadcrumbs";

function FirstYear() {
  const [selectedSemester, setSelectedSemester] = useState("all");

  const initialSubjects = () => {
    const storedData = localStorage.getItem("subjectDownloads");
    return storedData
      ? JSON.parse(storedData)
      : [
        { code: "BT-101", name: "Engineering Chemistry", semester: "1", downloads: 2300, updated: "Mar 15, 2025", description: "Water treatment, boiler problems, lubrication, polymers, corrosion, spectroscopy, etc." },
        { code: "BT-102", name: "Mathematics-I", semester: "1", downloads: 3100, updated: "Mar 18, 2025", description: "Calculus, matrices, vector spaces, Taylor series, multiple integrals, etc." },
        { code: "BT-103", name: "English for Communication", semester: "1", downloads: 1800, updated: "Mar 20, 2025", description: "Language skills, grammar, writing techniques for technical and professional communication." },
        { code: "BT-104", name: "Basic Electrical & Electronics", semester: "1", downloads: 2500, updated: "Mar 19, 2025", description: "Electrical circuits, machines, transformers, semiconductor devices." },
        { code: "BT-105", name: "Engineering Graphics", semester: "1", downloads: 2000, updated: "Mar 17, 2025", description: "Drawing principles, projections, CAD tools, 3D modeling basics." },
        { code: "BT-106", name: "Manufacturing Practices", semester: "1", downloads: 1, updated: "Mar 17, 2025", description: "Workshop fabrication processes for manufacturing." },
        { code: "BT-107", name: "Internship-I", semester: "1", downloads: 1, updated: "Mar 17, 2025", description: "60 Hrs Industry level internship." },
        { code: "BT-108", name: "Swachh Bharat Summer Internship", semester: "1", downloads: 1, updated: "Mar 17, 2025", description: "Rural outreach, 100 Hrs." },

        { code: "BT-201", name: "Engineering Physics", semester: "2", downloads: 2600, updated: "Mar 21, 2025", description: "Quantum mechanics, wave optics, lasers, solid-state physics." },
        { code: "BT-202", name: "Mathematics-II", semester: "2", downloads: 3000, updated: "Mar 22, 2025", description: "Differential equations, vector calculus, complex variables." },
        { code: "BT-203", name: "Basic Mechanical Engineering", semester: "2", downloads: 3000, updated: "Mar 22, 2025", description: "Thermodynamics, fluid mechanics, IC engines." },
        { code: "BT-204", name: "Basic Civil Engineering & Mechanics", semester: "2", downloads: 3000, updated: "Mar 22, 2025", description: "Building materials, surveying, engineering mechanics." },
        { code: "BT-205", name: "Basic Computer Engineering", semester: "2", downloads: 3000, updated: "Mar 22, 2025", description: "Operating systems, networking, cybersecurity, programming basics." },
        { code: "BT-206", name: "Language Lab & Seminars", semester: "2", downloads: 3000, updated: "Mar 22, 2025", description: "English speaking and presentation skills through lab." }
      ];
  };

  const [subjects, setSubjects] = useState(initialSubjects);

  useEffect(() => {
    localStorage.setItem("subjectDownloads", JSON.stringify(subjects));
  }, [subjects]);

  const handleViewNotesClick = (code) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.code === code
          ? { ...subject, downloads: subject.downloads + 1 }
          : subject
      )
    );
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      selectedSemester === "all" || subject.semester === selectedSemester
  );

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8 relative z-10">

        {/* Blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

        <Breadcrumbs
          items={[
            { label: "Notes", path: "/notes" },
            { label: "First Year" }
          ]}
        />

        <motion.div {...fadeUp} className="mb-10 text-center relative z-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-200 text-xs tracking-wide font-medium">
            🎓 First Year
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 dark:text-white">
            First Year Engineering Notes
          </h1>
          <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto text-lg">
            Access comprehensive study materials, previous year papers, and resources for all First-year engineering subjects.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-10 relative z-10">
          {["all", "1", "2"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester(semester)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedSemester === semester
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
            >
              {semester === "all" ? "All Subjects" : `Semester ${semester}`}
            </button>
          ))}
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {filteredSubjects.map((subject) => (
            <motion.div
              key={subject.code}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
              className="bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none backdrop-blur-sm overflow-hidden hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/10 transition-all duration-300 flex flex-col h-full group"
            >
              <div className="p-6 flex flex-col flex-grow relative">
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20">
                    {subject.code}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <i className="ri-calendar-line"></i> {subject.updated}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors relative z-10">
                  {subject.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed relative z-10">
                  {subject.description}
                </p>

                <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between mt-auto relative z-10">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <i className="ri-download-cloud-2-line"></i>
                    {subject.downloads.toLocaleString()}
                  </span>
                  <Link
                    to={`/notes/${subject.code}`}
                    state={{
                      branch: "CSE",
                      year: "First Year",
                      semester: subject.semester,
                    }}
                    className="flex items-center gap-1 text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md shadow-indigo-500/20"
                    onClick={() => handleViewNotesClick(subject.code)}
                  >
                    View Notes <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default FirstYear;
