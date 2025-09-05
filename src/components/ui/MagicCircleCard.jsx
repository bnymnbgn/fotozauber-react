import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import ParticleBurst from "./ParticleBurst"; // Import der Partikel-Komponente

const MagicCircleCard = ({
  beforeSrc,
  afterSrc,
  onClick,
  transformationDelay,
  transformationDuration = 800, // Wie lange die Transformation sichtbar bleibt
  fadeOutDelay = 1500, // Wie lange nach der Transformation das Fade-Out startet
}) => {
  const [isTransformed, setIsTransformed] = useState(false);

  useEffect(() => {
    // Timer für die Transformation (before -> after)
    const transformTimer = setTimeout(() => {
      setIsTransformed(true);
    }, transformationDelay);

    return () => clearTimeout(transformTimer);
  }, [transformationDelay]);

  return (
    <motion.button
      onClick={onClick}
      // Feste Größe: 230x275px
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
      {/* Container für die Bilder und Partikel */}
      <div className="relative w-full h-full">
        {/* Vorher-Bild (liegt immer unten) */}
        <img
          src={beforeSrc}
          alt="Original image"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Nachher-Bild (liegt darüber und wird eingeblendet) */}
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

        {/* Partikel-Effekt, der genau beim Transformieren ausgelöst wird */}
        <ParticleBurst isBursting={isTransformed} />
      </div>
    </motion.button>
  );
};

export default MagicCircleCard;
