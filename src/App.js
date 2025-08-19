import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomeMain from "./SwadBite/HomePAge/HomeMain";
import Cart from "./SwadBite/CartPage/Cart";
import Footer from "./SwadBite/HomePAge/Footer";
import WelcomePage from "./SwadBite/StartingPages/WelcomePage";
import LoginModal from "./SwadBite/StartingPages/LoginPage";
import SignUpModal from "./SwadBite/StartingPages/SignUpPage";
import PlanPage from "./SwadBite/PlanePAGE/PlanePage";
import PaymentMain from "./SwadBite/PaymentPage/PaymentMain";
import CurtainIntro from "./SwadBite/HomePAge/CurtainIntro";
import Explore from "./SwadBite/ExplorePage/Explore";
import WeeklyMenu from "./SwadBite/MenuPage/WeeklyMenu";
import Order from "./SwadBite/OrdersPage/Order";
import FeedbackForm from "./SwadBite/FeedbackPage/FeedbackForm";
import WeeklyMenuModal from "./SwadBite/StartingPages/WeeklyMenu1";

import './App.css';

function App() {
  // Start as true so homepage never flashes behind curtain
  const [showCurtain, setShowCurtain] = useState(() => {
    return !sessionStorage.getItem("hasSeenCurtain");
  });

  useEffect(() => {
    if (showCurtain) {
      sessionStorage.setItem("hasSeenCurtain", "true");
    }
  }, [showCurtain]);

  if (showCurtain) {
    return <CurtainIntro onFinish={() => setShowCurtain(false)} />;
  }

  return (
    <div className="App">
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomeMain />} />
        <Route path="/home" element={<HomeMain />} />

        {/* Login and Signup with blurred HomeMain */}
        <Route path="/login" element={<><HomeMain blur /><LoginModal /></>} />
        <Route path="/signup" element={<><HomeMain blur /><SignUpModal /></>} />

        {/* Other pages */}
        <Route path="/plans" element={<PlanPage />} />
        <Route path="/WeeklyMenu1" element={<WeeklyMenuModal />} />
        <Route path="/payment/*" element={<PaymentMain />} />
        <Route path="/explore/*" element={<Explore />} />
        <Route path="/WeeklyMenu" element={<WeeklyMenu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;