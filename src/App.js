import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeMain from "./SwadBite/HomePAge/HomeMain";
import Cart from "./SwadBite/CartPage/Cart";
import Footer from "./SwadBite/PaymentPage/Footer";
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

import "./App.css";

function App() {
  const [showCurtain, setShowCurtain] = useState(() => {
    return !sessionStorage.getItem("hasSeenCurtain");
  });

  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem("hasSeenWelcome");
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (showCurtain) {
      sessionStorage.setItem("hasSeenCurtain", "true");
    }
  }, [showCurtain]);

  useEffect(() => {
    if (showWelcome) {
      sessionStorage.setItem("hasSeenWelcome", "true");
    }
  }, [showWelcome]);

  if (showCurtain) {
    return <CurtainIntro onFinish={() => setShowCurtain(false)} />;
  }

  return (
    <div className="App">
      <Routes>
        {/* Step 2: Welcome Page */}
        {showWelcome && (
          <Route
            path="/"
            element={
              <WelcomePage
                onLogin={() => {
                  setShowWelcome(false);
                  navigate("/Login");
                }}
                onSignUp={() => {
                  setShowWelcome(false);
                  navigate("/SignUp");
                }}
              />
            }
          />
        )}

        {/* Login and Signup */}
        {/* Login and Signup float on top of Home */}
<Route
  path="/Login"
  element={<><HomeMain /><LoginModal onSuccess={() => navigate("/home")} /></>}
/>
<Route
  path="/SignUp"
  element={<><HomeMain /><SignUpModal onSuccess={() => navigate("/home")} /></>}
/>


        {/* Home page */}
        <Route path="/" element={<HomeMain />} />
        <Route path="/home" element={<HomeMain />} />

        {/* Other pages */}
        <Route path="/plans" element={<PlanPage />} />
        <Route path="/WeeklyMenu1" element={<WeeklyMenuModal />} />
        <Route path="/payment/*" element={<PaymentMain />} />
        <Route path="/explore/*" element={<Explore />} />
        <Route path="/WeeklyMenu" element={<WeeklyMenu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* Footer always visible except on WelcomePage */}
      {!showWelcome && <Footer />}
    </div>
  );
}

export default App;
