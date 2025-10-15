// App.jsx
import "./index.css";
import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoadingBar from "./components/Header/LoadingBar.jsx";
import ChatbotPopup from "./components/AIchat/ChatbotPopup.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ScrollToTop from "./components/Home/ScrollToTop.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="top-center" />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          <LoadingBar />

          <AnimatePresence mode="wait">
            <div
              id="scroll-container"
              className="flex flex-col max-h-[100dvh] overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300"
            >
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
              >
                <Header />

                {/* ScrollToTop handles both auto-scroll and floating button */}
                <ScrollToTop showButton={true} threshold={50} />

                <Outlet />
                <ChatbotPopup />
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
