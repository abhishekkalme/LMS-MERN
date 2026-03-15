import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../Common/Breadcrumbs";

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
            { label: "Third Year" }
          ]}
        />

        <motion.div {...fadeUp} className="mb-10 text-center relative z-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-200 text-xs tracking-wide font-medium">
            🎓 Third Year
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 dark:text-white">
            Third Year Engineering Notes
          </h1>
          <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto text-lg">
            Access comprehensive study materials, previous year papers, and resources for all Third-year engineering subjects.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-10 relative z-10">
          {["all", "5", "6"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester3(semester)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedSemester3 === semester
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
                      year: "Third Year",
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

export default ThirdYear;
