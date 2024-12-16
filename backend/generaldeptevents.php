<?php
require('connection.php');
header('Content-Type: application/json');

// Allow CORS
$allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
} else {
    header('Access-Control-Allow-Origin: *'); // Temporary for development, avoid in production
}

header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'OPTIONS') {
    // Handle preflight requests for CORS
    http_response_code(200);
    exit();
}

if ($requestMethod === 'POST') {
    // Handle image upload along with title and description
    if (isset($_FILES['image']) && isset($_POST['title']) && isset($_POST['description']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        try {
            // Fetch the title and description
            $title = $_POST['title'];
            $description = $_POST['description'];

            // Handle image upload
            $imageData = file_get_contents($_FILES['image']['tmp_name']);
            $sql = "INSERT INTO `generaldeptevents` (title, description, images) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $title, $description, $imageData); // Use "b" for binary data if needed

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Image uploaded successfully']);
            } else {
                throw new Exception('Failed to save image to database');
            }
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        } finally {
            $stmt->close();
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No valid image, title, or description uploaded']);
    }
} elseif ($requestMethod === 'GET') {
    // Handle fetching all images with titles and descriptions
    try {
        $sql = "SELECT title, description, images FROM `generaldeptevents`";
        $result = $conn->query($sql);

        $data = [];
        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $imageData = $row['images']; // Assuming `images` is a BLOB field
                $imageSrc = $imageData ? 'data:image/jpeg;base64,' . base64_encode($imageData) : null;

                $data[] = [
                    "title" => $row['title'],
                    "description" => $row['description'],
                    "image" => $imageSrc,
                ];
            }
        }
        echo json_encode($data);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    // Handle unsupported request methods
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
