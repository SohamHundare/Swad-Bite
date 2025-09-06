import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import MapSection from './MapSection';
import Testimonials from './Testimonals';

import About2 from './About2';
import HowItWorks from './HowItWorks';
import Chatbot from './Chatbot';
import HandelComForm from './HandelComForm';


function HomeMain() {
  return (
    <div className="font-sans bg-gray-50">
      <Navbar />
      <Hero />
      <About />
      <MapSection/>
      <HowItWorks/>
      <About2/>
      <Testimonials/>
      <HandelComForm/>
      <Chatbot />
    </div>
  );
}

export default HomeMain;