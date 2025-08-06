import React, { useState, useRef } from 'react';
import heroImage from '../Images/foodImg.png';
import aboutVideo from '../Images/Video.mp4';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

const [showVideo, setShowVideo] = useState(false);
const [showThanks, setShowThanks] = useState(false);

const videoRef = useRef(null);
const navigate = useNavigate();

const handlePlayVideo = () => {

setShowVideo(true);
setShowThanks(false); // reset thanks message

setTimeout(() => {

  if (videoRef.current) videoRef.current.play();

}, 100);

};

const handleCloseModal = () => {

if (videoRef.current) {

  videoRef.current.pause();
  videoRef.current.currentTime = 0;
}

setShowVideo(false);
setShowThanks(true); // show thank you message

};

return (

<section
  id="home"
  className={`mt-10 pt-20 pb-28 bg-gradient-to-r from-amber-50 to-amber-100  relative transition-all duration-300 ${
    showVideo ? 'backdrop-blur-sm' : ''
  }`}
>
  <div
    className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all ${
      showVideo ? 'pointer-events-none blur-sm' : ''
    }`}

  >

    <div className="flex flex-col md:flex-row items-center">

      <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in">

        <div className="text-left px-3 md:px-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Hungry? <span className="text-amber-600">We've Got You Covered!</span>
              </h1>

               <p className="text-lg text-gray-600 mb-6">
                Affordable, delicious meals for students on campus. No more worrying about cooking – enjoy nutritious food prepared fresh daily.
              </p>
    </div>


        <div className="flex flex-wrap gap-4">

          <button

            onClick={handlePlayVideo}

            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"

          >

            About SwaadBite

          </button>

        </div>

      </div>

      <div className="md:w-1/2 flex justify-center">

        <img

          src={heroImage}

          alt="Delicious food"

          className="rounded-xl shadow-xl w-full max-w-md animate-float"

        />

      </div>

    </div>



    {/* Search Bar */}

    <form className="mt-10 absolute left-1/2 -translate-x-1/2 bottom-5 my-0 w-full max-w-6xl bg-white rounded-xl shadow-lg px-6 py-3 flex flex-wrap md:flex-nowrap gap-4 items-center">

      <select

        className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"

        defaultValue=""

      >

        <option value="" disabled>

          State

        </option>

        <option value="maharashtra">Maharashtra</option>

        <option value="gujarat">Gujarat</option>

        <option value="karnataka">Karnataka</option>

        <option value="delhi">Delhi</option>

        <option value="tamilnadu">Tamil Nadu</option>

        <option value="other">Other</option>

      </select>



      <select

        className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"

        defaultValue=""

      >

        <option value="" disabled>

          City

        </option>

        <option value="mumbai">Mumbai</option>

        <option value="pune">Pune</option>

        <option value="ahmedabad">Ahmedabad</option>

        <option value="bengaluru">Bengaluru</option>

        <option value="delhi">Delhi</option>

        <option value="chennai">Chennai</option>

        <option value="other">Other</option>

      </select>

      <input

        type="text"

        placeholder="Locality"

        className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"

      />

      <select

        className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"

        defaultValue=""

      >

        <option value="" disabled>

          Gender

        </option>

        <option value="male">Male</option>

        <option value="female">Female</option>

        <option value="other">Other</option>

      </select>

      <select

        className="flex-1 min-w-[120px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"

        defaultValue=""

      >

        <option value="" disabled>

          Category

        </option>

        <option value="veg">Veg</option>

        <option value="nonveg">Non-Veg</option>

        <option value="jain">Jain</option>

        <option value="other">Other</option>

      </select>

      <button

        type="submit"

        className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2 rounded-md transition duration-200 w-35" onClick={()=>{navigate("/payment")}}

      >

        Search

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

          onCanPlay={() => videoRef.current?.play()}

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