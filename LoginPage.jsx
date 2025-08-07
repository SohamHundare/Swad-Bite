import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginModal({ onClose }) {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = () => {
    if (formData.username && formData.password) {
      alert(`Logged in as ${role.toUpperCase()} ✅\nWelcome, ${formData.username}`);
      
      if (role === 'owner') {
        navigate('/weekly-menu'); // mess owner page ✅
      } else {
        navigate('/student-home'); // optional, or just close modal
      }
    } else {
      alert('Please fill in both fields ❌');
    }
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
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 4px 25px rgba(0,0,0,0.3)',
      width: '100%',
      maxWidth: '360px',
      textAlign: 'center',
      zIndex: 1000,
      color: '#fff',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      color: '#fff',
      cursor: 'pointer'
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#FACC15',
    },
    roleButtons: {
      display: 'flex',
      marginBottom: '20px',
    },
    roleButton: (active) => ({
      flex: 1,
      padding: '10px',
      margin: '0 5px',
      backgroundColor: active ? '#FBBF24' : '#FED7AA',
      color: active ? '#000' : '#222',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: active ? '600' : '400',
      transition: 'background-color 0.2s',
    }),
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '12px',
      borderRadius: '8px',
      border: '1px solid #FCD3A7',
      backgroundColor: '#fff',
      fontSize: '15px',
      color: '#000',
    },
    loginBtn: {
      padding: '12px',
      width: '100%',
      borderRadius: '8px',
      backgroundColor: '#F97316',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    roleDisplay: {
      marginTop: '15px',
      fontSize: '14px',
      color: '#fff',
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={onClose} style={styles.closeButton}>×</button>

        <h2 style={styles.heading}>SwadBite Login</h2>

        <div style={styles.roleButtons}>
          <button
            style={styles.roleButton(role === 'student')}
            onClick={() => setRole('student')}
          >
            Student
          </button>
          <button
            style={styles.roleButton(role === 'owner')}
            onClick={() => setRole('owner')}
          >
            Mess Owner
          </button>
        </div>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.loginBtn}>
          Login
        </button>

        <p style={styles.roleDisplay}>
          Selected Role: <strong>{role}</strong>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
