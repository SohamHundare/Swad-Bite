import React, { useEffect, useState } from "react";
import "./CurtainIntro.css";
import logo from "../Images/Logo.png";
import HomeMain from "./HomeMain";

export default function CurtainIntro() {
  const [showHome, setShowHome] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    const hasSeenCurtain = localStorage.getItem("hasSeenCurtain");

    if (!hasSeenCurtain) {
      setShowCurtain(true);
      const timer = setTimeout(() => {
        setShowHome(true);
        localStorage.setItem("hasSeenCurtain", "true");
      }, 6000);
      return () => clearTimeout(timer);
    } else {
      // Already seen curtain → directly show home
      setShowHome(true);
    }
  }, []);

  if (showHome) return <HomeMain />;

  if (!showCurtain) return null; // Don't render curtain again

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