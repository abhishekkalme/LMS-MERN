import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <nav className="breadcrumb flex mb-8" aria-label="Breadcrumb">
          <ol className="breadcrumb inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/"
                className="ml-1 text-gray-600 hover:text-primary md:ml-4 hover:text-[#6366F1] cursor-pointer"
              >
                Home
              </Link>
            </li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <li>
              <Link
                to="/notes"
                className="ml-1 text-gray-600 hover:text-primary md:ml-1 hover:text-[#6366F1] cursor-pointer"
              >
                Notes
              </Link>
            </li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <li>
              <NavLink
                to="/notes/FirstYear"
                className={({ isActive }) =>
                  ` ${
                    isActive ? "text-indigo-500 " : "text-gray-700"
                  } hover:text-[#7276fd] cursor-pointer ml-1 text-primary font-medium md:ml-4`
                }
              >
                First Year
              </NavLink>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-200">
          First Year Engineering Notes
        </h1>
        <p className="text-gray-600 mb-6 dark:text-gray-400">
          Access comprehensive study materials for all First-year engineering
          subjects.
        </p>

        <div className="flex gap-4 mb-6">
          {["all", "1", "2"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester(semester)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedSemester === semester
                  ? "bg-[#6366F1] text-white"
                  : "bg-white text-gray-600 hover:bg-blue-200 dark:bg-gray-900 dark:text-gray-400"
              }`}
            >
              {semester === "all" ? "All Subjects" : `Semester ${semester}`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.code}
              className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden subject-card dark:bg-gray-900 dark:hover:shadow-blue-800 dark:hover:scale-105 dark:transition-all dark:text-gray-200 dark:border border border-[#6366f1]"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary">
                    {subject.code}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-300">
                    Updated: {subject.updated}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">
                  {subject.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {subject.downloads.toLocaleString()} downloads
                  </span>
                  <Link
                    to={`/notes/${subject.code}`}
                    state={{
                      branch: "CSE",
                      year: "FirstYear",
                      semester: subject.semester,
                    }}
                    className="text-white bg-[#6366F1] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#4F46E5]"
                    onClick={() => handleViewNotesClick(subject.code)}
                  >
                    View Notes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default FirstYear;
