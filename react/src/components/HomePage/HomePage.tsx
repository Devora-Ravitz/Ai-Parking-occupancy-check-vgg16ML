

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>smart-park</h1>
      {/* <p>Smart Park is a project that enables a parking experience for the user, he can easily know where is occupied and where is free.</p> */}
      {/* Embed the video */}
      <iframe
        width="50000"
        height="40000"
        src="/istockphoto-845341376-640_adpp_is.mp4"
        title="Parking Lot Animation"
        frameBorder="0"
        // allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      {/* Link to another page */}
      <a href="/target-page">
        {/* <p>To hear more from him click </p> */}
        <img src="/whatsapp (1).png" alt="WhatsApp" style={{ width: '80px', height: '80px' }} />
      </a>
      {/* <Link to="/login">Login</Link> */}
      {/* <Link to="/about">To hear more from him click</Link> */}
      <Link to="/about" style={{ color: 'white', fontSize: '20px' }}>To hear more from us click</Link>


    </div>
  );
};

export default HomePage;
