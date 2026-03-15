import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Common/Breadcrumbs";

function About() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-24 text-center">
        {/* Blobs */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-pink-500/20 blur-[100px] rounded-full pointer-events-none" />

        <motion.div {...fadeUp} className="relative z-10">
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-100 text-xs tracking-wide font-medium">
            🚀 Driven by Students, For Students
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            About Learnify
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Empowering students to achieve more with the best academic resources
            at their fingertips. We bridge the gap between confusion and clarity.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-indigo-100/50 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm transition hover:scale-[1.02]">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-300">
                <i className="ri-flag-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-gray-600 dark:text-indigo-200 text-sm leading-relaxed">
                To make quality education resources accessible to every student,
                everywhere, removing barriers to academic success.
              </p>
            </div>

            {/* Vision Card */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-indigo-100/50 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm transition hover:scale-[1.02]">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-300">
                <i className="ri-eye-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-gray-600 dark:text-indigo-200 text-sm leading-relaxed">
                To become the most trusted, go-to learning companion for
                engineering students globally, fostering a community of growth.
              </p>
            </div>

            {/* Goal Card */}
            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-indigo-100/50 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm transition hover:scale-[1.02]">
              <div className="w-14 h-14 bg-pink-100 dark:bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-300">
                <i className="ri-trophy-line text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Our Goal</h3>
              <p className="text-gray-600 dark:text-indigo-200 text-sm leading-relaxed">
                To provide updated notes, streamlined study paths, and tools that
                boost academic performance and confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
              Everything you need to excel in your exams, all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "ri-file-list-3-line",
                color: "text-indigo-500",
                title: "Subject-wise Notes",
                desc: "High-quality, unit-wise notes tailored for your branch and semester.",
              },
              {
                icon: "ri-question-answer-line",
                color: "text-emerald-500",
                title: "PYQs & Questions",
                desc: "Practice with previous year papers and curated important questions.",
              },
              {
                icon: "ri-upload-cloud-line",
                color: "text-pink-500",
                title: "Community Growth",
                desc: "A platform where students and teachers contribute to help peers.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                {...fadeUp}
                className="p-6 rounded-2xl bg-white/50 border border-gray-100 hover:shadow-lg dark:bg-white/5 dark:border-white/10 hover:scale-105 transition duration-300"
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

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 {...fadeUp} className="text-3xl md:text-4xl font-bold mb-12">
            Meet the Team
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center">
            {/* Founder */}
            <motion.div
              {...fadeUp}
              className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 shadow-lg dark:bg-white/5 dark:from-white/5 dark:to-transparent dark:border-white/10"
            >
              <img
                src="https://api.dicebear.com/7.x/initials/svg?seed=AK"
                alt="Abhishek Kalme"
                className="w-28 h-28 mx-auto rounded-full mb-6 shadow-md border-4 border-white dark:border-white/10"
              />
              <h3 className="text-2xl font-bold mb-1">Abhishek Kalme</h3>
              <p className="text-indigo-600 dark:text-indigo-300 font-medium mb-4">
                Founder & Developer
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Passionate about building scalable solutions and solving real-world
                student problems.
              </p>
            </motion.div>

            {/* You */}
            <motion.div
              {...fadeUp}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 border-dashed shadow-sm dark:bg-white/5 dark:border-white/10 flex flex-col items-center justify-center opacity-80 hover:opacity-100 transition"
            >
              <div className="w-28 h-28 mx-auto rounded-full mb-6 bg-gray-200 dark:bg-white/10 flex items-center justify-center text-4xl grayscale">
                🚀
              </div>
              <h3 className="text-2xl font-bold mb-1">You?</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium mb-4">
                Future Contributor
              </p>
              <Link
                to="/contact-us"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold transition shadow-lg shadow-indigo-500/30"
              >
                Join Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
