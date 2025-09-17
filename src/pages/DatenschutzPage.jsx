// src/pages/DatenschutzPage.jsx
import {
  Shield,
  User,
  Database,
  Cookie,
  BarChart,
  Mail,
  Users,
  ExternalLink,
  FileText,
  Image,
} from "lucide-react";
import { Link } from "react-router-dom";

const DatenschutzPage = () => {
  return (
    <section
      id="datenschutz"
      className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Hintergrund-Dekoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              <span>IHRE DATEN SIND UNS WICHTIG</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Datenschutzerklärung
            </h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          {/* Einleitung mit Link zum Impressum */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <p className="text-gray-700 leading-relaxed text-center">
              Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              Nachfolgend informieren wir Sie ausführlich über den Umgang mit
              Ihren Daten. Weitere rechtliche Informationen finden Sie in
              unserem{" "}
              <Link
                to="/impressum"
                className="text-primary-600 hover:text-primary-700 underline font-medium"
                aria-label="Zum Impressum von NOHA STUDIO"
              >
                Impressum
              </Link>
              .
            </p>
          </div>

          <div className="space-y-8">
            {/* Verantwortliche Stelle */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Verantwortliche Stelle
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wer ist für die Datenerhebung verantwortlich?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Verantwortliche Stelle für die Datenverarbeitung auf dieser
                Website ist:
                <br />
                <strong>
                  Bünyamin Bilgin, handelnd als{" "}
                  <span className="text-gradient font-medium">NOHA STUDIO</span>
                </strong>
                <br />
                Elsterstr. 2, 70806 Kornwestheim
                <br />
                E-Mail:{" "}
                <a
                  href="mailto:info@noha-studio.de"
                  className="text-primary-600 hover:text-primary-700"
                >
                  info@noha-studio.de
                </a>
              </p>
            </div>

            {/* Verarbeitung von Bilddaten */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Image className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Verarbeitung von Bilddaten
                  </h2>
                  <p className="text-sm text-gray-500">
                    Umgang mit hochgeladenen Bildern
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Wenn Sie uns Bilder zur Bearbeitung übermitteln, werden diese
                ausschließlich für die Erfüllung Ihres Auftrags verarbeitet
                (Art. 6 Abs. 1 lit. b DSGVO). Die Bilder werden nach Abschluss
                des Auftrags gelöscht, sofern keine gesetzlichen
                Aufbewahrungspflichten bestehen. Eine Weitergabe an Dritte
                erfolgt nicht, es sei denn, Sie haben ausdrücklich zugestimmt.
              </p>
            </div>

            {/* Rechtsgrundlage der Datenverarbeitung */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Rechtsgrundlage der Datenverarbeitung
                  </h2>
                  <p className="text-sm text-gray-500">
                    Warum dürfen wir Ihre Daten verarbeiten?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die Verarbeitung Ihrer Daten erfolgt auf Grundlage von Art. 6
                Abs. 1 lit. b DSGVO, sofern die Daten zur Erfüllung eines
                Vertrags oder vorvertraglicher Maßnahmen erforderlich sind (z.
                B. Bearbeitung Ihrer Anfragen). Technische Daten (z. B.
                Server-Logfiles) werden auf Grundlage von Art. 6 Abs. 1 lit. f
                DSGVO erhoben, da sie für den Betrieb und die Sicherheit der
                Website notwendig sind.
              </p>
            </div>

            {/* Speicherdauer */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Speicherdauer
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wie lange speichern wir Ihre Daten?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ihre Daten werden nur so lange gespeichert, wie es für die
                Erfüllung des Zwecks, für den sie erhoben wurden, erforderlich
                ist oder gesetzliche Aufbewahrungspflichten bestehen. Daten aus
                Kontaktformularen werden nach Abschluss der Anfrage gelöscht,
                sofern keine weiteren vertraglichen oder gesetzlichen
                Verpflichtungen bestehen.
              </p>
            </div>

            {/* Webanalyse mit Google Analytics */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Webanalyse mit Google Analytics
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wie wir die Nutzung unserer Website analysieren.
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Diese Website nutzt Funktionen des Webanalysedienstes Google
                  Analytics. Anbieter ist die Google Ireland Limited („Google“),
                  Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p>
                  Die Nutzung dieses Analyse-Tools erfolgt ausschließlich auf
                  Grundlage Ihrer ausdrücklichen Einwilligung nach Art. 6 Abs. 1
                  lit. a DSGVO, die Sie über unser Cookie-Banner erteilen. Diese
                  Einwilligung ist jederzeit widerrufbar.
                </p>
                <p>
                  Die Speicherung von Google-Analytics-Cookies und die Nutzung
                  dieses Analyse-Tools erfolgen nur auf Grundlage Ihrer
                  ausdrücklichen Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO,
                  die Sie über unser Cookie-Banner erteilen. Diese Einwilligung
                  ist jederzeit widerrufbar.
                </p>

                <h3 className="font-semibold text-gray-800 pt-2">
                  IP-Anonymisierung
                </h3>
                <p>
                  Wir haben auf dieser Website die Funktion IP-Anonymisierung
                  aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb
                  von Mitgliedstaaten der Europäischen Union oder in anderen
                  Vertragsstaaten des Abkommens über den Europäischen
                  Wirtschaftsraum vor der Übermittlung in die USA gekürzt. Nur
                  in Ausnahmefällen wird die volle IP-Adresse an einen Server
                  von Google in den USA übertragen und dort gekürzt.
                </p>

                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-gray-800">
                    Was bedeutet "Ausnahmefall"?
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Dieser juristische Standardsatz beschreibt seltene
                    technische Störfälle (z.B. den kurzzeitigen Ausfall eines
                    europäischen Servers). Es handelt sich hierbei nicht um eine
                    Regelung, die eine Umgehung der Anonymisierung erlaubt. Wir
                    haben technisch alles unsererseits Erforderliche getan, um
                    die Kürzung Ihrer IP-Adresse sicherzustellen.
                  </p>
                </div>

                <h3 className="font-semibold text-gray-800 pt-2">
                  Widerspruch gegen Datenerfassung
                </h3>
                <p>
                  Sie können die Erfassung Ihrer Daten durch Google Analytics
                  generell verhindern, indem Sie das unter dem folgenden Link
                  verfügbare Browser-Plugin herunterladen und installieren:{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout?hl=de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline hover:text-purple-800"
                  >
                    https://tools.google.com/dlpage/gaoptout?hl=de
                  </a>
                  .
                </p>

                <h3 className="font-semibold text-gray-800 pt-2">
                  Speicherdauer
                </h3>
                <p>
                  Bei Google gespeicherte Daten auf Nutzer- und Ereignisebene,
                  die mit Cookies, Nutzerkennungen (z. B. User ID) oder
                  Werbe-IDs verknüpft sind, werden in der Regel nach 14 Monaten
                  anonymisiert bzw. gelöscht. Details hierzu ersehen Sie unter
                  folgendem Link:{" "}
                  <a
                    href="https://support.google.com/analytics/answer/7667196?hl=de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline hover:text-purple-800"
                  >
                    https://support.google.com/analytics/answer/7667196?hl=de
                  </a>
                </p>
              </div>
            </div>

            {/* Server-Logfiles */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Server-Logfiles
                  </h2>
                  <p className="text-sm text-gray-500">
                    Technische Daten beim Website-Besuch
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Beim Aufruf unserer Website werden automatisch Informationen in
                Server-Logfiles gespeichert, die Ihr Browser an uns übermittelt.
                Dazu gehören: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite,
                Browser-Typ und -Version, Betriebssystem und Referrer-URL. Diese
                Daten werden aus Sicherheitsgründen (z. B. zur Abwehr von
                Angriffen) erhoben und spätestens nach 7 Tagen gelöscht.
              </p>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Cookies & Einwilligung
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wie wir Cookies auf unserer Seite nutzen
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Unsere Website verwendet Cookies. Dies sind kleine
                  Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert.
                  Wir unterscheiden zwischen technisch notwendigen und
                  optionalen Cookies.
                </p>
                <p>
                  <strong>Technisch notwendige Cookies</strong> sind für die
                  Grundfunktionen unserer Website unerlässlich. Der Einsatz
                  dieser Cookies erfolgt auf Grundlage unseres berechtigten
                  Interesses (Art. 6 Abs. 1 lit. f DSGVO) an einem
                  nutzerfreundlichen und funktionsfähigen Online-Angebot.
                </p>
                <p>
                  <strong>Optionale Cookies</strong> (z.B. für Analyse,
                  Marketing oder funktionale Zwecke) werden nur nach Ihrer
                  ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
                  gesetzt. Diese Einwilligung holen wir über unser Cookie-Banner
                  ein. Sie können Ihre Auswahl dort jederzeit anpassen oder
                  widerrufen.
                </p>
              </div>
            </div>

            {/* Drittanbieter */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Drittanbieter & Datenübermittlung
                  </h2>
                  <p className="text-sm text-gray-500">
                    Einsatz externer Dienste
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Wir setzen auf unserer Webseite Dienste von Drittanbietern ein,
                um unser Angebot zu analysieren und zu verbessern. Der Einsatz
                dieser Dienste erfolgt ausschließlich auf Grundlage Ihrer
                ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die
                Sie über unser Cookie-Banner erteilen. Aktuell betrifft dies den
                Webanalysedienst Google Analytics (Anbieter: Google Ireland
                Limited). Wenn Sie der Nutzung von Analyse-Cookies zustimmen,
                können Daten (z.B. Ihre anonymisierte IP-Adresse und
                Nutzungsdaten) an Server von Google in den USA übermittelt
                werden. Wir geben darüber hinaus keine personenbezogenen Daten
                ohne Ihre explizite Zustimmung an Dritte weiter, es sei denn,
                wir sind gesetzlich dazu verpflichtet.
              </p>
            </div>
          </div>

          {/* Ihre Rechte */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 sm:w-6 sm:h-6text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Ihre Rechte
                </h2>
                <p className="text-sm text-gray-500">
                  Welche Rechte haben Sie bezüglich Ihrer Daten?
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Sie haben das Recht auf Auskunft über Ihre gespeicherten Daten
              (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), Löschung (Art.
              17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
              Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch gegen die
              Verarbeitung (Art. 21 DSGVO). Wenden Sie sich hierfür an:
              info@noha-studio.de.
            </p>
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

export default DatenschutzPage;
