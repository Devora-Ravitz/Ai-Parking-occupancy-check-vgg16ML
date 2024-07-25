
import React, { FC } from 'react';
import './AboutUs.scss';

interface AboutUsProps {}

const AboutUs: FC<AboutUsProps> = () => (
  <div className="AboutUs">
    <h2>About SmartPark</h2>
    <p>
      SmartPark is an innovative artificial intelligence project focused on transforming the way we perceive and manage parking lots. Through advanced AI technology, SmartPark aims to solve urban parking challenges by identifying and locating available parking spaces in real time.
    </p>
    <p>
      Our team of experts is committed to creating a smarter and more efficient parking experience for drivers and urban planners. By developing software and machine learning, SmartPark offers seamless parking solutions that enhance space utilization, reduce traffic congestion, and improve overall urban mobility.
    </p>
    <p>
      At SmartPark, we dream of a future where finding parking is no longer a hassle but rather an integral part of daily life. Join us on our journey to reshape the way cities manage parking and continue paving the way for smarter and more sustainable urban environments.
    </p>
    <h3>Key Features:</h3>
    <ul style={{ listStyleType: 'none' }}> {/* הסרנו את סגנון הרשימה והוספנו סגנון עם נקודות */}
      <li>Real-time identification of available parking</li>
      <li>Precise detection of occupied parking spaces</li>
      <li>AI-driven parking navigation and guidance</li>
      <li>Integration with existing urban infrastructure</li>
      <li>Data-driven insights for urban planning</li>
    </ul>
    <h3>Contact Us</h3>
    <p>
      Interested in learning more about SmartPark or joining us in partnership? We'd love to hear from you! You can reach out to our development team at info@smartpark.ai.
    </p>
    <div className="social-icons">
      {/* <a href="https://www.facebook.com/SmartPark" target="_blank" rel="noopener noreferrer">
        <img src="../../icons/facebook-icon.svg" alt="Facebook" style={{ width: '50px', height: '50px', backgroundColor: 'green', borderRadius: '50%', padding: '5px' }} />
      </a>
      <a href="https://www.instagram.com/SmartPark" target="_blank" rel="noopener noreferrer"> */}
        <img src="/instagram.png" alt="Instagram" style={{ width: '50px', height: '50px', backgroundColor: 'purple', borderRadius: '50%', padding: '5px' }} />
        <img src="/whatsapp.png" alt="Whatsup" style={{ width: '50px', height: '50px', backgroundColor: 'purple', borderRadius: '50%', padding: '5px' }} />
        <img src="/facebook (1).png" alt="Facbook" style={{ width: '50px', height: '50px', backgroundColor: 'purple', borderRadius: '50%', padding: '5px' }} />
      {/* </a> */}
    </div>
  </div>
);

export default AboutUs;
