// src/pages/HomePage.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import Gallery from "../components/sections/Gallery";
import Services from "../components/sections/Services";
import Comparison from "../components/sections/Comparison";
import About from "../components/sections/About";
import Process from "../components/sections/Process";
import Pricing from "../components/sections/Pricing";
import FAQ from "../components/sections/FAQ";
import Contact from "../components/sections/Contact";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Prüft, ob ein "scrollTo"-Befehl mitgegeben wurde
    if (location.state?.scrollTo) {
      const element = document.querySelector(location.state.scrollTo);
      if (element) {
        // Scrollt zum gewünschten Element
        element.scrollIntoView({ behavior: "smooth" });
        // Optional: Löscht den state, damit es bei einem Refresh nicht erneut passiert
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]); // Dieser Effekt läuft jedes Mal, wenn sich die Location ändert

  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Services />
      <Comparison />
      <Process />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
