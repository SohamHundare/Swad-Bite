import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FoodCarousel from "../ExplorePage/FoodCaiousel";
import "../ExplorePage/Explore.css";
import Offers from "../ExplorePage/Offers";
import Navbar from "../HomePAge/Navbar";
import { useNavigate } from "react-router-dom";
import NotFoundMsg from "./NotFoundMsg";

const Explore = () => {
  const [messes, setMesses] = useState([]);
  const [loading, setLoading] = useState(true); //  NEW
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Fetch messes from backend
    fetch("https://swadbite-backend-2.onrender.com/api/messes")
      .then((res) => res.json())
      .then((data) => {
        setMesses(data);
        setLoading(false); //  stop loading after fetch
      })
      .catch((err) => {
        console.error("Error fetching messes:", err);
        setLoading(false);
      });
  }, []);

  // Get selected city and locality from localStorage
  const selectedCity = localStorage.getItem("selectedCity")?.trim().toLowerCase();
  const selectedLocality = localStorage.getItem("selectedLocality")?.trim().toLowerCase();

  // Filter messes safely
  const filteredMesses = messes.filter((mess) => {
    const location = mess.location ? mess.location.toLowerCase() : "";

    if (selectedCity && selectedLocality) {
      return location.includes(selectedCity) && location.includes(selectedLocality);
    }
    if (selectedCity) {
      return location.includes(selectedCity);
    }
    if (selectedLocality) {
      return location.includes(selectedLocality);
    }
    return true;
  });

  return (
    <>
      <Navbar />
      <FoodCarousel />

      <div className="explore-tagline" data-aos="fade-up">
        📍 Discover the Best Messes Around Pune
      </div>

      {/* ✅ show loader while fetching */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <p>Loading Messes...</p>
        </div>
      ) : filteredMesses.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <NotFoundMsg />
        </div>
      ) : (
        <div className="explore-container">
          {filteredMesses.map((mess, index) => {
            const column = index % 3;
            const animation =
              column === 0 ? "fade-right" : column === 1 ? "fade-up" : "fade-left";

            return (
              <div
                key={mess._id || index}
                className="explore-card"
                onClick={() => navigate("/WeeklyMenu")}
                data-aos={animation}
              >
                <img
                  src={mess.image || "https://via.placeholder.com/300"}
                  alt={mess.name || "Mess"}
                />
                <div className="explore-mess-name">
                  {mess.name || "Unnamed Mess"}
                </div>
                <div className="explore-mess-location">
                  {mess.location || "Location not available"}
                </div>
                <div className="rating">{mess.rating || "N/A"}</div>
                <a
                  className="explore-map-link"
                  href={mess.map || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 View on Map
                </a>
              </div>
            );
          })}
        </div>
      )}

      <Offers />
    </>
  );
};

export default Explore;
