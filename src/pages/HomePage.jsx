// src/pages/HomePage.jsx
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/sections/Hero";
import SEO from "../components/ui/SEO";

// Alle Sektionen werden dynamisch importiert
const About = lazy(() => import("../components/sections/About"));
const Gallery = lazy(() => import("../components/sections/Gallery"));
const Services = lazy(() => import("../components/sections/Services"));
const Comparison = lazy(() => import("../components/sections/Comparison"));
const Process = lazy(() => import("../components/sections/Process"));
const Pricing = lazy(() => import("../components/sections/Pricing"));
const FAQ = lazy(() => import("../components/sections/FAQ"));
const Contact = lazy(() => import("../components/sections/Contact"));

// Ein einfacher, nicht blockierender Lade-Indikator
const SectionLoader = () => (
  <div className="section-padding flex items-center justify-center bg-gray-50 h-96">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.querySelector(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <SEO />
      <Hero />

      {/* Jede Sektion erhält ihren eigenen Suspense-Wrapper */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Comparison />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Contact />
      </Suspense>
    </>
  );
};

export default HomePage;
