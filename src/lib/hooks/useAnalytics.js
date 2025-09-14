// src/hooks/useAnalytics.js

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// DEINE PERSÖNLICHE TRACKING-ID IST HIER EINGEFÜGT
const GA_MEASUREMENT_ID = "G-VBQP7YR7M3";

// Helfer-Funktion, um den Zustand aus dem LocalStorage zu lesen
const getConsentState = () => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const state = localStorage.getItem("fotozauber_cookie_consent");
    return state ? JSON.parse(state) : null;
  } catch (e) {
    return null;
  }
};

let isGaInitialized = false;

export const useAnalytics = () => {
  const location = useLocation(); // Hook, um auf Seitenwechsel zu reagieren

  // Dieser Effekt wird bei JEDEM Seitenwechsel ausgeführt
  useEffect(() => {
    // 1. Prüfe die Cookie-Zustimmung
    const consent = getConsentState();
    const canTrack = consent && consent.analytics === true;

    // Wenn keine Zustimmung für Analytics vorliegt, tue nichts.
    if (!canTrack) {
      if (isGaInitialized) {
        // Optional: Deaktiviere Analytics, falls es schon mal aktiv war
        window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
        console.log("Analytics-Tracking ist deaktiviert.");
      }
      return;
    }

    // Wenn die Zustimmung vorliegt, aktiviere das Tracking wieder
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;

    // 2. Initialisiere Google Analytics (nur einmal)
    if (!isGaInitialized) {
      // Prüfe, ob das Skript schon im HTML ist
      if (!document.querySelector(`script[src*="${GA_MEASUREMENT_ID}"]`)) {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag; // Mache gtag global verfügbar

        gtag("js", new Date());
        // Wichtig: 'page_path' hier noch nicht senden, das machen wir unten
        gtag("config", GA_MEASUREMENT_ID, {
          anonymize_ip: true,
          send_page_view: false,
        });

        console.log("Google Analytics wurde initialisiert.");
        isGaInitialized = true;
      }
    }

    // 3. Sende einen "page_view" bei jedem Seitenwechsel
    if (isGaInitialized && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
      console.log(`Page View gesendet für: ${location.pathname}`);
    }
  }, [location]); // Der Effekt läuft immer wieder, wenn sich die URL ändert
};
