import React from 'react';
import { Link } from 'react-router-dom';
import { navbar, navlink } from '../styles/styles';

const Navbar = () => {
  return (
    <nav style={navbar}>
      <Link to="/" style={navlink}>Home</Link>
      <Link to="/videoclubs" style={navlink}>Videoclubs</Link>
      <Link to="/create" style={navlink}>Create Videoclub</Link>
    </nav>
  );
};

export default Navbar;
