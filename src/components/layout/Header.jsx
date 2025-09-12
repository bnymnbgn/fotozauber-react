import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import FontSizeControl from "../ui/FontSizeControl";
import { cn } from "../../utils/cn";
import { useNavigate, useLocation, Link } from "react-router-dom";
// 1. Beide Logo-Varianten importieren
import LogoWhite from "../../assets/logo-text-white.svg?react";
import LogoBlack from "../../assets/logo-text-black.svg?react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  const navigationItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Über mich" },
    { href: "#gallery", label: "Galerie" },
    { href: "#services", label: "Leistungen" },
    { href: "#comparison", label: "Vergleich" },
    { href: "#process", label: "Ablauf" },
    { href: "#pricing", label: "Preise" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Scroll-Progress berechnen
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      // Alternative: Manuelles Prüfen der Sektionen basierend auf Scroll-Position
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100; // Offset für Header
      
      let currentSection = "home";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSection = section.getAttribute("id");
        }
      });
      
      setActiveSection(currentSection);
    };

    // Intersection Observer als Fallback
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          setActiveSection(sectionId);
        }
      });
    }, observerOptions);

    // Initial setup und Observer registrieren
    handleScroll(); // Initiale Prüfung
    
    // Sektionen beobachten
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (href) => {
    setIsMenuOpen(false);

    if (location.pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/", { state: { scrollTo: href } });
    }
  };

  const lightBgPages = ["/impressum", "/datenschutz", "/agb"];
  const onLightBgPage = lightBgPages.includes(location.pathname);
  const showSolidHeader = isScrolled || onLightBgPage;

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        showSolidHeader
          ? "bg-white/95 backdrop-blur-glass shadow-lg"
          : "bg-transparent"
      )}
    >
      {/* Scroll-Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 transition-all duration-300"
           style={{ width: `${scrollProgress}%` }}>
      </div>
      
      <nav className="container prevent-zoom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3"
            aria-label="Zur Startseite von Noha Studio"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              {/* 2. Logo bedingt anzeigen */}
              {showSolidHeader ? (
                <LogoBlack className="h-10 w-auto" />
              ) : (
                <LogoWhite className="h-10 w-auto" />
              )}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.ul
            className="hidden lg:flex items-center space-x-4 flex-nowrap overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "text-xs font-medium transition-all relative group px-1.5 py-2 nav-fixed-size whitespace-nowrap",
                      showSolidHeader ? "text-gray-700" : "text-white",
                      isActive && "text-purple-600 font-semibold"
                    )}
                  >
                    {item.label}
                    <span className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </button>
                </li>
              );
            })}
          </motion.ul>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:flex items-center space-x-3 flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleNavClick("#contact")}
            >
              Anfragen
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 touch-optimized touch-feedback"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X
                className={cn(
                  "w-6 h-6 transition-colors",
                  showSolidHeader ? "text-gray-900" : "text-white"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "w-6 h-6 transition-colors",
                  showSolidHeader ? "text-gray-900" : "text-white"
                )}
              />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-4">
                {navigationItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "block w-full text-left px-6 py-4 transition-colors relative touch-optimized touch-feedback nav-fixed-size",
                        "text-gray-700 hover:bg-gray-50 hover:text-purple-600",
                        isActive && "bg-purple-50 text-purple-600 font-semibold"
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        {item.label}
                      </div>
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-r"></div>
                      )}
                    </motion.button>
                  );
                })}
                <motion.div
                  className="px-6 pt-4 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full touch-optimized touch-feedback"
                    onClick={() => handleNavClick("#contact")}
                  >
                    Jetzt anfragen
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
