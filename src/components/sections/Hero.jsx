import { ArrowRight, Sparkles } from "lucide-react";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  createRef,
} from "react";
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
    before: "/assets/img/before1.jpg",
    after: "/assets/img/after1.jpg",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/before2.png",
    after: "/assets/img/after2.JPG",
    alt: "Kind in Phantasiewelt",
  },
  {
    before: "/assets/img/before3.jpg",
    after: "/assets/img/after3.png",
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

// KORRIGIERTE Spatial Grid Klasse für Kollisionsvermeidung und zufällige Lane-Wahl
class EnhancedSpatialGrid {
  constructor(width, height, cardWidth = 230, cardHeight = 275) {
    this.width = width;
    this.height = height;
    this.cardWidth = cardWidth;
    this.cardHeight = cardHeight;

    this.laneWidth = cardWidth + 50;
    this.numLanes = Math.floor(width / this.laneWidth);
    this.lanes = Array.from({ length: this.numLanes }, (_, i) => ({
      id: i,
      x: i * this.laneWidth + (this.laneWidth - cardWidth) / 2,
      activeCards: new Map(),
      nextAvailableTime: 0,
    }));

    this.minVerticalGap = cardHeight + 100;
    this.minTimingGap = 2000;
    this.activeTimeouts = new Map();
  }

  findBestLane(currentTime = Date.now()) {
    const laneStats = this.lanes.map((lane) => ({
      ...lane,
      waitTime: Math.max(0, lane.nextAvailableTime - currentTime),
      activeCardsCount: lane.activeCards.size,
    }));

    const minActiveCards = Math.min(
      ...laneStats.map((l) => l.activeCardsCount)
    );
    const lanesWithMinCards = laneStats.filter(
      (l) => l.activeCardsCount === minActiveCards
    );

    const minWaitTime = Math.min(...lanesWithMinCards.map((l) => l.waitTime));
    const bestLanes = lanesWithMinCards.filter(
      (l) => l.waitTime === minWaitTime
    );

    return bestLanes[Math.floor(Math.random() * bestLanes.length)];
  }

  calculateSafeYPosition(lane, currentTime = Date.now()) {
    const activeCards = Array.from(lane.activeCards.values()).filter(
      (card) => currentTime < card.startTime + card.duration
    );

    if (activeCards.length === 0) {
      return Math.random() * (this.height - this.cardHeight);
    }

    for (let attempt = 0; attempt < 10; attempt++) {
      const candidateY = Math.random() * (this.height - this.cardHeight);
      const isSafe = activeCards.every(
        (card) => Math.abs(candidateY - card.y) > this.minVerticalGap
      );
      if (isSafe) return candidateY;
    }
    return Math.random() * (this.height - this.cardHeight);
  }

  reservePosition(cardId, duration, timing) {
    const currentTime = Date.now();
    const bestLane = this.findBestLane(currentTime);

    const startTime = Math.max(currentTime, bestLane.nextAvailableTime);
    const safeY = this.calculateSafeYPosition(bestLane, startTime);

    const cardInfo = {
      startTime: startTime + (timing.initialDelay || 0) * 1000,
      duration: duration,
      y: safeY,
    };

    bestLane.activeCards.set(cardId, cardInfo);
    bestLane.nextAvailableTime = startTime + this.minTimingGap;

    const cleanupTime = cardInfo.startTime + duration + 1000;
    const timeoutId = setTimeout(() => {
      this.freePosition(cardId);
      this.activeTimeouts.delete(cardId);
    }, cleanupTime - currentTime);

    this.activeTimeouts.set(cardId, timeoutId);

    const actualStartDelay = (startTime - currentTime) / 1000;

    return {
      x: bestLane.x,
      y: safeY,
      laneId: bestLane.id,
      actualStartDelay,
    };
  }

  freePosition(cardId) {
    if (this.activeTimeouts.has(cardId)) {
      clearTimeout(this.activeTimeouts.get(cardId));
      this.activeTimeouts.delete(cardId);
    }
    this.lanes.forEach((lane) => {
      if (lane.activeCards.has(cardId)) {
        lane.activeCards.delete(cardId);
      }
    });
  }

  clear() {
    this.activeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    this.activeTimeouts.clear();
    this.lanes.forEach((lane) => {
      lane.activeCards.clear();
      lane.nextAvailableTime = 0;
    });
  }

  getDebugInfo() {
    const totalActiveCards = this.lanes.reduce(
      (sum, lane) => sum + lane.activeCards.size,
      0
    );
    const laneUsage = this.lanes.map((lane) => ({
      id: lane.id,
      activeCards: lane.activeCards.size,
      nextAvailable:
        lane.nextAvailableTime > Date.now()
          ? `${Math.ceil((lane.nextAvailableTime - Date.now()) / 1000)}s`
          : "available",
    }));
    return {
      totalActiveCards,
      totalLanes: this.numLanes,
      activeTimeouts: this.activeTimeouts.size,
      laneUsage,
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

  const timeoutsRef = useRef(new Set());
  const mountedRef = useRef(true);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current.clear();
  }, []);

  // ANGEPASSTE generateTimingParameters Funktion
  const generateTimingParameters = useCallback(() => {
    const beforeImageFlowDuration = 3;
    const afterImageFlowDuration = 5 + Math.random() * 10;
    const totalTransformationDelay = beforeImageFlowDuration * 1000;
    const totalCycleTime =
      (beforeImageFlowDuration + afterImageFlowDuration) * 1000;
    const animationDuration = totalCycleTime / 1000;

    return {
      totalTransformationDelay,
      totalCycleTime,
      animationDuration,
    };
  }, []);

  const createNewCard = useCallback(
    (index, grid, initialStartDelay = 0) => {
      // Neuer Parameter: initialStartDelay
      if (!grid || !grid.reservePosition) return null;

      const timing = generateTimingParameters();
      const cardId = `card-${index}-${Date.now()}-${Math.random()}`;

      // Übergibt initialStartDelay an reservePosition
      const position = grid.reservePosition(cardId, timing.totalCycleTime, {
        initialDelay: initialStartDelay / 1000, // In Sekunden umwandeln
      });

      // Die eigentliche Animation der Karte beginnt jetzt nach dieser initialen Verzögerung
      const animationString = `endless-cycle ${
        timing.animationDuration
      }s linear ${initialStartDelay / 1000}s infinite`;

      return {
        key: cardId,
        style: {
          left: `${position.x}px`,
          top: `${position.y}px`,
          animation: animationString,
        },
        // Wichtig: Die Transformation verzögert sich ebenfalls um den initialen StartDelay
        transformationDelay:
          timing.totalTransformationDelay + initialStartDelay,
        cycleTime: timing.totalCycleTime,
        // Speichern der initialen Verzögerung, falls im Scheduler benötigt
        initialStartDelay: initialStartDelay,
        index,
        cardId,
      };
    },
    [generateTimingParameters]
  );

  useEffect(() => {
    mountedRef.current = true;
    const grid = new EnhancedSpatialGrid(window.innerWidth, window.innerHeight);
    setSpatialGrid(grid);

    const handleResize = () => {
      if (mountedRef.current) {
        const newGrid = new EnhancedSpatialGrid(
          window.innerWidth,
          window.innerHeight
        );
        setSpatialGrid(newGrid);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("resize", handleResize);
      grid.clear();
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top } = currentTarget.getBoundingClientRect();
      setGlowPosition({ x: clientX - left, y: clientY - top });
    };
    const heroElement = document.getElementById("home");
    heroElement.addEventListener("mousemove", handleMouseMove);
    return () => heroElement.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const newParticles = Array.from({ length: 120 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${1 + Math.random() * 2}px`,
    }));
    setParticles(newParticles);
  }, []);

  // KORRIGIERTER Hook für den Endlos-Zyklus
  useEffect(() => {
    if (!spatialGrid || !mountedRef.current) return;

    clearAllTimeouts();

    const initialCardsWithDelays = transformationExamples
      .map((_, index) => {
        const initialDelay = Math.random() * 5000; // Zufällige Verzögerung bis 5 Sekunden für den Start
        return createNewCard(index, spatialGrid, initialDelay); // initialDelay übergeben
      })
      .filter(Boolean);

    if (mountedRef.current) {
      setFlowingCards(initialCardsWithDelays);
    }

    const scheduleNextReplacement = (card) => {
      // Die Zeit, wann der NÄCHSTE Zyklus dieser Karte beginnt.
      // Wir müssen hier die ursprüngliche initialStartDelay berücksichtigen.
      // Der Timeout wird erst am Ende des gesamten Lebenszyklus der KARTE ausgelöst.
      const timeUntilNextCardCreation = card.cycleTime + card.initialStartDelay;

      const timeoutId = setTimeout(() => {
        if (!mountedRef.current) return;

        const newCard = createNewCard(card.index, spatialGrid);
        if (newCard) {
          setFlowingCards((prev) =>
            prev.map((p) => (p.key === card.key ? newCard : p))
          );
          scheduleNextReplacement(newCard); // Nächsten Zyklus für die neue Karte planen
        }
      }, timeUntilNextCardCreation);
      timeoutsRef.current.add(timeoutId);
    };

    // Planen Sie den Ersatz für jede der initialen Karten
    initialCardsWithDelays.forEach(scheduleNextReplacement);

    return () => clearAllTimeouts();
  }, [spatialGrid, createNewCard, clearAllTimeouts]);

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
        @keyframes endless-cycle {
          0% {
            opacity: 0;
            transform: scale(0.5) translateY(0);
          }
          6% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(-75vh);
          }
        }
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
        .flowing-card {
          opacity: 0;
        }
      `}</style>

      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4"
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${glowPosition.x}px ${glowPosition.y}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
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
              }}
            />
          ))}
        </div>
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
