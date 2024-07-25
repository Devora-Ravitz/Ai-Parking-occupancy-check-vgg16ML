


import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Link from react-router-dom
import HomePage from './components/HomePage/HomePage';
import UploudFile from './components/UploudFile/UploudFile';
import LogIn from './components/log-in/log-in'; 
import Navbar from './components/Navbar/Navbar'; // Import the Navbar component
import AboutUs from './components/AboutUs/AboutUs';
import Search from './components/Search/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Include the Navbar component */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Route for the home page */}
          <Route path="upload" element={<UploudFile />} /> {/* Route for the upload component */}
          <Route path="login" element={<LogIn />} /> {/* Route for the login component */}
          <Route path="about" element={<AboutUs />} /> {/* Route for the AboutUs component */}
          <Route path="Search" element={<Search />} /> {/* Route for the search component */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;

