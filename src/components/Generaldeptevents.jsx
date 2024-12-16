import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import Header from "./Headerpage";
import Leftnavigation from "./Leftnavigation";
import "./generaldeptevents.css";

const Generaldeptevents = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); // Store the image file temporarily

  // Fetch images from the server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost/GitHub/projectwork/backend/generaldeptevents.php");
        if (!response.ok) {
          throw new Error("Failed to fetch images from the server.");
        }
        const data = await response.json();

        // Validate response data
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Handle file drop and upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file); // Store the selected image

    // Reset the title and description fields for the user to enter
    setTitle("");
    setDescription("");
  };

  // Handle form submission after title and description are entered
  const handleUpload = async () => {
    // Check if title, description, and image are provided
    if (!title || !description || !imageFile) {
      setUploadError("Please provide a title, description, and image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost/GitHub/projectwork/backend/generaldeptevents.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Add the uploaded image to the list with title and description
        const newImageURL = URL.createObjectURL(imageFile);
        setImages((prev) => [...prev, { image: newImageURL, title, description }]);

        alert("Image uploaded successfully!");

        // Reset the form
        setTitle("");
        setDescription("");
        setImageFile(null);
        setUploadError("");
      } else {
        setUploadError(data.error || "Failed to upload image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An error occurred during image upload.");
    }
  };

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div id="top">
      <Header />
      <div className="main-section">
        <Leftnavigation />
        <div className="image-container">
          {/* Upload Section */}
          <div className="add-image" {...getRootProps()}>
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faPlus} className="add-icon" />
            <p>Drag & drop or click to upload</p>
          </div>

          {uploadError && <p className="error">{uploadError}</p>}

          {/* Title and Description Fields */}
          {imageFile && (
            <div>
              <input
                type="text"
                placeholder="Enter image title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Enter image description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button onClick={handleUpload}>Upload Image</button>
            </div>
          )}

          {/* Loading Indicator */}
          {loading ? (
            <p>Loading images...</p>
          ) : (
            <div className="images">
              {images.length > 0 ? (
                images.map((item, index) => (
                  <div
                    key={index}
                    className="image-group"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="overlay">
                      <p className="image-title">{item.title}</p>
                      <p className="image-description">{item.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No images available. Upload one to get started!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generaldeptevents;
