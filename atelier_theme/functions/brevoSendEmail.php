<?php
$_ENV = include($_SERVER['DOCUMENT_ROOT'] . '/config/env.php');

// Stelle sicher, dass die Anfrage eine POST-Anfrage ist
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Hole die Daten aus dem POST-Body
    $data = json_decode(file_get_contents('php://input'));

    // Definiere die Anfrage-URL
    $url = 'https://api.brevo.com/v3/smtp/email';

    // Setze die Header für die Anfrage
    $headers = array(
        'Content-Type: application/json',
        'api-key: ' . $_ENV['BREVO_API_KEY'],
    );

    // Erstelle die Anfrage-Optionen
    $options = array(
        'http' => array(
            'header'  => $headers,
            'method'  => 'POST',
            'content' => json_encode($data),
        ),
    );

    // Erstelle den Stream-Kontext mit den Optionen
    $context  = stream_context_create($options);

    // Führe die Anfrage an die API durch
    $result = file_get_contents($url, false, $context);

    // Überprüfe das Ergebnis und gib es als JSON zurück
    if ($result !== false) {
        echo $result;
    } else {
        http_response_code(500); // Fehlercode, falls die Anfrage fehlschlägt
        echo json_encode(array('error' => 'Die Anfrage an die API ist fehlgeschlagen.'));
    }
} else {
    http_response_code(405); // Fehlercode, falls die Anfrage keine POST-Anfrage ist
    echo json_encode(array('error' => 'Ungültige Anfrage. Es werden nur POST-Anfragen akzeptiert.'));
}
