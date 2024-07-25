import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss'; // Import your custom CSS for styling

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          {/* <Link to="/upload">Upload</Link> */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
