<?php
require('connection.php');
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

$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    // Fetch all data from the table
    $sql = "SELECT * FROM `generaldept`";
    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $imageData = $row['image'];
        $imageSrc = $imageData ? 'data:image/jpeg;base64,' . base64_encode($imageData) : null;

        $data[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "profession" => $row['profession'],
            "image" => $imageSrc, // Encoded image for frontend
        ];
    }

    echo json_encode($data);
} elseif ($requestMethod === 'POST') {
    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? null;
    $profession = $_POST['profession'] ?? null;
    $image = $_FILES['image'] ?? null;

    if ($id) {
        // Check if image is uploaded
        if ($image && $image['tmp_name']) {
            $imageBlob = file_get_contents($image['tmp_name']);
            $sql = "UPDATE `generaldept` SET name = ?, profession = ?, image = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssi", $name, $profession, $imageBlob, $id);
        } else {
            $sql = "UPDATE `generaldept` SET name = ?, profession = ? WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssi", $name, $profession, $id);
        }

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'ID missing']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method']);
}
?>
