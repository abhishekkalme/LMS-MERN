import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../Common/Breadcrumbs";

function SecondYear() {
  const [selectedSemester2, setSelectedSemester2] = useState("all");

  const initialSubjects = () => {
    const storedData = localStorage.getItem("subjectDownloads2");
    return storedData
      ? JSON.parse(storedData)
      : [
        {
          code: "ES-301",
          name: "Energy & Environmental Engineering",
          semester: "3",
          downloads: 2300,
          updated: "Mar 15, 2025",
          description:
            "Water treatment, boiler problems, lubrication, polymers, phase equilibrium, corrosion, spectroscopy, and periodic properties, essential for understanding industrial and chemical processes.",
        },
        {
          code: "CS-302",
          name: "Discrete Structure",
          semester: "3",
          downloads: 3100,
          updated: "Mar 18, 2025",
          description:
            "Calculus, sequences and series, vector spaces, matrices, Rolle’s and Mean Value theorems, Taylor series, multiple integrals, Fourier series, linear transformations, and matrix operations.",
        },
        {
          code: "CS-303",
          name: "Data Structure",
          semester: "3",
          downloads: 1800,
          updated: "Mar 20, 2025",
          description:
            "Language and communication skills, covering grammar, vocabulary, reading comprehension, writing techniques, and business correspondence essential for technical and professional settings.",
        },
        {
          code: "CS-304",
          name: "Digital Systems",
          semester: "3",
          downloads: 2500,
          updated: "Mar 19, 2025",
          description:
            "Electrical circuits, machines, transformers, and basic electronics, including circuit theorems, AC/DC analysis, induction motors, and semiconductor devices.",
        },
        {
          code: "CS-305",
          name: "Object Oriented Programming & Methodology",
          semester: "3",
          downloads: 2000,
          updated: "Mar 17, 2025",
          description:
            "Introduction to Object Oriented Programming : Encapsulation and Data Abstraction, Relationships – Inheritance, Polymorphism, Exceptional handling, Multi-threading  ",
        },
        {
          code: "BT-401",
          name: "Mathematics- III",
          semester: "4",
          downloads: 2600,
          updated: "Mar 21, 2025",
          description:
            "Quantum mechanics, wave optics, solid-state physics, lasers, and electrostatics. Topics include the Schrödinger equation, interference and diffraction, semiconductor physics, laser principles, and Maxwell’s equations.",
        },
        {
          code: "CS-402",
          name: "Analysis Design of Algorithm",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Differential equations, partial differential equations, complex variables, and vector calculus. Topics include first and second-order ODEs, PDEs, analytic functions, and vector theorems like Gauss and Stokes.",
        },
        {
          code: "CS-403",
          name: "Software Engineering",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Engineering materials, measurement techniques, production processes, fluid mechanics, thermodynamics, and reciprocating machines, including steam engines, boilers, and internal combustion engines.",
        },
        {
          code: "CS-404",
          name: "Computer Org. & Architecture",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Building materials, surveying techniques, mapping, and engineering mechanics. Topics include construction elements, leveling, remote sensing, force equilibrium, trusses, and beam analysis.",
        },
        {
          code: "CS-405",
          name: "Operating Systems",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Fundamental computer concepts, operating systems, programming, networking, cybersecurity, databases, and cloud computing. Topics include algorithms, OOP in C++, data structures, networking models, cyber threats, DBMS, and cloud infrastructure.",
        },
        {
          code: "CS-406(A)",
          name: "Programming Practices(JAVA)",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Programming concepts and techniques using the Java language and programming environment...",
        },
        {
          code: "CS-406(B)",
          name: "Programming Practices(Dot Net Technologies)",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Introduction .NET framework, features of .Net framework, architecture and component of .Net, elements of .Net.",
        },
        {
          code: "CS-406(C)",
          name: "Programming Practices(Python)",
          semester: "4",
          downloads: 3000,
          updated: "Mar 22, 2025",
          description:
            "Basic syntax, Literal Constants, Numbers, Variable and Basic data types,String, Escape Sequences, Operators and Expressions, Evaluation Order, Indentation, Input Output, Functions, Comments",
        },

      ];
  };

  const [subjects, setSubjects] = useState(initialSubjects);

  useEffect(() => {
    localStorage.setItem("subjectDownloads2", JSON.stringify(subjects));
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
      selectedSemester2 === "all" || subject.semester === selectedSemester2
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
            { label: "Second Year" }
          ]}
        />

        <motion.div {...fadeUp} className="mb-10 text-center relative z-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-200 text-xs tracking-wide font-medium">
            🎓 Second Year
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 dark:text-white">
            Second Year Engineering Notes
          </h1>
          <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto text-lg">
            Access comprehensive study materials, previous year papers, and resources for all Second-year engineering subjects.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-10 relative z-10">
          {["all", "3", "4"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester2(semester)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedSemester2 === semester
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
                      year: "Second Year",
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

export default SecondYear;
