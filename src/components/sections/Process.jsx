// Process.jsx - Mobile-First responsive Version mit verbesserter UX

import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef(null);
  const imageRefs = useRef([]);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  // Screen size detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

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
      image: "/assets/transforms/1.png",
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "Beratung & Themenwahl",
      description:
        "Persönliche Beratung über Ihre Wünsche. Welches magische Thema soll es werden?",
      details: [
        "Persönliche Beratung per Telefon/Video",
        "Themen-Portfolio durchschauen",
        "Individuelle Konzeptentwicklung",
        "Kostenfreie Erstberatung",
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
      image: "/assets/transforms/4.png",
    },
    {
      id: 5,
      icon: Eye,
      title: "Erste Vorschau",
      description:
        "Sie erhalten eine erste Vorschau zur Begutachtung und können Änderungswünsche äußern.",
      details: [
        "Hochauflösende Vorschau-Datei",
        "Bis zu 3 Korrekturschleifen",
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
        "Druckfertige Dateien bis A3",
      ],
      duration: "Sofort",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      image: "/assets/transforms/7.png",
    },
  ];

  // Animation logic
  const animateSpecificLayer = (imgElement, stepIndex) => {
    if (!imgElement) return;

    // Simple CSS transitions for better mobile performance
    imgElement.style.transition = "all 0.8s ease-out";
    imgElement.style.opacity = "1";
    imgElement.style.transform = "translateY(0px) scale(1)";
  };

  const animateImageTransition = (stepIndex, immediate = false) => {
    imageRefs.current.forEach((img, index) => {
      if (!img) return;
      if (index <= stepIndex) {
        img.style.zIndex = 10 + index;
        img.style.display = "block";
        if (index === stepIndex && !immediate) {
          // Initial state for animation
          img.style.opacity = "0";
          img.style.transform = "translateY(20px) scale(0.95)";
          // Trigger animation
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
            const nextStep = (current + 1) % steps.length;
            animateImageTransition(nextStep, false);
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

  // Event Handlers
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setProgress(0);
    setIsAutoPlaying(false);
    animateImageTransition(index, false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

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
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile: Icons oberhalb des Bildes */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4 px-2">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === index;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(index)}
                      className={`p-2 md:p-3 rounded-xl transition-all duration-300 relative ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg scale-110"
                          : "bg-white text-gray-400 shadow-sm hover:text-gray-600 hover:shadow-md"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                      {/* Step number indicator */}
                      <div
                        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                          isActive
                            ? "bg-white text-purple-600 shadow-md"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Mobile: Horizontaler Progress Indicator */}
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-linear"
                  style={{
                    width: `${(progress + activeStep * 100) / steps.length}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Mobile: Größeres Bild mit Overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[3/4] mb-6">
              {/* Bild-Container */}
              <div className="w-full h-full">
                {steps.map((step, index) => (
                  <img
                    key={index}
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    ref={(el) => (imageRefs.current[index] = el)}
                    style={{
                      opacity: 0,
                      display: "none",
                    }}
                  />
                ))}
              </div>

              {/* Mobile: Overlay mit Step-Info */}
              <div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
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
            </div>

            {/* Mobile: Details unterhalb des Bildes */}
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
                      ref={(el) => (imageRefs.current[index] = el)}
                      style={{
                        opacity: 0,
                        display: "none",
                      }}
                    />
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 w-full z-20 step-transition p-6 md:p-8 pointer-events-none">
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
                      <Clock className="w-5 h-5 text-gray-900 flex-shrink-0" />
                      <span className="font-medium text-sm text-gray-900">
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

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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
