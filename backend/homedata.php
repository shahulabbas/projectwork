<?php
// Add CORS headers before any output
header("Access-Control-Allow-Origin: http://localhost:3000"); // Specify the frontend URL
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

// Handle OPTIONS request (pre-flight request for CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require('connection.php');

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);

// Log the received data for debugging
error_log(print_r($data, true)); // Check if data is coming in properly

// Check if all required fields are present in the input data
if (isset($data['id'], $data['title'], $data['url'], $data['upload_date'])) {
    $id = $data['id'];
    $title = $data['title'];
    $url = $data['url'];
    $upload_date = $data['upload_date'];

    // Validate input data (you can extend this as needed)
    if (empty($id) || empty($title) || empty($url) || empty($upload_date)) {
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }

    // Check if the news item with the given ID exists in the database
    $checkQuery = "SELECT 1 FROM news WHERE id = ?";
    if ($checkStmt = $conn->prepare($checkQuery)) {
        $checkStmt->bind_param('i', $id);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows === 0) {
            echo json_encode(['status' => 'error', 'message' => 'No news item found with the provided ID']);
            exit;
        }

        $checkStmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error checking if news item exists', 'error' => $conn->error]);
        exit;
    }

    // Prepare the SQL query to update the news
    $query = "UPDATE news SET title = ?, url = ?, date = ? WHERE id = ?";
    if ($stmt = $conn->prepare($query)) {
        // Bind the parameters
        if (!$stmt->bind_param('sssi', $title, $url, $upload_date, $id)) {
            echo json_encode(['status' => 'error', 'message' => 'Binding parameters failed', 'error' => $stmt->error]);
            exit;
        }

        // Execute the query and check for success
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'News updated']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update news', 'error' => $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Database query preparation failed', 'error' => $conn->error]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>
