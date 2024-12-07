<?php 
session_start();  // Start the session to use $_SESSION
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); // Ensure the response is in JSON format

// Check if the session username is set and send it as JSON response
if (isset($_SESSION['username'])) {
    echo json_encode(["username" => $_SESSION['username']]);
} else {
    echo json_encode(["error" => "No user is logged in"]);
}
?>
