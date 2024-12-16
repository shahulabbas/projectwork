<?php
require('connection.php');
// Allow cross-origin requests
header('Content-Type: application/json');

// Dynamically allow the origin of the incoming request
$allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
} else {
    header('Access-Control-Allow-Origin: *'); // Use this temporarily for development but avoid in production
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Fetch data from the database
$sql = "SELECT id, title, url, date AS upload_date FROM news";
$result = $conn->query($sql);

$newsData = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $newsData[] = $row;
    }
}

// Output data in JSON format
header('Content-Type: application/json');
echo json_encode($newsData);

// Close the connection
$conn->close();
?>
