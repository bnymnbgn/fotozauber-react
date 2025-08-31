import { useState, useEffect, useRef } from "react";
import {
  Upload,
  MessageSquare,
  Palette,
  Download,
  CheckCircle,
  Clock,
  ArrowRight,
  Camera,
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
  const timelineRef = useRef(null);
  const stepsRef = useRef([]);
  const imageRefs = useRef([]);

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
        "Detaillierte Konzeptzeichnung",
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
        "Live-Anpassungen per Video-Call",
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
        "Lebenslanger Download-Zugang",
        "Optional: Physische Prints",
      ],
      duration: "Sofort",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      image: "/assets/transforms/7.png",
    },
  ];

  // GSAP Layer System Animation (PNG layers stack on top of each other)
  const animateImageTransition = (stepIndex, immediate = false) => {
    if (typeof window === "undefined" || !window.gsap) return;

    const { gsap } = window;

    console.log("🎬 ANIMATING STEP:", stepIndex, "Immediate:", immediate);

    // Show all layers up to current step (cumulative)
    imageRefs.current.forEach((img, index) => {
      if (!img) return;

      if (index <= stepIndex) {
        // Show this layer with proper z-index
        gsap.set(img, {
          zIndex: 10 + index, // Higher layers on top
          display: "block",
        });

        // If this is the current step, animate it in
        if (index === stepIndex && !immediate) {
          // Apply the specific animation for this step
          animateSpecificLayer(img, index);
        } else {
          // Just make sure it's visible (already animated)
          gsap.set(img, { opacity: 1 });
        }
      } else {
        // Hide layers that come after current step
        gsap.set(img, {
          opacity: 0,
          zIndex: 1,
          display: "none",
        });
      }
    });
  };

  // Specific animation for each layer
  const animateSpecificLayer = (imgElement, stepIndex) => {
    if (!window.gsap) return;
    const { gsap } = window;

    console.log("✅ ANIMATING LAYER:", stepIndex);

    // Specific animations for each layer
    switch (stepIndex) {
      case 0: // Baby (Base layer) - Clean Fade In
        gsap.fromTo(
          imgElement,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
        break;

      case 1: // Background - Smooth Slide Up
        gsap.fromTo(
          imgElement,
          { opacity: 0, y: 50, scaleY: 0.8 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 1.2,
            ease: "power3.out",
          }
        );
        break;

      case 2: // Additional Element - Scale & Rotate
        gsap.fromTo(
          imgElement,
          { opacity: 0, scale: 0.7, rotation: -15 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.0,
            ease: "back.out(1.3)",
          }
        );
        break;

      case 3: // More Elements - Elegant Zoom In
        gsap.fromTo(
          imgElement,
          {
            opacity: 0,
            scale: 1.3,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          }
        );
        break;

      case 4: // More Elements - Smooth Slide From Right
        gsap.fromTo(
          imgElement,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.1,
            ease: "power3.out",
          }
        );
        break;

      case 5: // More Elements - Fluid Scale & Alpha
        gsap.fromTo(
          imgElement,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: "power4.out",
          }
        );
        break;

      case 6: // Final Layer - Perfect Final Reveal
        gsap.fromTo(
          imgElement,
          {
            opacity: 0,
            scale: 1.2,
            transformOrigin: "center center",
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
          }
        );
        break;

      default:
        gsap.to(imgElement, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
    }
  };

  // Text Animation Timeline
  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      const { gsap } = window;

      const tl = gsap.timeline({ paused: true });

      tl.from(".step-transition h4", {
        opacity: 0,
        x: 30,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          ".step-transition p",
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ".step-transition ul li",
          {
            opacity: 0,
            x: -20,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.2"
        );

      timelineRef.current = tl;
    }
  }, []);

  // Initialize first image animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      animateImageTransition(0, true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Auto-advance steps with GSAP animation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => {
            const nextStep = (current + 1) % steps.length;

            // Trigger image and text animations
            animateImageTransition(nextStep, false);
            if (timelineRef.current) {
              timelineRef.current.restart();
            }

            return nextStep;
          });
          return 0;
        }
        return prev + 1; // Slower progression for better UX
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual step selection with GSAP animation
  const handleStepClick = (index) => {
    setActiveStep(index);
    setProgress(0);
    setIsAutoPlaying(false);

    // Trigger image and text animations
    animateImageTransition(index, false);
    if (timelineRef.current) {
      timelineRef.current.restart();
    }

    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const features = [
    {
      icon: CheckCircle,
      title: "Zufriedenheitsgarantie",
      description:
        "Bis zu 3 kostenlose Korrekturen bis Sie 100% zufrieden sind",
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
      className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-pink-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>SO FUNKTIONIERT ES</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Ihr Weg zur
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Von der ersten Idee bis zum fertigen Kunstwerk - so einfach und
            transparent ist der Weg zu Ihren magischen Erinnerungen.
          </p>
        </div>

        {/* Interaktive Schritte */}
        <div
          className="max-w-6xl mx-auto mb-20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((activeStep + progress / 100) / steps.length) * 100
                    }%`,
                  }}
                ></div>
              </div>

              {/* Progress Indicator for Current Step */}
              <div className="absolute top-20 left-0 right-0 h-2 flex">
                {steps.map((_, index) => (
                  <div key={index} className="flex-1 mx-1">
                    <div className="h-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          index === activeStep
                            ? "bg-gradient-to-r from-blue-500 to-purple-500"
                            : index < activeStep
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                        style={{
                          width:
                            index === activeStep
                              ? `${progress}%`
                              : index < activeStep
                              ? "100%"
                              : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Steps */}
              <div className="grid grid-cols-7 gap-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === index;
                  const isCompleted = activeStep > index;

                  return (
                    <div
                      key={step.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        isActive ? "transform scale-105" : ""
                      }`}
                      onClick={() => handleStepClick(index)}
                    >
                      {/* Step Circle */}
                      <div
                        className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 transform ${
                          isActive || isCompleted
                            ? `bg-gradient-to-br ${step.color} shadow-lg scale-110`
                            : "bg-white border-2 border-gray-300 hover:scale-105"
                        }`}
                      >
                        {/* Pulsing animation for active step */}
                        {isActive && (
                          <div
                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-30 animate-ping`}
                          ></div>
                        )}
                        <IconComponent
                          className={`w-8 h-8 ${
                            isActive || isCompleted
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        />

                        {/* Step Number */}
                        <div
                          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isActive || isCompleted
                              ? "bg-white text-gray-900"
                              : "bg-gray-300 text-gray-600"
                          }`}
                        >
                          {step.id}
                        </div>
                      </div>

                      {/* Step Content */}
                      <div className="text-center">
                        <h3
                          className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                            isActive ? "text-gray-900" : "text-gray-600"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {step.description}
                        </p>
                        <div
                          className={`inline-flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full ${
                            isActive ? step.bgColor : "bg-gray-100"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Step Details */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="step-transition">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {steps[activeStep].title}
                  </h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {steps[activeStep].description}
                  </p>

                  <ul className="space-y-3">
                    {steps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700 font-medium">
                      Dauer: {steps[activeStep].duration}
                    </span>
                  </div>
                </div>

                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg relative group">
                  <div className="w-full h-full relative">
                    {steps.map((step, index) => (
                      <img
                        key={index}
                        src={step.image}
                        alt={step.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110"
                        ref={(el) => (imageRefs.current[index] = el)}
                        style={{
                          opacity: index <= activeStep ? 1 : 0,
                          zIndex: 10 + index,
                          display: index <= activeStep ? "block" : "none",
                        }}
                      />
                    ))}
                  </div>
                  {/* Overlay with icon */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${steps[activeStep].color} flex items-center justify-center`}
                        >
                          {(() => {
                            const IconComponent = steps[activeStep].icon;
                            return (
                              <IconComponent className="w-6 h-6 text-white" />
                            );
                          })()}
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">
                            Schritt {steps[activeStep].id}
                          </h5>
                          <p className="text-white/80 text-sm">
                            {steps[activeStep].title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <div
                  key={step.id}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {step.title}
                        </h3>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${step.bgColor}`}
                        >
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{step.description}</p>

                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <button
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Jetzt Bilder hochladen
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>

            <button
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold py-4 px-8 rounded-full transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#gallery");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Beispiele ansehen
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
