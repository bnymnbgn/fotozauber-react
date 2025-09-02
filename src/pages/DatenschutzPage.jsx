// src/pages/DatenschutzPage.jsx
import {
  Shield,
  User,
  Database,
  Cookie,
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
                (Art. 15 DSGVO), auf Berichtigung (Art. 16 DSGVO), Löschung
                (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO),
                Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch gegen die
                Verarbeitung (Art. 21 DSGVO). Wenden Sie sich hierfür an:
                info@noha-studio.de.
              </p>
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
                    Cookies
                  </h2>
                  <p className="text-sm text-gray-500">
                    Nutzung von Cookies auf unserer Seite
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Unsere Internetseiten verwenden so genannte „Cookies“. Cookies
                sind kleine Textdateien und richten auf Ihrem Endgerät keinen
                Schaden an. Sie dienen dazu, unser Angebot nutzerfreundlicher,
                effektiver und sicherer zu machen. Wir verwenden ausschließlich
                technisch notwendige Cookies (z. B. für die Funktionalität der
                Website), die keiner Einwilligung bedürfen (Art. 6 Abs. 1 lit. f
                DSGVO). Sie können Ihren Browser so einstellen, dass Sie über
                das Setzen von Cookies informiert werden und Cookies nur im
                Einzelfall erlauben.
              </p>
            </div>

            {/* Drittanbieter */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Drittanbieter
                  </h2>
                  <p className="text-sm text-gray-500">
                    Verwendung von externen Diensten
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Wir nutzen keine Drittanbieter-Dienste wie Analyse-Tools oder
                Social-Media-Plugins, die Ihre Daten erfassen könnten. Sollten
                in Zukunft solche Dienste eingesetzt werden, werden wir Sie
                hierüber informieren und gegebenenfalls Ihre Einwilligung
                einholen.
              </p>
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

export default DatenschutzPage;
