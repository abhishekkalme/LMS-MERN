import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className=" h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to={{
          pathname: "/login",
          search: `?reason=unauthorized&t=${Date.now()}`, 
        }}
        replace
        state={{
          message: "Please log in to access this content.",
        }}
      />
    );
    
    
    
  }

  return children;
};

export default PrivateRoute;
