import React from 'react';
import { 
  FaceSmileIcon, // Instagram alternative
  GlobeAltIcon,  // Facebook alternative
  HashtagIcon    // Twitter/X alternative
} from '@heroicons/react/24/outline';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h3 className="text-xl font-bold">Student Mess</h3>
            <p className="text-sm text-gray-400">Delicious meals, seamless payments</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
              <GlobeAltIcon className="w-5 h-5" />
              <span>SwadBite</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
              <HashtagIcon className="w-5 h-5" />
              <span>SwadBite.x</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
              <FaceSmileIcon className="w-5 h-5" />
              <span>Swad_Bite_</span>
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© 2023 Student Mess. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;