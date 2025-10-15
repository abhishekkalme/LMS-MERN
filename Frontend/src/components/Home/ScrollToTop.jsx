import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop({ showButton = true, threshold = 50 }) {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  const getContainer = () => document.getElementById("scroll-container");

  // Scroll to top on route change
  useEffect(() => {
    const container = getContainer();
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Show/hide button based on scroll
  useEffect(() => {
    if (!showButton) return;

    const container = getContainer();

    const handleScroll = () => {
      const scrollPos = container ? container.scrollTop : window.scrollY;
      setVisible(scrollPos > threshold);
    };

    if (container) container.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);

    handleScroll(); // initial check

    return () => {
      if (container) container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showButton, threshold]);

  const scrollToTop = () => {
    const container = getContainer();
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-24 right-6 z-50"

          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 rounded-full shadow-lg flex items-center justify-center border
                       bg-blue-600 text-white dark:bg-blue-600 hover:shadow-2xl
                       animate-glow transition-all duration-300 relative"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
