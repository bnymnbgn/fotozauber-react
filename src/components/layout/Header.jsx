import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { cn } from "../../utils/cn";
import { useNavigate, useLocation, Link } from "react-router-dom";
// 1. Beide Logo-Varianten importieren
import LogoWhite from "../../assets/logo-text-white.svg?react";
import LogoBlack from "../../assets/logo-text-black.svg?react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Über mich" },
    { href: "#gallery", label: "Galerie" },
    { href: "#services", label: "Leistungen" },
    { href: "#comparison", label: "Vorher/Nachher" },
    { href: "#process", label: "Ablauf" },
    { href: "#pricing", label: "Preise" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Kontakt" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        showSolidHeader
          ? "bg-white/95 backdrop-blur-glass shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container">
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
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navigationItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary-600 relative group",
                    showSolidHeader ? "text-gray-700" : "text-white"
                  )}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full" />
                </button>
              </li>
            ))}
          </motion.ul>

          {/* Desktop CTA */}
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              variant="primary"
              size="md"
              onClick={() => handleNavClick("#contact")}
            >
              Jetzt anfragen
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2"
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
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  className="px-6 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
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
