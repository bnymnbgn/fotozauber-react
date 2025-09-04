// src/components/ui/LoadingScreen.jsx

import { motion } from "framer-motion";
import LogoIcon from "../../assets/logo-icon.svg?react";

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const lineVariants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      // KORREKTUR: Wir ersetzen die fehlerhafte Kurve durch eine stabile Spring-Animation
      type: "spring",
      stiffness: 300,
      damping: 40,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.8,
      ease: "easeOut",
    },
  },
};

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.5 } }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={iconVariants}
        className="mb-6"
      >
        <LogoIcon className="h-20 w-20 text-white" />
      </motion.div>

      <motion.div
        className="w-56 space-y-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1 overflow-hidden bg-gray-700 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
              variants={lineVariants}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
