// src/components/ui/Toast.jsx
import { useState, useEffect } from "react";
import { XCircle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, type = "error", duration = 5000, onDismiss }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onDismiss]);

  const isError = type === "error";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className={`fixed bottom-5 right-5 z-50 flex items-center max-w-sm p-4 rounded-xl shadow-lg text-white ${
            isError ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <div className="flex-shrink-0">
            {isError ? (
              <XCircle className="w-6 h-6" />
            ) : (
              <ShieldCheck className="w-6 h-6" />
            )}
          </div>
          <div className="ml-3 text-sm font-medium">{message}</div>
          <button
            onClick={onDismiss}
            className="ml-4 -mr-2 p-1.5 rounded-md hover:bg-white/20 transition-colors"
          >
            <span className="sr-only">Dismiss</span>
            <XCircle className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
