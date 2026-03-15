import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Calculator, GraduationCap } from "lucide-react";

const GPACalculator = () => {
  const [activeTab, setActiveTab] = useState("SGPA");
  
  // SGPA Stats
  const [courses, setCourses] = useState([
    { id: 1, name: "", credits: "", grade: "" },
  ]);

  // CGPA Stats
  const [semesters, setSemesters] = useState([
    { id: 1, sgpa: "", credits: "" },
  ]);

  const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0,
  };

  // SGPA Functions
  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: "", credits: "", grade: "" }]);
  };

  const removeCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const updateCourse = (id, field, value) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateSGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const credits = parseFloat(course.credits);
      const grade = course.grade.toUpperCase();
      if (!isNaN(credits) && gradePoints.hasOwnProperty(grade)) {
        totalPoints += credits * gradePoints[grade];
        totalCredits += credits;
      }
    });

    return totalCredits === 0 ? "0.00" : (totalPoints / totalCredits).toFixed(2);
  };

  // CGPA Functions
  const addSemester = () => {
    setSemesters([...semesters, { id: Date.now(), sgpa: "", credits: "" }]);
  };

  const removeSemester = (id) => {
    setSemesters(semesters.filter((sem) => sem.id !== id));
  };

  const updateSemester = (id, field, value) => {
    setSemesters(
      semesters.map((sem) =>
        sem.id === id ? { ...sem, [field]: value } : sem
      )
    );
  };

  const calculateCGPA = () => {
    let totalProduct = 0; // Sum of (SGPA * Credits)
    let totalCredits = 0; // Sum of Credits

    semesters.forEach((sem) => {
      const sgpa = parseFloat(sem.sgpa);
      const credits = parseFloat(sem.credits);

      if (!isNaN(sgpa) && !isNaN(credits)) {
        totalProduct += sgpa * credits;
        totalCredits += credits;
      }
    });

    return totalCredits === 0 ? "0.00" : (totalProduct / totalCredits).toFixed(2);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-zinc-800"
      >
        <div className="flex flex-col items-center justify-center mb-8">
            <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    Grade Calculator
                </h1>
            </div>

            {/* Tab Switcher */}
            <div className="flex p-1 space-x-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
                {["SGPA", "CGPA"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
                            px-8 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                            ${activeTab === tab 
                                ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm" 
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }
                        `}
                    >
                        {tab} Calculator
                    </button>
                ))}
            </div>
        </div>

        {activeTab === "SGPA" ? (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
            >
                <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr>
                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700">Course Name</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700 w-24">Credits</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700 w-32">Grade</th>
                        <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700 w-16"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.map((course) => (
                        <tr key={course.id} className="group">
                        <td className="p-3 border-b border-gray-100 dark:border-zinc-800">
                            <input
                            type="text"
                            placeholder="e.g. Mathematics"
                            value={course.name}
                            onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-zinc-600"
                            />
                        </td>
                        <td className="p-3 border-b border-gray-100 dark:border-zinc-800">
                            <input
                            type="number"
                            placeholder="4"
                            value={course.credits}
                            onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-zinc-600"
                            />
                        </td>
                        <td className="p-3 border-b border-gray-100 dark:border-zinc-800">
                            <select
                            value={course.grade}
                            onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
                            >
                            <option value="">Select</option>
                            {Object.keys(gradePoints).map((grade) => (
                                <option key={grade} value={grade} className="text-gray-900">
                                {grade}
                                </option>
                            ))}
                            </select>
                        </td>
                        <td className="p-3 border-b border-gray-100 dark:border-zinc-800 text-right">
                            <button
                            onClick={() => removeCourse(course.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                            <Trash2 size={18} />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                <button
                    onClick={addCourse}
                    className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
                >
                    <Plus size={18} className="mr-1" /> Add Course
                </button>
                
                <div className="text-xl font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-zinc-800 px-6 py-3 rounded-xl">
                    SGPA: <span className="text-indigo-600 dark:text-indigo-400">{calculateSGPA()}</span>
                </div>
                </div>
            </motion.div>
        ) : (
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
            >
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl mb-6 text-sm text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                    <p>Enter the <strong>SGPA</strong> and <strong>Total Credits</strong> for each semester you have completed. </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr>
                            <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700">Semester</th>
                            <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700 w-32">SGPA</th>
                            <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700 w-32">Credits</th>
                            <th className="p-3 text-sm font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-zinc-700 w-16"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {semesters.map((sem, index) => (
                            <tr key={sem.id} className="group">
                            <td className="p-3 border-b border-gray-100 dark:border-zinc-800 text-gray-500 dark:text-gray-400 font-medium">
                                Semester {index + 1}
                            </td>
                            <td className="p-3 border-b border-gray-100 dark:border-zinc-800">
                                <input
                                type="number"
                                placeholder="8.5"
                                step="0.01"
                                min="0" 
                                max="10"
                                value={sem.sgpa}
                                onChange={(e) => updateSemester(sem.id, "sgpa", e.target.value)}
                                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-zinc-600"
                                />
                            </td>
                            <td className="p-3 border-b border-gray-100 dark:border-zinc-800">
                                <input
                                type="number"
                                placeholder="22"
                                value={sem.credits}
                                onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                                className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-zinc-600"
                                />
                            </td>
                            <td className="p-3 border-b border-gray-100 dark:border-zinc-800 text-right">
                                <button
                                onClick={() => removeSemester(sem.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                <Trash2 size={18} />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={addSemester}
                        className="flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-colors"
                    >
                        <Plus size={18} className="mr-1" /> Add Semester
                    </button>
                    
                    <div className="text-xl font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-zinc-800 px-6 py-3 rounded-xl">
                        CGPA: <span className="text-indigo-600 dark:text-indigo-400">{calculateCGPA()}</span>
                    </div>
                </div>
            </motion.div>
        )}
      </motion.div>

      {/* RGPV Ordinance Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl mt-8"
      >
        <details className="group bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden">
          <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg mr-3">
                📜
              </span>
              RGPV Ordinance No.4 (A) - Grading System Rules
            </h2>
            <span className="transform group-open:rotate-180 transition-transform duration-200 text-gray-500">
              ▼
            </span>
          </summary>
          
          <div className="px-6 pb-8 text-gray-600 dark:text-gray-300 text-sm space-y-6 border-t border-gray-100 dark:border-zinc-800 pt-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">1. Degree Designation</h3>
              <p>The four-year course is designated as <strong>BACHELOR OF ENGINEERING (B.E.)</strong>. Evaluation is based on Marks-Cum-Credit system with final grading as per Ordinance No. 30 (Credit Based Grading System).</p>

              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-4 mb-2">2. Passing & Promotion Rules</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Minimum CGPA:</strong> A minimum CGPA of <strong>5.0</strong> is required for the award of the degree.</li>
                <li><strong>Passing Grade:</strong> Minimum grade required to pass a subject is <strong>D</strong>. Candidates must score grade D separately in Theory and Practical.</li>
                <li><strong>Year Progression:</strong> A candidate failing in more than 5 subjects (Theory & Practical count as separate) in a year will not be promoted to the next year.</li>
                <li><strong>Promotion to 3rd Year:</strong> Must have fully passed 1st Year with min CGPA 5.0.</li>
                <li><strong>Promotion to 4th Year:</strong> Must have fully passed 1st and 2nd Year with min CGPA 5.0.</li>
              </ul>

              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-4 mb-2">3. Grading System</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-zinc-800">
                    <tr>
                      <th className="px-3 py-2">Grade</th>
                      <th className="px-3 py-2">Marks Range</th>
                      <th className="px-3 py-2">Point</th>
                      <th className="px-3 py-2">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
                    <tr><td className="px-3 py-1">A+</td><td className="px-3 py-1">91-100</td><td className="px-3 py-1">10</td><td className="px-3 py-1">Outstanding</td></tr>
                    <tr><td className="px-3 py-1">A</td><td className="px-3 py-1">81-90</td><td className="px-3 py-1">9</td><td className="px-3 py-1">Excellent</td></tr>
                    <tr><td className="px-3 py-1">B+</td><td className="px-3 py-1">71-80</td><td className="px-3 py-1">8</td><td className="px-3 py-1">Very Good</td></tr>
                    <tr><td className="px-3 py-1">B</td><td className="px-3 py-1">61-70</td><td className="px-3 py-1">7</td><td className="px-3 py-1">Good</td></tr>
                    <tr><td className="px-3 py-1">C+</td><td className="px-3 py-1">51-60</td><td className="px-3 py-1">6</td><td className="px-3 py-1">Average</td></tr>
                    <tr><td className="px-3 py-1">C</td><td className="px-3 py-1">41-50</td><td className="px-3 py-1">5</td><td className="px-3 py-1">Satisfactory</td></tr>
                    <tr><td className="px-3 py-1">D</td><td className="px-3 py-1">31-40</td><td className="px-3 py-1">4</td><td className="px-3 py-1">Marginal</td></tr>
                    <tr><td className="px-3 py-1">F</td><td className="px-3 py-1">≤ 30</td><td className="px-3 py-1">0</td><td className="px-3 py-1">Fail</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white text-base mt-4 mb-2">4. Award of Division</h3>
              <p>Division is awarded after the final semester based on integrated performance across all 4 years:</p>
               <ul className="list-disc pl-5 space-y-1">
                <li><strong>First Division with Honours:</strong> CGPA ≥ 7.5</li>
                <li><strong>First Division:</strong> 6.5 ≤ CGPA &lt; 7.5</li>
                <li><strong>Second Division:</strong> 5.0 ≤ CGPA &lt; 6.5</li>
              </ul>
              <p className="mt-2 text-xs italic opacity-70">Percentage = CGPA × 10</p>
            </div>
          </div>
        </details>
      </motion.div>
    </div>
  );
};

export default GPACalculator;
