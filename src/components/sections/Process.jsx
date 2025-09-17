// src/components/sections/Process.jsx

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Upload,
  MessageSquare,
  Palette,
  Download,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Wand2,
  Eye,
} from "lucide-react";
import CustomSwiper from "../ui/CustomSwiper";

// Ihre Framer Motion Variants (unverändert)
const imageLayerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: "blur(4px)",
    y: 10,
  },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
      filter: { duration: 0.4 },
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const stepButtonVariants = {
  inactive: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  active: {
    scale: 1.02,
    y: -2,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  hover: {
    scale: 1.01,
    y: -1,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const iconVariants = {
  inactive: { rotate: 0, scale: 1 },
  active: {
    rotate: [0, -5, 5, -5, 5, 0],
    scale: 1.1,
    transition: {
      rotate: { duration: 0.6, ease: "easeInOut" },
      scale: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
};

const progressBarVariants = {
  initial: { scaleX: 0 },
  animate: (progress) => ({
    scaleX: progress / 100,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 },
  }),
};

// Daten der Schritte (unverändert)
const steps = [
  {
    id: 1,
    icon: Upload,
    title: "Bilder hochladen",
    description:
      "Laden Sie Ihre Lieblingsbilder ganz einfach über unser sicheres Upload-System hoch.",
    duration: "2 Minuten",
    image: "/assets/transforms/1.webp",
  },
  {
    id: 2,
    icon: MessageSquare,
    title: "Beratung & Themenwahl",
    description: "Hier legen wir den Grundstein für Ihr persönliches Unikat.",
    duration: "30 Minuten",
    image: "/assets/transforms/2.png",
  },
  {
    id: 3,
    icon: Palette,
    title: "Konzept & Planung",
    description:
      "Wir erstellen ein detailliertes Konzept und zeigen den geplanten Weg.",
    duration: "1-2 Tage",
    image: "/assets/transforms/3.png",
  },
  {
    id: 4,
    icon: Wand2,
    title: "Magische Transformation",
    description: "Unsere Künstler erwecken Ihre Vision zum Leben.",
    duration: "3-5 Tage",
    image: "/assets/transforms/4.webp",
  },
  {
    id: 5,
    icon: Eye,
    title: "Erste Vorschau",
    description:
      "Sie erhalten eine Vorschau und können Änderungswünsche äußern.",
    duration: "24 Stunden",
    image: "/assets/transforms/5.png",
  },
  {
    id: 6,
    icon: CheckCircle,
    title: "Finale Bearbeitung",
    description: "Nach Ihrer Freigabe optimieren wir alle Details.",
    duration: "1-2 Tage",
    image: "/assets/transforms/6.png",
  },
  {
    id: 7,
    icon: Download,
    title: "Download & Lieferung",
    description:
      "Ihre fertigen Kunstwerke werden in höchster Qualität bereitgestellt.",
    duration: "Sofort",
    image: "/assets/transforms/7.webp",
  },
];

// Enhanced Mobile Swiper Render Function
const renderProcessStepSlide = (step, slideIndex) => {
  const IconComponent = step.icon;
  const imagesToShow = steps.slice(0, slideIndex + 1);

  return (
    <motion.div
      className="w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 aspect-[3/4] mb-6">
        <AnimatePresence>
          {imagesToShow.map((imgStep, imgIndex) => (
            <motion.img
              key={`img-layer-${imgStep.id}`} // *** DIE ENTSCHEIDENDE KORREKTUR ***
              src={imgStep.image}
              alt={`Bearbeitungsschritt ${imgIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: imgIndex + 1, willChange: "transform, opacity" }}
              custom={imgIndex}
              variants={imageLayerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              loading="lazy"
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="text-center px-2 flex-grow flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-3 mb-3">
          <motion.div
            className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <IconComponent className="w-5 h-5" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {step.id}. {step.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600 font-medium">
            {step.duration}
          </span>
        </div>
        <p className="text-base text-gray-700 leading-relaxed flex-grow">
          {step.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const progressControls = useAnimation();

  useEffect(() => {
    if (!isAutoPlaying || window.innerWidth < 1024) return;

    let startTime = Date.now();
    let animationFrameId;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      let newProgress = (elapsed / 8000) * 100;

      if (newProgress >= 100) {
        setActiveStep((current) => {
          const nextStep = (current + 1) % steps.length;
          startTime = Date.now(); // Reset timer for the new step
          setProgress(0);
          return nextStep;
        });
        return;
      }
      setProgress(newProgress);
      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoPlaying, activeStep]);

  useEffect(() => {
    progressControls.start("animate");
  }, [progress, progressControls]);

  useEffect(() => {
    const setMatchingHeight = () => {
      if (
        leftColumnRef.current &&
        rightColumnRef.current &&
        window.innerWidth >= 1024
      ) {
        const leftHeight = leftColumnRef.current.offsetHeight;
        rightColumnRef.current.style.height = `${leftHeight}px`;
      }
    };
    const resizeObserver = new ResizeObserver(setMatchingHeight);
    if (leftColumnRef.current) {
      resizeObserver.observe(leftColumnRef.current);
    }
    setMatchingHeight();
    return () => resizeObserver.disconnect();
  }, [activeStep]);

  return (
    <section
      id="process"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-4 h-4" />
            <span>SO FUNKTIONIERT ES</span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Magische
            <motion.span
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Transformation
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Von der ersten Idee bis zum fertigen Kunstwerk - so einfach und
            transparent ist der Weg zu Ihren magischen Erinnerungen.
          </motion.p>
        </motion.div>

        <motion.div
          className="lg:hidden mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <CustomSwiper
            items={steps}
            renderSlide={(step, index) => renderProcessStepSlide(step, index)}
            effect="coverflow"
            slideClassName="bg-white rounded-2xl p-4 shadow-md"
            className="w-full h-[620px]"
            swiperProps={{ style: { paddingBottom: "50px" } }}
          />
        </motion.div>

        <motion.div
          className="hidden lg:grid lg:grid-cols-12 gap-x-12 items-start max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            ref={rightColumnRef}
            className="lg:col-span-7 lg:sticky lg:top-24"
          >
            <div className="rounded-2xl shadow-xl h-full relative overflow-hidden bg-gray-100 group">
              <AnimatePresence>
                {steps.slice(0, activeStep + 1).map((step, index) => (
                  <motion.img
                    key={step.id}
                    src={step.image}
                    alt={`Bearbeitungsschritt ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      zIndex: index + 1,
                      willChange: "transform, opacity",
                    }}
                    custom={index}
                    variants={imageLayerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    loading="lazy"
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          <div ref={leftColumnRef} className="lg:col-span-5 space-y-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`w-full text-left p-4 rounded-2xl transition-colors duration-300 border ${
                    isActive
                      ? "bg-white border-purple-200"
                      : "bg-gray-50 border-transparent"
                  }`}
                  variants={stepButtonVariants}
                  animate={isActive ? "active" : "inactive"}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                >
                  <div className="flex space-x-4">
                    <motion.div
                      className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      variants={iconVariants}
                      animate={isActive ? "active" : "inactive"}
                    >
                      <step.icon className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-1">
                      <h3
                        className={`font-bold text-base transition-colors duration-300 ${
                          isActive ? "text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 4 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
                          custom={progress}
                          variants={progressBarVariants}
                          initial="initial"
                          animate={progressControls}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
      {/* Call to Action - JETZT MIT VOLLER BREITE */}
      <section className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container">
          <motion.div
            className="text-center rounded-3xl p-8 md:p-12 text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Bereit für den ersten Schritt?
            </motion.h3>
            <motion.p
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Starten Sie noch heute Ihre magische Transformation. Der Upload
              Ihrer Bilder dauert nur wenige Minuten.
            </motion.p>
            <motion.button
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-full transition-colors duration-300 shadow-lg"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.6,
              }}
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Jetzt Bilder hochladen
              <motion.div
                className="inline-block ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default Process;
