import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicIntro = ({ 
  onComplete, 
  duration = 2000, 
  color = "#4f46e5", // Indigo-600
  size = 60 
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) {
        setTimeout(onComplete, 800); // Allow exit animation to finish
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="cinematic-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              className="absolute border-4 rounded-full"
              style={{ 
                width: size * 1.5, 
                height: size * 1.5,
                borderColor: color.startsWith("#") ? color : undefined 
              }}

              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />

            {/* Spinning Indicator */}
            <motion.div
              className="border-4 border-l-transparent border-b-transparent rounded-full"
              style={{ 
                width: size, 
                height: size,
                borderTopColor: color,
                borderRightColor: color 
              }}
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
            
            {/* Center Dot */}
            <motion.div
              className="absolute rounded-full"
              style={{ 
                width: size / 6, 
                height: size / 6,
                backgroundColor: color 
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
