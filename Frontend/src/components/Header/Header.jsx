import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import logoIcon from "../../../src/assets/logo.png"; 
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [hovered, setHovered] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <div className="bg-[#6366f1] text-white text-center py-1 text-xs">
        Welcome to JIT Learning System - Your Academic Resource Center
      </div>

      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-8xl mx-auto px-4 h-14 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 bg-[#6366F1] rounded-full flex items-center justify-center text-white overflow-hidden">
                <img
                  src={logoIcon}
                  alt="Logo"
                  className="object-contain rounded-full"
                />
              </span>

              <Link to={"/"}>
                <span className=" font-semibold text-[#6366F1] dark:text-white">
                  JIT Learning
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="mx-auto hidden md:flex items-center space-x-8 justify-center text-center">
              {["Home", "Notes", "Syllabus", "About", "Contact-us"].map(
                (item, index) => (
                  <NavLink
                    key={index}
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "")}`
                    }
                    className="relative font-medium text-gray-700 dark:text-gray-300 hover:text-[#6366F1] dark:hover:text-[#A5B4FC]"
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {({ isActive }) => (
                      <div className="flex flex-col items-center">
                        <span
                          className={
                            isActive ? "text-[#6366F1] dark:text-[#A5B4FC]" : ""
                          }
                        >
                          {item}
                        </span>
                        <div className="relative w-full h-[2px] mt-1">
                          {(isActive || hovered === index) && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              exit={{ width: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className="absolute left-0 h-full bg-[#6366F1] dark:bg-[#A5B4FC] rounded-full"
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </NavLink>
                )
              )}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </nav>

            {/* Right: Auth & Mobile */}
            <div className="flex items-center space-x-1">
              <div className="hidden md:block">
                {isLoggedIn ? (
                  <>
                    <span className="font-medium text-sm mr-3">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      <i className="ri-logout-box-r-line"></i> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="bg-[#6366F1] text-white px-6 py-2 rounded-full hover:bg-[#5558E6] font-medium"
                  >
                    <i className="ri-login-box-line"></i> Login
                  </Link>
                )}
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-xl text-gray-700 dark:text-white"
                >
                  {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white  dark:bg-gray-900  mx-1 rounded shadow-lg overflow-hidden"
            initial={{ height: 2 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {["Home", "Notes", "Syllabus", "About", "Contact-us"].map(
              (item, index) => (
                <NavLink
                  key={index}
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "")}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                  className="block mx-3 mt-3 border-b border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                >
                  {item}
                </NavLink>
              )
            )}

            <label className="relative mt-3 mx-3 inline-flex items-center cursor-point">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer "
              />
              <div className="w-11 h-6  bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:bg-blue-600 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>

            <div className="pt-3">
              {isLoggedIn ? (
                <>
                  <span className="block text-sm mx-4 mb-2">{user?.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full block text-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
