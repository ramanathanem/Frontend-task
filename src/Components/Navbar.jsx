import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../Style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setOpen] = useState(false);

  return (
    <nav>
      <Link to='/' className='title'>Logo</Link>
      <div className='menu' onClick={() => setOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "close"}> {/* Corrected className */}
      <li><NavLink to='/employee'>HOME</NavLink></li>
        <li><NavLink to='/home'>EMPLOYEE LIST</NavLink></li>
        <li><NavLink to='/registers'>Register</NavLink></li>
        <li><NavLink to='/login'>Login</NavLink></li>
        <li><NavLink to='/registers'>Hukum Gupta-Logout</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
