import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.jpg'; // or your actual logo

function NavBar() {
  const location = useLocation();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 30px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 999,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ width: 60, height: 60, marginRight: 10 }} />
        <h2 style={{ margin: 0 }}>SwadBite</h2>
      </div>
      <div>
        <Link to="/" style={linkStyle(location.pathname === '/')}>Home</Link>
        <Link to="/explore" style={linkStyle(location.pathname === '/explore')}>Explore</Link>
        <Link to="/feedback" style={linkStyle(location.pathname === '/feedback')}>Feedback</Link>
        <Link to="/orders" style={linkStyle(location.pathname === '/orders')}>Orders</Link>
        <Link to="/plans" style={linkStyle(location.pathname === '/plans')}>Plans</Link>
        <Link to="/login" style={linkStyle(location.pathname === '/login')}>Login</Link>
      </div>
    </div>
  );
}

const linkStyle = (isActive) => ({
  margin: '0 12px',
  textDecoration: 'none',
  color: isActive ? '#f57c00' : '#000',
  fontWeight: 'bold',
});

export default NavBar;
