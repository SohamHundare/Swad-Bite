//import React, { useContext } from "react";
import { Routes, Route, Form } from "react-router-dom";
import PaymentMain from "./SwadBite/PaymentPage/PaymentMain";
import CurtainIntro from "./SwadBite/HomePAge/CurtainIntro";
import Explore from "./SwadBite/ExplorePage/Explore";
import WeeklyMenu from "./SwadBite/MenuPage/WeeklyMenu";
import Order from "./SwadBite/OrdersPage/Order";
import FeedbackForm from "./SwadBite/FeedbackPage/FeedbackForm";
import './App.css';
// import HomeMain from "./SwadBite/HomePAge/HomeMain";

function App() {
  return (
   <div className="App "> 
        <Routes>
         <Route path="/" element={<CurtainIntro />} />
         <Route path="/payment/*" element={<PaymentMain />} />
         <Route path="/explore/*" element={<Explore/>} />
         <Route path="/WeeklyMenu" element={<WeeklyMenu/>} />
         <Route path="/Order" element={<Order/>} />
         <Route path="/feedback" element={<FeedbackForm />} />
       </Routes> 
   </div>
  );
}

  export default App;