// CurtainIntro.jsx
import React, { useEffect, useState } from 'react';
import './CurtainIntro.css';
import logo from "../Images/Logo.png";
import HomeMain from './HomeMain';

export default function CurtainIntro() {
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHome(true);
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);

  if (showHome) return <HomeMain/>;

  return (
    <div className="curtain-container">
      <div className="curtain left-curtain" />
      <div className="curtain right-curtain" />
      <div className="logo-container">
        <img src={logo} alt="SwaadBite Logo" className="logo-animation" />
      </div>
    </div>
  );
}