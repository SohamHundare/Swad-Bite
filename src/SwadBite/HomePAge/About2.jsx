import React from 'react';
import './About2.css';
import deliveryGuy from '../Images/delivery-guy.jpg'; // Adjust the path as necessary

export default function About2() {
  return (
    <div className="about-container">
      <div className="about-left">
        <img src={deliveryGuy} alt="Delivery Guy" className="delivery-image" />
      </div>
      <div className="about-right">
        <h3 className="about-title">About</h3>
        <h2 className="about-name">SwadBite</h2>
        <p className="about-description">
          SwadBite is your ultimate digital companion for discovering the best mess and tiffin services in Pune! Whether you're a student, working professional, or just someone craving home-style food, SwadBite helps you find nearby, affordable, and delicious options tailored to your taste.With vibrant visuals, user ratings, detailed food descriptions, and location-based filtering, SwadBite makes it easy to explore a variety of meals—from spicy Maharashtrian bhaji-rice to creamy paneer masala and refreshing summer drinks.
        </p>
        <p className="about-description">
         <li>Interactive food carousel showcasing daily dishes 🍛</li>
         <li>City-based dropdown filter (e.g., Pune, Satara, Mumbai) for targeted search 🗺</li>
          <li>Creative mess cards with ratings, locations, and images 🌟</li>
           <li>Animated special offers and login/signup for exclusive deals 💥</li>
            <li>Multilingual support including Hindi for local connect 🇮🇳</li>
            <li>bout Us video with voiceover to explain our mission 🎬</li>
            <br />
           <li>Let SwadBite help you find not just food, but "Swad that feels like home!"</li> 
        </p>
          
      </div>
    </div>
  );
}