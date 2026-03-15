import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { GraduationCap, Search, FileText, History, HelpCircle, Loader2 } from "lucide-react";
import logoIcon from "../../../src/assets/logo.png";
import axios from "axios";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout?.();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleTheme = () => (setDarkMode ? setDarkMode(!darkMode) : null);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length > 1) {
        setIsSearching(true);
        try {
          console.log("Searching for:", searchQuery);
          const res = await axios.get(`${API_BASE_URL}/api/search?q=${searchQuery}`);
          console.log("Search results:", res.data);
          setSearchResults(res.data);
          setShowResults(true);
        } catch (err) {
          console.error("Search failed:", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchResultClick = (result) => {
    setShowResults(false);
    setSearchQuery("");
    if (result.type === "Note") {
      const subjectCode = (result.subjectCode || result.subject || "").toUpperCase();
      navigate(`/notes/${subjectCode}`, {
        state: {
          branch: result.branch,
          year: result.year,
          semester: result.semester
        }
      });
    } else if (result.type === "PYQ") {
      navigate("/pyqs"); // Could be improved to scroll/filter
    } else {
      navigate("/important-questions");
    }
  };

  const primaryLinks = [
    { name: "Home", path: "/" },
    { name: "Notes", path: "/notes" },
    { name: "Questions", path: "/important-questions" },
    { name: "PYQs", path: "/pyqs" },
  ];

  const secondaryLinks = [
    { name: "Syllabus", path: "/syllabus" },
    { name: "TimeTable", path: "/timetable" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contactus" },
  ];

  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ease-out ${scrolled
        ? "bg-white/90 border-b border-gray-200 shadow-sm dark:bg-black/95 dark:border-white/10 dark:shadow-none"
        : "bg-white/50 border-b border-transparent dark:bg-black/20 dark:border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-16"}`}>
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6366F1] to-[#7C3AED] flex items-center justify-center overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="text-white w-5 h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-gray-900 dark:text-white tracking-tight">
                  Learnify
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium hidden xl:block">
                  Academic Center
                </span>
              </div>
            </Link>
          </div>

          {/* Global Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-[180px] lg:max-w-sm mx-4 lg:mx-6 relative search-container">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 2 && setShowResults(true)}
                className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-black/40 rounded-full py-1.5 pl-9 pr-9 text-sm outline-none transition-all dark:text-white placeholder:text-gray-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-indigo-500 transition-colors">
                    <RiCloseLine size={16} />
                  </button>
                )}
                {isSearching && (
                  <Loader2 className="animate-spin text-indigo-500 w-3 h-3" />
                )}
              </div>
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[380px] overflow-y-auto"
                >
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-white/5 last:border-0 text-left"
                    >
                      <div className={`p-2 rounded-lg ${result.type === "Note" ? "bg-blue-50 text-blue-600" :
                        result.type === "PYQ" ? "bg-purple-50 text-purple-600" : "bg-amber-50 text-amber-600"
                        }`}>
                        {result.type === "Note" ? <FileText size={14} /> :
                          result.type === "PYQ" ? <History size={14} /> : <HelpCircle size={14} />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold dark:text-gray-100 line-clamp-1">{result.label}</div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">{result.type} · {result.branch}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation (desktop) */}
          <div className="hidden md:flex md:items-center">
            <nav className="flex items-center gap-1 lg:gap-2">
              {primaryLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                      ? "text-indigo-600 bg-indigo-50/50 dark:text-indigo-300 dark:bg-white/5"
                      : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div
  className="relative ml-1"
  onMouseEnter={() => setShowMoreMenu(true)}
  onMouseLeave={() => setShowMoreMenu(false)}
>
  <button
    onClick={() => setShowMoreMenu(!showMoreMenu)}
    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      showMoreMenu
        ? "text-indigo-600 bg-indigo-50/50 dark:text-indigo-300 dark:bg-white/5"
        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
    }`}
  >
    More
    <motion.div
      animate={{ rotate: showMoreMenu ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </motion.div>
  </button>

  <AnimatePresence>
    {showMoreMenu && (
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 py-1"
      >
        {secondaryLinks.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-white/5"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5"
              }`
            }
            onClick={() => setShowMoreMenu(false)}
          >
            {item.name}
          </NavLink>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</div>
            </nav>
          </div>

          {/* Right side: auth + theme + mobile menu */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Theme toggle (desktop) */}
            <button
              onClick={toggleTheme}
              className="hidden md:inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {darkMode ? (
                <BsSunFill className="text-yellow-400 w-4 h-4" />
              ) : (
                <BsMoonFill className="text-indigo-500 w-4 h-4" />
              )}
            </button>

            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366F1] to-[#7C3AED] p-[2px] shadow-sm">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300 overflow-hidden">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          (user?.name || "U").slice(0, 1).toUpperCase()
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 hidden lg:block">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-bold px-5 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 dark:shadow-none transition-all duration-300"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              {/* Theme toggle (mobile) */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                title={darkMode ? "Switch to light" : "Switch to dark"}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition-all duration-300 active:scale-95 shadow-sm"
              >
                {darkMode ? (
                  <BsSunFill className="text-yellow-400 w-4 h-4" />
                ) : (
                  <BsMoonFill className="text-indigo-600 dark:text-indigo-300 w-4 h-4" />
                )}
              </button>

              <button
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
                onClick={() => setIsMenuOpen((s) => !s)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 active:scale-95"
              >
                {isMenuOpen ? (
                  <RiCloseLine size={24} />
                ) : (
                  <RiMenu3Line size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile slide down */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 dark:bg-black/90 dark:border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                  className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-indigo-500 rounded-xl py-2 pl-10 pr-10 text-sm outline-none transition-all dark:text-white"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                      <RiCloseLine size={16} />
                    </button>
                  )}
                  {isSearching && (
                    <Loader2 className="animate-spin text-indigo-500 w-4 h-4" />
                  )}
                </div>

                {/* Mobile Search Results (Inline) */}
                <AnimatePresence>
                  {showResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-lg max-h-[250px] overflow-y-auto"
                    >
                      {searchResults.map((result, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleSearchResultClick(result);
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-white/5 last:border-0 text-left"
                        >
                          <div className="text-sm font-semibold dark:text-white line-clamp-1">{result.label}</div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[...primaryLinks, ...secondaryLinks].map(
                (item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-base font-medium transition-all ${isActive
                        ? "text-indigo-600 bg-indigo-50 dark:text-indigo-300 dark:bg-white/5"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              )}

              <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
                {/* Theme toggle inside mobile menu as well (redundant but useful) */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-gray-200 px-3 py-2 rounded-md bg-white/5"
                >
                  {darkMode ? (
                    <BsSunFill className="text-yellow-400" />
                  ) : (
                    <BsMoonFill className="text-indigo-600 dark:text-indigo-300" />
                  )}
                  <span className="text-gray-700 dark:text-gray-200">{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>

                {isLoggedIn ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FDE68A] to-[#F59E0B] flex items-center justify-center text-sm font-semibold overflow-hidden">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          (user?.name || "U").slice(0, 1).toUpperCase()
                        )}
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">{user?.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-sm bg-red-600 px-3 py-1 rounded-md text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center bg-[#6366F1] text-white px-4 py-2 rounded-md"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header >
  );
};

export default Header;
