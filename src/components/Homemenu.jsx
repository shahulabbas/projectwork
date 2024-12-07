import React from 'react';
import './home.css';

const Home = () => {
  return (
    <div className='homecontainer'>
      <form action="">
        <label htmlFor="">TITLE</label>
        <input type="text" id='title' name='title' />
        <label htmlFor="">LINK</label>
        <input type="url" name="url" id="url" />
        <label htmlFor="">UPLOAD DATE</label>
        <input type="date" name='date' id='date'/>
      </form>
    </div>
  )
}

export default Home
