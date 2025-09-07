import { useState, useRef, useCallback } from "react";
import { Maximize } from "lucide-react";

// Hilfsfunktion für bedingte Klassen
const cn = (...classes) => classes.filter(Boolean).join(" ");

const HoverComparisonSlider = ({
  beforeImage,
  afterImage,
  title,
  onImageClick,
  enforceAspectRatio = true,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition]
  );

  const handleTouchMove = useCallback(
    (e) => {
      // Verhindert Scrollen während des Swipens
      e.preventDefault();
      e.stopPropagation(); // Stoppt die Weitergabe des Events
      const touch = e.touches[0];
      updateSliderPosition(touch.clientX);
    },
    [updateSliderPosition]
  );

  const handleMouseLeave = useCallback(() => {
    setSliderPosition(50);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setSliderPosition(50);
  }, []);

  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      className="group relative"
      onClick={onImageClick ? onImageClick : undefined}
      style={{ cursor: onImageClick ? "pointer" : "default" }}
    >
      {/* Container für Bilder und UI-Elemente */}
      <div
        ref={containerRef}
        className={cn(
          "relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 bg-gray-100",
          enforceAspectRatio
            ? "aspect-[4/3]"
            : "max-h-[90vh] w-full md:max-w-5xl", // Responsives Design
          onImageClick && "hover:shadow-2xl"
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove} // Hinzugefügt: Touch-Events
        onTouchEnd={handleTouchEnd} // Hinzugefügt: Touch-Events
      >
        {/* After Image (Base Layer) */}
        <img
          src={afterImage}
          alt={`${title} - Nachher`}
          className={cn(
            "transition-transform duration-700 group-hover:scale-105",
            enforceAspectRatio
              ? "absolute inset-0 w-full h-full object-cover"
              : "block w-full max-w-full max-h-[90vh] object-contain"
          )}
          draggable={false}
          style={{ touchAction: "none" }}
        />

        {/* Before Image (Clipped Top Layer) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={beforeImage}
            alt={`${title} - Vorher`}
            className={cn(
              "transition-transform duration-700 group-hover:scale-105",
              enforceAspectRatio
                ? "absolute inset-0 w-full h-full object-cover"
                : "block w-full max-w-full max-h-[90vh] object-contain"
            )}
            draggable={false}
            style={{ touchAction: "none" }}
          />
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm pointer-events-none">
          Vorher
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm pointer-events-none">
          Nachher
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-lg pointer-events-none"
          style={{
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
            opacity: containerRef.current ? 1 : 0,
          }}
        ></div>

        {/* Klick-Indikator */}
        {onImageClick && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-black/70 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Maximize className="w-3 h-3" />
            <span>Klicken zum Vergrößern</span>
          </div>
        )}
      </div>

      {/* Title */}
      {onImageClick && (
        <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center group-hover:text-purple-600 transition-colors duration-300">
          {title}
        </h3>
      )}
    </div>
  );
};

export default HoverComparisonSlider;
