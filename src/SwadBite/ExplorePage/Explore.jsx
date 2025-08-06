import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FoodCarousel from "../ExplorePage/FoodCaiousel";
import "../ExplorePage/Explore.css";
import Offers from "../ExplorePage/Offers";
import Navbar from "../HomePAge/Navbar";
import { useNavigate } from "react-router-dom";

const messes = [
  {
    name: "Sai Krupa Mess",
    location: "Swargate, Pune",
    rating: "⭐⭐⭐⭐⭐ 4.8",
    image: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/08/07/Pictures/_ec38addc-b906-11e9-a203-e6c4ad816de5.jpg",
    map: "https://maps.google.com/?q=Sai+Krupa+Mess+Pune",
  },
  {
    name: "Annapurna Mess",
    location: "Kothrud, Pune",
    rating: "⭐⭐⭐⭐ 4.5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-fGrvCyEI6Adh2W0l3hYpEFa2THGsxh0IcriWFAEB-gugGwkkiG4QeYDs8CNSa_aDcCI&usqp=CAU",
    map: "https://maps.google.com/?q=Annapurna+Mess+Kothrud",
  },
  {
    name: "Ghar Ka Khana",
    location: "Shivaji Nagar, Pune",
    rating: "⭐⭐⭐⭐⭐ 4.7",
    image: "https://resize.indiatvnews.com/en/resize/newbucket/355_-/2018/01/student-hostel-at-iit-khagarpur-1515586809.jpg",
    map: "https://maps.google.com/?q=Ghar+Ka+Khana+Shivaji+Nagar",
  },
  {
    name: "Yummy Tiffin",
    location: "Hadapsar, Pune",
    rating: "⭐⭐⭐⭐ 4.4",
    image: "https://gsayurvedamedicalcollege.com/img/gallery/gallery/BOYS-MESS-1.webp",
    map: "https://maps.google.com/?q=Yummy+Tiffin+Hadapsar",
  },
  {
    name: "Homely Food",
    location: "Baner, Pune",
    rating: "⭐⭐⭐⭐⭐ 4.9",
    image: "https://images.indianexpress.com/2025/05/Orchids-The-International-School-1.png",
    map: "https://maps.google.com/?q=Homely+Food+Baner",
  },
  {
    name: "Tasty Bites",
    location: "Aundh, Pune",
    rating: "⭐⭐⭐⭐ 4.6",
    image: "https://3.imimg.com/data3/EE/HH/MY-6533282/mess-and-hostel-500x500.png",
    map: "https://maps.google.com/?q=Tasty+Bites+Aundh",
  },
  {
    name: "Healthy Meals",
    location: "Viman Nagar, Pune",
    rating: "⭐⭐⭐⭐ 4.3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfQ-ZWuUC2wzjc3Yf5fdoTlzJWcmTL2Ng7Fl11izNMuQIMqsaly57UPwpHL1KEGT2aho&usqp=CAU",
    map: "https://maps.google.com/?q=Healthy+Meals+Viman+Nagar",
  },
  {
    name: "Daily Tiffin",
    location: "Camp, Pune",
    rating: "⭐⭐⭐⭐⭐ 4.7",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTfQ-ZWuUC2wzjc3Yf5fdoTlzJWcmTL2Ng7Fl11izNMuQIMqsaly57UPwpHL1KEGT2aho&usqp=CAU",
    map: "https://maps.google.com/?q=Daily+Tiffin+Camp",
  },
  {
    name: "Fresh Bites",
    location: "Deccan, Pune",
    rating: "⭐⭐⭐⭐ 4.5",
    image: "https://st3.depositphotos.com/1144687/15144/i/450/depositphotos_151446454-stock-photo-cafe-exterior-with-empty-poster.jpg",
    map: "https://maps.google.com/?q=Fresh+Bites+Deccan",
  },
  {
    name: "Veggie Delight",
    location: "Kharadi, Pune",
    rating: "⭐⭐⭐⭐⭐ 4.9",
    image: "https://img.restaurantguru.com/c7fa-Restaurant-JEC-Boys-Hostel-Mess-interior.jpg",
    map: "https://maps.google.com/?q=Veggie+Delight+Kharadi",
  },
  {
    name: "Mess-e-Punjab",
    location: "Pimpri, Pune",
    rating: "⭐⭐⭐⭐ 4.4",
    image: "https://i.pinimg.com/236x/20/b7/bd/20b7bdb487eb16af9d50e4a6fe54fe59.jpg",
    map: "https://maps.google.com/?q=Mess-e-Punjab+Pimpri",
  },
  {
    name: "Taste of South",
    location: "Wakad, Pune",
    rating: "⭐⭐⭐⭐⭐ 4.8",
    image: "https://img.freepik.com/premium-photo/modern-cafe-storefront-with-white-brick-greenery_412311-14047.jpg",
    map: "https://maps.google.com/?q=Taste+of+South+Wakad",
  },
];


const Explore = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <FoodCarousel />

      <div className="explore-tagline" data-aos="fade-up">
        📍 Discover the Best Messes Around Pune
      </div>

      <div className="explore-container">
        {messes.map((mess, index) => {
          const column = index % 3;
          const animation =
            column === 0 ? "fade-right" : column === 1 ? "fade-up" : "fade-left";

          return (
            <div key={index} className="explore-card" onClick={() => {navigate("/WeeklyMenu")}} data-aos={animation}>
              <img src={mess.image} alt={mess.name} />
              <div className="explore-card-content">
                <div className="explore-mess-name">{mess.name}</div>
                <div className="explore-mess-location">{mess.location}</div>
                <div className="rating">{mess.rating}</div>
                <a
                  className="explore-map-link"
                  href={mess.map}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📍 View on Map
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <Offers />
    </>
  );
};

export default Explore;
