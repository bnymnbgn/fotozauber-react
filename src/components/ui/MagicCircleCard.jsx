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
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setIsTransformed(false);
    setIsFading(false);

    const transformTimer = setTimeout(() => {
      setIsTransformed(true);

      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 3000); // 3 seconds hold after transformation

      return () => clearTimeout(fadeTimer);
    }, transformationDelay);

    return () => clearTimeout(transformTimer);
  }, [beforeSrc, afterSrc, transformationDelay]);

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
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: isFading ? 1 : 0 }}
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
