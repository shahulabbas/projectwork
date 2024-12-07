<?php 
session_start();  // Start the session to use $_SESSION
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json'); 

require('connection.php');

// Handle login request (POST)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the submitted username and password
    $input_username = $_POST['username'];
    $input_password = $_POST['password'];

    // Protect against SQL injection
    $input_username = $conn->real_escape_string($input_username);
    $input_password = $conn->real_escape_string($input_password);

    // Query to check if the user exists with the given username and password
    $sql = "SELECT * FROM adminlogin WHERE username = '$input_username' AND password = '$input_password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // User exists, login successful
        $_SESSION['username'] = $input_username; // Store username in session
        echo json_encode(["message" => "Login successful", "status" => "success"]);
    } else {
        // Invalid credentials
        echo json_encode(["message" => "Invalid username or password", "status" => "error"]);
    }
}

$conn->close(); // Close the database connection
?>
