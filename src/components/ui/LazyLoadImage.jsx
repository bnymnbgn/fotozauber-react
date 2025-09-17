import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

// Filter out non-DOM props
const filterDOMProps = (props) => {
  const domProps = { ...props };
  const nonDOMProps = [
    "layoutId",
    "transition",
    "initial",
    "animate",
    "exit",
    "whileHover",
    "whileTap",
  ];

  nonDOMProps.forEach((prop) => {
    delete domProps[prop];
  });

  return domProps;
};

const LazyLoadImage = ({
  src,
  alt,
  placeholder = null,
  className = "",
  webpSrc = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // WebP Unterstützung prüfen
    const checkWebPSupport = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL("image/webp").indexOf("image/webp") === 0;
    };

    setSupportsWebP(checkWebPSupport());
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current.unobserve(entry.target);
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const getImageSrc = () => {
    if (webpSrc && supportsWebP) {
      return webpSrc;
    }
    return src;
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {!isLoaded && placeholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          {placeholder}
        </div>
      )}

      {isInView && (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={getImageSrc()}
            alt={alt}
            onLoad={handleImageLoad}
            className={`transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            {...filterDOMProps(props)}
          />
        </picture>
      )}
    </div>
  );
};

LazyLoadImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  className: PropTypes.string,
  webpSrc: PropTypes.string,
};

export default LazyLoadImage;
