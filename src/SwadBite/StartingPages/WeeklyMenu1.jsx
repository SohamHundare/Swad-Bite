import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/Logo.png';

// Adjust the path as necessary

function WelcomePage() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const styles = {
    keyframes: `
      @keyframes zoomFade {
        0% { transform: scale(0.5); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes glowPulse {
        0% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0px #ffa726; }
        50% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 15px #ffa726; }
        100% { box-shadow: 0 4px 12px rgba(0,0,0,0.15), 0 0 0px #ffa726; }
      }
    `,
    wrapper: {
      position: 'relative',
      backgroundColor: '#FFEDD5',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      overflow: 'hidden',
    },
    background: {
      backgroundImage:
        'url(https://content.jdmagicbox.com/comp/def_content/indian-restaurants/indian-restaurants1-indian-restaurants-1-1yjyf.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      filter: 'blur(1.2px)',
      zIndex: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 237, 213, 0.4)',
      zIndex: 1,
    },
    card: {
      position: 'relative',
      zIndex: 2,
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      border: '1px solid rgba(255,255,255,0.3)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '420px',
      textAlign: 'center',
      transform: animate ? 'translateY(0)' : 'translateY(50px)',
      opacity: animate ? 1 : 0,
      transition: 'all 0.6s ease',
    },
    logo: {
      width: '90px',
      height: '90px',
      margin: '0 auto 5px',
      borderRadius: '50%',
      objectFit: 'cover',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15), 0 0 10px #ffa726',
      animation: animate
        ? 'zoomFade 0.8s ease-out, glowPulse 2s infinite ease-in-out'
        : 'none',
    },
    tagline: {
      fontSize: '12px',
      marginTop: '-5px',
      marginBottom: '12px',
      color: '#444',
    },
    heading: {
      fontSize: '28px',
      marginBottom: '10px',
      color: '#ff5722',
      fontWeight: 'bold',
      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    },
    quote: {
      fontSize: '15px',
      fontStyle: 'italic',
      color: '#7c3aed',
      marginBottom: '20px',
    },
    button: {
      padding: '12px 22px',
      minWidth: '110px',
      borderRadius: '10px',
      backgroundColor: '#f97316',
      color: 'white',
      border: 'none',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      margin: '8px',
      transition: 'all 0.3s ease',
      transform: 'scale(1)',
    },
    buttonHover: {
      backgroundColor: '#ea580c',
    },
    footer: {
      fontSize: '11px',
      color: '#666',
      marginTop: '25px',
    },
  };

  return (
    <>
      
      <style>{styles.keyframes}</style>

      <div style={styles.wrapper}>
        <div style={styles.background}></div>
        <div style={styles.overlay}></div>

        <div style={styles.card}>
          <img src={logo} alt="SwadBite Logo" style={styles.logo} />

          <p style={styles.tagline}>Your daily taste of homemade happiness 🍛</p>

          <h1 style={styles.heading}>Welcome to SwadBite 🍽️</h1>
          <p style={styles.quote}>
            “Good food is the foundation of genuine happiness.” 😋
          </p>

          <div>
            <button
              style={styles.button}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.button.backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>

            <button
              style={styles.button}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = styles.button.backgroundColor;
                e.target.style.transform = 'scale(1)';
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>

          <p style={styles.footer}>© 2025 SwadBite. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;