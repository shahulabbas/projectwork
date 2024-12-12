import React, { useState, useEffect } from "react";
import './home.css';
import Header from './Headerpage';
import Leftnavigation from './Leftnavigation';

const Home = () => {
  const [news, setNews] = useState([]); // Store all news items

  useEffect(() => {
    fetch('http://localhost/GitHub/projectwork/backend/news.php')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data:', data);
        setNews(data); // Populate news data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleUpdateNews = (id, title, url, upload_date) => {
    // Validate input fields to check if they are empty
    if (!title || !url || !upload_date) {
      alert("Please fill all fields before updating news.");
      return; // Stop the update process if any field is empty
    }

    fetch('http://localhost/GitHub/projectwork/backend/homedata.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title,
        url,
        upload_date,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check if the response is successful
        if (data.status === 'error') {
          alert(data.message); // Show alert for error messages
        } else {
          alert('News updated successfully!');
        }
      })
      .catch(error => {
        console.error('Error updating news:', error);
        alert('Error: Failed to update news');
      });
  };

  return (
    <div className="homecontainer">
      <div className="box1">
        <Header />
      </div>
      <div className="box2">
        <div>
          <Leftnavigation />
        </div>
        <div className="content">
        <marquee behavior="" direction="">upload the leatest news or updates here</marquee>

        <form action="">
          {news.length === 0 ? (
            <div>No news data available</div> // Show message if no news is available
          ) : (
            news.map((item, index) => (
              <div className={`form form${index + 1}`} key={index}>
                <legend>{`news-${index + 1}`}</legend>
                <label htmlFor={`title-${index + 1}`}>Title</label>
                <input
                  className="title"
                  type="text"
                  id={`title-${index + 1}`}
                  name={`title[${index + 1}]`}
                  placeholder={item.title || `Enter the title of the Update ${index + 1}`}
                  onChange={(e) => item.title = e.target.value} // Handle title change
                />
                <label htmlFor={`url-${index + 1}`}>Link</label>
                <input
                  type="url"
                  id={`url-${index + 1}`}
                  name={`url[${index + 1}]`}
                  placeholder={item.url || `Enter the URL for news ${index + 1}`}
                   onChange={(e) => item.url = e.target.value} // Handle URL change
                />
                <label htmlFor={`date-${index + 1}`}>Upload Date</label>
                <input
                  type="date"
                  id={`date-${index + 1}`}
                  name={`date[${index + 1}]`}
                   onChange={(e) => item.upload_date = e.target.value} // Handle date change
                />
                <button id="submit" type="button" onClick={() => handleUpdateNews(item.id, item.title, item.url, item.upload_date)}>Update News</button>
              </div>
            ))
          )}
        </form>
      </div>
      </div>
    </div>
  );
};

export default Home;
