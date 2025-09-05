// src/components/ui/ComparisonSlider.jsx
import { useState, useRef, useEffect, useCallback } from "react";

const ComparisonSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Vorher",
  afterLabel = "Nachher",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleInteractionStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleInteractionMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updatePosition(clientX);
    },
    [isDragging, updatePosition]
  );

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
  }, [isDragging, handleInteractionMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] select-none overflow-hidden rounded-2xl shadow-2xl group"
    >
      {/* After Image (Base Layer) */}
      <img
        src={afterImage}
        alt="Nachher-Version des Bildes"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium pointer-events-none z-10">
        {afterLabel}
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
          alt="Vorher-Version des Bildes"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium pointer-events-none z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing group-hover:scale-110 transition-transform duration-200 border-2 border-gray-200">
          <div className="w-6 h-6 flex items-center justify-center space-x-1 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 17l-5-5 5-5M6 17l-5-5 5-5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSlider;
