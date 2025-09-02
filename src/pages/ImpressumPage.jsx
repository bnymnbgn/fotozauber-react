// src/pages/ImpressumPage.jsx
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Scale,
  Shield,
  ExternalLink,
  Building,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const ImpressumPage = () => {
  return (
    <section
      id="impressum"
      className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              <span>RECHTLICHE INFORMATIONEN</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Impressum
            </h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          {/* Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Angaben gemäß TMG */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <p className="text-sm text-gray-500">Telemediengesetz</p>
                </div>
              </div>

              <div className="space-y-2 text-gray-700">
                <p className="font-semibold text-gray-900">
                  Bünyamin Bilgin, handelnd als{" "}
                  <span className="text-gradient font-medium">NOHA STUDIO</span>
                </p>
                <p>Elsterstr. 2</p>
                <p>70806 Kornwestheim</p>
                <p className="font-medium">Deutschland</p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Kontakt
                  </h2>
                  <p className="text-sm text-gray-500">
                    Direkte Erreichbarkeit
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">[Ihre Telefonnummer]</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <a
                    href="mailto:info@noha-studio.de"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    info@noha-studio.de
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Kornwestheim, Deutschland
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Weitere Informationen */}
          <div className="space-y-8">
            {/* === NEUER DATENSCHUTZ-ABSCHNITT START === */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Datenschutz</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Informationen zum Umgang mit Ihren Daten finden Sie in unserer
                ausführlichen{" "}
                <Link
                  to="/datenschutz"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
            {/* === NEUER DATENSCHUTZ-ABSCHNITT ENDE === */}
            {/* Umsatzsteuer */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 sm:p-8 border border-green-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Umsatzsteuer
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Als Kleinunternehmer gemäß § 19 UStG wird keine Umsatzsteuer
                ausgewiesen.
              </p>
            </div>

            {/* Redaktionell Verantwortlicher */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 sm:p-8 border border-amber-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Redaktionell Verantwortlicher
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
                <br />
                <strong>Bünyamin Bilgin</strong>
                <br />
                Elsterstr. 2<br />
                70806 Kornwestheim
              </p>
            </div>

            {/* EU-Streitschlichtung */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  EU-Streitschlichtung
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:
              </p>
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                <span>Plattform zur Online-Streitbeilegung</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-sm text-gray-600 mt-4">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            {/* Verbraucherstreitbeilegung */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Verbraucherstreitbeilegung
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>

            {/* Haftungsausschluss */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Haftungsausschluss
                </h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-purple-400 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Haftung für Inhalte
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                    Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                    verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                    gespeicherte fremde Informationen zu überwachen.
                  </p>
                </div>

                <div className="border-l-4 border-blue-400 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Haftung für Links
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter,
                    auf deren Inhalte wir keinen Einfluss haben. Deshalb können
                    wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                    Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
                    auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                    waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
                    permanente inhaltliche Kontrolle der verlinkten Seiten ist
                    jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                    nicht zumutbar.
                  </p>
                </div>

                <div className="border-l-4 border-green-400 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Urheberrecht
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke
                    auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                    Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes
                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Hinweis */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-500 text-sm">
              <FileText className="w-4 h-4" />
              <span>
                Letzte Aktualisierung: {new Date().toLocaleDateString("de-DE")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpressumPage;
