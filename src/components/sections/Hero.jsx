import { ArrowRight, Sparkles } from "lucide-react";
import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicCircleCard from "../ui/MagicCircleCard";
import HoverComparisonSlider from "../ui/HoverComparisonSlider";
import Button from "@/components/ui/Button.jsx";
import Lightbox from "../ui/Lightbox";
import { transformationExamples } from "../../data/transformationExamples";
import useSpatialCardAnimation from "@/lib/hooks/useSpatialCardAnimation";
import { AuroraText } from "@/components/magicui/aurora-text";

// --- Custom Hook für Barrierefreiheit ---
const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    setPrefersReducedMotion(mediaQueryList.matches);
    const listener = (event) => setPrefersReducedMotion(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, []);
  return prefersReducedMotion;
};

// --- Daten für rotierende Wörter ---
const rotatingWords = [
  "Einzigartig",
  "Liebevoll",
  "Individuell",
  "Sicher",
  "Traumhaft",
  "Magisch",
  "Fantasievoll",
  "Zauberhaft",
  "Authentisch",
  "Inspirierend",
  "Herzlich",
  "Kreativ",
  "Fröhlich",
  "Anonym",
  "Wundervoll",
  "Strahlend",
  "Bezaubernd",
  "Harmonisch",
  "Lebendig",
];

// --- Hauptkomponente ---
const Hero = memo(() => {
  const [particles, setParticles] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef(null);
  const { flowingCards, startAnimation, stopAnimation } =
    useSpatialCardAnimation(transformationExamples);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setParticles([]);
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
  }, [prefersReducedMotion]);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (visible && !prefersReducedMotion) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      {
        threshold: 0.1, // Start when 10% is visible
        rootMargin: "-10% 0px -10% 0px", // Slightly reduce viewport
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      stopAnimation();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top } = heroElement.getBoundingClientRect();
      heroElement.style.setProperty("--glow-x", `${clientX - left}px`);
      heroElement.style.setProperty("--glow-y", `${clientY - top}px`);
    };
    if (!prefersReducedMotion) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (index) => {
    setCurrentLightboxIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <>
      <style>{`
        @keyframes aurora-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .animated-gradient-text { background-size: 200% auto; animation: aurora-text 5s ease-in-out infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0; } 50% { opacity: 0.8; } }
        .particle { animation-name: twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        .flowing-card { opacity: 0; will-change: transform, opacity; }
        @media (prefers-reduced-motion: reduce) { .animated-gradient-text { animation: none; } .particle { animation: none; opacity: 0.3; } }
      `}</style>

      <section
        ref={heroRef}
        id="home"
        className="relative flex items-center justify-center min-h-[100vh] overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4"
      >
        {/* Hintergrund-Effekte */}
        <div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px at var(--glow-x, 50%) var(--glow-y, 50%), rgba(167, 139, 250, 0.15), transparent 80%)`,
            opacity: prefersReducedMotion ? 0 : 1,
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

        {/* Fließende Karten */}
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

        {/* Textinhalt */}
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
            <span>DEIN BILD. UNSERE MAGIE.</span>
          </div>

          <div className="aurora-logo-container animated-gradient-text bg-gradient-to-bl from-fuchsia-500 via-violet-600 to-blue-400"></div>

          {/* --- KORRIGIERTER CONTAINER --- */}
          {/* overflow-hidden entfernt und Höhe (h-XX) erhöht, um Umbruch zu ermöglichen */}
          <div className="relative h-64 md:h-72 lg:h-80 text-center mb-4 w-full ">
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
                className="absolute inset-0 text-6xl md:text-8xl lg:text-9xl text-white/90 font-bold flex items-center justify-center"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Lightbox Sektion */}
      <Lightbox isOpen={lightboxOpen} onClose={closeLightbox}>
        <div className="w-full max-w-5xl mx-auto p-4">
          <HoverComparisonSlider
            beforeImage={transformationExamples[currentLightboxIndex].before}
            afterImage={transformationExamples[currentLightboxIndex].after}
            title={transformationExamples[currentLightboxIndex].alt}
            enforceAspectRatio={false}
          />
          <p className="mt-4 text-center text-white text-lg">
            {transformationExamples[currentLightboxIndex].alt}
          </p>
        </div>
      </Lightbox>
    </>
  );
});

Hero.displayName = "Hero";

export default Hero;
