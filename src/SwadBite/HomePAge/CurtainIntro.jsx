// CurtainIntro.jsx
import React, { useEffect } from 'react';
import './CurtainIntro.css';
import logo from "../Images/Logo.png";

export default function CurtainIntro({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 6000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

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
