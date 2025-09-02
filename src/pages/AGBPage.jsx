import {
  FileText,
  Gavel,
  PenSquare,
  Handshake,
  Euro,
  Truck,
  Copyright,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const AGBPage = () => {
  return (
    <section
      id="agb"
      className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Gavel className="w-4 h-4" />
              <span>GESCHÄFTSBEDINGUNGEN</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Allgemeine Geschäftsbedingungen
            </h1>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
          </div>

          {/* Einleitung */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 mb-8">
            <p className="text-gray-700 leading-relaxed text-center">
              Die nachfolgenden Allgemeinen Geschäftsbedingungen regeln die
              Geschäftsbeziehungen zwischen NOHA STUDIO und seinen Kunden.
              Weitere rechtliche Informationen finden Sie in unserem{" "}
              <Link
                to="/impressum"
                className="text-primary-600 hover:text-primary-700 underline"
                aria-label="Zum Impressum von NOHA STUDIO"
              >
                Impressum
              </Link>
              .
            </p>
          </div>

          <div className="space-y-8">
            {/* Geltungsbereich */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 1 Geltungsbereich
                  </h2>
                  <p className="text-sm text-gray-500">
                    Für wen gelten diese Bedingungen?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Für alle Geschäftsbeziehungen zwischen Bünyamin Bilgin, handelnd
                als NOHA STUDIO, Elsterstr. 2, 70806 Kornwestheim (nachfolgend
                „Auftragnehmer“) und dem Kunden (nachfolgend „Auftraggeber“)
                gelten ausschließlich die nachfolgenden Allgemeinen
                Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung
                gültigen Fassung.
              </p>
            </div>

            {/* Vertragsgegenstand */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <PenSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 2 Vertragsgegenstand
                  </h2>
                  <p className="text-sm text-gray-500">
                    Was ist die Dienstleistung?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Gegenstand des Vertrages ist die digitale Bearbeitung und
                künstlerische Veredelung von Fotografien, die vom Auftraggeber
                zur Verfügung gestellt werden. Der genaue Umfang der Leistungen
                ergibt sich aus der jeweiligen Paketbeschreibung auf der
                Website.
              </p>
            </div>

            {/* Vertragsschluss */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Handshake className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 3 Vertragsschluss
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wie kommt ein Vertrag zustande?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die Beauftragung erfolgt durch das Absenden des Kontaktformulars
                mit den hochgeladenen Bilddaten und der Auswahl eines Pakets.
                Der Vertrag kommt zustande, wenn der Auftragnehmer die
                Beauftragung schriftlich (per E-Mail) bestätigt.
              </p>
            </div>

            {/* Nutzungsrechte */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Copyright className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 4 Nutzungsrechte
                  </h2>
                  <p className="text-sm text-gray-500">
                    Was dürfen Sie mit den Bildern tun?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Der Auftraggeber erhält die uneingeschränkten privaten
                Nutzungsrechte an den bearbeiteten Bildern. Eine kommerzielle
                Nutzung bedarf einer gesonderten, schriftlichen Vereinbarung.
                Der Auftragnehmer darf die Werke für Eigenwerbung (z.B. auf
                dieser Website) nutzen, es sei denn, der Auftraggeber
                widerspricht dem schriftlich.
              </p>
            </div>

            {/* Preise und Zahlungsbedingungen */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Euro className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 5 Preise und Zahlungsbedingungen
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wie erfolgt die Bezahlung?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die Preise für die Dienstleistungen ergeben sich aus der
                jeweiligen Paketbeschreibung auf der Website. Alle Preise sind
                in Euro und verstehen sich als Endpreise, da der Auftragnehmer
                als Kleinunternehmer gemäß § 19 UStG keine Umsatzsteuer
                ausweist. Die Zahlung erfolgt im Voraus per Überweisung oder
                über die auf der Website angegebenen Zahlungsmethoden. Die
                Rechnung wird dem Auftraggeber per E-Mail zugesandt. Zahlungen
                sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug
                fällig.
              </p>
            </div>

            {/* Leistungserbringung und Lieferfristen */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 6 Leistungserbringung und Lieferfristen
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wann und wie erfolgt die Lieferung?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die Bearbeitung der Bilder erfolgt innerhalb der in der
                Auftragsbestätigung angegebenen Frist, in der Regel innerhalb
                von 5-10 Werktagen nach Eingang der Zahlung und der
                vollständigen Bilddaten. Verzögerungen aufgrund höherer Gewalt
                oder unzureichender Bilddaten liegen nicht in der Verantwortung
                des Auftragnehmers. Die Lieferung der bearbeiteten Bilder
                erfolgt digital per E-Mail oder über einen Download-Link.
              </p>
            </div>

            {/* Haftung */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 7 Haftung
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wer haftet bei Problemen?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Der Auftragnehmer haftet nur für Vorsatz und grobe
                Fahrlässigkeit. Eine Haftung für leichte Fahrlässigkeit ist
                ausgeschlossen, es sei denn, es handelt sich um die Verletzung
                wesentlicher Vertragspflichten. Die Haftung für Datenverlust ist
                auf den typischen Wiederherstellungsaufwand beschränkt, sofern
                der Auftraggeber keine Sicherungskopien der Originalbilder
                erstellt hat. Der Auftragnehmer haftet nicht für die Qualität
                der vom Auftraggeber bereitgestellten Bilddaten.
              </p>
            </div>

            {/* Mängelgewährleistung */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 8 Mängelgewährleistung
                  </h2>
                  <p className="text-sm text-gray-500">
                    Was passiert bei Mängeln?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Bei Mängeln der erbrachten Dienstleistung hat der Auftraggeber
                Anspruch auf Nachbesserung innerhalb einer angemessenen Frist.
                Schlägt die Nachbesserung fehl, kann der Auftraggeber eine
                Minderung der Vergütung verlangen. Weitergehende Ansprüche,
                insbesondere Schadensersatz, sind ausgeschlossen, es sei denn,
                der Mangel beruht auf Vorsatz oder grober Fahrlässigkeit.
              </p>
            </div>

            {/* Widerrufsrecht */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Gavel className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 9 Widerrufsrecht
                  </h2>
                  <p className="text-sm text-gray-500">
                    Gibt es ein Rückgaberecht?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Für die individuell nach Ihren Vorgaben bearbeiteten Bilder
                besteht gemäß § 312j Abs. 2 Nr. 1 BGB kein Widerrufsrecht, da es
                sich um eine nach Kundenspezifikation angefertigte
                Dienstleistung handelt. Eine Beauftragung kann daher nach
                Auftragsbestätigung nicht widerrufen werden.
              </p>
            </div>

            {/* Datenschutz */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 10 Datenschutz
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wie schützen wir Ihre Daten?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Die Verarbeitung personenbezogener Daten (z. B. hochgeladene
                Bilder) erfolgt ausschließlich zur Erfüllung des Auftrags.
                Weitere Informationen zum Umgang mit Ihren Daten finden Sie in
                unserer{" "}
                <Link
                  to="/datenschutz"
                  className="text-primary-600 hover:text-primary-700 underline"
                  aria-label="Zur Datenschutzerklärung von NOHA STUDIO"
                >
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>

            {/* Salvatorische Klausel */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 11 Salvatorische Klausel
                  </h2>
                  <p className="text-sm text-gray-500">
                    Was passiert bei ungültigen Klauseln?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Sollte eine Bestimmung dieser AGB ganz oder teilweise unwirksam
                sein oder werden, bleibt die Wirksamkeit der übrigen
                Bestimmungen unberührt. Die unwirksame Bestimmung wird durch
                eine Regelung ersetzt, die dem wirtschaftlichen Zweck der
                unwirksamen Bestimmung möglichst nahekommt.
              </p>
            </div>

            {/* Gerichtsstand und anwendbares Recht */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Gavel className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    § 12 Gerichtsstand und anwendbares Recht
                  </h2>
                  <p className="text-sm text-gray-500">
                    Wo werden Streitigkeiten geklärt?
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Es gilt das Recht der Bundesrepublik Deutschland unter
                Ausschluss des UN-Kaufrechts. Gerichtsstand für alle
                Streitigkeiten aus diesem Vertrag ist, soweit gesetzlich
                zulässig, Stuttgart.
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

export default AGBPage;
