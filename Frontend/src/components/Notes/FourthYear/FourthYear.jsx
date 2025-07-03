import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

function FourthYear() {
  const [selectedSemester4, setSelectedSemester4] = useState("all");

  const initialSubjects = () => {
    const storedData = localStorage.getItem("subjectDownloads4");
    return storedData
      ? JSON.parse(storedData)
      : [
          {
            code: "CS-701",
            name: "Software Architectures",
            semester: "7",
            downloads: 900,
            updated: "May 9, 2025",
            description:
              "Study of software design, architectural styles, and frameworks.",
          },
          {
            code: "CS-702(A)",
            name: "Computational Intelligence",
            semester: "7",
            downloads: 850,
            updated: "May 9, 2025",
            description:
              "Fuzzy logic, neural networks, and evolutionary algorithms.",
          },
          {
            code: "CS-702(B)",
            name: "Deep & Reinforcement Learning",
            semester: "7",
            downloads: 880,
            updated: "May 9, 2025",
            description:
              "Deep learning models and reinforcement learning techniques.",
          },
          {
            code: "CS-702(C)",
            name: "Wireless & Mobile Computing",
            semester: "7",
            downloads: 820,
            updated: "May 9, 2025",
            description:
              "Mobile systems, wireless protocols, and pervasive computing.",
          },
          {
            code: "CS-702(D)",
            name: "Big Data",
            semester: "7",
            downloads: 890,
            updated: "May 9, 2025",
            description:
              "Technologies for big data storage, processing, and analysis.",
          },
          {
            code: "CS-703(A)",
            name: "Cryptography & Information Security",
            semester: "7",
            downloads: 870,
            updated: "May 9, 2025",
            description:
              "Encryption, secure protocols, and cybersecurity principles.",
          },
          {
            code: "CS-703(B)",
            name: "Data Mining and Warehousing",
            semester: "7",
            downloads: 860,
            updated: "May 9, 2025",
            description:
              "Data extraction, transformation, and mining techniques.",
          },
          {
            code: "CS-703(C)",
            name: "Agile Software Development",
            semester: "7",
            downloads: 810,
            updated: "May 9, 2025",
            description:
              "Agile methodologies, SCRUM, and iterative development.",
          },
          {
            code: "CS-703(D)",
            name: "Disaster Management",
            semester: "7",
            downloads: 800,
            updated: "May 9, 2025",
            description:
              "Risk mitigation, emergency planning, and disaster recovery.",
          },

          {
            code: "CS-801",
            name: "Internet of Things",
            semester: "8",
            downloads: 920,
            updated: "May 9, 2025",
            description: "IoT architecture, protocols, and smart systems.",
          },
          {
            code: "CS-802(A)",
            name: "Block Chain Technologies",
            semester: "8",
            downloads: 940,
            updated: "May 9, 2025",
            description:
              "Distributed ledgers, cryptocurrencies, and blockchain platforms.",
          },
          {
            code: "CS-802(B)",
            name: "Cloud Computing",
            semester: "8",
            downloads: 930,
            updated: "May 9, 2025",
            description: "Cloud architecture, services, and virtualization.",
          },
          {
            code: "CS-802(C)",
            name: "High Performance Computing",
            semester: "8",
            downloads: 910,
            updated: "May 9, 2025",
            description: "Parallel processing, clusters, and supercomputing.",
          },
          {
            code: "CS-802(D)",
            name: "Object Oriented Software Engineering",
            semester: "8",
            downloads: 950,
            updated: "May 9, 2025",
            description: "OOP-based software development life cycle.",
          },
          {
            code: "CS-803(A)",
            name: "Image Processing and Computer Vision#",
            semester: "8",
            downloads: 905,
            updated: "May 9, 2025",
            description:
              "Image analysis, feature extraction, and vision algorithms.",
          },
          {
            code: "CS-803(B)",
            name: "Game Theory with Engineering applications#",
            semester: "8",
            downloads: 880,
            updated: "May 9, 2025",
            description:
              "Strategic decision making, Nash equilibrium, and applications.",
          },
          {
            code: "CS-803(C)",
            name: "Internet of Things*",
            semester: "8",
            downloads: 860,
            updated: "May 9, 2025",
            description: "Sensors, cloud integration, and IoT services.",
          },
          {
            code: "CS-803(D)",
            name: "Managing Innovation and Entrepreneurship#",
            semester: "8",
            downloads: 875,
            updated: "May 9, 2025",
            description:
              "Start-up lifecycle, innovation management, and funding.",
          },
        ];
  };

  const [subjects, setSubjects] = useState(initialSubjects());

  useEffect(() => {
    localStorage.setItem("subjectDownloads4", JSON.stringify(subjects));
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
      selectedSemester4 === "all" || subject.semester === selectedSemester4
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
                to="/notes/FourthYear"
                className={({ isActive }) =>
                  ` ${
                    isActive ? "text-indigo-500 " : "text-gray-700"
                  } hover:text-[#7276fd] cursor-pointer ml-1 text-primary font-medium md:ml-4`
                }
              >
                Fourth Year
              </NavLink>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4 dark:text-gray-200 ">
          Final Year CSE Engineering Notes
        </h1>
        <p className="text-gray-600 mb-6 dark:text-gray-400 ">
          Access comprehensive study materials for all Final-year engineering
          subjects.
        </p>

        {/* Semester Selection Buttons */}
        <div className="flex gap-4 mb-6">
          {["all", "7", "8"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester4(semester)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedSemester4 === semester
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
                      year: "FourthYear",
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

export default FourthYear;
