// src/App.jsx

import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./utils/ScrollToTop";

// Lazy Loading für Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
const DatenschutzPage = lazy(() => import("./pages/DatenschutzPage"));
const AGBPage = lazy(() => import("./pages/AGBPage"));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header />
      <ScrollToTop />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<DatenschutzPage />} />
            <Route path="/agb" element={<AGBPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
