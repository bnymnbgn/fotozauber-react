// src/pages/PricingPage.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pricingPlans, pricingAddOns } from "../data/content";
import {
  Check,
  X,
  Star,
  ArrowRight,
  Gift,
  Euro,
  Clock,
  Shield,
  Zap,
  Users,
  Crown,
  Palette,
  Wand2,
} from "lucide-react";
import Button from "../components/ui/Button";
import HoverComparisonSlider from "../components/ui/HoverComparisonSlider";
import FAQ from "../components/sections/FAQ";
import { Link } from "react-router-dom";

// Animation Variants
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardHoverVariant = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -5, transition: { duration: 0.3 } },
};

// ===================================================================
// KORRIGIERT: Logik zur Aufbereitung der Pricing-Features
// ===================================================================
// Erstelle eine tiefe Kopie, um die Originaldaten nicht zu verändern
const processedPricingPlans = JSON.parse(JSON.stringify(pricingPlans));

// 1. Finde die Feature-Liste des Basis-Pakets (Giraffe)
const giraffeFeatures =
  processedPricingPlans.find((p) => p.id === "basic")?.features || [];

// 2. Verarbeite das "Zebra"-Paket (erbt von Giraffe)
const zebraPlan = processedPricingPlans.find((p) => p.id === "creative");
if (zebraPlan && zebraPlan.features.includes("Alles aus Giraffe")) {
  zebraPlan.features = [
    ...new Set([
      ...giraffeFeatures,
      ...zebraPlan.features.filter((f) => f !== "Alles aus Giraffe"),
    ]),
  ];
}

// 3. Verarbeite das "Löwe"-Paket (erbt von Zebra)
const loewePlan = processedPricingPlans.find((p) => p.id === "premium");
const fullZebraFeatures =
  processedPricingPlans.find((p) => p.id === "creative")?.features || [];
if (loewePlan && loewePlan.features.includes("Alles aus Zebra")) {
  loewePlan.features = [
    ...new Set([
      ...fullZebraFeatures,
      ...loewePlan.features.filter((f) => f !== "Alles aus Zebra"),
    ]),
  ];
}

// 4. Verarbeite das "Elefant"-Paket (erbt von Löwe)
const elefantPlan = processedPricingPlans.find((p) => p.id === "family");
// NEU: Vollständige Feature-Liste des Löwe-Pakets abrufen
const fullLoeweFeatures =
  processedPricingPlans.find((p) => p.id === "premium")?.features || [];
// KORRIGIERT: Prüft auf den korrekten Platzhalter "Alles aus Löwe"
if (elefantPlan && elefantPlan.features.includes("Alles aus Löwe")) {
  elefantPlan.features = [
    ...new Set([
      // KORRIGIERT: Fügt die vollständigen Löwe-Features hinzu
      ...fullLoeweFeatures,
      // KORRIGIERT: Filtert den Löwe-Platzhalter heraus
      ...elefantPlan.features.filter((f) => f !== "Alles aus Löwe"),
    ]),
  ];
}

// Icon Mapping
const iconMapping = {
  palette: "/assets/img/icons/giraffe.webp", // Pfad zur Giraffe
  wand: "/assets/img/icons/zebra.webp", // Pfad zum Zebra
  crown: "/assets/img/icons/loewe.webp", // Pfad zum Löwen
  users: "/assets/img/icons/elefant.webp", // Pfad zum Elefanten
};

// ===================================================================
// 1. HERO-BEREICH (VERBESSERT)
// ===================================================================
const PricingHero = () => (
  <div className="relative py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-400 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-400 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariant}
      className="relative z-10 text-center max-w-6xl mx-auto"
    >
      <motion.div
        variants={itemVariant}
        className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-6 py-3 text-sm font-medium mb-8"
      >
        <Euro className="w-4 h-4" />
        <span>DETAILLIERTE PREISÜBERSICHT</span>
      </motion.div>

      <motion.h1
        variants={itemVariant}
        className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
      >
        Transparente Preise für Ihre{" "}
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
          Wünsche
        </span>
      </motion.h1>

      <motion.p
        variants={itemVariant}
        className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
      >
        Wir glauben an faire Preise für unbezahlbare Erinnerungen. Hier finden
        Sie alle Details, um das perfekte Paket für die Träume Ihres Kindes zu
        wählen.
      </motion.p>

      <motion.div
        variants={itemVariant}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
      >
        {[
          {
            step: "1",
            title: "Paket wählen",
            desc: "Vergleichen Sie die Features und finden Sie das Paket, das am besten zu Ihrer Idee passt.",
            icon: <Star className="w-6 h-6 text-purple-600" />,
          },
          {
            step: "2",
            title: "Extras hinzufügen",
            desc: "Erweitern Sie Ihr Paket mit optionalen Add-ons wie Express-Lieferung oder Premium-Drucken.",
            icon: <Gift className="w-6 h-6 text-pink-600" />,
          },
          {
            step: "3",
            title: "Anfrage senden",
            desc: "Kontaktieren Sie uns unverbindlich. Wir beraten Sie gerne und erstellen Ihr persönliches Angebot.",
            icon: <ArrowRight className="w-6 h-6 text-blue-600" />,
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariant}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group cursor-pointer"
          >
            <motion.div variants={cardHoverVariant}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-xl font-bold text-purple-600">
                  {item.step}
                </div>
                {item.icon}
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        variants={itemVariant}
        className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600"
      >
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-500" />
          <span>100% Zufriedenheitsgarantie</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span>Pünktliche Lieferung</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>Express-Service verfügbar</span>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

// ===================================================================
// 2. PRICING CARDS SECTION (NEU)
// ===================================================================
const PricingCards = () => {
  const [selectedPlan, setSelectedPlan] = useState("creative");

  return (
    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {pricingPlans.map((plan, index) => {
        const iconSrc = iconMapping[plan.icon];
        const isSelected = selectedPlan === plan.id;

        return (
          <motion.div
            key={plan.id}
            custom={index}
            variants={itemVariant}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className={`relative cursor-pointer ${
              plan.popular ? "lg:scale-105" : ""
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 right-4 z-10">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  <Star className="w-3 h-3 inline mr-1 fill-current" />
                  BELIEBT
                </div>
              </div>
            )}

            <motion.div
              variants={cardHoverVariant}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                isSelected
                  ? "border-purple-400 shadow-purple-200 shadow-2xl"
                  : "border-gray-200 hover:border-purple-300"
              } ${plan.popular ? "ring-2 ring-purple-200" : ""}`}
            >
              {/* Header */}
              <div
                className={`p-6 text-center ${plan.bgColor} border-b border-gray-100`}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center shadow-md p-2">
                  <img
                    src={iconSrc}
                    alt={`${plan.name} Icon`}
                    className="w-full h-full object-contain" // Stellt sicher, dass das Bild passt
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}€
                    </span>
                    {plan.originalPrice > plan.price && (
                      <span className="text-lg text-gray-500 line-through">
                        {plan.originalPrice}€
                      </span>
                    )}
                  </div>
                  {plan.originalPrice > plan.price && (
                    <div className="text-sm text-green-600 font-medium">
                      Sparen Sie{" "}
                      {Math.round(
                        ((plan.originalPrice - plan.price) /
                          plan.originalPrice) *
                          100
                      )}
                      %!
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{plan.duration}</span>
                </div>
              </div>

              {/* Features */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.slice(0, 5).map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 5 && (
                    <li className="text-sm text-gray-500 italic">
                      + {plan.features.length - 5} weitere Features
                    </li>
                  )}
                </ul>

                <Button
                  className={`w-full ${
                    isSelected
                      ? "bg-purple-600 text-white"
                      : plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "border-2 border-gray-200 text-gray-700 hover:border-purple-300"
                  }`}
                  variant={
                    isSelected
                      ? "default"
                      : plan.popular
                      ? "default"
                      : "outline"
                  }
                >
                  {isSelected ? "Ausgewählt" : "Auswählen"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

// ===================================================================
// 3. FEATURE COMPARISON TABLE (VERBESSERT)
// ===================================================================
// ===================================================================
// 3. FEATURE COMPARISON TABLE (FINAL & COMPLETE)
// ===================================================================
const FeatureMatrix = () => {
  // Holt alle einzigartigen Features aus den aufbereiteten Plandaten
  const allFeatures = [
    ...new Set(processedPricingPlans.flatMap((p) => p.features)),
  ];

  // Zustand, um die Anzeige zu steuern
  const [showAll, setShowAll] = useState(false);

  return (
    <motion.div
      variants={sectionVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          {/* Der thead-Teil bleibt unverändert */}
          <thead className="bg-gradient-to-r from-purple-50 to-pink-50">
            <tr>
              <th className="p-6 text-left font-bold text-gray-800 text-lg">
                Features
              </th>
              {processedPricingPlans.map((plan) => {
                const iconSrc = iconMapping[plan.icon];
                return (
                  <th key={plan.id} className="p-6 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={iconSrc}
                        alt={`${plan.name} Icon`}
                        className="w-12 h-12 object-contain"
                      />
                      <h4 className="text-xl font-bold text-gray-900">
                        {plan.name}
                      </h4>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* KORRIGIERTE LOGIK FÜR DAS RENDERING */}
          <tbody>
            <AnimatePresence>
              {allFeatures.map((feature, index) => {
                // Bedingung: Zeige immer die ersten 8 ODER alle, wenn showAll true ist
                if (!showAll && index >= 8) {
                  return null; // Rendere nichts für überzählige Elemente
                }

                return (
                  <motion.tr
                    key={feature} // Wichtiger, stabiler Key
                    layout
                    variants={itemVariant}
                    initial="hidden"
                    animate="visible"
                    exit="hidden" // Animation beim Verlassen
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="p-4 font-medium text-gray-700">{feature}</td>
                    {processedPricingPlans.map((plan) => (
                      <td key={plan.id} className="p-4 text-center">
                        {plan.features.includes(feature) ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <Check className="text-green-600 h-5 w-5" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                            <X className="text-gray-400 h-5 w-5" />
                          </div>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Button zum Umschalten, der jetzt funktionieren sollte */}
      {allFeatures.length > 8 && (
        <div className="p-6 text-center bg-gray-50 border-t">
          <Button variant="outline" onClick={() => setShowAll(!showAll)}>
            {showAll
              ? "Weniger anzeigen"
              : `Alle ${allFeatures.length} Features vergleichen`}
          </Button>
        </div>
      )}
    </motion.div>
  );
};

// ===================================================================
// 4. DETAILED PACKAGES (VERBESSERT)
// ===================================================================
const DetailedPackages = () => (
  <div className="space-y-32">
    {pricingPlans.map((plan, index) => {
      const iconSrc = iconMapping[plan.icon];
      const isEven = index % 2 === 0;

      return (
        <motion.div
          key={plan.id}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
            !isEven ? "lg:grid-flow-row-dense" : ""
          }`}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={itemVariant}
            className={!isEven ? "lg:col-start-2" : ""}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${plan.bgColor} p-2`}
              >
                <img
                  src={iconSrc}
                  alt={`${plan.name} Icon`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {plan.name} Paket
                </h3>
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-2xl font-bold text-purple-600">
                    {plan.price}€
                  </span>
                  {plan.originalPrice > plan.price && (
                    <span className="text-lg text-gray-500 line-through">
                      {plan.originalPrice}€
                    </span>
                  )}
                  <span className="text-sm text-gray-600">
                    • {plan.duration}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              {plan.longDescription}
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Ideal für:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {plan.useCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1" asChild>
                <Link to="/#contact">
                  Paket anfragen <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Details anzeigen
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariant}
            className={!isEven ? "lg:col-start-1 lg:row-start-1" : ""}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                <HoverComparisonSlider
                  beforeImage={plan.exampleImages.before}
                  afterImage={plan.exampleImages.after}
                  title={`Beispiel für ${plan.name}`}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
);

// ===================================================================
// 5. ADD-ONS SECTION (VERBESSERT)
// ===================================================================
const AddOnsSection = () => (
  <motion.div
    variants={sectionVariant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {pricingAddOns.map((addon, index) => (
        <motion.div
          key={addon.id}
          custom={index}
          variants={itemVariant}
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="group cursor-pointer"
        >
          <motion.div
            variants={cardHoverVariant}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Gift className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-bold text-xl mb-4 text-gray-900">
              {addon.name}
            </h4>
            <p className="text-gray-600 text-sm mb-6 flex-1 leading-relaxed">
              {addon.description}
            </p>
            <div className="pt-4 border-t border-gray-100">
              <p className="text-3xl font-bold text-purple-600">
                +{addon.price}€
              </p>
              <p className="text-sm text-gray-500 mt-1">Optional hinzufügbar</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// ===================================================================
// MAIN COMPONENT
// ===================================================================
const PricingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <PricingHero />

      {/* Pricing Cards Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Wählen Sie Ihr perfektes Paket
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jedes Paket wurde sorgfältig konzipiert, um unterschiedliche
              Bedürfnisse und Budgets zu erfüllen.
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Pakete im direkten Vergleich
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sehen Sie auf einen Blick, welche Features in welchem Paket
              enthalten sind.
            </p>
          </div>
          <FeatureMatrix />
        </div>
      </section>

      {/* Detailed Package Descriptions */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Jedes Paket im Detail
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Erfahren Sie mehr über die Möglichkeiten und sehen Sie Beispiele
              unserer Arbeit.
            </p>
          </div>
          <DetailedPackages />
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Optionale Extras & Add-Ons
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Erweitern Sie Ihr Paket mit diesen professionellen
              Zusatzleistungen.
            </p>
          </div>
          <AddOnsSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bereit für magische Bilder?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              Kontaktieren Sie uns noch heute für eine kostenlose Beratung und
              lassen Sie uns gemeinsam die perfekte Lösung für Sie finden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* === KORRIGIERTER BUTTON === */}
              {/* Wir verwenden einen Link, der wie der Button im FAQ gestylt ist */}
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 font-semibold py-4 px-8 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Jetzt Anfrage senden <ArrowRight className="ml-2 w-5 h-5" />
              </Link>

              {/* Der zweite Button nutzt die "outline"-Variante und ist korrekt */}
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
              >
                Beispiele ansehen
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default PricingPage;
