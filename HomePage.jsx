import React, { useState } from 'react';
import SignUpModal from './SignUpModal'; // adjust path if needed

function HomePage() {
  const [showSignUp, setShowSignUp] = useState(false);

  const styles = {
    page: {
      position: 'relative',
      minHeight: '100vh',
      background: 'url("/your-home-bg.jpg") no-repeat center center/cover',
      padding: '20px',
      transition: 'filter 0.3s ease',
      filter: showSignUp ? 'blur(5px)' : 'none',
    },
    button: {
      padding: '12px 24px',
      backgroundColor: '#F97316',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '18px',
      marginRight: '10px',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backdropFilter: 'blur(6px)',
      zIndex: 999,
    }
  };

  return (
    <>
      <div style={styles.page}>
        <h1 style={{ color: 'white' }}>🏠 Welcome to SwadBite Home Page</h1>

        {/* 👇 Use these buttons to trigger floating modals */}
        <button style={styles.button} onClick={() => setShowSignUp(true)}>
          Sign Up
        </button>

        {/* 🔜 Add a login button here later and connect LoginModal the same way */}

        {/* 🔧 You can add your actual home content here later */}
      </div>

      {/* ✨ Sign Up Modal Floating on Top */}
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}

      {/* 💡 Same thing will be done for LoginModal once you give it */}
    </>
  );
}

export default HomePage;
