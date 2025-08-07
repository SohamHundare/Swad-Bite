import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpModal({ onClose }) {
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    photo: null,
    messName: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignUp = () => {
    if (role === 'student') {
      if (formData.name && formData.password && formData.email && formData.photo) {
        alert(`Signed up as STUDENT ✅\nWelcome, ${formData.name}`);
        navigate('/student-home');
      } else {
        alert('Please fill all student fields ❌');
      }
    } else {
      if (formData.name && formData.messName && formData.password) {
        alert(`Signed up as MESS OWNER ✅\nWelcome, ${formData.name}`);
        navigate('/mess-owner-home');
      } else {
        alert('Please fill all owner fields ❌');
      }
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
    signUpBtn: {
      padding: '12px',
      width: '100%',
      borderRadius: '8px',
      backgroundColor: '#F97316', // your original button color
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

        <h2 style={styles.heading}>SwadBite Sign Up</h2>

        <div style={styles.roleButtons}>
          <button
            style={styles.roleButton(role === 'student')}
            onClick={() => setRole('student')}
          >
            Student / Customer
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
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        {role === 'student' && (
          <>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        {role === 'owner' && (
          <>
            <input
              type="text"
              name="messName"
              placeholder="Mess Name"
              value={formData.messName}
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
          </>
        )}

        <button onClick={handleSignUp} style={styles.signUpBtn}>
          Sign Up
        </button>

        <p style={styles.roleDisplay}>
          Selected Role: <strong>{role}</strong>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
