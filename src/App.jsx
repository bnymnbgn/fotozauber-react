// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ImpressumPage from "./pages/ImpressumPage";
import DatenschutzPage from "./pages/DatenschutzPage";
import ScrollToTop from "./utils/ScrollToTop";
import AGBPage from "./pages/AGBPage";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/agb" element={<AGBPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
