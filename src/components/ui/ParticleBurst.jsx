import { motion, AnimatePresence } from "framer-motion";
import React from "react";

// Anzahl der Partikel
const PARTICLE_COUNT = 25;

// Verschiedene Farben für die Partikel
const COLORS = ["#a855f7", "#ec4899", "#f59e0b", "#ffffff"];

const ParticleBurst = ({ isBursting }) => {
  return (
    <AnimatePresence>
      {isBursting && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
            const angle = (i / PARTICLE_COUNT) * 360;
            const distance = 90 + Math.random() * 50; // Fliegen 90-140px weit
            const x = Math.cos(angle * (Math.PI / 180)) * distance;
            const y = Math.sin(angle * (Math.PI / 180)) * distance;
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            const size = 3 + Math.random() * 4; // Größere Partikel (3px bis 7px)
            const rotation = Math.random() * 360;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ opacity: 1, scale: 0.5 }}
                animate={{
                  x: `${x}px`,
                  y: `${y}px`,
                  scale: [1, 1.5, 0], // Pulsierender Effekt beim Verschwinden
                  opacity: [1, 0.8, 0],
                  rotate: rotation,
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5, // Längere Lebensdauer
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
