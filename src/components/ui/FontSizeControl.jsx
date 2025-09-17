import { useState, useEffect } from "react";

const FontSizeControl = () => {
  const [fontSize, setFontSize] = useState("medium");

  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSize") || "medium";
    setFontSize(savedFontSize);
    applyFontSize(savedFontSize);
  }, []);

  const applyFontSize = (size) => {
    const root = document.documentElement;
    
    switch(size) {
      case "small":
        root.style.fontSize = "14px";
        break;
      case "medium":
        root.style.fontSize = "16px";
        break;
      case "large":
        root.style.fontSize = "18px";
        break;
      case "xlarge":
        root.style.fontSize = "20px";
        break;
      default:
        root.style.fontSize = "16px";
    }
    
    root.style.setProperty("--font-size-multiplier", 
      size === "small" ? "0.875" :
      size === "medium" ? "1" :
      size === "large" ? "1.125" :
      size === "xlarge" ? "1.25" : "1"
    );
  };

  const increaseFontSize = () => {
    const sizes = ["small", "medium", "large", "xlarge"];
    const currentIndex = sizes.indexOf(fontSize);
    const nextIndex = Math.min(currentIndex + 1, sizes.length - 1);
    const newSize = sizes[nextIndex];
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem("fontSize", newSize);
  };

  const decreaseFontSize = () => {
    const sizes = ["small", "medium", "large", "xlarge"];
    const currentIndex = sizes.indexOf(fontSize);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const newSize = sizes[prevIndex];
    setFontSize(newSize);
    applyFontSize(newSize);
    localStorage.setItem("fontSize", newSize);
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={decreaseFontSize}
        disabled={fontSize === "small"}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all touch-optimized flex items-center justify-center"
        aria-label="Schrift verkleinern"
        title="Schrift verkleinern"
      >
        <span className="text-gray-700 text-sm font-medium">A−</span>
      </button>
      
      <button
        onClick={increaseFontSize}
        disabled={fontSize === "xlarge"}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all touch-optimized flex items-center justify-center"
        aria-label="Schrift vergrößern"
        title="Schrift vergrößern"
      >
        <span className="text-gray-700 text-base font-medium">A+</span>
      </button>
    </div>
  );
};

export default FontSizeControl;