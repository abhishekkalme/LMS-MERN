import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../Common/Breadcrumbs";

function Notes() {
  const years = [
    { year: "First Year", link: "/notes/FirstYear", color: "from-blue-400 to-blue-600" },
    { year: "Second Year", link: "/notes/SecondYear", color: "from-purple-400 to-purple-600" },
    { year: "Third Year", link: "/notes/ThirdYear", color: "from-pink-400 to-pink-600" },
    { year: "Fourth Year", link: "/notes/FourthYear", color: "from-amber-400 to-amber-600" },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true },
  };

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs 
          items={[
            { label: "Select Branch", path: "/branch" },
            { label: "Notes" }
          ]} 
        />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 text-center">
        {/* Blobs */}
        <div className="absolute top-0 right-1/3 w-[350px] h-[350px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />

        <motion.div {...fadeUp} className="relative z-10">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-100 text-xs tracking-wide font-medium">
            📚 Notes Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Computer Science & Engineering
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
            Select your year to access unit-wise notes, questions, and resources.
          </p>
        </motion.div>
      </section>

      {/* Year Selection */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {years.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={item.link} className="block group">
                  <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-lg shadow-indigo-100/50 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm relative overflow-hidden transition-all duration-300 group-hover:shadow-xl">
                    <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${item.color}`} />
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {item.year}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View Subjects & Units
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-400 dark:text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-500/20 dark:group-hover:text-indigo-300 transition-all">
                        <i className="ri-arrow-right-line text-xl"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Study Notes Section */}
      <section className="py-20 px-6 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Why Study Notes?
            </h2>
            <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
              Well-organized study notes are essential for effective learning and better retention.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-time-line",
                color: "text-blue-500",
                title: "Better Understanding",
                desc: "Comprehensive notes help you grasp complex concepts and understand the subject thoroughly."
              },
              {
                icon: "ri-focus-2-line",
                color: "text-green-500",
                title: "Quick Reference",
                desc: "Easy access to key concepts for quick revision before exams."
              },
              {
                icon: "ri-mental-health-line",
                color: "text-purple-500",
                title: "Better Retention",
                desc: "Well-structured notes improve memory retention and help you remember concepts longer."
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

export default Notes;
