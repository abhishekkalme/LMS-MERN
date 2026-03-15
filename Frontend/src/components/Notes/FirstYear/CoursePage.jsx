import React, { useState } from "react";
import axios from "axios";
import { useParams, useLocation, Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Library } from "lucide-react";
import Breadcrumbs from "../../Common/Breadcrumbs";
import { logActivity } from "../../../utils/activityLogger";
import DiscussionSection from "../../Common/DiscussionSection";
const Backurl = import.meta.env.VITE_API_BASE_URL;

const clean = (str) => str.replace(/\s+/g, "_");

// Robust normalization for branch, year, semester
const normalizeData = (data) => {
  if (!data) return {};
  let { branch, year, semester } = data;

  if (branch) branch = branch.toUpperCase();

  if (year) {
    // Convert "FirstYear" to "First Year"
    year = year.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    // Capitalize first letters
    year = year.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  }

  if (semester) {
    // Extract just the number
    const num = semester.toString().replace(/\D/g, "");
    semester = num || semester;
  }

  return { branch, year, semester };
};

import courseData from "../Data/courseData";

const CoursePage = () => {
  const { subjectCode: rawSubjectCode } = useParams();
  const subjectCode = rawSubjectCode?.toUpperCase();
  const location = useLocation();
  const { branch: rawBranch, year: rawYear, semester: rawSemester } = normalizeData(location.state || {});

  const [branch, setBranch] = useState(rawBranch);
  const [year, setYear] = useState(rawYear);
  const [semester, setSemester] = useState(rawSemester);
  const [isRecovering, setIsRecovering] = useState(!rawBranch || !rawYear || !rawSemester);

  const [previewUrl, setPreviewUrl] = useState(null);
  const [dbNotes, setDbNotes] = useState([]);
  const [importantQuestions, setImportantQuestions] = useState([]);
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const recoveryAttempted = React.useRef(false);

  React.useEffect(() => {
    if ((!branch || !year || !semester) && !recoveryAttempted.current && subjectCode) {
      recoveryAttempted.current = true;
      setIsRecovering(true);
      console.log("🔍 [Recovery] Context missing. Attempting to recover for:", subjectCode);

      axios.get(`${Backurl}/api/search?q=${subjectCode}`)
        .then(res => {
          console.log("🔍 [Recovery] Search results found:", res.data.length);
          // Find ANY result matching the subject code to get metadata
          const match = res.data.find(r =>
            (r.subjectCode || r.subject || "").toUpperCase() === subjectCode
          );

          if (match) {
            console.log("✅ [Recovery] Full Match Object:", match);
            const normalized = normalizeData(match);

            setBranch(normalized.branch || "CSE");
            setYear(normalized.year || "First Year");
            setSemester(normalized.semester || "1");

            console.log("📝 [Recovery] Setting state:", normalized);
          } else {
            console.warn("❌ [Recovery] No match found in results for:", subjectCode);
          }
          setIsRecovering(false);
        })
        .catch(err => {
          console.error("❌ [Recovery] API Error:", err);
          setIsRecovering(false);
        });
    } else if (branch && year && semester) {
      setIsRecovering(false);
    }
  }, [subjectCode, branch, year, semester]);

  React.useEffect(() => {
    if (branch && year && semester && subjectCode) {
      setLoading(true);
      const formattedSemester = `Semester_${semester.replace(/\D/g, "")}`;
      // Fetch availability directly from Cloudinary via the backend
      axios.get(`${Backurl}/api/subject-catalog/${branch}/${year}/${formattedSemester}/${subjectCode}`)
        .then(res => {
          console.log("Notes catalog received:", res.data);
          // Cloudinary metadata might have 'url' instead of 'fileUrl'
          const formattedNotes = res.data.map(n => ({
            unit: n.unit,
            fileUrl: n.url,
            createdAt: n.createdAt
          }));
          setDbNotes(formattedNotes);
          setLoading(false);
          if (formattedNotes.length === 0) {
            console.log(`ℹ️ [Catalog] No units found for ${subjectCode} in Cloudinary.`);
          }
        })
        .catch(err => {
          console.error("Error fetching Cloudinary catalog:", err);
          setLoading(false);
        });

      // Fetch Important Questions
      axios.get(`${Backurl}/api/questions/search`, {
        params: { branch, year, semester, subject: subjectCode }
      })
        .then(res => setImportantQuestions(res.data || []))
        .catch(err => console.error("Error fetching Important Questions:", err));

      // Fetch PYQs
      axios.get(`${Backurl}/api/pyqs/search`, {
        params: { branch, year, semester, subject: subjectCode }
      })
        .then(res => setPyqs(res.data || []))
        .catch(err => console.error("Error fetching PYQs:", err));
    }
  }, [branch, year, semester, subjectCode]);

  if (isRecovering || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 animate-pulse font-medium">Preparing course materials...</p>
        </div>
      </div>
    );
  }

  if (!branch || !year || !semester) {
    console.log("⚠️ [Check] Missing Context! Details:", { branch, year, semester, isRecovering, loading });
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-8 rounded-2xl max-w-md">
          <i className="ri-error-warning-line text-4xl mb-4 block"></i>
          <h2 className="text-xl font-bold mb-2">Missing Context</h2>
          <p className="mb-6">Please navigate to this page via the Notes section.</p>
          <Link to="/notes" className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">Go to Notes</Link>
        </div>
      </div>
    );
  }

  const subject = courseData[subjectCode];
  if (!subject)
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 p-8 rounded-2xl max-w-md">
          <i className="ri-file-search-line text-4xl mb-4 block"></i>
          <h2 className="text-xl font-bold mb-2">Subject Not Found</h2>
          <p className="mb-6">We couldn't find data for subject code: {subjectCode}</p>
          <Link to="/notes" className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-700 transition">Go Back</Link>
        </div>
      </div>
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
            { label: year, path: `/notes/${year.replace(/\s+/g, "").toLowerCase()}` },
            { label: subject.name }
          ]}
        />

        <motion.div {...fadeUp} className="mb-12 relative z-10">
          <span className="inline-flex items-center mb-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-indigo-200 text-xs tracking-wide font-medium border border-indigo-200 dark:border-white/10">
            <Library size={16} className="mr-2" /> {subjectCode}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 dark:text-white leading-tight">
            {subject.name}
          </h1>
          <p className="text-gray-600 dark:text-indigo-200 text-lg max-w-3xl">
            Comprehensive notes, unit-wise breakdown, and study materials for your semester exams.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-20">
          {subject.units.map((unit, index) => {
            const unitNumber = index + 1;
            const dbNote = dbNotes.find(n => n.unit.includes(unitNumber.toString()));
            const isAvailable = !!dbNote;
            const downloadUrl = isAvailable ? dbNote.fileUrl : "#";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none backdrop-blur-sm overflow-hidden hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-900/10 transition-all duration-300 group flex flex-col h-full ${!isAvailable ? 'opacity-75 grayscale-[0.5]' : ''}`}
              >
                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${isAvailable ? 'text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30' : 'text-gray-500 bg-gray-100 dark:bg-white/5'}`}>
                      Unit {unitNumber}
                    </span>
                    {!isAvailable && (
                      <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                        <i className="ri-time-line"></i> COMING SOON
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors relative z-10">
                    {unit.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow leading-relaxed relative z-10">
                    {unit.description}
                  </p>

                  <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-3 relative z-10">
                    <button
                      disabled={!isAvailable}
                      onClick={() => setPreviewUrl(downloadUrl)}
                      className={`flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isAvailable ? 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20' : 'text-gray-400 bg-gray-50 dark:bg-white/5 cursor-not-allowed'}`}
                    >
                      <i className="ri-eye-line"></i> {isAvailable ? 'Preview' : 'No Preview'}
                    </button>

                    <a
                      href={downloadUrl}
                      target={isAvailable ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!isAvailable) {
                          e.preventDefault();
                        } else {
                          logActivity("academic", `Downloaded Note: ${subject.name} - Unit ${unitNumber}`, window.location.pathname);

                          // Increment download counter
                          if (dbNote && dbNote._id) {
                            axios.put(`${Backurl}/api/notes/${dbNote._id}/download`)
                              .catch(err => console.error("Failed to increment download count", err));
                          }
                        }
                      }}
                      className={`flex-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-md ${isAvailable ? 'text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-indigo-500/20' : 'text-gray-400 bg-gray-100 dark:bg-white/5 shadow-none cursor-not-allowed'}`}
                    >
                      <i className="ri-download-line"></i> {isAvailable ? 'Download' : 'Unavailable'}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Important Questions Section */}
        {importantQuestions.length > 0 && (
          <motion.div {...fadeUp} className="mt-16 relative z-10 pb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <i className="ri-question-line text-amber-500"></i> Important Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantQuestions.map((q, idx) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
                      {q.unit}
                    </span>
                    <i className="ri-file-pdf-fill text-2xl text-red-500"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-4">{q.subject} - Unit {q.unit.replace(/\D/g, "")}</h3>
                  <button
                    onClick={() => {
                      setPreviewUrl(q.fileUrl);
                      logActivity("academic", `Viewed Important Questions: ${q.subject}`, window.location.pathname);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    View Questions
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Previous Year Papers (PYQ) Section */}
        {pyqs.length > 0 && (
          <motion.div {...fadeUp} className="mt-16 relative z-10 pb-20">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <i className="ri-history-line text-blue-500"></i> Previous Year Papers (PYQ)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pyqs.map((q, idx) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/50 dark:bg-white/5 border border-blue-100 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                      {q.examSession}
                    </span>
                    <i className="ri-file-pdf-fill text-2xl text-red-500"></i>
                  </div>
                  <h3 className="text-lg font-bold mb-4">{q.subject} - {q.examSession}</h3>
                  <button
                    onClick={() => {
                      setPreviewUrl(q.fileUrl);
                      logActivity("academic", `Viewed PYQ Paper: ${q.subject} (${q.examSession})`, window.location.pathname);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    View Paper
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Peer-to-Peer Discussion Section */}
        <DiscussionSection courseId={subjectCode} />
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setPreviewUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <i className="ri-file-pdf-line text-red-500"></i> PDF Preview
                </h3>
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>
              <div className="flex-grow bg-gray-100 dark:bg-black/50 p-1">
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  className="w-full h-full border-0 rounded-b-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursePage;
