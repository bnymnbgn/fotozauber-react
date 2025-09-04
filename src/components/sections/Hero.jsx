import { ArrowRight, Sparkles } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicCircleCard from "../ui/MagicCircleCard";
import ComparisonSlider from "../ui/ComparisonSlider";

// Debugging: Bestätigen, dass Hero.jsx geladen wird
console.log("Hero.jsx: Using MagicCircleCard without overlay");

// Deine Beispielbilder
const transformationExamples = [
  {
    before: "/assets/img/Halid 1.1.jpg",
    after: "/assets/img/Halid 1.jpg",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/bebe.jpg",
    after: "/assets/img/bebe1.jpg",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/TIGER Kopie2.jpg",
    after: "/assets/img/TIGER Kopie2.jpg",
    alt: "Kind mit Tiger",
  },
  {
    before: "/assets/img/randombebe.jpg",
    after: "/assets/img/randombebe Kopie.jpg",
    alt: "Baby mit Sternen",
  },
  {
    before: "/assets/img/klem 1.jpg",
    after: "/assets/img/klem 1.jpg",
    alt: "Kind als Kapitän",
  },
  {
    before:
      "/assets/img/big-elephant-eating-and-starring-at-the-camera-2023-11-27-04-46-04-utc Kopie.jpg",
    after:
      "/assets/img/big-elephant-eating-and-starring-at-the-camera-2023-11-27-04-46-04-utc Kopie.jpg",
    alt: "Kind mit Elefant",
  },
];

const Button = ({ children, ...props }) => (
  <button
    className="relative inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 overflow-hidden group px-8 py-3.5 text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
    {...props}
  >
    <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-full" />
    <span className="relative z-10">{children}</span>
  </button>
);

const Lightbox = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Hero = () => {
  const [particles, setParticles] = useState([]);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [flowingCards, setFlowingCards] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top } = currentTarget.getBoundingClientRect();
      setGlowPosition({ x: clientX - left, y: clientY - top });
    };
    const heroElement = document.getElementById("home");
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  useEffect(() => {
    const numParticles = 120;
    const newParticles = Array.from({ length: numParticles }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${1 + Math.random() * 2}px`,
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const numberOfLanes = 6;
    const laneWidth = 100 / numberOfLanes;

    const newFlowingCards = transformationExamples.map((_, index) => {
      const laneIndex = index % numberOfLanes;
      const leftPosition =
        laneIndex * laneWidth + Math.random() * (laneWidth / 4);

      // --- HIER IST DIE NEUE LOGIK ---

      const popInDuration = 0.5; // Dauer des Aufpoppens in Sekunden
      const initialDelay = Math.random() * 10; // Zufällige Startverzögerung
      const floatDuration = 20 + Math.random() * 15;

      // NEU: Definiere, wie lange nach dem Aufpoppen gewartet werden soll
      // (z.B. zwischen 2 und 4 Sekunden)
      const delayAfterPopIn = 2000 + Math.random() * 2000; // in Millisekunden

      // NEU: Gesamtverzögerung für die Transformation berechnen
      // (Startverzögerung + Dauer des Aufpoppens + die neue Wartezeit)
      const totalTransformationDelay =
        initialDelay * 1000 + popInDuration * 1000 + delayAfterPopIn;

      const animationString = `pop-in ${popInDuration}s ease-out ${initialDelay}s forwards, flow-up ${floatDuration}s linear ${
        initialDelay + popInDuration
      }s infinite`;

      // Wir fügen die neue Gesamtverzögerung zum Objekt hinzu
      return {
        style: {
          left: `${leftPosition}%`,
          top: `${Math.random() * 80}%`,
          animation: animationString,
        },
        // Wir speichern den Wert, um ihn unten im JSX zu verwenden
        transformationDelay: totalTransformationDelay,
      };
    });
    setFlowingCards(newFlowingCards);
  }, []);
  const handleScrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const openLightbox = (index) => {
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
      <style>{`
        @keyframes aurora-text { 
          0% { background-position: 0% 50%; } 
          50% { background-position: 100% 50%; } 
          100% { background-position: 0% 50%; } 
        }
        .animated-gradient-text { 
          background-size: 200% auto; 
          animation: aurora-text 5s ease-in-out infinite; 
        }
        @keyframes twinkle { 
          0%, 100% { opacity: 0; } 
          50% { opacity: 0.8; } 
        }
        .particle { 
          animation-name: twinkle; 
          animation-timing-function: ease-in-out; 
          animation-iteration-count: infinite; 
        }
        @keyframes pop-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Animation 2: Das unendliche Schweben danach */
        @keyframes flow-up {
          from {
            /* Startet mit dem Ergebnis von pop-in */
            transform: scale(1) translateY(0);
          }
          to {
            /* Behält die Größe bei und schwebt nach oben */
            transform: scale(1) translateY(-100vh);
          }
        }

        .flowing-card {
          /* Die Animation wird jetzt per Inline-Style aus dem JS gesetzt, */
          /* damit jede Karte ihre eigene zufällige Dauer/Verzögerung hat. */
          /* Wichtig: Wir setzen hier eine initiale Unsichtbarkeit, */
          /* damit die Karte vor dem Start der Animation nicht einfach da ist. */
          opacity: 0;
        }
      `}</style>

      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4"
      >
        {/* EBENE 0: VERLAUF */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${glowPosition.x}px ${glowPosition.y}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
          }}
        />

        {/* EBENE 1: PARTIKEL */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="particle absolute bg-white rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay,
              }}
            />
          ))}
        </div>

        {/* EBENE 2: FLIESSENDE BILDER */}
        <div className="absolute inset-0 z-20">
          {flowingCards.map((card, index) => (
            <div
              key={`card-${index}`}
              className="flowing-card absolute"
              style={card.style}
            >
              <MagicCircleCard
                beforeSrc={transformationExamples[index].before}
                afterSrc={transformationExamples[index].after}
                onClick={() => openLightbox(index)}
                // NEU: Die berechnete Verzögerung als Prop übergeben
                transformationDelay={card.transformationDelay}
              />
            </div>
          ))}
        </div>

        {/* EBENE 3: TEXT */}
        <motion.div
          className="relative z-30 flex flex-col items-center max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 text-sm text-white/90 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>FOTOGRAFIE TRIFFT FANTASIE</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">
            Aus Momenten werden
            <span className="block mt-2 animated-gradient-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              magische Erinnerungen
            </span>
          </h1>
          <p className="mt-8 text-lg text-white/80 max-w-prose mx-auto">
            Wir verwandeln deine wertvollsten Kinderfotos in atemberaubende
            Kunstwerke, die die Fantasie beflügeln und ein Leben lang Freude
            bereiten.
          </p>
          <div className="mt-10">
            <Button onClick={handleScrollToContact}>
              <span className="flex items-center">
                Deine Transformation starten{" "}
                <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            </Button>
          </div>
        </motion.div>
      </section>

      <Lightbox isOpen={lightboxOpen} onClose={closeLightbox}>
        <div className="w-full max-w-5xl mx-auto p-4">
          <ComparisonSlider
            beforeImage={transformationExamples[currentLightboxIndex].before}
            afterImage={transformationExamples[currentLightboxIndex].after}
          />
          <p className="mt-4 text-center text-white text-lg">
            {transformationExamples[currentLightboxIndex].alt}
          </p>
        </div>
      </Lightbox>
    </>
  );
};

export default Hero;
