import React from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

/**
 * Breadcrumbs Component
 * @param {Array} items - Array of objects containing label and path (optional)
 * Example: items = [{ label: "Notes", path: "/notes" }, { label: "First Year" }]
 */
const Breadcrumbs = ({ items }) => {
  return (
    <nav className="breadcrumb flex mb-8 px-2" aria-label="Breadcrumb">
      <ol className="breadcrumb inline-flex items-center space-x-1 md:space-x-3 text-sm text-gray-600 dark:text-gray-300">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="hover:text-indigo-500 transition flex items-center gap-1 group"
          >
            <Home
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <ChevronRight size={16} className="text-gray-400 mx-1 md:mx-2" />
            {item.path ? (
              <Link to={item.path} className="hover:text-indigo-500 transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-indigo-600 dark:text-indigo-400 font-medium truncate max-w-[150px] md:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
