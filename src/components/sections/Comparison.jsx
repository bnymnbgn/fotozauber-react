// src/components/sections/Comparison.jsx

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import { ArrowLeft, ArrowRight, Eye, Sparkles, Timer, X } from "lucide-react";
import { comparisons } from "../../data/content";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Reusable Lightbox Slider
const LightboxComparisonSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleInteractionStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleInteractionMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleInteractionMove);
      document.addEventListener("mouseup", handleInteractionEnd);
      document.addEventListener("touchmove", handleInteractionMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleInteractionEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleInteractionMove);
      document.removeEventListener("mouseup", handleInteractionEnd);
      document.removeEventListener("touchmove", handleInteractionMove);
      document.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded-lg"
    >
      {/* After Image (Base Layer) */}
      <img
        src={afterImage}
        alt="Nachher"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium pointer-events-none">
        Nachher
      </div>

      {/* Before Image (Clipped Top Layer) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Vorher"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium pointer-events-none">
          Vorher
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-all duration-200 border-4 border-purple-500">
          <div className="w-6 h-6 flex items-center justify-center space-x-1">
            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonSlider = ({
  beforeImage,
  afterImage,
  title,
  description,
  onClick,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleInteractionStart = (e) => {
    e.stopPropagation(); // Prevent card click when interacting with handle
    e.preventDefault();
    setIsDragging(true);
  };

  const handleInteractionMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updatePosition(clientX);
  };

  const handleInteractionEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleInteractionMove);
      document.addEventListener("mouseup", handleInteractionEnd);
      document.addEventListener("touchmove", handleInteractionMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleInteractionEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleInteractionMove);
      document.removeEventListener("mouseup", handleInteractionEnd);
      document.removeEventListener("touchmove", handleInteractionMove);
      document.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [isDragging]);

  return (
    <div className="comparison-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden select-none cursor-pointer"
        onClick={onClick}
      >
        {/* After Image (Base Layer) */}
        <div className="absolute inset-0">
          <img
            src={afterImage}
            alt="Nachher"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Nachher
          </div>
        </div>

        {/* Before Image (Clipped Top Layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={beforeImage}
            alt="Vorher"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Vorher
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleInteractionStart}
          onTouchStart={handleInteractionStart}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-all duration-200 border-4 border-purple-500">
            <div className="w-6 h-6 flex items-center justify-center space-x-1">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const Comparison = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState({
    before: "",
    after: "",
  });

  const openLightbox = (before, after) => {
    setLightboxContent({ before, after });
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      <section
        id="comparison"
        className="py-20 sm:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 left-20 w-20 h-20 bg-blue-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Timer className="w-4 h-4" />
              <span>VORHER & NACHHER</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Die
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Transformation
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Erleben Sie die magische Verwandlung von gewöhnlichen Fotos zu
              außergewöhnlichen Kunstwerken. Bewegen Sie den Schieberegler oder
              klicken Sie, um die Unterschiede zu erkunden.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="max-w-4xl mx-auto">
              <ComparisonSlider
                beforeImage={comparisons[activeSlide].before}
                afterImage={comparisons[activeSlide].after}
                title={comparisons[activeSlide].title}
                description={comparisons[activeSlide].description}
                onClick={() =>
                  openLightbox(
                    comparisons[activeSlide].before,
                    comparisons[activeSlide].after
                  )
                }
              />
            </div>

            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev > 0 ? prev - 1 : comparisons.length - 1
                  )
                }
                className="comparison-prev w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-purple-600 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex space-x-2">
                {comparisons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? "bg-purple-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setActiveSlide((prev) =>
                    prev < comparisons.length - 1 ? prev + 1 : 0
                  )
                }
                className="comparison-next w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-700 hover:text-purple-600 transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
            {comparisons.map((comparison) => (
              <ComparisonSlider
                key={comparison.id}
                beforeImage={comparison.before}
                afterImage={comparison.after}
                title={comparison.title}
                description={comparison.description}
                onClick={() =>
                  openLightbox(comparison.before, comparison.after)
                }
              />
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Transformierte Bilder</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3-7</h3>
              <p className="text-gray-600">Tage Bearbeitungszeit</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Zufriedene Kunden</p>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl h-[80vh] p-4">
            <button
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-200 transition-all"
            >
              <X size={24} />
            </button>
            <LightboxComparisonSlider
              beforeImage={lightboxContent.before}
              afterImage={lightboxContent.after}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comparison;
