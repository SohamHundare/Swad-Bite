import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpModal({ onClose }) {
  const [role, setRole] = useState('student'); // UI role: 'student' or 'owner'
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    messName: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'password') validatePassword(value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) {
      setPasswordError('');
    } else if (
      password.length < minLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setPasswordError(
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSignUp = async () => {
    if (passwordError) {
      alert('Please fix the password requirements ❌');
      return;
    }

    // Validation before sending
    if (role === 'student') {
      if (!(formData.name && formData.password && formData.email)) {
        alert('Please fill all student fields including email ❌');
        return;
      }
    } else {
      if (!(formData.name && formData.messName && formData.password && formData.email)) {
        alert('Please fill all owner fields including email ❌');
        return;
      }
    }

    try {
      // Map UI role to backend role
      const backendRole = role === 'owner' ? 'owner' : 'student';

      // Prepare JSON payload
      const payload = {
        name: formData.name,
        password: formData.password,
        email: formData.email, // include email for both roles
        role: backendRole
      };

      if (backendRole === 'owner') payload.messName = formData.messName;

      const res = await axios.post('http://localhost:5000/api/users/signup', payload);

      alert(res.data.message || 'Sign Up Successful ✅');

      // Navigate after success
      if (backendRole === 'student') navigate('/home');
      else navigate('/WeeklyMenu1');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Sign Up Failed ❌');
    }
  };

  // ----------- STYLES REMAIN UNCHANGED ----------
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
      color: 'red',
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
    errorText: {
      color: 'red',
      fontSize: '12px',
      marginBottom: '8px',
      textAlign: 'left'
    },
    signUpBtn: {
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
  // ------------------------------------------------

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button onClick={() => navigate('/home')} style={styles.closeButton}>
          ×
        </button>

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
            {passwordError && <div style={styles.errorText}>{passwordError}</div>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              type="email"          // Added email input for owner
              name="email"
              placeholder="Email"
              value={formData.email}
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
            {passwordError && <div style={styles.errorText}>{passwordError}</div>}
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

export default SignUpModal;
