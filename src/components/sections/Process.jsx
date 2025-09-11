import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  MessageSquare,
  Palette,
  Download,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Wand2,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CustomSwiper from "../ui/CustomSwiper";

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const timelineRef = useRef(null);
  const imageRefsMobile = useRef([]);
  const imageRefsDesktop = useRef([]);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const touchStartX = useRef(0);
  const autoPlayTimeout = useRef(null);

  // Screen size detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Steps data
  // Daten der Schritte
  const steps = [
    {
      id: 1,
      icon: Upload,
      title: "Bilder hochladen",
      description:
        "Laden Sie Ihre Lieblingsbilder ganz einfach über unser sicheres Upload-System hoch.",
      details: [
        "Drag & Drop oder direkter Upload",
        "Unterstützt alle gängigen Formate",
        "Bis zu 10 Bilder pro Auftrag",
        "Sichere Datenübertragung",
      ],
      duration: "2 Minuten",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      image: "/assets/transforms/1.webp",
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "Beratung & Themenwahl",
      description:
        "Hier legen wir den Grundstein für Ihr persönliches Unikat. Welches magische Thema soll es werden?",
      details: [
        "Persönliche Beratung",
        "Themen-Portfolio durchschauen",
        "Individuelle Konzeptentwicklung",
        "Erstberatung",
      ],
      duration: "30 Minuten",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      image: "/assets/transforms/2.png",
    },
    {
      id: 3,
      icon: Palette,
      title: "Konzept & Planung",
      description:
        "Wir erstellen ein detailliertes Konzept und zeigen Ihnen den geplanten Bearbeitungsweg.",
      details: [
        "Detaillierte Konzepterstellung",
        "Farbpalette & Stimmung festlegen",
        "Technische Machbarkeitsprüfung",
        "Zeitplanung besprechen",
      ],
      duration: "1-2 Tage",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      image: "/assets/transforms/3.png",
    },
    {
      id: 4,
      icon: Wand2,
      title: "Magische Transformation",
      description:
        "Unsere Künstler erwecken Ihre Vision zum Leben und erschaffen einzigartige Kunstwerke.",
      details: [
        "Professionelle Bildbearbeitung",
        "Kreative Compositing-Techniken",
        "KI-unterstützte Verbesserungen",
        "Zwischenstatus per E-Mail",
      ],
      duration: "3-5 Tage",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      image: "/assets/transforms/4.webp",
    },
    {
      id: 5,
      icon: Eye,
      title: "Erste Vorschau",
      description:
        "Sie erhalten eine erste Vorschau zur Begutachtung und können Änderungswünsche äußern.",
      details: [
        "Hochauflösende Vorschau-Datei",
        "Detailliertes Feedback möglich",
      ],
      duration: "24 Stunden",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      image: "/assets/transforms/5.png",
    },
    {
      id: 6,
      icon: CheckCircle,
      title: "Finale Bearbeitung",
      description:
        "Nach Ihrer Freigabe führen wir die finalen Anpassungen durch und optimieren alle Details.",
      details: [
        "Finale Detailoptimierung",
        "Farbkorrekturen & Feintuning",
        "Qualitätskontrolle",
        "Mehrere Ausgabeformate erstellen",
      ],
      duration: "1-2 Tage",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      image: "/assets/transforms/6.png",
    },
    {
      id: 7,
      icon: Download,
      title: "Download & Lieferung",
      description:
        "Ihre fertigen Kunstwerke werden in höchster Qualität zum Download bereitgestellt.",
      details: [
        "Hochauflösende Qualität (300 DPI)",
        "Verschiedene Formate (JPEG, PNG, TIFF)",
        "Druckfertige Dateien",
      ],
      duration: "Sofort",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      image: "/assets/transforms/7.webp",
    },
  ];

  // Touch/Swipe handlers for mobile
  const handleTouchStart = useCallback(
    (e) => {
      if (!isMobile) return;

      setIsDragging(true);
      setIsAutoPlaying(false);
      const touch = e.touches[0];
      setStartX(touch.clientX);
      setCurrentX(touch.clientX);
      touchStartX.current = touch.clientX;

      // Clear any existing auto-play timeout
      if (autoPlayTimeout.current) {
        clearTimeout(autoPlayTimeout.current);
      }
    },
    [isMobile]
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging || !isMobile) return;

      e.preventDefault();
      const touch = e.touches[0];
      setCurrentX(touch.clientX);

      const deltaX = touch.clientX - startX;
      const containerWidth = mobileContainerRef.current?.offsetWidth || 0;
      const threshold = containerWidth * 0.15; // 15% of container width

      // Limit the drag distance
      const maxDrag = Math.min(Math.abs(deltaX), threshold);
      const limitedDeltaX = deltaX > 0 ? maxDrag : -maxDrag;

      setTranslateX(limitedDeltaX);
    },
    [isDragging, startX, isMobile]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || !isMobile) return;

    setIsDragging(false);

    const deltaX = currentX - startX;
    const containerWidth = mobileContainerRef.current?.offsetWidth || 0;
    const threshold = containerWidth * 0.2; // 20% swipe threshold

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0 && activeStep > 0) {
        // Swipe right - previous step
        changeStep(activeStep - 1);
      } else if (deltaX < 0 && activeStep < steps.length - 1) {
        // Swipe left - next step
        changeStep(activeStep + 1);
      }
    }

    // Reset transform
    setTranslateX(0);

    // Resume autoplay after a delay
    autoPlayTimeout.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  }, [isDragging, currentX, startX, activeStep, steps.length, isMobile]);

  const changeStep = useCallback(
    (newStep) => {
      if (newStep >= 0 && newStep < steps.length) {
        setActiveStep(newStep);
        setProgress(0);
        animateImageTransition(newStep, false);
      }
    },
    [steps.length]
  );

  // Mouse handlers for desktop
  const handleMouseEnter = () => !isMobile && setIsAutoPlaying(false);
  const handleMouseLeave = () => !isMobile && setIsAutoPlaying(true);

  const handleStepClick = (index) => {
    changeStep(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Animation logic
  const animateSpecificLayer = (imgElement, stepIndex) => {
    if (!imgElement) return;

    imgElement.style.transition = "all 0.8s ease-out";
    imgElement.style.opacity = "1";
    imgElement.style.transform = "translateY(0px) scale(1)";
  };

  const animateImageTransition = (stepIndex, immediate = false) => {
    const currentRefs = isMobile
      ? imageRefsMobile.current
      : imageRefsDesktop.current;

    currentRefs.forEach((img, index) => {
      if (!img) return;

      if (isMobile) {
        // Mobile: Use CSS-based transitions (don't override inline styles)
        // The mobile images handle their own transitions via CSS classes
        return;
      }

      // Desktop: Keep existing logic
      if (index <= stepIndex) {
        img.style.zIndex = 10 + index;
        img.style.display = "block";
        if (index === stepIndex && !immediate) {
          img.style.opacity = "0";
          img.style.transform = "translateY(20px) scale(0.95)";
          setTimeout(() => animateSpecificLayer(img, index), 50);
        } else {
          img.style.opacity = "1";
          img.style.transform = "translateY(0px) scale(1)";
        }
      } else {
        img.style.opacity = "0";
        img.style.zIndex = "1";
        img.style.display = "none";
      }
    });
  };

  // Auto-play logic
  useEffect(() => {
    const timer = setTimeout(() => {
      animateImageTransition(0, true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => {
            if (isTransitioning) return current;
            setIsTransitioning(true);
            const nextStep = current >= steps.length - 1 ? 0 : current + 1;
            animateImageTransition(nextStep, false);
            setTimeout(() => setIsTransitioning(false), 100);
            return nextStep;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  // Height synchronization for desktop
  useEffect(() => {
    const setMatchingHeight = () => {
      if (
        leftColumnRef.current &&
        rightColumnRef.current &&
        window.innerWidth >= 1024
      ) {
        const leftHeight = leftColumnRef.current.offsetHeight;
        rightColumnRef.current.style.height = `${leftHeight}px`;
      } else if (rightColumnRef.current) {
        rightColumnRef.current.style.height = "auto";
      }
    };

    const timer = setTimeout(setMatchingHeight, 100);
    window.addEventListener("resize", setMatchingHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", setMatchingHeight);
    };
  }, [steps, activeStep]);

  // Clean up
  useEffect(() => {
    return () => {
      if (autoPlayTimeout.current) {
        clearTimeout(autoPlayTimeout.current);
      }
    };
  }, []);

  // Features data
  const features = [
    {
      icon: CheckCircle,
      title: "Zufriedenheitsgarantie",
      description: "Wir kümmern uns um Sie, bis Sie 100% zufrieden sind",
    },
    {
      icon: Clock,
      title: "Schnelle Bearbeitung",
      description: "Express-Service in 24-48h gegen Aufpreis verfügbar",
    },
    {
      icon: Heart,
      title: "Persönlicher Service",
      description: "Direkter Kontakt zu Ihrem persönlichen Bildbearbeiter",
    },
    {
      icon: Zap,
      title: "Modernste Technik",
      description: "KI-unterstützte Workflows für beste Ergebnisse",
    },
  ];

  return (
    <section
      id="process"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>SO FUNKTIONIERT ES</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Magische
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Von der ersten Idee bis zum fertigen Kunstwerk - so einfach und
            transparent ist der Weg zu Ihren magischen Erinnerungen.
          </p>
        </div>

        {/* Interactive Section */}
        <div
          className="max-w-6xl mx-auto mb-16 md:mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Mobile Layout with Swiper */}
          <div className="lg:hidden">
            {/* Mobile: Swiper Container */}
            <div
              ref={mobileContainerRef}
              className="relative select-none overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Mobile: Image Container - static during swipe */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[3/4] mb-6">
                {/* Image Container */}
                <div className="w-full h-full">
                  {steps.map((step, index) => (
                    <img
                      key={index}
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-800 ease-out"
                      ref={(el) => (imageRefsMobile.current[index] = el)}
                      style={{
                        opacity: index <= activeStep ? 1 : 0,
                        transform:
                          index === activeStep
                            ? "translateY(0px) scale(1)"
                            : index < activeStep
                            ? "translateY(0px) scale(1)"
                            : "translateY(20px) scale(0.95)",
                        zIndex: index + 1,
                        display: "block",
                      }}
                    />
                  ))}
                </div>

                {/* Mobile: Overlay with Step-Info */}
                <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
                <div
                  key={activeStep}
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-20 
                   bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      {(() => {
                        const IconComponent = steps[activeStep].icon;
                        return <IconComponent className="w-5 h-5" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold drop-shadow-lg">
                        {activeStep + 1}. {steps[activeStep].title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-200" />
                        <span className="text-sm text-gray-200 font-medium">
                          {steps[activeStep].duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-base md:text-lg text-gray-100 leading-relaxed mt-3 drop-shadow-md font-medium">
                    {steps[activeStep].description}
                  </p>
                </div>

                {/* Mobile: Navigation Arrows (subtle) */}
                {activeStep > 0 && (
                  <button
                    onClick={() => changeStep(activeStep - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => changeStep(activeStep + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}

                {/* Mobile: Step Indicators (Dots) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => changeStep(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeStep
                          ? "bg-white scale-125"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Mobile: Progress Bar */}
                <div className="absolute top-4 left-4 right-4 z-30">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-100 ease-linear"
                      style={{
                        width: `${
                          (progress + activeStep * 100) / steps.length
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Swipe Hint (only show briefly) */}
                {activeStep === 0 && !isDragging && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-pulse">
                    <div className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2">
                      <span>← Wischen zum Durchblättern →</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile: Details below image */}
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Was passiert in diesem Schritt:
                </h4>
                <ul className="space-y-2">
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop Layout (unchanged) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-x-12 gap-y-8 items-start">
            {/* Desktop: Image Column */}
            <div
              ref={rightColumnRef}
              className="lg:col-span-7 lg:sticky lg:top-24"
            >
              <div className="rounded-2xl shadow-xl h-full relative overflow-hidden bg-gray-100 group">
                <div className="w-full h-full">
                  {steps.map((step, index) => (
                    <img
                      key={index}
                      src={step.image}
                      alt={step.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      ref={(el) => (imageRefsDesktop.current[index] = el)}
                      style={{
                        opacity: 0,
                        display: "none",
                      }}
                    />
                  ))}
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full z-20 step-transition p-6 md:p-8 pointer-events-none 
                   bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                >
                  <div>
                    <ul className="space-y-2 mt-4 mb-5">
                      {steps[activeStep].details.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 drop-shadow-sm" />
                          <span className="text-gray-100 drop-shadow-sm">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center space-x-3 bg-white/10 p-3 rounded-lg border border-white/20 backdrop-blur-sm">
                      <Clock className="w-5 h-5 text-white flex-shrink-0" />
                      <span className="font-medium text-sm text-white">
                        Geschätzte Dauer für diesen Schritt:{" "}
                        <span className="font-bold">
                          {steps[activeStep].duration}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Steps Column */}
            <div ref={leftColumnRef} className="lg:col-span-5 space-y-4">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === index;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border ${
                      isActive
                        ? "bg-white shadow-xl scale-[1.02] border-purple-200 ring-1 ring-purple-100"
                        : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg hover:border-gray-200"
                    }`}
                  >
                    <div className="flex space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3
                          className={`font-bold text-base transition-colors ${
                            isActive ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {index + 1}. {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-snug mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    {isActive && (
                      <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-linear"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          {/* Mobile Ansicht: Swiper */}
          <div className="md:hidden">
            <CustomSwiper
              items={features}
              effect="cards"
              slideClassName="bg-white rounded-2xl shadow-lg"
              renderSlide={(feature) => {
                const IconComponent = feature.icon;
                return (
                  <div className="text-center p-6 h-full">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              }}
              className="w-full h-[280px]"
              swiperProps={{
                style: { paddingBottom: "50px" },
              }}
            />
          </div>

          {/* Desktop Ansicht: Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id} // Besser die ID aus dem Array verwenden
                  className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Bereit für den ersten Schritt?
          </h3>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Starten Sie noch heute Ihre magische Transformation. Der Upload
            Ihrer Bilder dauert nur wenige Minuten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Jetzt Bilder hochladen
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-full transition-all duration-300">
              Beispiele ansehen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
