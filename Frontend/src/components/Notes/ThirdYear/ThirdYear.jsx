import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function ThirdYear() {
  const [selectedSemester3, setSelectedSemester3] = useState("all");

  const initialSubjects = () => {
    const storedData = localStorage.getItem("subjectDownloads3");
    return storedData
      ? JSON.parse(storedData)
      : [
          {
            code: "CS-501",
            name: "Theory of Computation",
            semester: "5",
            downloads: 1200,
            updated: "May 1, 2025",
            description:
              "Concepts of computation theory, automata, Turing machines, and complexity classes.",
          },
          {
            code: "CS-502",
            name: "Database Management Systems",
            semester: "5",
            downloads: 1600,
            updated: "May 1, 2025",
            description:
              "Design and implementation of relational databases, SQL, and normalization.",
          },
          {
            code: "CS-503(A)",
            name: "Data Analytics",
            semester: "5",
            downloads: 1400,
            updated: "May 1, 2025",
            description:
              "Data processing, visualization, and statistical analysis for big data.",
          },
          {
            code: "CS-503(B)",
            name: "Pattern Recognition",
            semester: "5",
            downloads: 1100,
            updated: "May 1, 2025",
            description:
              "Machine learning algorithms for identifying patterns in data.",
          },
          {
            code: "CS-503(C)",
            name: "Cyber Security",
            semester: "5",
            downloads: 1000,
            updated: "May 1, 2025",
            description:
              "Security threats, encryption, firewalls, and secure protocols.",
          },
          {
            code: "CS-504(A)",
            name: "Internet and Web Technology",
            semester: "5",
            downloads: 1300,
            updated: "May 1, 2025",
            description:
              "Web development, client-server architecture, HTML/CSS/JS.",
          },
          {
            code: "CS-504(B)",
            name: "Object Oriented Programming",
            semester: "5",
            downloads: 1250,
            updated: "May 1, 2025",
            description:
              "Java/C++ OOP principles including classes, inheritance, polymorphism.",
          },
          {
            code: "CS-504(C)",
            name: "Intro to DBMS",
            semester: "5",
            downloads: 1100,
            updated: "May 1, 2025",
            description:
              "Fundamentals of database systems and query optimization.",
          },
          {
            code: "CS-505",
            name: "Lab (Linux)",
            semester: "5",
            downloads: 950,
            updated: "May 1, 2025",
            description:
              "Practical training on Linux OS, shell scripting and tools.",
          },
          {
            code: "CS-506",
            name: "Lab (Python)",
            semester: "5",
            downloads: 980,
            updated: "May 1, 2025",
            description:
              "Python programming exercises for data handling and scripting.",
          },


          {
            code: "CS-601",
            name: "Machine Learning",
            semester: "6",
            downloads: 1700,
            updated: "May 1, 2025",
            description:
              "Supervised and unsupervised learning, regression, classification.",
          },
          {
            code: "CS-602",
            name: "Computer Networks",
            semester: "6",
            downloads: 1500,
            updated: "May 1, 2025",
            description:
              "Network protocols, OSI model, TCP/IP, routing, and security.",
          },
          {
            code: "CS-603(A)",
            name: "Advanced Computer Architecture",
            semester: "6",
            downloads: 1350,
            updated: "May 1, 2025",
            description:
              "Pipeline, parallelism, memory hierarchy, and multicore CPUs.",
          },
          {
            code: "CS-603(B)",
            name: "Computer Graphics & Visualization",
            semester: "6",
            downloads: 1400,
            updated: "May 1, 2025",
            description:
              "Rendering, transformations, OpenGL, and modeling techniques.",
          },
          {
            code: "CS-603(C)",
            name: "Compiler Design",
            semester: "6",
            downloads: 1300,
            updated: "May 1, 2025",
            description:
              "Lexical analysis, parsing, code generation, and optimization.",
          },
          {
            code: "CS-604(A)",
            name: "Knowledge Management",
            semester: "6",
            downloads: 1250,
            updated: "May 1, 2025",
            description:
              "Knowledge representation, retrieval, and management systems.",
          },
          {
            code: "CS-604(B)",
            name: "Project Management",
            semester: "6",
            downloads: 1150,
            updated: "May 1, 2025",
            description:
              "Planning, execution, cost estimation, and risk management.",
          },
          {
            code: "CS-604(C)",
            name: "Rural Tech & Community Development",
            semester: "6",
            downloads: 1100,
            updated: "May 1, 2025",
            description:
              "Technology application in rural sectors for social development.",
          },
          {
            code: "CS-605",
            name: "Data Analytics Lab",
            semester: "6",
            downloads: 1050,
            updated: "May 1, 2025",
            description: "Hands-on projects and exercises in machine learning.",
          },
          {
            code: "CS-606",
            name: "Skill Development Lab",
            semester: "6",
            downloads: 980,
            updated: "May 1, 2025",
            description: "Network configuration and troubleshooting exercises.",
          },
        ];
  };

  const [subjects, setSubjects] = useState(initialSubjects());

  useEffect(() => {
    localStorage.setItem("subjectDownloads3", JSON.stringify(subjects));
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
      selectedSemester3 === "all" || subject.semester === selectedSemester3
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
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
                to="/notes/ThirdYear"
                className={({ isActive }) =>
                  ` ${
                    isActive ? "text-indigo-500 " : "text-gray-700"
                  } hover:text-[#7276fd] cursor-pointer ml-1 text-primary font-medium md:ml-4`
                }
              >
                Third Year
              </NavLink>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-200 ">
          Third Year CSE Engineering Notes
        </h1>
        <p className="text-gray-600 mb-6 dark:text-gray-400 ">
          Access comprehensive study materials for all 3rd-year engineering
          subjects.
        </p>

        {/* Semester Selection Buttons */}
        <div className="flex gap-4 mb-6">
          {["all", "5", "6"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester3(semester)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedSemester3 === semester
                  ? "bg-[#6366F1] text-white"
                  : "bg-white text-gray-600 hover:bg-blue-200 dark:bg-gray-900 dark:text-gray-400"
              }`}
            >
              {semester === "all" ? "All Subjects" : `Semester ${semester}`}
            </button>
          ))}
        </div>

        {/* Subject List */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6  ">
          {filteredSubjects.map((subject) => (
            <div
              key={subject.code}
              className="bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden subject-card dark:bg-gray-900 dark:hover:shadow-blue-800 dark:hover:scale-105 dark:transition-all  dark:text-gray-200 dark:border border border-[#6366f1] dark:shadow- "
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary">
                    {subject.code}
                  </span>
                  <span className="text-xs text-gray-500  dark:text-gray-300 ">
                    Updated: {subject.updated}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-gray-100  ">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4  dark:text-gray-400 ">
                  {subject.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500  dark:text-gray-300 ">
                    {subject.downloads.toLocaleString()} downloads
                  </span>{" "}
                  {/* ✅ Formats downloads */}
                  <Link
                    to={`/notes/${subject.code}`}
                    state={{
                      branch: "CSE",
                      year: "ThirdYear",
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

export default ThirdYear;
