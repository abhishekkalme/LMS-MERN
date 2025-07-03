import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function SelectBranch() {
  const navigate = useNavigate();

  const branches = [
    { name: "Computer Science", code: "cse", available: true },
    { name: "Mechanical Engineering", code: "me", available: false },
    { name: "Civil Engineering", code: "ce", available: false },
    { name: "Electrical Engineering", code: "ee", available: false },
  ];

  const handleBranchSelect = (branch) => {
    if (branch.available) {
      navigate("/notes");
    } else {
      navigate("/NoNotesAvailable");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-[100dvh]"
    >
      {/* Breadcrumb */}
      <nav className="py-4 ml-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
          <li>
            <Link to="/" className="hover:text-indigo-500">
              Home
            </Link>
          </li>
          <i className="ri-arrow-right-s-line text-gray-400"></i>
          <li className="text-indigo-500 font-medium">Select Branch</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-grow">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 py-24 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
            Choose Your Branch
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Select your department to continue
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <button
                  onClick={() => handleBranchSelect(branch)}
                  className="bg-indigo-500 backdrop-blur-sm text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-500/85 transition-colors duration-200 border border-white/30 min-w-[180px]"
                >
                  {branch.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Branch Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Select a Branch?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Your department helps tailor your academic resources and syllabus
              for a more focused learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-lightbulb-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Personalized Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Content is tailored to your department so you only see what
                matters.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-focus-2-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Streamlined Notes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find notes and materials that are relevant only to your stream.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-mental-health-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Better Navigation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simplifies finding PDFs, syllabi, and unit pages based on
                branch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default SelectBranch;
