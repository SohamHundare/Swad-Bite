import React, { useState } from 'react';
import ScrollImages from './ScrollImages';
import './AuthModal.css';

const offers = [
  {
    title: "25% Off",
    meals: [
      {
        image: "link_to_image_1",
        name: "Thalipeeth",
        mess: "Annapurna Tiffin",
        info: "Healthy multigrain thalipeeth with chutney",
        rating: "⭐⭐⭐ 3.8"
      },
      {
        image: "link_to_image_2",
        name: "Pav Bhaji",
        mess: "Spice Tiffin",
        info: "Delicious pav bhaji combo",
        rating: "⭐⭐⭐⭐ 4.2"
      },
      {
        image: "link_to_image_3",
        name: "Misal Pav",
        mess: "Maharashtra Tiffin",
        info: "Spicy misal pav with farsan",
        rating: "⭐⭐⭐⭐ 4.5"
      }
    ]
  },
  {
    title: "Combo Meal @ 99",
    meals: [
      {
        image: "link_to_image_4",
        name: "Burger",
        mess: "Combo Tiffin",
        info: "Veg/Non-Veg burger with fries",
        rating: "⭐⭐⭐⭐ 4.0"
      },
      {
        image: "link_to_image_5",
        name: "Pizza Slice",
        mess: "Combo Tiffin",
        info: "Cheesy veg pizza slice",
        rating: "⭐⭐⭐⭐ 4.1"
      },
      {
        image: "link_to_image_6",
        name: "Cold Drink",
        mess: "Combo Tiffin",
        info: "Refreshing soft drink",
        rating: "⭐⭐⭐⭐ 4.2"
      }
    ]
  },
  {
    title: "Special Thali",
    meals: [
      {
        image: "link_to_image_7",
        name: "Special Thali",
        mess: "Royal Tiffin",
        info: "Full thali with dessert",
        rating: "⭐⭐⭐⭐⭐ 5.0"
      },
      {
        image: "link_to_image_8",
        name: "Unlimited Rice",
        mess: "Royal Tiffin",
        info: "Eat as much rice as you like",
        rating: "⭐⭐⭐⭐ 4.8"
      },
      {
        image: "link_to_image_9",
        name: "Drinks",
        mess: "Royal Tiffin",
        info: "Soft drinks included",
        rating: "⭐⭐⭐⭐ 4.5"
      }
    ]
  }
];

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

        <div className="meal-info">
          <h2 className="meal-heading">Offer Meals: {offer.title}</h2>
          <div className="meal-list">
            {offer.meals.map(meal => (
              <div className="meal-card" key={meal.name}>
                <img src={meal.image} alt={meal.name} />
                <div className="meal-details">
                  <h3>{meal.name}</h3>
                  <p><b>Mess:</b> {meal.mess}</p>
                  <p>{meal.info}</p>
                  <p>{meal.rating}</p>
                  <div className="cart-controls">
                    <button onClick={() => handleRemove(meal.name)}>-</button>
                    <span>{cart[meal.name] || 0}</span>
                    <button onClick={() => handleAdd(meal.name)}>+</button>
                  </div>
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
