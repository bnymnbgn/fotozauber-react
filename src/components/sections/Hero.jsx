import { ArrowRight, Sparkles } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicCircleCard from "../ui/MagicCircleCard";
import ComparisonSlider from "../ui/ComparisonSlider";
import Button from "../ui/Button";
import Lightbox from "../ui/Lightbox";
import { transformationExamples } from "../../data/transformationExamples";
import useSpatialCardAnimation from "../../hooks/useSpatialCardAnimation";

// --- Custom Hook für Barrierefreiheit ---
/**
 * Prüft die Betriebssystemeinstellung des Benutzers für reduzierte Bewegung.
 * @returns {boolean} True, wenn der Benutzer reduzierte Bewegung bevorzugt.
 */
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setPrefersReducedMotion(mediaQueryList.matches);

    const listener = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
};

// --- Daten für rotierende Wörter ---
const rotatingWords = [
  "Einzigartig",
  "Liebevoll",
  "Individuell",
  "Träume",
  "Magisch",
  "Fantasievoll",
];

// --- Hauptkomponente ---
const Hero = () => {
  const [particles, setParticles] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const heroRef = useRef(null);
  const { flowingCards } = useSpatialCardAnimation(transformationExamples);

  // Hook für Barrierefreiheit initialisieren
  const prefersReducedMotion = usePrefersReducedMotion();

  // Partikelgenerierung, abhängig von prefersReducedMotion
  useEffect(() => {
    if (prefersReducedMotion) {
      setParticles([]); // Keine Partikel bei reduzierter Bewegung
      return;
    }

    const newParticles = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 3}s`,
      size: `${1 + Math.random() * 1.5}px`,
    }));
    setParticles(newParticles);
  }, [prefersReducedMotion]); // Neu: Abhängigkeit hinzugefügt

  // Performance-Optimierung: Maus-Glow über CSS-Variablen statt React-State steuern
  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top } = heroElement.getBoundingClientRect();
      heroElement.style.setProperty("--glow-x", `${clientX - left}px`);
      heroElement.style.setProperty("--glow-y", `${clientY - top}px`);
    };

    // Nur den Listener hinzufügen, wenn Bewegung nicht reduziert ist
    if (!prefersReducedMotion) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [prefersReducedMotion]); // Neu: Abhängigkeit hinzugefügt

  // Wortrotation
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2000); // Dauer der Wortanzeige

    return () => clearInterval(interval);
  }, []);

  // Event Handlers
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
        @keyframes twinkle { 0%, 100% { opacity: 0; } 50% { opacity: 0.8; } }
        .particle { animation-name: twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .flowing-card { opacity: 0; will-change: transform, opacity; }

        /* Barrierefreiheit: Animationen im CSS deaktivieren, falls prefersReducedMotion aktiv ist */
        @media (prefers-reduced-motion: reduce) {
          .animated-gradient-text { animation: none; }
          .particle { animation: none; opacity: 0.3; }
        }
      `}</style>

      <section
        ref={heroRef}
        id="home"
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4"
      >
        {/* Hintergrund-Effekte: Glow-Effekt liest jetzt CSS-Variablen */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(167, 139, 250, 0.15), transparent 80%)`,
            opacity: prefersReducedMotion ? 0 : 1, // Glow deaktivieren bei Reduce Motion
          }}
        />
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
                willChange: "transform, opacity",
                transform: "translateZ(0)",
              }}
            />
          ))}
        </div>

        {/* Fließende Karten: Animation wird vom Hook useSpatialCardAnimation gesteuert, idealerweise berücksichtigt dieser auch prefersReducedMotion */}
        <div className="absolute inset-0 z-20">
          {flowingCards.map((card) => (
            <div
              key={card.key}
              className="flowing-card absolute"
              style={card.style}
            >
              <MagicCircleCard
                key={card.key}
                beforeSrc={transformationExamples[card.index].before}
                afterSrc={transformationExamples[card.index].after}
                onClick={() => openLightbox(card.index)}
                transformationDelay={card.transformationDelay}
              />
            </div>
          ))}
        </div>

        {/* Textinhalt: Animationen respektieren prefersReducedMotion */}
        <motion.div
          className="relative z-30 flex flex-col items-center max-w-6xl text-center"
          initial={{
            opacity: prefersReducedMotion ? 1 : 0,
            y: prefersReducedMotion ? 0 : 20,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 text-sm text-white/90 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm">
            <span>FOTOGRAFIE TRIFFT FANTASIE</span>
          </div>

          <div
            className="
    aurora-logo-container 
    animated-gradient-text 
    bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400
  "
          ></div>
          <div className="relative h-32 md:h-36 lg:h-40 overflow-hidden text-center mb-4 w-full">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl text-white/90 font-bold flex items-center justify-center whitespace-nowrap"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-6 text-lg text-white/80 max-w-prose mx-auto">
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

      {/* Lightbox Sektion */}
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
