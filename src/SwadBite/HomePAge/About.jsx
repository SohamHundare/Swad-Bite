// src/components/About.js
import React from 'react';
import { FaSeedling, FaWallet, FaClock } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Swad-Bite?</h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Fresh Ingredients */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 animate-fade-in">
            <div className="text-amber-500 text-4xl mb-4">
              <FaSeedling />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Fresh Ingredients</h3>
            <p className="text-gray-600">
              We source fresh, local ingredients daily to ensure you get the most nutritious and delicious meals possible.
            </p>
          </div>

          {/* Budget-Friendly */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 animate-fade-in delay-200">
            <div className="text-amber-500 text-4xl mb-4">
              <FaWallet />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Budget-Friendly</h3>
            <p className="text-gray-600">
              Designed for student budgets with flexible plans starting at just $3 per meal.
            </p>
          </div>

          {/* Convenient Timing */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 animate-fade-in delay-400">
            <div className="text-amber-500 text-4xl mb-4">
              <FaClock />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Convenient Timing</h3>
            <p className="text-gray-600">
              Open from 7 AM to 10 PM to accommodate all schedules – early birds and night owls alike are welcome!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
