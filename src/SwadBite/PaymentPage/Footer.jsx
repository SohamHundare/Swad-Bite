import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">

      {/* Top Curved Section with Quotes (longer) */}
      <div className="bg-gray-800 text-center py-14 relative" >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-around items-center gap-4">
          <div>
            <p className="font-bold text-sm">SwadBite</p>
            <p className="text-xxs text-gray-300 ">"Delicious meals at your fingertips"</p>
          </div>
          <div>
            <p className="font-bold text-sm">Customer Favorites</p>
            <p className="text-xxs text-gray-300">"Trusted by food lovers across Pune"</p>
          </div>
          <div>
            <p className="font-bold text-sm">Fast Delivery</p>
            <p className="text-xxs text-gray-300 ">"Hot and fresh meals delivered on time"</p>
          </div>
          <div>
            <p className="font-bold text-sm">Quality Guarantee</p>
            <p className="text-xxs text-gray-300 ">"Hygienic, safe, and tasty food every time"</p>
          </div>
        </div>
      </div>

      {/* Bottom Curved Section with Info (shorter) */}
      <div className="bg-gray-800 text-gray-100 pt-8 pb-4 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">

          {/* SwadBite Info */}
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold mb-1">SwadBite Info</h4>
            <p>Opening Hours: 24 Hours</p>
            <p>Address: Pune, Maharashtra</p>
            <p>Made in India 🇮🇳</p>
          </div>

          {/* Accepted Payments */}
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold mb-1">Accepted Payments</h4>
            <div className="flex gap-3 mt-1">
              <FaCcVisa size={20} />
              <FaCcMastercard size={20} />
              <FaCcPaypal size={20} />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-1">Follow Us</h4>
            <div className="flex gap-3 mt-1">
              <a href="#" className="hover:text-gray-900"><FaInstagram size={18} /></a>
              <a href="#" className="hover:text-gray-900"><FaFacebookF size={18} /></a>
              <a href="#" className="hover:text-gray-900"><FaTwitter size={18} /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-1">Services</h4>
            <p>Delivery</p>
            <p>Meal Plans</p>
            <p>Special Offers</p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-1">About</h4>
            <p>FAQ</p>
            <p>Reviews</p>
            <p>Press</p>
          </div>

        </div>

        <div className="mt-6 text-center text-gray-200 text-xs">
          © 2025 SwadBite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
