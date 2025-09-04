import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import ParticleBurst from "./ParticleBurst"; // Import der Partikel-Komponente

// NIMMT JETZT "beforeSrc" und "afterSrc" als Props entgegen, nicht mehr "src"
const MagicCircleCard = ({
  beforeSrc,
  afterSrc,
  onClick,
  transformationDelay,
}) => {
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    // Der Timer nutzt jetzt die exakte, von außen übergebene Verzögerung
    const timer = setTimeout(() => {
      setIsTransformed(true);
    }, transformationDelay);

    return () => clearTimeout(timer);
    // Abhängigkeit hinzufügen, damit der Effekt korrekt reagiert
  }, [transformationDelay]);

  return (
    <motion.button
      onClick={onClick}
      className="relative block w-48 h-auto cursor-pointer rounded-xl shadow-lg group focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-75"
      whileHover={{
        scale: 1.1,
        zIndex: 50,
        y: -20,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Container für die Bilder und Partikel */}
      <div className="relative w-full h-full">
        {/* Vorher-Bild (liegt immer unten) */}
        <img
          src={beforeSrc}
          alt="Original image"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Nachher-Bild (liegt darüber und wird sanft eingeblendet) */}
        <motion.img
          src={afterSrc}
          alt="Transformed image"
          className="absolute inset-0 w-full h-full object-cover rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransformed ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Partikel-Effekt, der genau beim Transformieren ausgelöst wird */}
        <ParticleBurst isBursting={isTransformed} />
      </div>
    </motion.button>
  );
};

export default MagicCircleCard;
