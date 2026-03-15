import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../Common/Breadcrumbs";

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
            { label: "Fourth Year" }
          ]}
        />

        <motion.div {...fadeUp} className="mb-10 text-center relative z-10">
          <span className="inline-block mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-200 text-xs tracking-wide font-medium">
            🎓 Final Year
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 dark:text-white">
            Final Year Engineering Notes
          </h1>
          <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto text-lg">
            Access comprehensive study materials, previous year papers, and resources for all Final-year engineering subjects.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-10 relative z-10">
          {["all", "7", "8"].map((semester) => (
            <button
              key={semester}
              onClick={() => setSelectedSemester4(semester)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${selectedSemester4 === semester
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
                      year: "Fourth Year",
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

export default FourthYear;
