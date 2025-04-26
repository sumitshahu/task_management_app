import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
      <Link to="/signup">Signup</Link>
      <li><Link to="/board" style={{ color: '#fff' }}>Board</Link></li> 
    </nav>
  );
}

export default Navbar;
