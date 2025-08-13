import React, { useState, useRef } from 'react';
import heroImage from '../Images/foodImg.png';
import aboutVideo from '../Images/Video.mp4';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    locality: "",
    gender: "",
    category: "",
  });

  const [showVideo, setShowVideo] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Video controls
  const handlePlayVideo = () => {
    setShowVideo(true);
    setShowThanks(false);
    setTimeout(() => videoRef.current?.play(), 100);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideo(false);
    setShowThanks(true);
  };

  // Form field handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "locality" ? value.toLowerCase() : value,
    }));
  };

const handleSearch = (e) => {
  e.preventDefault();
  localStorage.setItem("selectedCity", formData.city.trim().toLowerCase());
  localStorage.setItem("selectedLocality", formData.locality.trim().toLowerCase());
  navigate("/explore");
};

  return (
    <section
      id="home"
      className={`mt-10 pt-20 pb-28 bg-gradient-to-r from-amber-50 to-amber-100 relative transition-all duration-300 ${
        showVideo ? 'backdrop-blur-sm' : ''
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all ${
          showVideo ? 'pointer-events-none blur-sm' : ''
        }`}
      >
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hungry? <span className="text-amber-600">We've Got You Covered!</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Affordable, delicious meals for students on campus. No more worrying about cooking – enjoy nutritious food prepared fresh daily.
            </p>
            <button
              onClick={handlePlayVideo}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              About SwaadBite
            </button>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={heroImage}
              alt="Delicious food"
              className="rounded-xl shadow-xl w-full max-w-md"
            />
          </div>
        </div>

        {/* Search Form */}
       <form
  className="mt-10 bg-white rounded-xl shadow-lg px-6 py-3 flex flex-wrap md:flex-nowrap gap-4 items-center"
  onSubmit={handleSearch}
>
  <select
    className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-1.5 text-sm appearance-none bg-gray-100 cursor-not-allowed"
    name="state"
    value="maharashtra"
    disabled
  >
    <option value="maharashtra">Maharashtra</option>
  </select>
      {/* City */}
          <select
            className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-1.5 text-sm"
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">City</option>
            <option value="mumbai">Satara</option>
            <option value="pune">Pune</option>
            <option value="ahmedabad">Ahmedabad</option>
            <option value="bengaluru">Bengaluru</option>
            <option value="delhi">Delhi</option>
            <option value="chennai">Chennai</option>
            <option value="other">Other</option>
          </select>

          {/* Locality */}
          <input
            type="text"
            name="locality"
            placeholder="Locality"
            className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={formData.locality}
            onChange={handleChange}
          />

          {/* Gender */}
          <select
            className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-2 text-sm"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Category */}
          <select
            className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-2 text-sm"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Category</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
            <option value="jain">Jain</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2 rounded-md"
          >
            search
          </button>
        </form>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-red-600"
            >
              &times;
            </button>
            <video
              ref={videoRef}
              controls
              className="w-full rounded-md"
              onEnded={handleCloseModal}
            >
              <source src={aboutVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="mt-4 text-center text-gray-600">
              Discover how we deliver joy through every tiffin!
            </p>
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {showThanks && (
        <div className="text-center mt-10 text-lg font-semibold text-green-600">
          🎉 Thanks for watching!
        </div>
      )}
    </section>
  );
};

export default Hero;
