const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-6 px-4 border-b border-gray-300 dark:border-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Upload Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upload Type
          </label>
          <select
            value={filters.uploadType}
            onChange={(e) => handleChange("uploadType", e.target.value)}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          >
            <option>Scheme</option>
            <option>Syllabus</option>
          </select>
        </div>

        {/* Program */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Program
          </label>
          <select
            value={filters.program}
            onChange={(e) => handleChange("program", e.target.value)}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          >
            <option>B.Tech</option>
            <option>MCA</option>
            <option>MCA Dual Degree</option>
            <option>BE</option>
          </select>
        </div>

        {/* System Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            System Type
          </label>
          <select
            value={filters.systemType}
            onChange={(e) => handleChange("systemType", e.target.value)}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          >
            <option>Semester</option>
            <option>Annual</option>
            <option>All</option>
          </select>
        </div>

        {/* Grading System */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Grading System
          </label>
          <select
            value={filters.gradingSystem}
            onChange={(e) => handleChange("gradingSystem", e.target.value)}
            className="w-full rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          >
            <option>Grading System</option>
            <option>Non Grading System</option>
            <option>Lateral Entry</option>
            <option>CBCS</option>
            <option>CBGS</option>
            <option>As per COA</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
