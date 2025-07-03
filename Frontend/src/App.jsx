import "./index.css";
import React from "react";
import { useLocation } from "react-router-dom";

import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AnimatePresence, motion } from "framer-motion";
import LoadingBar from "./components/Header/LoadingBar.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "./components/Home/ScrollToTop.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-center" />

      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          <LoadingBar /> 
          <div className="max-w-screen-2xl mx-auto px-4 overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
            
          </div>
          <AnimatePresence mode="wait">
            <div
              id="scroll-container"
              className="flex flex-col min-h-[100dvh] overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300"
            >
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Header />
                <ScrollToTop />

                <Outlet />
                <Footer />
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  theme="colored"
                />
              </motion.div>
            </div>
          </AnimatePresence>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
