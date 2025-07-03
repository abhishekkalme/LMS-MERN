import React, { useState } from "react";
import { useParams, useLocation, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
const Backurl = import.meta.env.VITE_API_BASE_URL;

const clean = (str) => str.replace(/\s+/g, "_");

import courseData from "../Data/courseData";

const CoursePage = () => {
  const { subjectCode } = useParams();
  const location = useLocation();
  const { branch, year, semester } = location.state || {};
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!branch || !year || !semester) {
    return (
      <div className="text-center mt-10 text-red-600 text-lg">
        Missing subject context. Please navigate via the Notes page.
      </div>
    );
  }

  const subject = courseData[subjectCode];
  if (!subject)
    return (
      <h2 className="text-center text-red-500 text-xl">Subject Not Found</h2>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <nav className="breadcrumb flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-600 hover:text-indigo-500">
                Home
              </Link>
            </li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <li>
              <Link to="/notes" className="text-gray-600 hover:text-indigo-500">
                Notes
              </Link>
            </li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <li>
              <Link
                to={`/notes/${year}`}
                className="text-gray-600 hover:text-indigo-500"
              >
                {year}Sem{semester}
              </Link>
            </li>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <li>
              <NavLink
                to={`/notes/${subjectCode}`}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-indigo-600" : "text-gray-700"
                  } hover:text-indigo-500 font-medium`
                }
              >
                {subject.name}
              </NavLink>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
          {subject.name} - Units
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
          {subject.units.map((unit, index) => {
            const unitNumber = index + 1;
            const formattedSemester = `Semester_${semester.replace(/\D/g, "")}`;
            const downloadUrl = `${Backurl}/api/download/${clean(
              branch
            )}/${clean(year)}/${clean(
              formattedSemester
            )}/${subjectCode}/${unitNumber}`;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 border border-indigo-500 rounded-lg shadow-md p-6 hover:shadow-xl dark:hover:shadow-blue-800 dark:text-gray-200 transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {unit.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {unit.description}
                </p>

                <button
                  onClick={() => setPreviewUrl(downloadUrl)}
                  className="text-sm text-indigo-600 hover:underline mb-2"
                >
                  👁️‍🗨️ Preview Notes
                </button>

                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Download Notes
                  </a>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Preview */}
      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-white w-full max-w-4xl rounded shadow-lg overflow-hidden relative">
            <button
              onClick={() => setPreviewUrl(null)}
              className="absolute top-2 right-2 text-red-600 text-xl hover:text-red-800"
            >
              ✖
            </button>
            <iframe
              src={previewUrl}
              title="PDF Preview"
              className="w-full h-[80vh] border-0"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CoursePage;
