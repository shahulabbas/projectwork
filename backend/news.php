<?php
// Database connection settings
require('connection.php');
// Fetch data from the database
$sql = "SELECT title, url, date FROM news";
$result = $conn->query($sql);

$newsData = [];

if ($result->num_rows > 0) {
    // Output data for each row
    while ($row = $result->fetch_assoc()) {
        $newsData[] = $row;
    }
}

// Set the header for JSON response
header('Content-Type: application/json');

// Output the data in JSON format
echo json_encode($newsData);

// Close the connection
$conn->close();
?>