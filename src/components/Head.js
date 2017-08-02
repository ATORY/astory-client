import React from 'react';
import { Link } from 'react-router-dom';

const Head = () => {
  return (
    <div>
      <Link to="/" className="navbar">React</Link>
      <Link to="/type" className="navbar">type</Link>
    </div>
  );
};


export default Head;

