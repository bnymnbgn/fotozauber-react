import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import ParticleBurst from "./ParticleBurst";

const MagicCircleCard = ({
  beforeSrc,
  afterSrc,
  onClick,
  transformationDelay,
  transformationDuration = 800,
}) => {
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    // Setzt den Zustand für jede neue Karte zurück
    setIsTransformed(false);

    // Startet die Transformation nach der vorgegebenen Verzögerung
    const transformTimer = setTimeout(() => {
      setIsTransformed(true);
    }, transformationDelay);

    // Bereinigt den Timer, wenn die Komponente verschwindet
    return () => clearTimeout(transformTimer);
  }, [beforeSrc, afterSrc, transformationDelay]);

  // HINWEIS: Die 'animate' und 'exit' Props wurden entfernt.
  // Die Steuerung des Ein- und Ausblendens übernimmt jetzt die CSS-Animation
  // und die Hero-Komponente, was stabiler ist.
  return (
    <motion.button
      onClick={onClick}
      className="relative block cursor-pointer rounded-xl shadow-lg group focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-75"
      style={{ width: "230px", height: "275px" }}
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        y: -20,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-full h-full">
        <img
          src={beforeSrc}
          alt="Original image"
          className="w-full h-full object-cover rounded-xl"
        />
        <motion.img
          src={afterSrc}
          alt="Transformed image"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransformed ? 1 : 0 }}
          transition={{
            duration: transformationDuration / 1000,
            ease: "easeInOut",
          }}
        />
        <ParticleBurst isBursting={isTransformed} />
      </div>
    </motion.button>
  );
};

export default MagicCircleCard;
