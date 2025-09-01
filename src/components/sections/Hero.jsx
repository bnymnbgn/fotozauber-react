// src/components/sections/Hero.jsx

// HINWEIS: Die Komponente wurde um ein viertes Bild erweitert.
// 1. Ein neuer Bild-Container wurde hinzugefügt.
// 2. Die Variable `totalImages` wurde auf 4 aktualisiert.

import { ArrowRight, Sparkles, Award, Heart, Camera } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

// Ein benutzerdefinierter Hook, um zu erkennen, wenn ein Element sichtbar wird.
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};

// Eine Komponente für die animierten Zahlen
const CountUpNumber = ({ end, duration = 2000, className, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const finalEnd = parseInt(String(end).replace(/[^0-9]/g, ""), 10);
      if (start === finalEnd) return;

      let startTime = null;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const currentNum = Math.floor(progress * finalEnd);
        setCount(currentNum);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [end, duration, isVisible]);

  return (
    <div ref={ref} className={className}>
      {count}
      {suffix}
    </div>
  );
};

// Button-Komponente mit "Shine"-Effekt
const Button = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-full font-semibold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none overflow-hidden group";
  const variantStyles = {
    default:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700",
    outline:
      "border border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50",
  };
  const sizeStyles = {
    default: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={combinedClassName} {...props}>
      {variant === "default" && (
        <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 ease-in-out group-hover:left-full" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const Hero = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(0);
  // AKTUALISIERT: Die Gesamtzahl der Bilder
  const totalImages = 3;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      const xRotate = (clientX - left - width / 2) / (width / 2);
      const yRotate = (clientY - top - height / 2) / (height / 2);
      setRotate({ x: yRotate * -15, y: xRotate * 15 });
      setGlowPosition({ x: clientX - left, y: clientY - top });
    };
    const heroElement = document.getElementById("home");
    heroElement.addEventListener("mousemove", handleMouseMove);
    return () => heroElement.removeEventListener("mousemove", handleMouseMove);
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

  const handleScrollToGallery = () =>
    document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
  const handleScrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  const allImagesLoaded = imagesLoaded >= totalImages;

  return (
    <>
      <style>
        {`
          @keyframes aurora-text { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          .animated-gradient-text { background-size: 200% auto; animation: aurora-text 5s ease-in-out infinite; }
          @keyframes twinkle { 0%, 100% { opacity: 0; } 50% { opacity: 0.8; } }
          .particle { animation-name: twinkle; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
        `}
      </style>
      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 px-4 sm:px-6 lg:px-8"
        style={{ perspective: "1000px" }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${glowPosition.x}px ${glowPosition.y}px, rgba(167, 139, 250, 0.15), transparent 80%)`,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
        <div className="relative z-10 flex flex-col items-center pt-16 lg:pt-20 justify-center w-full max-w-screen-xl gap-12 md:flex-row">
          <div className="flex-1 max-w-lg text-center md:text-left animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 text-sm font-medium text-white/90 bg-white/10 border border-white/20 rounded-full shadow-lg backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>NOHA STUDIO PRÄSENTIERT</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="block">
                Lebendige{" "}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animated-gradient-text">
                  Magie
                </span>
              </span>
              <span className="block mt-2 text-white/95">in jedem Bild</span>
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl max-w-prose">
              Verwandeln Sie Kinderfotografien in kunstvolle Fantasiewelten, die
              Erinnerungen bewahren und Emotionen für die Ewigkeit festhalten.
            </p>

            <div className="grid grid-cols-3 gap-4 py-8 text-center md:text-left">
              <div className="group">
                <CountUpNumber
                  end={100}
                  suffix="+"
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                />
                <div className="text-sm text-white/70">Glückliche Familien</div>
              </div>
              <div className="group">
                <CountUpNumber
                  end={5}
                  suffix="★"
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                />
                <div className="text-sm text-white/70">Bewertungen</div>
              </div>
              <div className="group">
                <CountUpNumber
                  end={15}
                  suffix="+"
                  className="text-2xl md:text-3xl font-bold text-white mb-1"
                />
                <div className="text-sm text-white/70">Jahre Erfahrung</div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" onClick={handleScrollToGallery}>
                <span className="flex items-center">
                  <span>Galerie entdecken</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleScrollToContact}
              >
                Kontakt aufnehmen
              </Button>
            </div>
            <div className="flex items-center justify-center mt-8 space-x-6 md:justify-start">
              <div className="flex items-center space-x-2 group">
                <Award className="w-5 h-5 text-yellow-400 transition-transform duration-300 group-hover:scale-125 group-hover:animate-pulse" />
                <span className="text-sm text-white/70">Professionell</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <Heart className="w-5 h-5 text-pink-400 transition-transform duration-300 group-hover:scale-125 group-hover:animate-bounce" />
                <span className="text-sm text-white/70">Liebevoll</span>
              </div>
              <div className="flex items-center space-x-2 group">
                <Camera className="w-5 h-5 text-blue-400 transition-transform duration-300 group-hover:scale-125 group-hover:animate-pulse" />
                <span className="text-sm text-white/70">Kreativ</span>
              </div>
            </div>
          </div>
          <div
            className="relative flex items-center justify-center flex-1 w-full max-w-lg h-[500px] md:h-[600px] lg:h-[700px] animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div
              className="relative w-full h-full transition-transform duration-300 ease-out pointer-events-none"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              }}
            >
              <div
                className={`pointer-events-auto absolute w-[88%] h-[88%] top-0 right-[-5%] border-4 border-white/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
                  allImagesLoaded ? "opacity-100" : "opacity-0"
                } [transform:rotate(8deg)_translateZ(-100px)] hover:z-20 hover:[transform:rotate(6deg)_translateZ(150px)_scale(1.15)]`}
              >
                <img
                  src="/assets/img/Halid 1.jpg"
                  alt="Kreatives Kinderfoto"
                  className="object-cover w-full h-full"
                  onLoad={handleImageLoad}
                />
              </div>

              <div
                className={`pointer-events-auto absolute w-[88%] h-[88%] bottom-0 right-[30%] border-4 border-white/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
                  allImagesLoaded ? "opacity-100" : "opacity-0"
                } [transform:rotate(-4deg)_translateZ(0px)] hover:z-20 hover:[transform:rotate(-2deg)_translateZ(150px)_scale(1.15)]`}
              >
                <img
                  src="/assets/img/TIGER Kopie2.jpg"
                  alt="Magische Kinderportraits"
                  className="object-cover w-full h-full"
                  onLoad={handleImageLoad}
                />
              </div>

              <div
                className={`pointer-events-auto absolute w-[92%] h-[92%] top-[12%] left-[5%] border-4 border-white/80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
                  allImagesLoaded ? "opacity-100" : "opacity-0"
                } [transform:rotate(-10deg)_translateZ(100px)] hover:z-20 hover:[transform:rotate(-8deg)_translateZ(150px)_scale(1.15)]`}
              >
                <img
                  src="/assets/img/randombebe Kopie.jpg"
                  alt="Fantasiewelt für Kinder"
                  className="object-cover w-full h-full"
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="hidden md:block absolute z-10 text-center transform -translate-x-1/2 cursor-pointer bottom-8 left-1/2 animate-bounce"
          onClick={handleScrollToGallery}
        >
          <span className="block mb-2 text-sm text-white/70">
            Entdecke mehr
          </span>
          <div className="relative flex justify-center w-6 h-10 mx-auto mb-2 border-2 border-white/30 rounded-full">
            <div className="w-1 h-3 mt-2 bg-white/60 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
