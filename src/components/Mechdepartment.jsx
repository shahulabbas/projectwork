// React Component
import React, { useEffect, useState } from "react";
import Header from "./Headerpage";
import Leftnavigation from "./Leftnavigation";
import "./generaldept.css";

const Mechdepartment = () => {
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [names, setNames] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/GitHub/projectwork/backend/mech-dept-img.php")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data);
          setLoading(false);
          setNames(data.map((item) => item.name));
          setProfessions(data.map((item) => item.profession));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleFileChange = (event, id) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles((prev) => {
        const newFiles = [...prev];
        newFiles[id] = selectedFile;
        return newFiles;
      });
    }
  };

  const handleNameChange = (event, id) => {
    const updatedNames = [...names];
    updatedNames[id] = event.target.value;
    setNames(updatedNames);
  };

  const handleProfessionChange = (event, id) => {
    const updatedProfessions = [...professions];
    updatedProfessions[id] = event.target.value;
    setProfessions(updatedProfessions);
  };

  const handleSubmit = (event, id) => {
    event.preventDefault();

    if (!files[id] && !names[id] && !professions[id]) {
      alert("Please make at least one change.");
      return;
    }

    const formData = new FormData();
    formData.append("id", data[id].id);
    formData.append("name", names[id]);
    formData.append("profession", professions[id]);
    if (files[id]) {
      formData.append("image", files[id]);
    }

    fetch("http://localhost/GitHub/projectwork/backend/mech-dept-img.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.success) {
          alert("Details updated successfully!");
          if (files[id]) {
            const updatedImage = URL.createObjectURL(files[id]);
            setData((prevData) => {
              const newData = [...prevData];
              newData[id].image = updatedImage;
              return newData;
            });
          }
          setIsEditing(null);
        } else {
          console.error("Error updating data:", responseData.error);
        }
      })
      .catch((error) => console.error("Error uploading data:", error));
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
        <div id="right">
        <div className="cme"> <h2>DEPARTMENT OF MECHANICAL ENGINEERING </h2></div>
          <marquee behavior="" direction="">While updating the data refresh the page to display the data</marquee>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="general-dept-form">
              {data.map((item, index) => (
                <div
                  key={item.id}
                  className={`box ${isEditing === index ? "editing" : ""}`}
                >
                  <div
                    className="image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  <div className="data">
                    <h2>NAME: {item.name}</h2>
                    <p>PROFESSION: {item.profession}</p>
                  </div>
                  <button onClick={() => setIsEditing(index)}>Edit</button>

                  {isEditing === index && (
                    <form onSubmit={(e) => handleSubmit(e, index)}>
                      <h2>Edit Details</h2>
                      <input
                        type="text"
                        onChange={(e) => handleNameChange(e, index)}
                        placeholder="Update Name"
                       />
                      <input
                        type="text"
                        onChange={(e) => handleProfessionChange(e, index)}
                        placeholder="Update Profession"
                       />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                      <button type="submit">Save</button>
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

export default Mechdepartment;