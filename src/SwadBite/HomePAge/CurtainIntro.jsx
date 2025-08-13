import React, { useEffect, useState } from "react";
import "./CurtainIntro.css";
import logo from "../Images/Logo.png";
import HomeMain from "./HomeMain";

export default function CurtainIntro() {
  const [showHome, setShowHome] = useState(false);
  const [showCurtain, setShowCurtain] = useState(false);

  useEffect(() => {
    // Check if user has already seen the curtain
    const hasSeenCurtain = localStorage.getItem("hasSeenCurtain");

    if (!hasSeenCurtain) {
      // First time → show curtain
      setShowCurtain(true);

      const timer = setTimeout(() => {
        // After animation, show home and mark curtain as seen
        setShowCurtain(false);
        setShowHome(true);
        localStorage.setItem("hasSeenCurtain", "true");
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      // Already seen → directly show home
      setShowHome(true);
    }
  }, []);

  // Render HomeMain after curtain
  if (showHome) return <HomeMain />;

  // Render curtain only if it needs to show
  if (!showCurtain) return null;

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
