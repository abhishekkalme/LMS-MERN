import { motion } from "framer-motion";

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="px-4 py-6 relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 p-6 rounded-2xl shadow-xl shadow-indigo-100/20 dark:shadow-none backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Upload Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 ml-1">
                Upload Type
              </label>
              <div className="relative">
                <select
                  value={filters.uploadType}
                  onChange={(e) => handleChange("uploadType", e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  <option>Scheme</option>
                  <option>Syllabus</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            {/* Program */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 ml-1">
                Program
              </label>
              <div className="relative">
                <select
                  value={filters.program}
                  onChange={(e) => handleChange("program", e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  <option>B.Tech</option>
                  <option>MCA</option>
                  <option>MCA Dual Degree</option>
                  <option>BE</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            {/* System Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 ml-1">
                System Type
              </label>
              <div className="relative">
                <select
                  value={filters.systemType}
                  onChange={(e) => handleChange("systemType", e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  <option>Semester</option>
                  <option>Annual</option>
                  <option>All</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>

            {/* Grading System */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-indigo-900 dark:text-indigo-200 ml-1">
                Grading System
              </label>
              <div className="relative">
                <select
                  value={filters.gradingSystem}
                  onChange={(e) => handleChange("gradingSystem", e.target.value)}
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  <option>Grading System</option>
                  <option>Non Grading System</option>
                  <option>Lateral Entry</option>
                  <option>CBCS</option>
                  <option>CBGS</option>
                  <option>As per COA</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FilterBar;
