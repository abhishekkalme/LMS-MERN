import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return user && user.role?.toLowerCase() === "admin" ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
