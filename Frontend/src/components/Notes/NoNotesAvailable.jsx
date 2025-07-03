import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NoNotesAvailable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
    >
      <img
        src="images/undraw.svg"
        alt="No Notes"
        className="w-62 sm:w-60 mb-8"
      />

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Notes Not Available
      </h1>

      {/* Message */}
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6">
        We’re sorry, notes for this branch haven’t been uploaded yet. We're
        actively working to make them available soon. Stay tuned!
      </p>

      {/* Back Button */}
      <Link
        to="/branch"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-200"
      >
        Go Back to Branch
      </Link>
    </motion.div>
  );
};

export default NoNotesAvailable;
