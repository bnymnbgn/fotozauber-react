<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

// PHPMailer-Klassen importieren
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// CORS-Header für die Entwicklung (für Produktion anpassen)
//header("Access-Control-Allow-Origin: http://localhost:5173");
//header("Access-Control-Allow-Methods: POST, OPTIONS");
//header("Access-Control-Allow-Headers: Content-Type");

// Antwort-Header auf JSON setzen
header('Content-Type: application/json');

// Antwort-Struktur vorbereiten
$response = ['success' => false, 'message' => 'Ein unbekannter Fehler ist aufgetreten.'];

// Konfiguration laden
$config = require 'config.php'; // Pfad zur config.php anpassen

// Nur POST-Anfragen verarbeiten
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response['message'] = 'Ungültige Anfragemethode.';
    echo json_encode($response);
    exit();
}

try {
    // === Formulardaten sicher auslesen und bereinigen ===
    $name = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
    $subject = htmlspecialchars(trim($_POST['subject'] ?? ''), ENT_QUOTES, 'UTF-8');
    $message_body = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');
    $portfolio_consent = (isset($_POST['portfolioConsent']) && $_POST['portfolioConsent'] === 'true') ? 'Ja' : 'Nein';

    // === Serverseitige Validierung ===
    if (empty($name) || !$email || empty($subject) || empty($message_body)) {
        throw new Exception('Bitte füllen Sie alle Pflichtfelder korrekt aus.');
    }

    // === PHPMailer initialisieren ===
    $mail = new PHPMailer(true);
    
    // Server-Einstellungen (aus der config.php)
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $config['smtp_port'];
    $mail->CharSet    = 'UTF-8';

    // Empfänger und Absender
    $mail->setFrom($config['smtp_user'], 'NOHA STUDIO Kontaktformular');
    $mail->addAddress($config['recipient_email']);
    $mail->addReplyTo($email, $name);

    // === Dateianhänge sicher verarbeiten ===
    $allowed_mime_types = ['image/jpeg', 'image/png', 'image/tiff', 'image/x-raw'];
    $max_file_size = 10 * 1024 * 1024; // 10MB

    if (!empty($_FILES)) {
        foreach ($_FILES as $file) {
            // PHP-Upload-Fehler prüfen
            if ($file['error'] !== UPLOAD_ERR_OK) {
                // Fehler ignorieren oder eine Warnung loggen, aber den Prozess nicht abbrechen
                error_log("Upload-Fehler für Datei: " . $file['name'] . " - Fehlercode: " . $file['error']);
                continue;
            }

            // Serverseitige Validierung von Größe und Typ
            if ($file['size'] > $max_file_size) {
                error_log("Datei zu groß: " . $file['name']);
                continue;
            }
            // fInfo ist zuverlässiger als die Endung oder der vom Browser gesendete Typ
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $mime_type = $finfo->file($file['tmp_name']);

            if (!in_array($mime_type, $allowed_mime_types)) {
                error_log("Ungültiger Dateityp: " . $file['name'] . " (" . $mime_type . ")");
                continue;
            }
            
            // Datei an die E-Mail anhängen (temporärer Pfad, Originalname)
            $mail->addAttachment($file['tmp_name'], $file['name']);
        }
    }
    
    // === E-Mail-Inhalt zusammenstellen ===
    $mail->isHTML(false); // E-Mail als reinen Text senden
    $mail->Subject = "Neue Kontaktanfrage: $subject";
    
    $email_text_content = "Sie haben eine neue Nachricht von Ihrer Website erhalten:\n\n";
    $email_text_content .= "Name: $name\n";
    $email_text_content .= "E-Mail: $email\n";
    if (!empty($phone)) {
        $email_text_content .= "Telefon: $phone\n";
    }
    $email_text_content .= "Einwilligung Portfolio: $portfolio_consent\n\n";
    $email_text_content .= "Nachricht:\n" . str_replace('\r\n', "\n", $message_body) . "\n\n";
    $email_text_content .= "--- Ende der Nachricht ---";

    $mail->Body = $email_text_content;

    // E-Mail senden
    $mail->send();
    
    $response['success'] = true;
    $response['message'] = 'Nachricht erfolgreich gesendet!';

} catch (Exception $e) {
    // Fehler loggen, anstatt ihn auszugeben (sicherer)
    error_log("PHPMailer-Fehler: {$mail->ErrorInfo}");
    $response['message'] = "Mailer Error: {$mail->ErrorInfo}";
    http_response_code(400);
}

// Finale JSON-Antwort senden
echo json_encode($response);
exit();