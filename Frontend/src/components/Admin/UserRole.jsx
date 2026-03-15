import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../Common/Breadcrumbs";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Users, RefreshCw, Trash2, Shield, Mail, Calendar, Chrome } from "lucide-react";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

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
        setUsers([]);
      }
    } catch (err) {
      if (err.response?.status === 401) handle401();
      else toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const tid = toast.loading("Updating role...");
    try {
      await axios.put(
        `${Backurl}/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Role updated successfully", { id: tid });
      await fetchUsers();
    } catch (err) {
      if (err.response?.status === 401) handle401();
      else toast.error("Failed to update role", { id: tid });
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const tid = toast.loading("Deleting user...");
    try {
      await axios.delete(`${Backurl}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted", { id: tid });
      await fetchUsers();
    } catch (err) {
      if (err.response?.status === 401) handle401();
      else toast.error("Failed to delete user", { id: tid });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-80 -left-40 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Breadcrumbs 
          items={[
            { label: "Admin Dashboard", path: "/admin" },
            { label: "User Role Management" }
          ]} 
        />

        <motion.div {...fadeUp} className="mt-12 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">User Permissions</h1>
            <p className="text-gray-600 dark:text-indigo-200/70">Manage user roles and administrative access.</p>
          </div>
          <button
            onClick={fetchUsers}
            disabled={refreshing}
            className={`px-6 py-3 flex items-center gap-2 rounded-2xl text-white font-bold transition-all shadow-lg 
            ${refreshing ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25 active:scale-95"}`}
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Synchronizing..." : "Refresh List"}
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-[32px] overflow-hidden shadow-xl backdrop-blur-xl mb-32"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">User Identity</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Current Role</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Auth Method</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Joined</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {users.map((user) => (
                  <motion.tr 
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50/30 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                          {user.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold dark:text-white capitalize">{user.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={12} /> {user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className={user.role === 'admin' ? 'text-rose-500' : 'text-indigo-500'} />
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="bg-transparent border-0 focus:ring-0 text-sm font-medium capitalize dark:text-indigo-200 cursor-pointer p-0"
                        >
                          <option value="student" className="bg-white dark:bg-gray-900">Student</option>
                          <option value="teacher" className="bg-white dark:bg-gray-900">Teacher</option>
                          <option value="admin" className="bg-white dark:bg-gray-900">Admin</option>
                        </select>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.isGoogle ? (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20 w-fit">
                          <Chrome size={12} />
                          <span className="text-[10px] font-bold">Google Auth</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 dark:bg-white/5 text-gray-500 border border-gray-100 dark:border-white/10 w-fit">
                          <Mail size={12} />
                          <span className="text-[10px] font-bold">Standard</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserRole;
