import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const categories = [
    {
      title: "NOTES",
      description:
        "Download unit-wise notes for all subjects across semesters and branches.",
      link: "/branch",
      icon: "images/school.svg",
    },
    {
      title: "Syllabus \\ Scheme",
      description:
        "Explore branch-wise syllabus, credit system, and semester structure.",
      link: "/syllabus",
      icon: "images/auto_stories.svg",
    },
    {
      title: "Important Questions",
      description:
        "Unit-wise questions curated from previous years and university papers.",
      icon: "images/star_.svg",
      disabled: true,
    },
    {
      title: "Previous Year Questions",
      description:
        "Get access to PYQs with over 60% repeat questions in exams.",
      icon: "images/local.svg",
      disabled: true,
    },
  ];

  const filteredCategories = categories.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestrictedAccess = (e) => {
    e.preventDefault(); // prevent navigation
    toast.info("🚫 Access Denied: Admins only.");
  };
  const handleComingSoon = (e) => {
    e.preventDefault();
    toast.info(" Update Soon!");
  };

  const [recentUploads, setRecentUploads] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  useEffect(() => {
    const fetchRecentUploads = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/notes/recent`
        );
        setRecentUploads(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoadingRecent(false);
      }
    };

    fetchRecentUploads();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        <main>
          <div>
            <section className="relative flex-grow">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"></div>
              <div className="max-w-7xl mx-auto px-4 py-24 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
                  Unlock Your Academic Potential
                </h1>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                  Find Your Perfect Learning Resources
                </p>
                <div className="max-w-2xl mx-auto">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 dark:text-gray-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search for Categories (Notes, Syllabus, or Important Question...."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-indigo-500 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 dark:bg-gray-900 dark:text-gray-200"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="mb-12">
              <section className="py-6 bg-gray-50 dark:bg-gray-900 flex-grow">
                <div className="max-w-8xl mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                    Popular Categories
                  </h2>

                  {filteredCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {filteredCategories.map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 100 }}
                          title={item.disabled ? "Coming Soon!" : ""}
                          className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl dark:hover:shadow-md overflow-hidden subject-card dark:bg-gray-900 dark:hover:shadow-blue-800   dark:text-gray-200 border border-indigo-500 ${
                            item.disabled ? "cursor-not-allowed opacity-" : ""
                          }`}
                        >
                          <Link
                            to={item.disabled ? "#" : item.link}
                            onClick={
                              item.disabled ? handleComingSoon : undefined
                            }
                            className="flex flex-col items-center"
                          >
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
                              <img
                                src={item.icon}
                                alt={item.title}
                                className="w-10 h-10"
                              />
                            </div>
                            <h3 className="text-lg font-semibold text-center mb-2 text-gray-900 dark:text-white">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                              {item.description}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
                      Oops! No matching category found. 😔
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Quick Links */}
            <section className="bg-white dark:bg-gray-900 py-12">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                  Quick Links
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">

                    {/* Upload Notes (Admin Only) */}
                  <Link
                    to={user?.role === "admin" ? "/admin" : "#"}
                    onClick={
                      user?.role !== "admin"
                        ? handleRestrictedAccess
                        : undefined
                    }
                    className={`p-4 rounded-lg transition bg-[#7f74ef] dark:bg-[#594de2] text-black dark:text-white hover:bg-[#6153f5] dark:hover:bg-[#7b71f0] ${
                      user?.role !== "admin" && " cursor-not-allowed"
                    }`}
                  >
                  🧑‍💻 Admin Dashboard
                  </Link>

                  {/* Upload Notes (Admin Only) */}
                  <Link
                    to={user?.role === "admin" ? "/admin/upload-notes" : "#"}
                    onClick={
                      user?.role !== "admin"
                        ? handleRestrictedAccess
                        : undefined
                    }
                    className={`p-4 rounded-lg transition bg-[#e879e6] dark:bg-[#b857b6] text-black dark:text-white hover:bg-[#b74ab5] dark:hover:bg-[#915790] ${
                      user?.role !== "admin" && " cursor-not-allowed"
                    }`}
                  >
                    📤 Upload Notes (Admin)
                  </Link>

                  {/* Manage Syllabus (Admin Only) */}
                  <Link
                    to={user?.role === "admin" ? "/admin/syllabus-table" : "#"}
                    onClick={
                      user?.role !== "admin"
                        ? handleRestrictedAccess
                        : undefined
                    }
                    className={`p-4 rounded-lg transition bg-green-300 dark:bg-green-600 text-black dark:text-white hover:bg-green-400 dark:hover:bg-[#67AE6E] ${
                      user?.role !== "admin" && " cursor-not-allowed"
                    }`}
                  >
                    ✅ Manage Syllabus (Admin)
                  </Link>

                  {/* User Roles */}
                  <Link
                    to={user?.role === "admin" ? "/admin/users" : "#"}
                    onClick={
                      user?.role !== "admin"
                        ? handleRestrictedAccess
                        : undefined
                    }
                    className={`p-4 rounded-lg transition bg-amber-200 dark:bg-[#db3333] text-black dark:text-white hover:bg-amber-300 dark:hover:bg-[#A62C2C] ${
                      user?.role !== "admin" && " cursor-not-allowed "
                    }`}
                  >
                    👥 User Roles (View, Edit or Upgrade roles) <br />
                  </Link>

                  {/* Feedback & Support - always enabled */}
                  <Link
                    to="mailto:lms.secure.access@gmail.com"
                    className="bg-orange-300 dark:bg-[#FFB823] text-black dark:text-white p-4 rounded-lg hover:bg-orange-400 dark:hover:bg-[#dfb251] transition"
                  >
                    💬 Feedback & Support
                  </Link>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 dark:bg-gray-900 py-12">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                  📥 Recently Uploaded Notes
                </h2>

                {loadingRecent ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Loading...
                  </p>
                ) : recentUploads.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No uploads yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentUploads.map((note) => (
                      <div
                        key={note._id}
                        className="bg-white dark:bg-gray-800 border border-indigo-300 dark:border-indigo-700 p-4 rounded-lg shadow hover:shadow-md transition"
                      >
                        <div className="text-gray-800 dark:text-white font-semibold">
                          📘 {note.subject} ({note.unit})
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {note.branch && <>🏢 {note.branch} | </>}
                          {note.year && <>{note.year} | </>}
                          {note.semester}
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          📅 Uploaded on{" "}
                          {new Date(note.createdAt).toLocaleDateString()}
                        </div>

                        <button
                          onClick={() => {
                            if (!user) {
                              toast.info("🔐 Please log in to access notes");
                              setTimeout(() => {
                                navigate("/login");
                              }, 1500);
                            } else {
                              navigate("/notes");
                            }
                          }}
                          className="inline-block mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-600 text-sm"
                        >
                          {user ? "🚀 Go to Notes" : "🔐 Login to Access"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                  Why Use JIT Learning System?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-900 p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      🎯 Curated Resources
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Handpicked notes, PYQs, and questions aligned with RGPV
                      standards.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      ⚡ Fast Access
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Fast, responsive UI with search, filters, and
                      subject-based navigation.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      🔒 Secure Uploads
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Admin-approved material with role-based upload
                      permissions.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      📚 Semester-wise Coverage
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Access structured content for each semester across all
                      departments.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      👨‍🏫 Role-Based System
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Students, teachers, and admins each have tailored features
                      and permissions.
                    </p>
                  </div>
                  <div className="bg-white dark:bg-gray-900 p-6 border rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      💬 Feedback Friendly
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Always open to suggestions for improving learning
                      experiences.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </motion.div>
    </>
  );
}

export default Home;
