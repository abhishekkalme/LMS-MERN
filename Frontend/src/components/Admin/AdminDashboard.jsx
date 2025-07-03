import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    return (
      <div className="text-center py-20 text-red-500 text-lg font-semibold">
        ❌ Access Denied: Admins only
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">
        Welcome, Admin 👋
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
      <Link
          to="/admin/upload-notes"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">📒 Upload Notes </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Add Notes (PDF) </p>
        </Link>
        {/* Add Syllabus */}
        <Link
          to="/admin/add-syllabus"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">➕ Add Syllabus</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Insert new syllabus entries (PDFs, program, branch...)</p>
        </Link>

        {/* Edit/Delete Syllabus */}
        <Link
          to="/admin/syllabus-table"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">🗂 Manage Syllabus</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Edit, delete, or review syllabus entries</p>
        </Link>

        {/* Optional: User Management */}
        <Link
          to="/admin/users"
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">👥 User Roles</h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">View, Upgrade and Delete User roles</p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
