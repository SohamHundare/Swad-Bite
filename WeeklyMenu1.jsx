import React, { useState } from 'react';

const WeeklyMenuModal = ({ onClose }) => {
  const [menu, setMenu] = useState({
    Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
    Friday: '', Saturday: '', Sunday: ''
  });

  const [message, setMessage] = useState('');

  const handleMenuChange = (day, value) => {
    setMenu({ ...menu, [day]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/mess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menu }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setMessage('✅ Menu submitted!');
      setMenu({
        Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
        Friday: '', Saturday: '', Sunday: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('❌ Submission failed!');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backdropFilter: 'blur(8px)',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    card: {
      position: 'relative',
      backgroundColor: 'white',
      backdropFilter: 'blur(15px)',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 4px 25px rgba(0,0,0,0.3)',
      width: '100%',
      maxWidth: '380px',
      height: '70vh', // compact height
      overflowY: 'auto',
      textAlign: 'center',
      zIndex: 1000,
      color: '#fff',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#fff',
      cursor: 'pointer',
    },
    heading: {
      fontSize: '22px',
      marginBottom: '18px',
      color: '#FACC15',
    },
    inputGroup: {
      marginBottom: '12px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '4px',
      fontWeight: 'bold',
      color: '#fff',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '8px',
      border: '1px solid #FCD3A7',
      backgroundColor: '#fff',
      fontSize: '14px',
      color: '#000',
    },
    submitBtn: {
      padding: '12px',
      width: '100%',
      borderRadius: '8px',
      backgroundColor: '#F97316',
      color: 'white',
      border: 'none',
      fontSize: '15px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    message: {
      marginTop: '10px',
      color: '#fff',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        <h2 style={styles.heading}>Weekly Menu Entry</h2>

        <form onSubmit={handleSubmit}>
          {Object.keys(menu).map((day) => (
            <div key={day} style={styles.inputGroup}>
              <label style={styles.label}>{day}:</label>
              <input
                type="text"
                value={menu[day]}
                onChange={(e) => handleMenuChange(day, e.target.value)}
                placeholder={`Enter menu for ${day}`}
                style={styles.input}
                required
              />
            </div>
          ))}

          <button type="submit" style={styles.submitBtn}>Submit Menu</button>
          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default WeeklyMenuModal;
