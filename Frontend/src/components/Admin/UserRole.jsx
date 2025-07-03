import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const Backurl = import.meta.env.VITE_API_BASE_URL;


const UserRole = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handle401 = () => {
    toast.error("Session expired. Please log in again.");
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") {
        logout();
      }
    }, 5000);
  };

  const fetchUsers = async () => {
    setRefreshing(true);
    setLoading(true);
    try {
      const res = await axios.get(`${Backurl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setUsers(sorted);
      } else {
        console.error("Invalid response format:", res.data);
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        handle401();
      } else {
        toast.error("Failed to load users");
      }
      setUsers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(
        `${Backurl}/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Role updated successfully");
      await fetchUsers();
    } catch (err) {
      console.error("Error updating role:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        handle401();
      } else {
        toast.error("Failed to update role");
      }
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${Backurl}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted");
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        handle401();
      } else {
        toast.error("Failed to delete user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin - User Role Management</h2>

      <button
        onClick={fetchUsers}
        disabled={refreshing}
        className={`mb-4 px-4 py-2 flex items-center gap-2 rounded text-white transition 
        ${
          refreshing
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <span className={`inline-block ${refreshing ? "animate-spin" : ""}`}>
          🔄
        </span>
        {refreshing ? "Refreshing..." : "Refresh User List"}
      </button>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-[800px] w-full text-sm border-collapse border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="border p-2 dark:text-white">Name</th>
              <th className="border p-2 dark:text-white">Email</th>
              <th className="border p-2 dark:text-white">Role</th>
              <th className="border p-2 dark:text-white">Google</th>
              <th className="border p-2 dark:text-white">Registered</th>
              <th className="border p-2 dark:text-white">Change Role</th>
              <th className="border p-2 dark:text-white">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-center even:bg-gray-50 dark:even:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <td className="border p-2 dark:text-gray-200">{user.name}</td>
                <td className="border p-2 dark:text-gray-200">{user.email}</td>
                <td className="border p-2 capitalize dark:text-gray-200">
                  {user.role}
                </td>
                <td className="border p-2">
                  {user.isGoogle ? (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">No</span>
                  )}
                </td>
                <td className="border p-2 text-sm dark:text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="border p-1 rounded dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRole;
