import React, { useState, useEffect } from "react";
import './home.css';
import Header from './Headerpage';
import Leftnavigation from './Leftnavigation';
const Home = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch('http://localhost/backend/news.php') // Replace with your server URL
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className="homecontainer">
      <div className='box1'>
        <Header/>
      </div>
      <div className='box2'>
        <div  >
          <Leftnavigation/>
        </div>
    
      <form action="">
        <div className='form form1'>
        <legend>news-1</legend>
        <label htmlFor="">title</label>
        <input type="text" id='title' name='title' placeholder='Enter the title of the Update'/>
        <label htmlFor="">link</label>
        <input type="url" name="url" id="url" placeholder='Enter the URL'/>
        <label htmlFor="">upload date</label>
        <input type="date" name='date' id='date'/>
        <input type="submit" />

        </div>
        <div className='form form2'>
        <legend>news-2</legend>
        <label htmlFor="">title</label>
        <input type="text" id='title' name='title' placeholder='Enter the title of the Update'/>
        <label htmlFor="">link</label>
        <input type="url" name="url" id="url" placeholder='Enter the URL'/>
        <label htmlFor="">upload date</label>
        <input type="date" name='date' id='date'/>
        <input type="submit" />

        </div>
        <div className='form form3'>
        <legend>news-3</legend>
        <label htmlFor="">title</label>
        <input type="text" id='title' name='title' placeholder='Enter the title of the Update'/>
        <label htmlFor="">link</label>
        <input type="url" name="url" id="url" placeholder='Enter the URL'/>
        <label htmlFor="">upload date</label>
        <input type="date" name='date' id='date'/>
        <input type="submit" />

        </div>
        <div className='form form4'>
        <legend>news-4</legend>
        <label htmlFor="">title</label>
        <input type="text" id='title' name='title' placeholder='Enter the title of the Update'/>
        <label htmlFor="">link</label>
        <input type="url" name="url" id="url" placeholder='Enter the URL'/>
        <label htmlFor="">upload date</label>
        <input type="date" name='date' id='date'/>
        <input type="submit" />
        </div>
        <div className='form form5'>
        <legend>news-5</legend>
        <label htmlFor="">title</label>
        <input type="text" id='title' name='title' placeholder='Enter the title of the Update'/>
        <label htmlFor="">link</label>
        <input type="url" name="url" id="url" placeholder='Enter the URL'/>
        <label htmlFor="">upload date</label>
        <input type="date" name='date' id='date'/>
        <input type="submit" />

        </div>
        <div className='form form6'>
        <legend>news-6</legend>
        <label htmlFor="">title</label>
        <input type="text" id='title' name='title' placeholder='Enter the title of the Update'/>
        <label htmlFor="">link</label>
        <input type="url" name="url" id="url" placeholder='Enter the URL'/>
        <label htmlFor="">upload date</label>
        <input type="date" name='date' id='date'/>
        <input type="submit" />

        </div>
      </form>
  
    </div>
    </div>

  )
}

export default Home
