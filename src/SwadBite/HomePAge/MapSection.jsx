import React from 'react';

const MapSection = () => {
  return (
    <section id="map" className="py-16 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Nearby Mess Providers</h2>
        <p className="text-gray-600 mb-8">
          Discover verified mess facilities around your campus.
        </p>
        <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
          <iframe
            title="Nearby Mess Providers"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12038.693876755389!2d73.830545!3d18.5247619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf6ff2127ad7%3A0x9f645e8b4bcbf4f6!2sMIT%20World%20Peace%20University!5e0!3m2!1sen!2sin!4v1628744230594!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
