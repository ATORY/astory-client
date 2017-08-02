import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav className="maxWidth">
    <Link to="/" className="navbar">React</Link>
    <Link to="/type" className="navbar">type</Link>
  </nav>
)

export default Nav;