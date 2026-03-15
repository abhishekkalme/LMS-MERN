// App.jsx
import "./index.css";
import React, { useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CinematicIntro from "./components/Common/CinematicIntro.jsx";
import LoadingBar from "./components/Header/LoadingBar.jsx";
import ChatbotPopup from "./components/AIchat/ChatbotPopup.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import ScrollToTop from "./components/Home/ScrollToTop.jsx";

function App() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <Toaster position="top-center" />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}
          <LoadingBar />

          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-black dark:via-indigo-950 dark:to-black text-gray-900 dark:text-white">
            <Header />

            {/* ScrollToTop handles both auto-scroll and floating button */}
            <ScrollToTop showButton={true} threshold={50} />

            <Outlet />
            <ChatbotPopup />
            <Footer />
          </div>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
