<?php
// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('connection.php');
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
