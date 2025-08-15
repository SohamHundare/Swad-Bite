import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LoginModal from "./SwadBite/StartingPages/LoginPage.jsx";
import SignUpModal from "./SwadBite/StartingPages/SignUpPage.jsx";
import PlanPage from "./SwadBite/PlanePAGE/PlanePage.jsx";
import PaymentMain from "./SwadBite/PaymentPage/PaymentMain.jsx";
import CurtainIntro from "./SwadBite/HomePAge/CurtainIntro.jsx";
import Explore from "./SwadBite/ExplorePage/Explore.jsx";
import Cart from "./SwadBite/CartPage/Cart.jsx";
import WeeklyMenu from "./SwadBite/MenuPage/WeeklyMenu.jsx";
import Order from "./SwadBite/OrdersPage/Order.jsx";
import FeedbackForm from "./SwadBite/FeedbackPage/FeedbackForm.jsx";
import WeeklyMenuModal from "./SwadBite/StartingPages/WeeklyMenu1.jsx";
import Footer from "./SwadBite/HomePAge/Footer.jsx";
import HomeMain from "./SwadBite/HomePAge/HomeMain.jsx";
import "./App.css";

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
