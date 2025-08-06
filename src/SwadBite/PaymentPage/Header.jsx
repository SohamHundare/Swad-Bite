import React from 'react';
import messImg from '../Images/MessImage.png';
function Header() {
  return (
    <header className="relative pt-16">
      <img src={messImg} alt="Mess" className="w-full h-64 object-cover" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-40" style={{ opacity: 0.4 }}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h1 className="text-4xl font-bold mb-2 animate-fade-in">Swad-Bite Payment Portal</h1>
          <p className="text-xl animate-fade-in">Secure and convenient fee payment for students</p>
        </div>
      </div>
      {/* Marquee for security guidelines */}
      <div className="absolute bottom-0 w-full">
        <marquee className="text-white bg-opacity-py-2 text-xl font-bold rounded-b-xl animate-pulse">
          Never share your card details, OTP, or UPI PIN with anyone. Ensure you are on the official payment page before entering sensitive information. For help, contact support.
        </marquee>
      </div>
    </header>
  );
}

export default Header;