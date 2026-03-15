import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../Common/Breadcrumbs";

function SelectBranch() {
  const navigate = useNavigate();

  const branches = [
    { name: "Computer Science", code: "cse", available: true, icon: "ri-macbook-line", color: "text-indigo-500" },
    { name: "Mechanical Engineering", code: "me", available: false, icon: "ri-settings-4-line", color: "text-orange-500" },
    { name: "Civil Engineering", code: "ce", available: false, icon: "ri-building-2-line", color: "text-emerald-500" },
    { name: "Electrical Engineering", code: "ee", available: false, icon: "ri-flashlight-line", color: "text-yellow-500" },
  ];

  const handleBranchSelect = (branch) => {
    if (branch.available) {
      navigate("/notes");
    } else {
      navigate("/NoNotesAvailable");
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs items={[{ label: "Select Branch" }]} />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 text-center">
        {/* Blobs */}
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[250px] h-[250px] bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

        <motion.div {...fadeUp} className="relative z-10">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-100 text-xs tracking-wide font-medium">
            🏫 Departments
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Choose Your Branch
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
            Select your department to access tailored notes, syllabus, and study materials.
          </p>
        </motion.div>
      </section>

      {/* Branch Selection Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {branches.map((branch, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={() => handleBranchSelect(branch)}
                  className="w-full h-full p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-indigo-100/50 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
                >
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl ${branch.available ? 'bg-indigo-50 dark:bg-white/10 ' + branch.color : 'bg-gray-100 dark:bg-white/5 text-gray-400'}`}>
                    <i className={branch.icon}></i>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${branch.available ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500'}`}>
                    {branch.name}
                  </h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${branch.available ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700/50 dark:text-gray-500'}`}>
                    {branch.available ? 'Available' : 'Coming Soon'}
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Branch Section */}
      <section className="py-20 px-6 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Select a Branch?
            </h2>
            <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
              Your department helps tailor your academic resources for a more focused experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-lightbulb-line",
                color: "text-blue-500",
                title: "Personalized Learning",
                desc: "Content is tailored to your department so you only see what matters."
              },
              {
                icon: "ri-focus-2-line",
                color: "text-green-500",
                title: "Streamlined Notes",
                desc: "Find notes and materials that are relevant only to your stream."
              },
              {
                icon: "ri-compass-3-line",
                color: "text-purple-500",
                title: "Better Navigation",
                desc: "Simplifies finding PDFs, syllabi, and unit pages based on branch."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                className="p-6 rounded-2xl bg-white/50 border border-gray-100 hover:shadow-lg dark:bg-white/5 dark:border-white/10 backdrop-blur-sm transition duration-300"
              >
                <i className={`${item.icon} ${item.color} text-4xl mb-4 block`}></i>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-indigo-200 text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SelectBranch;
