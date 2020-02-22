import React from 'react';
import { Link } from 'react-router-dom';

import './css.scss';

const Nav = () => {
  return <nav className="nav">
    <ul className="clean-list">
      <li><Link to="/"><span>Home</span></Link></li>
      <li><Link to="/about"><span>About</span></Link></li>
      <li><Link to="/store"><span>Store</span></Link></li>
    </ul>
  </nav>;
};

export default Nav;
