import React, { useEffect } from 'react';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import bgImage from '../Images/MessImage.png';
import logo from '../Images/Logo.png';
import Footer from './Footer';

function PaymentSuccess() {
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('swadbite_order'));

    if (orderData) {
      fetch("http://localhost:5000/api/orders/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      })
        .then(res => res.json())
        .then(data => {
          console.log("✅ Order saved to database:", data);
          localStorage.removeItem("swadbite_order"); // clear after saving
        })
        .catch(err => {
          console.error("❌ Error saving order:", err);
        });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      <div
        className="absolute top-0 left-0 w-full h-80 bg-cover bg-center blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="bg-white shadow-2xl rounded-xl p-10 transition-transform duration-300 hover:scale-[1.01]">
          <CheckBadgeIcon className="h-20 w-20 text-green-500 mx-auto mb-4 transition-transform duration-300 hover:scale-110 animate-pulse" />

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 hover:text-indigo-700 transition-colors duration-300">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base hover:text-gray-700 transition-colors duration-300">
            Thank you for your order. Your transaction has been completed successfully. A confirmation email and receipt have been sent to your registered email.
          </p>

          <div className="mt-6 animate-float">
            <img
              src={logo}
              alt="Swad-Bite Logo"
              className="w-32 mx-auto transition-transform duration-300 hover:scale-105"
            />
            <p className="text-sm text-gray-500 mt-2 italic hover:text-indigo-600 transition-colors duration-300">
              Swaad-Bite – Tasty Bites. Timely Delivered.
            </p>
          </div>

          <button
            className="mt-8 bg-amber-500 hover:bg-amber-600 text-white py-2.5 px-6 rounded-md text-base transition transform hover:scale-105 duration-300 shadow-md"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
        </div>

        <footer className="mt-10 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-300">
          © 2025 Swad-Bite. All rights reserved.
        </footer>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentSuccess;

