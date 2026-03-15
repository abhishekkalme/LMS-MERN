import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, BookOpen, AlertCircle, Download, Filter } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const TimeTable = () => {
  const [selectedProgram, setSelectedProgram] = useState("B.Tech");
  const [selectedSemester, setSelectedSemester] = useState("3rd Semester");

  // Sample data structure based on the uploaded image
  const examSchedules = {
    "B.Tech": {
      "1st Semester": {
        midSem: [
          {
            date: "15 Dec 2025",
            day: "Monday",
            subject: "Engineering Mathematics I",
            code: "BT-101",
            time: "10:00 AM - 12:00 PM",
            instructions: "Calculators allowed"
          },
          {
            date: "17 Dec 2025",
            day: "Wednesday",
            subject: "Engineering Physics",
            code: "BT-102",
            time: "10:00 AM - 12:00 PM",
            instructions: "Formula sheet provided"
          },
          {
            date: "19 Dec 2025",
            day: "Friday",
            subject: "Engineering Chemistry",
            code: "BT-103",
            time: "10:00 AM - 12:00 PM",
            instructions: "Periodic table provided"
          },
          {
            date: "21 Dec 2025",
            day: "Sunday",
            subject: "Basic Electrical Engineering",
            code: "BT-104",
            time: "10:00 AM - 12:00 PM",
            instructions: "No electronic devices"
          },
        ],
        endSem: [
          {
            date: "10 Jan 2026",
            day: "Saturday",
            subject: "Engineering Mathematics I",
            code: "BT-101",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration, calculators allowed"
          },
          {
            date: "13 Jan 2026",
            day: "Tuesday",
            subject: "Engineering Physics",
            code: "BT-102",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration, formula sheet provided"
          },
          {
            date: "16 Jan 2026",
            day: "Friday",
            subject: "Engineering Chemistry",
            code: "BT-103",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration, periodic table provided"
          },
          {
            date: "19 Jan 2026",
            day: "Monday",
            subject: "Basic Electrical Engineering",
            code: "BT-104",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration"
          },
          {
            date: "22 Jan 2026",
            day: "Thursday",
            subject: "Engineering Graphics",
            code: "BT-105",
            time: "09:00 AM - 12:00 PM",
            instructions: "Drawing instruments required"
          },
        ]
      },
      "2nd Semester": {
        midSem: [
          {
            date: "18 Dec 2025",
            day: "Thursday",
            subject: "Engineering Mathematics II",
            code: "BT-201",
            time: "02:00 PM - 04:00 PM",
            instructions: "Calculators allowed"
          },
          {
            date: "20 Dec 2025",
            day: "Saturday",
            subject: "Data Structures",
            code: "BTCS-201",
            time: "02:00 PM - 04:00 PM",
            instructions: "No electronic devices"
          },
        ],
        endSem: [
          {
            date: "12 Jan 2026",
            day: "Monday",
            subject: "Engineering Mathematics II",
            code: "BT-201",
            time: "02:00 PM - 05:00 PM",
            instructions: "3 hours duration, calculators allowed"
          },
          {
            date: "15 Jan 2026",
            day: "Thursday",
            subject: "Data Structures",
            code: "BTCS-201",
            time: "02:00 PM - 05:00 PM",
            instructions: "3 hours duration"
          },
        ]
      },
      "3rd Semester": {
        midSem: [
          {
            date: "16 Dec 2025",
            day: "Tuesday",
            subject: "Operating Systems",
            code: "BTCS-301",
            time: "10:00 AM - 12:00 PM",
            instructions: "No electronic devices"
          },
          {
            date: "18 Dec 2025",
            day: "Thursday",
            subject: "Database Management Systems",
            code: "BTCS-302",
            time: "10:00 AM - 12:00 PM",
            instructions: "No electronic devices"
          },
          {
            date: "20 Dec 2025",
            day: "Saturday",
            subject: "Computer Networks",
            code: "BTCS-303",
            time: "10:00 AM - 12:00 PM",
            instructions: "No electronic devices"
          },
          {
            date: "22 Dec 2025",
            day: "Monday",
            subject: "Software Engineering",
            code: "BTCS-304",
            time: "10:00 AM - 12:00 PM",
            instructions: "No electronic devices"
          },
        ],
        endSem: [
          {
            date: "11 Jan 2026",
            day: "Sunday",
            subject: "Operating Systems",
            code: "BTCS-301",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration"
          },
          {
            date: "14 Jan 2026",
            day: "Wednesday",
            subject: "Database Management Systems",
            code: "BTCS-302",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration"
          },
          {
            date: "17 Jan 2026",
            day: "Saturday",
            subject: "Computer Networks",
            code: "BTCS-303",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration"
          },
          {
            date: "20 Jan 2026",
            day: "Tuesday",
            subject: "Software Engineering",
            code: "BTCS-304",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration"
          },
          {
            date: "23 Jan 2026",
            day: "Friday",
            subject: "Theory of Computation",
            code: "BTCS-305",
            time: "09:00 AM - 12:00 PM",
            instructions: "3 hours duration"
          },
        ]
      },
    }
  };

  const currentSchedule = examSchedules[selectedProgram]?.[selectedSemester] || { midSem: [], endSem: [] };

  const ExamCard = ({ exam, type }) => (
    <motion.div
      {...fadeUp}
      className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md dark:bg-white/10 dark:border-white/20 p-6 transition-all hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen size={20} className="text-indigo-500" />
            {exam.subject}
          </h3>
          <p className="text-sm text-gray-500 dark:text-indigo-300 mt-1">
            Code: {exam.code}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          type === 'mid' 
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
            : 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300'
        }`}>
          {type === 'mid' ? 'Mid-Sem' : 'End-Sem'}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <Calendar size={18} className="text-indigo-500" />
          <span className="font-medium">{exam.date}</span>
          <span className="text-sm text-gray-500 dark:text-indigo-300">({exam.day})</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <Clock size={18} className="text-indigo-500" />
          <span>{exam.time}</span>
        </div>

        {exam.instructions && (
          <div className="flex items-start gap-3 mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
            <AlertCircle size={16} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700 dark:text-blue-300">{exam.instructions}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <main className="min-h-screen text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/30 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-20 -left-40 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none z-0" />

        <motion.div {...fadeUp} className="relative z-10 text-center">
          <span className="inline-flex items-center mb-5 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-gray-100 text-xs tracking-wide">
            <Calendar size={16} className="mr-2" /> Examination Schedule
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Time Table
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-amber-200 dark:to-cyan-200 mt-2">
              Exam Schedules
            </span>
          </h1>

          <p className="mt-6 text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
            View your Mid-Semester and End-Semester examination schedules. Stay prepared and never miss an exam!
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          {...fadeUp}
          className="rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-white/5 dark:border-white/10 backdrop-blur-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter size={20} className="text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filter Schedule</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Program
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 dark:bg-white/10 dark:border-white/20 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MCA">MCA</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Semester
              </label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 dark:bg-white/10 dark:border-white/20 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              >
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
              </select>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mid-Semester Exams */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div {...fadeUp}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center">
                <Calendar size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              Mid-Semester Exams
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 transition">
              <Download size={16} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>

          {currentSchedule.midSem.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {currentSchedule.midSem.map((exam, index) => (
                <ExamCard key={index} exam={exam} type="mid" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No mid-semester exams scheduled yet</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* End-Semester Exams */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div {...fadeUp}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center">
                <Calendar size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              End-Semester (Main) Exams
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-white dark:text-indigo-700 dark:hover:bg-gray-100 transition">
              <Download size={16} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>
          </div>

          {currentSchedule.endSem.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {currentSchedule.endSem.map((exam, index) => (
                <ExamCard key={index} exam={exam} type="end" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No end-semester exams scheduled yet</p>
            </div>
          )}
        </motion.div>
      </section>

      {/* Important Notes */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          {...fadeUp}
          className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 dark:from-blue-500/20 dark:to-indigo-500/20 dark:border-white/20 p-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <AlertCircle size={24} className="text-blue-600 dark:text-blue-400" />
            Important Instructions
          </h3>
          <ul className="space-y-2 text-gray-700 dark:text-indigo-100">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <span>Students must report to the examination hall 15 minutes before the scheduled time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <span>Carry your valid ID card and admit card to the examination hall</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <span>Mobile phones and electronic devices are strictly prohibited unless specified</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
              <span>Check the official notice board for any last-minute changes in the schedule</span>
            </li>
          </ul>
        </motion.div>
      </section>
    </main>
  );
};

export default TimeTable;
