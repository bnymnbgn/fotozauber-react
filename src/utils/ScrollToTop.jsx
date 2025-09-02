// src/utils/ScrollToTop.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Holt den aktuellen Pfadnamen (z.B. "/", "/impressum")
  const { pathname } = useLocation();

  // Dieser Effekt wird jedes Mal ausgeführt, wenn sich der Pfadname ändert
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Diese Komponente rendert nichts, sie führt nur eine Aktion aus
  return null;
};

export default ScrollToTop;
