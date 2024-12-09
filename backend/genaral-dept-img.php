<?php
require('connection.php');
header('Content-Type: application/json');

// CORS headers to allow cross-origin requests from React app
header('Access-Control-Allow-Origin: http://localhost:3000'); // Allow React frontend
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Allow specific methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow headers
header('Access-Control-Allow-Credentials: true'); // Allow credentials

$requestMethod = $_SERVER['REQUEST_METHOD'];

// Handle GET request to fetch data
if ($requestMethod === 'GET') {
    $sql = "SELECT * FROM `generaldept`"; // Get all rows for all IDs
    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        // Fetch image data directly from the database (LONG BLOB)
        $imageData = $row['image']; // Image data in binary format
        
        // Check if the image exists in the database
        if ($imageData) {
            // Encode the image data as Base64
            $imageSrc = 'data:image/jpeg;base64,' . base64_encode($imageData);
        } else {
            $imageSrc = null; // If there's no image, set it to null
        }

        $data[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "profession" => $row['profession'],
            "image" => $imageSrc, // Return image as Base64 string
        ];
    }

    echo json_encode($data); // Return all records as JSON
} elseif ($requestMethod === 'POST') {
    // Handle POST request to update data
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? null;
    $profession = $_POST['profession'] ?? null;
    $image = $_FILES['image'] ?? null;

    if ($id) {
        // Prepare SQL to update the data for the selected ID
        $sql = "UPDATE `generaldept` SET name = ?, profession = ? WHERE id = ?"; // Only update the selected record

        if ($image) {
            $imageTemp = $image['tmp_name'];
            if (!empty($imageTemp)) {
                $imageBlob = file_get_contents($imageTemp); // Read image contents from the uploaded file
                $sql .= ", image = ?"; // Append image update to SQL query
            }
        }

        $stmt = $conn->prepare($sql);

        // Bind parameters based on whether an image was uploaded or not
        if ($image) {
            $stmt->bind_param("ssib", $name, $profession, $id, $imageBlob); // Bind name, profession, ID, and image data (BLOB)
        } else {
            $stmt->bind_param("ssi", $name, $profession, $id); // Bind name, profession, and ID only
        }

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'ID missing']);
    }
}
?>
