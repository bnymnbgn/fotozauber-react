import { ArrowRight, Sparkles } from "lucide-react";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagicCircleCard from "../ui/MagicCircleCard";
import ComparisonSlider from "../ui/ComparisonSlider";

// Debugging: Bestätigen, dass Hero.jsx geladen wird
console.log(
  "Hero.jsx: Using MagicCircleCard with endless cycle and collision avoidance"
);

// Deine Beispielbilder
const transformationExamples = [
  {
    before: "/assets/img/Halid before.jpg",
    after: "/assets/img/Halid after.jpg",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/before.jpg",
    after: "/assets/img/after.jpg",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/bebe before.jpg",
    after: "/assets/img/bebe after.jpg",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/TIGER before.jpg",
    after: "/assets/img/TIGER after.jpg",
    alt: "Kind mit Tiger",
  },
  {
    before: "/assets/img/randombebe before.jpg",
    after: "/assets/img/randombebe after.jpg",
    alt: "Baby mit Sternen",
  },
  {
    before: "/assets/img/klem before.jpg",
    after: "/assets/img/klem after.jpg",
    alt: "Kind als Kapitän",
  },
  {
    before: "/assets/img/ele before.jpg",
    after: "/assets/img/ele after.jpg",
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

// Spatial Grid Klasse für Kollisionsvermeidung
class SpatialGrid {
  constructor(width, height, cellSize = 250) {
    this.width = width;
    this.height = height;
    this.cellSize = cellSize;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    this.grid = new Map();
    this.occupiedCells = new Set();

    // Karten-Dimensionen (aus MagicCircleCard)
    this.cardWidth = 230;
    this.cardHeight = 275;

    // Aktive Timeouts verfolgen
    this.activeTimeouts = new Map();
  }

  // Zelle für gegebene Koordinaten berechnen
  getCell(x, y) {
    const col = Math.floor(x / this.cellSize);
    const row = Math.floor(y / this.cellSize);
    return `${col},${row}`;
  }

  // Alle Zellen ermitteln, die eine Karte belegt
  getCellsForCard(x, y) {
    const cells = [];
    const leftCol = Math.floor(x / this.cellSize);
    const rightCol = Math.floor((x + this.cardWidth) / this.cellSize);
    const topRow = Math.floor(y / this.cellSize);
    const bottomRow = Math.floor((y + this.cardHeight) / this.cellSize);

    for (let col = leftCol; col <= rightCol; col++) {
      for (let row = topRow; row <= bottomRow; row++) {
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
          cells.push(`${col},${row}`);
        }
      }
    }
    return cells;
  }

  // Prüfen ob Position frei ist
  isPositionFree(x, y) {
    const cells = this.getCellsForCard(x, y);
    return cells.every((cell) => !this.occupiedCells.has(cell));
  }

  // Position reservieren mit automatischer Freigabe
  occupyPosition(x, y, cardId, duration) {
    const cells = this.getCellsForCard(x, y);
    cells.forEach((cell) => {
      this.occupiedCells.add(cell);
      if (!this.grid.has(cell)) {
        this.grid.set(cell, new Set());
      }
      this.grid.get(cell).add(cardId);
    });

    // Timer für automatische Freigabe
    if (duration && duration > 0) {
      const timeoutId = setTimeout(() => {
        this.freePosition(cardId, cells);
        this.activeTimeouts.delete(cardId);
      }, duration);

      this.activeTimeouts.set(cardId, timeoutId);
    }

    return cells;
  }

  // Position freigeben
  freePosition(cardId, cells) {
    // Timeout löschen falls vorhanden
    if (this.activeTimeouts.has(cardId)) {
      clearTimeout(this.activeTimeouts.get(cardId));
      this.activeTimeouts.delete(cardId);
    }

    if (cells) {
      cells.forEach((cell) => {
        if (this.grid.has(cell)) {
          this.grid.get(cell).delete(cardId);
          if (this.grid.get(cell).size === 0) {
            this.grid.delete(cell);
            this.occupiedCells.delete(cell);
          }
        }
      });
    }
  }

  // Freie Position in bestimmtem Bereich finden
  findFreePosition(attempts = 50) {
    for (let i = 0; i < attempts; i++) {
      // Position mit Bias zu vertikaler Verteilung
      const x = Math.random() * (this.width - this.cardWidth);
      const y = Math.random() * (this.height * 0.8); // Nur untere 80% nutzen

      if (this.isPositionFree(x, y)) {
        return { x, y };
      }
    }

    // Fallback: Suche systematisch
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const x =
          col * this.cellSize +
          Math.random() * (this.cellSize - this.cardWidth);
        const y =
          row * this.cellSize +
          Math.random() * (this.cellSize - this.cardHeight);

        if (
          x + this.cardWidth <= this.width &&
          y + this.cardHeight <= this.height * 0.8 &&
          this.isPositionFree(x, y)
        ) {
          return { x, y };
        }
      }
    }

    // Letzter Fallback: Zufällige Position (kann überlappen)
    return {
      x: Math.random() * (this.width - this.cardWidth),
      y: Math.random() * (this.height * 0.8),
    };
  }

  // Grid zurücksetzen und alle Timeouts löschen
  clear() {
    this.activeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.activeTimeouts.clear();
    this.grid.clear();
    this.occupiedCells.clear();
  }

  // Debug-Info
  getDebugInfo() {
    return {
      occupiedCells: this.occupiedCells.size,
      totalCells: this.cols * this.rows,
      occupancyRate:
        ((this.occupiedCells.size / (this.cols * this.rows)) * 100).toFixed(1) +
        "%",
      activeTimeouts: this.activeTimeouts.size,
    };
  }
}

const Hero = () => {
  const [particles, setParticles] = useState([]);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
  const [flowingCards, setFlowingCards] = useState([]);
  const [spatialGrid, setSpatialGrid] = useState(null);

  // Refs für bessere Cleanup-Verwaltung
  const intervalsRef = useRef(new Set());
  const timeoutsRef = useRef(new Set());
  const mountedRef = useRef(true);

  // Cleanup Helper
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current.clear();
    intervalsRef.current.forEach((id) => clearInterval(id));
    intervalsRef.current.clear();
  }, []);

  // Spatial Grid initialisieren
  useEffect(() => {
    const grid = new SpatialGrid(window.innerWidth, window.innerHeight, 280);
    setSpatialGrid(grid);

    const handleResize = () => {
      if (mountedRef.current) {
        const newGrid = new SpatialGrid(
          window.innerWidth,
          window.innerHeight,
          280
        );
        setSpatialGrid(newGrid);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      grid.clear();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearAllTimeouts();
      if (spatialGrid) {
        spatialGrid.clear();
      }
    };
  }, [clearAllTimeouts, spatialGrid]);

  // Funktion zum Generieren der Timing-Parameter (unverändert)
  const generateTimingParameters = useCallback(() => {
    const popInDuration = 0.5;
    const initialDelay = Math.random() * 2;
    const flowDuration = 12 + Math.random() * 8;
    const delayAfterPopIn = 1500 + Math.random() * 1000;
    const fadeOutDuration = 1;
    const additionalFlowTime = 4;

    const totalTransformationDelay =
      initialDelay * 1000 + popInDuration * 1000 + delayAfterPopIn;
    const totalCycleTime =
      (initialDelay +
        popInDuration +
        flowDuration * 0.3 +
        additionalFlowTime +
        fadeOutDuration) *
      1000;

    return {
      popInDuration,
      initialDelay,
      flowDuration,
      delayAfterPopIn,
      fadeOutDuration,
      additionalFlowTime,
      totalTransformationDelay,
      totalCycleTime,
    };
  }, []);

  // Funktion zum Erstellen einer neuen Karte mit Kollisionsvermeidung
  const createNewCard = useCallback(
    (index, grid) => {
      if (!grid || !mountedRef.current) return null;

      const timing = generateTimingParameters();
      const cardId = `card-${index}-${Date.now()}-${Math.random()}`;

      // Freie Position finden und reservieren
      const position = grid.findFreePosition();
      grid.occupyPosition(
        position.x,
        position.y,
        cardId,
        timing.totalCycleTime
      );

      const animationString = `endless-cycle ${timing.flowDuration}s linear ${timing.initialDelay}s infinite`;

      return {
        key: cardId,
        style: {
          left: `${position.x}px`,
          top: `${position.y}px`,
          animation: animationString,
        },
        transformationDelay: timing.totalTransformationDelay,
        cycleTime: timing.totalCycleTime,
        index,
        cardId,
      };
    },
    [generateTimingParameters]
  );

  // Mouse Move Effect (unverändert)
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

  // Partikel Setup (unverändert)
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

  // Initialisierung und endloser Zyklus der fließenden Karten
  useEffect(() => {
    if (!spatialGrid || !mountedRef.current) return;

    // Alle vorherigen Timeouts löschen
    clearAllTimeouts();

    // Initiale Karten erstellen
    const initialCards = transformationExamples
      .map((_, index) => createNewCard(index, spatialGrid))
      .filter(Boolean);

    if (mountedRef.current) {
      setFlowingCards(initialCards);
    }

    // Endlos-Zyklus Setup mit gestaffelten Starts
    initialCards.forEach((card, idx) => {
      const timeoutId = setTimeout(() => {
        if (!mountedRef.current) return;

        // Starte den endlosen Zyklus für diese Karte
        const intervalId = setInterval(() => {
          if (!mountedRef.current) return;

          const newCard = createNewCard(card.index, spatialGrid);
          if (newCard && mountedRef.current) {
            setFlowingCards((prevCards) =>
              prevCards.map((prevCard) =>
                prevCard.index === card.index ? newCard : prevCard
              )
            );
          }
        }, card.cycleTime);

        intervalsRef.current.add(intervalId);
      }, card.cycleTime + idx * 1000);

      timeoutsRef.current.add(timeoutId);
    });

    // Cleanup function
    return () => {
      clearAllTimeouts();
    };
  }, [spatialGrid, createNewCard, clearAllTimeouts]);

  // Debug-Logging (optional, entfernbar in Produktion)
  useEffect(() => {
    if (!spatialGrid) return;

    const interval = setInterval(() => {
      if (spatialGrid && mountedRef.current) {
        console.log("Spatial Grid Status:", spatialGrid.getDebugInfo());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [spatialGrid]);

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

        /* Endloser Zyklus Animation */
        @keyframes endless-cycle {
          /* Pop-in Phase (0-6%) */
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(0);
          }
          6% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          
          /* Flow-up Phase (6-80%) */
          80% {
            opacity: 1;
            transform: scale(1) translateY(-50vh);
          }
          
          /* Additional flow + fade-out (80-100%) */
          95% {
            opacity: 1;
            transform: scale(1) translateY(-70vh);
          }
          100% {
            opacity: 0;
            transform: scale(1) translateY(-75vh);
          }
        }

        .flowing-card {
          /* Initiale Unsichtbarkeit vor Animation */
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
          {flowingCards.map((card) => (
            <div
              key={card.key}
              className="flowing-card absolute"
              style={card.style}
            >
              <MagicCircleCard
                key={card.key} // Neu hinzugefügt: Force remount für jeden Zyklus
                beforeSrc={transformationExamples[card.index].before}
                afterSrc={transformationExamples[card.index].after}
                onClick={() => openLightbox(card.index)}
                transformationDelay={card.transformationDelay}
                // resetKey={card.resetKey}  // Entfernen: Nicht benötigt und undefiniert
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
