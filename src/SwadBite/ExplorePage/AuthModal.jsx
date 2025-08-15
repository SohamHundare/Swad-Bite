import React, { useState } from 'react';
import ScrollImages from './ScrollImages';
import './AuthModal.css';

const AuthModal = ({ offer, onClose }) => {
  const [cart, setCart] = useState({});

  const handleAdd = (name) => {
    setCart(prev => ({
      ...prev,
      [name]: (prev[name] || 0) + 1
    }));
  };

  const handleRemove = (name) => {
    setCart(prev => ({
      ...prev,
      [name]: Math.max((prev[name] || 0) - 1, 0)
    }));
  };

  return (
    <div className="auth-modal-overlay">
      <ScrollImages />
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>✖</button>
        
        <h1 className="swadbite-logo">SwadBite!!</h1>

        <div className="offer-banner">{offer.title}</div>

        <div className="meal1-info">
          <div className="meal1-list">
            {offer.meals.map(meal1 => (
              <div className="meal1-card" key={meal1.name}>
                {/* ✅ Meal Image First */}
                <img src={meal1.image} alt={meal1.name} />

                {/* ✅ Meal Name Below Image */}
                <div className="meal1-details">
                  <h3>{meal1.name}</h3>
                </div>

                {/* ✅ Description */}
                <div className="meal1-details">
                  <p><b>Mess:</b> {meal1.mess}</p>
                  <p>{meal1.info}</p>
                  <p>{meal1.rating}</p>
                </div>

                {/* ✅ Cart Controls */}
                <div className="cart-controls">
                  <button onClick={() => handleRemove(meal1.name)}>-</button>
                  <span>{cart[meal1.name] || 0}</span>
                  <button onClick={() => handleAdd(meal1.name)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
