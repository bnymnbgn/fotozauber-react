// src/components/ui/CookieBanner.jsx - DSGVO-konformes Consent-Tool

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Helfer-Funktion, um den Zustand aus dem LocalStorage zu lesen
const getCookieState = (key, defaultValue) => {
  if (typeof window === "undefined") {
    return defaultValue;
  }
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error("Fehler beim Zugriff auf den LocalStorage:", e);
    return defaultValue;
  }
};

const CookieBanner = () => {
  const [isReady, setIsReady] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false); // Standardmäßig false, kein Opt-out
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [allowDatenschutzAccess, setAllowDatenschutzAccess] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Body scrollen blockieren, solange kein Consent gegeben wurde
  useEffect(() => {
    if (isReady && !consentGiven && !allowDatenschutzAccess) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isReady, consentGiven, allowDatenschutzAccess]);

  // Überprüfen, ob wir auf der Datenschutz-Seite sind
  useEffect(() => {
    if (location.pathname === '/datenschutz' && !consentGiven) {
      setAllowDatenschutzAccess(true);
    } else if (consentGiven) {
      setAllowDatenschutzAccess(false);
    }
  }, [location.pathname, consentGiven]);

  const [prefs, setPrefs] = useState(() =>
    getCookieState("fotozauber_cookie_consent", {
      necessary: true, // Immer aktiv
      analytics: false, // Standardmäßig deaktiviert
      marketing: false, // Standardmäßig deaktiviert
      functional: false, // Standardmäßig deaktiviert
    })
  );

  useEffect(() => {
    // Prüfen, ob bereits eine Einwilligung vorliegt
    const hasConsent = getCookieState("fotozauber_consent_given", false);
    setConsentGiven(hasConsent);
    setIsReady(true);
  }, []);

  const applyPreferences = (newPrefs) => {
    try {
      localStorage.setItem("fotozauber_cookie_consent", JSON.stringify(newPrefs));
      localStorage.setItem("fotozauber_consent_given", "true");
      localStorage.setItem("fotozauber_consent_timestamp", new Date().toISOString());
    } catch (e) {
      console.error("Fehler beim Schreiben in den LocalStorage:", e);
    }
    setPrefs(newPrefs);
    setConsentGiven(true);
    setIsSettingsOpen(false);
    
    // Hier könnten Cookies basierend auf den Einstellungen gesetzt/gelöscht werden
    applyCookieSettings(newPrefs);
    
    // Custom Event für Consent-Änderungen auslösen
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event('cookieConsentChanged'));
    }
  };

  const applyCookieSettings = (settings) => {
    // Implementierung zum tatsächlichen Setzen/Löschen von Cookies
    // Dies würde normalerweise durch Ihr Cookie-Management-System gehandhabt
    console.log("Cookie-Einstellungen angewendet:", settings);
  };

  const handleAcceptAll = () => {
    // 1. Akzeptieren - alle Cookies werden akzeptiert
    const allEnabled = { necessary: true, analytics: true, marketing: true, functional: true };
    applyPreferences(allEnabled);
  };

  const handleReject = () => {
    // 3. Ablehnen - nur notwendige Cookies werden aktiviert
    const necessaryOnly = { necessary: true, analytics: false, marketing: false, functional: false };
    applyPreferences(necessaryOnly);
  };

  const handleSaveSettings = () => {
    applyPreferences(prefs);
  };

  const handleToggle = (key) => {
    if (key === "necessary") return; // Notwendige Cookies können nicht deaktiviert werden
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRevokeConsent = () => {
    // Einwilligung widerrufen
    try {
      localStorage.removeItem("fotozauber_consent_given");
      localStorage.removeItem("fotozauber_cookie_consent");
      localStorage.removeItem("fotozauber_consent_timestamp");
    } catch (e) {
      console.error("Fehler beim Entfernen der Einwilligung:", e);
    }
    setConsentGiven(false);
  };

  // Nichts rendern, wenn wir nicht bereit sind oder die Zustimmung bereits erteilt wurde
  if (!isReady || consentGiven) {
    return null;
  }

  // Wenn wir auf der Datenschutz-Seite sind, zeige einen kleineren Hinweis-Banner
  if (location.pathname === '/datenschutz' && !consentGiven) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[10001] bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-sm text-yellow-800">
            <strong>Hinweis:</strong> Bitte kehren Sie zur Startseite zurück, um Ihre Cookie-Einstellungen zu bestätigen.
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Cookie Blockade Overlay - blockiert die gesamte Website, aber lässt Modal und Datenschutz zu */}
      {!consentGiven && !isSettingsOpen && !allowDatenschutzAccess && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)'
          }}
        />
      )}

      {/* Cookie Banner - prominent mittig auf der Seite */}
      <AnimatePresence>
        {!isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-2xl mx-auto p-8 bg-white border-2 border-purple-200 rounded-3xl shadow-2xl shadow-purple-500/25">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <img
                    className="w-16 h-auto"
                    src="/assets/img/cookie.png"
                    alt="Cookie"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Cookie-Einwilligung erforderlich
                </h2>
                <p className="text-gray-700 text-base leading-relaxed">
                  Wir verwenden Cookies, um Ihnen ein optimales Erlebnis zu bieten.
                  Bitte wählen Sie Ihre Cookie-Einstellungen, um diese Website nutzen zu können.
                </p>
                <p className="text-gray-600 text-sm mt-2">
                  Durch Klick auf "Akzeptieren" stimmen Sie der Verwendung aller Cookies zu. 
                  Mit "Ablehnen" werden nur notwendige Cookies aktiviert.
                  <Link
                    to="/datenschutz"
                    className="text-purple-600 underline hover:text-purple-800 block mt-2 inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Datenschutz-Bestimmungen lesen
                  </Link>
                </p>
              </div>
              <div className="grid sm:flex gap-2">
                <button
                  type="button"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                  onClick={handleReject}
                >
                  Ablehnen
                </button>
                <button
                  type="button"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setIsSettingsOpen(true)}
                >
                  Einstellungen
                </button>
                <button
                  type="button"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  onClick={handleAcceptAll}
                >
                  Akzeptieren
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[20000] bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col bg-white border shadow-2xl rounded-xl sm:max-w-lg w-full max-h-[90vh] z-[20001]"
            >
              <div className="absolute top-2 end-2">
                <button
                  type="button"
                  className="flex justify-center items-center size-8 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <span className="sr-only">Schließen</span>
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 sm:p-10 text-center overflow-y-auto">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  Cookie-Einstellungen
                </h3>
                <p className="text-gray-600">
                  Wählen Sie aus, welche Cookies Sie zulassen möchten. Notwendige Cookies können nicht deaktiviert werden, da sie für die Grundfunktionen der Website erforderlich sind.
                </p>

                <div className="mt-6 text-left space-y-4">
                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Technisch Notwendig
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies sind für die Grundfunktion der Website unerlässlich und können nicht deaktiviert werden.
                      </p>
                    </div>
                    <span className="me-3 text-sm font-semibold text-purple-600">
                      Immer aktiv
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Analyse & Statistik
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen, um sie zu verbessern.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-purple-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      checked={prefs.analytics}
                      onChange={() => handleToggle("analytics")}
                    />
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Funktionale Cookies
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies ermöglichen erweiterte Funktionen wie persönliche Einstellungen und Sprache.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-purple-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      checked={prefs.functional}
                      onChange={() => handleToggle("functional")}
                    />
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Marketing & Personalisierung
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies werden verwendet, um Ihnen relevantere Werbung und Inhalte anzuzeigen.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-purple-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      checked={prefs.marketing}
                      onChange={() => handleToggle("marketing")}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <button
                    type="button"
                    className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                    onClick={handleSaveSettings}
                  >
                    Einstellungen speichern
                  </button>
                  <button
                    type="button"
                    className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                    onClick={handleAcceptAll}
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Cookie-Einstellungs-Button für die Website (kann im Footer/Header eingebaut werden)
export const CookieSettingsButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [prefs, setPrefs] = useState(() => {
    if (typeof window === "undefined") {
      return { necessary: true, analytics: false, marketing: false, functional: false };
    }
    try {
      const value = localStorage.getItem("fotozauber_cookie_consent");
      return value ? JSON.parse(value) : { necessary: true, analytics: false, marketing: false, functional: false };
    } catch (e) {
      return { necessary: true, analytics: false, marketing: false, functional: false };
    }
  });

  const handleSaveSettings = () => {
    try {
      localStorage.setItem("fotozauber_cookie_consent", JSON.stringify(prefs));
      localStorage.setItem("fotozauber_consent_timestamp", new Date().toISOString());
    } catch (e) {
      console.error("Fehler beim Speichern der Cookie-Einstellungen:", e);
    }
    setIsSettingsOpen(false);
  };

  const handleToggle = (key) => {
    if (key === "necessary") return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="text-sm text-gray-600 hover:text-purple-600 underline"
      >
        Cookie-Einstellungen
      </button>

      {/* Modal für Cookie-Einstellungen */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[20000] bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: -30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -30, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex flex-col bg-white border shadow-2xl rounded-xl sm:max-w-lg w-full max-h-[90vh] z-[20001]"
            >
              <div className="absolute top-2 end-2">
                <button
                  type="button"
                  className="flex justify-center items-center size-8 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsSettingsOpen(false)}
                >
                  <span className="sr-only">Schließen</span>
                  <svg
                    className="flex-shrink-0 size-4"
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 sm:p-10 text-center overflow-y-auto">
                <h3 className="mb-2 text-2xl font-bold text-gray-800">
                  Cookie-Einstellungen ändern
                </h3>
                <p className="text-gray-600 mb-6">
                  Sie können Ihre Cookie-Einwilligung jederzeit hier ändern oder widerrufen.
                </p>

                <div className="mt-6 text-left space-y-4">
                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Technisch Notwendig
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies sind für die Grundfunktion der Website unerlässlich.
                      </p>
                    </div>
                    <span className="me-3 text-sm font-semibold text-purple-600">
                      Immer aktiv
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Analyse & Statistik
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-purple-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      checked={prefs.analytics}
                      onChange={() => handleToggle("analytics")}
                    />
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Funktionale Cookies
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies ermöglichen erweiterte Funktionen wie persönliche Einstellungen.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-purple-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      checked={prefs.functional}
                      onChange={() => handleToggle("functional")}
                    />
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        Marketing & Personalisierung
                      </span>
                      <p className="text-xs text-gray-500">
                        Diese Cookies werden verwendet, um Ihnen relevantere Werbung anzuzeigen.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="relative shrink-0 w-[3.25rem] h-7 bg-gray-200 checked:bg-none checked:bg-purple-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      checked={prefs.marketing}
                      onChange={() => handleToggle("marketing")}
                    />
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <button
                    type="button"
                    className="w-full py-3 px-4 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                    onClick={handleSaveSettings}
                  >
                    Einstellungen speichern
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieBanner;