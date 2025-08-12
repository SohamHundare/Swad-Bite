//import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import WelcomePage from "./SwadBite/StartingPages/WelcomePage.jsx";
import LoginModal from "./SwadBite/StartingPages/LoginPage.jsx";
import SignUpModal from "./SwadBite/StartingPages/SignUpPage.jsx";
import PlanPage from "./SwadBite/PlanePAGE/PlanePage.jsx";


import PaymentMain from "./SwadBite/PaymentPage/PaymentMain.jsx";
import CurtainIntro from "./SwadBite/HomePAge/CurtainIntro.jsx";
import Explore from "./SwadBite/ExplorePage/Explore.jsx";
import WeeklyMenu from "./SwadBite/MenuPage/WeeklyMenu.jsx";
import Order from "./SwadBite/OrdersPage/Order.jsx";
import FeedbackForm from "./SwadBite/FeedbackPage/FeedbackForm.jsx";
import WeeklyMenuModal from "./SwadBite/StartingPages/WeeklyMenu1.jsx";

import './App.css';

function App() {
  return (
    <div className="App"> 
      <Routes>
        {/* ✅ 1. Default route opens WelcomePage */}
        <Route path="/" element={<WelcomePage />} />

        {/* ✅ 2. Route to home (after login/signup) */}
        <Route path="/home" element={<CurtainIntro />} />

        {/* ✅ 3. Login/SignUp modals will float over home */}
        <Route path="/login" element={<><CurtainIntro /><LoginModal /></>} />
        <Route path="/signup" element={<><CurtainIntro /><SignUpModal /></>} />

        {/* ✅ 4. Other functional routes */}
        <Route path="/plans" element={<PlanPage />} />
        <Route path="/WeeklyMenu1" element={<><CurtainIntro /><WeeklyMenuModal /></>} />

        <Route path="/payment/*" element={<PaymentMain />} />
        <Route path="/explore/*" element={<Explore />} />
        <Route path="/WeeklyMenu" element={<WeeklyMenu />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Routes>
    </div>
  );
}

export default App;
