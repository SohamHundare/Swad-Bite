import React from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <div className="how-it-works bg-amber-500">
      <h3 className="how-title">How it Works !!</h3>
      <h2 className="how-subtitle">What We Serve</h2>
      <p className="how-description">
        Product quality is our priority, and always guarantee Halal and safety unit is in your hands.
      </p>

      <div className="how-cards">
        <div className="how-card">
          <img src="https://media.istockphoto.com/id/1283529831/vector/application-smartphone-in-hand-ordering-food-products-location-vector-food-and-fastfood.jpg?s=612x612&w=0&k=20&c=wBeqQqWalWzbFcDkUEzqcp7WeTxpgBmT0AqUKEmmfJo=" alt="Order" />
          <h4>Easy To Order</h4>
          <p>You only need a few steps in ordering food.</p>
        </div>

        <div className="how-card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyIe5lrBxsjWrZRJD01hwr-vDjdF4mLrx-w&s" alt="Delivery" />
          <h4>Fastest Delivery</h4>
          <p>Delivery that is always on time even faster.</p>
        </div>

        <div className="how-card">
          <img src="https://cdn-icons-png.flaticon.com/512/8866/8866473.png" alt="Quality" />
          <h4>Best Quality</h4>
          <p>Not only fast for us, quality is also number one.</p>
        </div>
      </div>
    </div>
  );
}