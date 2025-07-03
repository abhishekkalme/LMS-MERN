import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; 

NProgress.configure({ showSpinner: false, speed: 400, trickleSpeed: 200 });

const LoadingBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done(); 
    }, 100); 

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

  return null; 
};

export default LoadingBar;
