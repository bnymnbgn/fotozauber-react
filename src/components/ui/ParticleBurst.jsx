import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// Anzahl der Partikel, die bei einer Explosion entstehen
const PARTICLE_COUNT = 20;

const ParticleBurst = ({ isBursting }) => {
  return (
    <AnimatePresence>
      {isBursting && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (i / PARTICLE_COUNT) * 360;
            const distance = 80 + Math.random() * 40; // Fliegen 80-120px weit
            const x = Math.cos(angle * (Math.PI / 180)) * distance;
            const y = Math.sin(angle * (Math.PI / 180)) * distance;

            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full"
                style={{ top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{ x: `${x}px`, y: `${y}px`, opacity: 0, scale: 1 }}
                transition={{
                  duration: 0.6 + Math.random() * 0.4,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ParticleBurst;
