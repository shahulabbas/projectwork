import React, { useEffect, useState } from 'react';
import Header from './Headerpage';
import Leftnavigation from './Leftnavigation';
import './generaldept.css';

const Generaldepartment = () => {
  const [data, setData] = useState([]); // Store data for all IDs
  const [files, setFiles] = useState([]); // Store file uploads for each ID
  const [names, setNames] = useState([]); // Store names for each ID
  const [professions, setProfessions] = useState([]); // Store professions for each ID
  const [isEditing, setIsEditing] = useState(null); // To toggle edit mode for a specific ID
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data via API
  useEffect(() => {
    fetch('http://localhost/GitHub/projectwork/backend/genaral-dept-img.php') // Your API URL
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data); // Set data from API response
          setLoading(false); // Stop loading when data is fetched
          setNames(data.map(item => item.name)); // Initialize names
          setProfessions(data.map(item => item.profession)); // Initialize professions
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading if an error occurs
      });
  }, []);

  // Handle file change for a specific ID
  const handleFileChange = (event, id) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[id] = selectedFile; // Update the file for the specific ID
        return newFiles;
      });
    }
  };

  // Handle name change for a specific ID
  const handleNameChange = (event, id) => {
    const updatedNames = [...names];
    updatedNames[id] = event.target.value; // Update the name for the specific ID
    setNames(updatedNames);
  };

  // Handle profession change for a specific ID
  const handleProfessionChange = (event, id) => {
    const updatedProfessions = [...professions];
    updatedProfessions[id] = event.target.value; // Update the profession for the specific ID
    setProfessions(updatedProfessions);
  };

  // Handle form submission for a specific ID
  const handleSubmit = (event, id) => {
    event.preventDefault();

    if (!files[id] && !names[id] && !professions[id]) {
      alert('Please make at least one change.');
      return;
    }

    const formData = new FormData();
    formData.append('id', data[id].id); // Send the ID of the specific record
    formData.append('name', names[id]); // Append name to FormData
    formData.append('profession', professions[id]); // Append profession to FormData
    if (files[id]) {
      formData.append('image', files[id]); // Append the selected image to FormData
    }

    fetch('http://localhost/GitHub/projectwork/backend/genaral-dept-img.php', {
      method: 'POST', // Use POST method
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Details updated successfully!');
          if (files[id]) {
            const updatedImage = URL.createObjectURL(files[id]);
            setData((prevData) => {
              const newData = [...prevData];
              newData[id].image = updatedImage; // Update the image with the new URL
              return newData;
            });
          }
          setIsEditing(null); // Exit edit mode
        } else {
          console.error('Error updating data:', data.error);
        }
      })
      .catch((error) => console.error('Error uploading data:', error));
  };

  return (
    <div className="body">
      <div className="box1">
        <Header />
      </div>

      <div className="box2">
        <div>
          <Leftnavigation />
        </div>
        <div>
          {/* Loading Check */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {/* Loop through all records */}
              {data.map((item, index) => (
                <div key={item.id}>
                  <h2>Details for ID {item.id}</h2>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Profession:</strong> {item.profession}</p>
                  <p><strong>Current Image:</strong></p>
                  <img
                    src={item.image}
                    alt="Current"
                    style={{ width: '200px', height: 'auto', border: '1px solid #ccc', marginBottom: '1rem' }}
                  />

                  {/* Edit Button */}
                  <button onClick={() => setIsEditing(index)}>Edit</button>

                  {/* Edit Form (Only Visible in Edit Mode for this ID) */}
                  {isEditing === index && (
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                      <h2>Edit Department Details</h2>
                      <input
                        type="text"
                         onChange={(e) => handleNameChange(e, index)}
                        placeholder="Update Name"
                        style={{ display: 'block', marginBottom: '1rem' }}
                      />
                      <input
                        type="text"
                         onChange={(e) => handleProfessionChange(e, index)}
                        placeholder="Update Profession"
                        style={{ display: 'block', marginBottom: '1rem' }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                        style={{ display: 'block', marginBottom: '1rem' }}
                      />
                      <button type="submit">Submit Changes</button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generaldepartment;
