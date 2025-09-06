import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import bgImage from "../Images/MessImage.png";
import logo from "../Images/Logo.png";

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get order details passed from checkout/payment page
  const { items = [], total = 0, source = "unknown" } = location.state || {};

  // ✅ also check if order was from Meal/Plan (Menu.jsx)
  const meal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
  const plan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

  useEffect(() => {
    if (!sessionStorage.getItem("orderSaved")) {
      let newOrder = null;

      if (items.length > 0 && total > 0) {
        // Case 1: Checkout order
        newOrder = {
          id: Date.now(),
          date: new Date().toLocaleString("en-GB"),
          tiffin: items,
          mess: source,
          status: "Delivered",
          amount: `₹${total}`,
        };
      } else if (meal) {
        // Case 2: Single Meal order
        newOrder = {
          id: Date.now(),
          date: new Date().toLocaleString(),
          type: "Meal",
          mealType: meal.mealType,
          mealName: meal.mealName,
          day: meal.day,
          price: meal.price,
          image: meal.image,
          description: meal.description,
          quantity: meal.quantity,
          status: "Confirmed",
        };
      } else if (plan) {
        // Case 3: Subscription Plan order
        newOrder = {
          id: Date.now(),
          date: new Date().toLocaleString(),
          type: "Plan",
          plan: plan.plan,
          price: plan.price,
          meals: plan.meals,
          duration: plan.duration,
          details: plan.details,
          status: "Confirmed",
        };
      }

      if (newOrder) {
        // ✅ Fetch existing orders
        let existingOrders =
          JSON.parse(localStorage.getItem("swadbite_orders")) || [];

        // ✅ Add new order at the top (latest first)
        existingOrders.unshift(newOrder);

        // ✅ Save back
        localStorage.setItem("swadbite_orders", JSON.stringify(existingOrders));

        // ✅ Prevent duplicate save on refresh
        sessionStorage.setItem("orderSaved", "true");

        // ✅ Send to backend (optional)
        fetch("http://localhost:5000/api/orders/createorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder),
        })
          .then((res) => res.json())
          .then((data) => console.log("Order saved to database:", data))
          .catch((err) => console.error("Error saving order:", err));

        // ✅ Clear temp selections
        localStorage.removeItem("swadbite_selectedMeal");
        localStorage.removeItem("swadbite_selectedPlan");
        localStorage.removeItem("swadbite_cart");
      }
    }
  }, [items, total, source, meal, plan]);

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      <div
        className="absolute top-0 left-0 w-full h-80 bg-cover bg-center blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="bg-white shadow-2xl rounded-xl p-10 transition-transform duration-300 hover:scale-[1.01]">
          <CheckBadgeIcon className="h-20 w-20 text-green-500 mx-auto mb-4 transition-transform duration-300 hover:scale-110 animate-pulse" />

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 hover:text-indigo-700 transition-colors duration-300">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base hover:text-gray-700 transition-colors duration-300">
            Thank you for your order. Your transaction has been completed
            successfully.
          </p>

          <div className="mt-6 animate-float">
            <img
              src={logo}
              alt="Swad-Bite Logo"
              className="w-32 mx-auto transition-transform duration-300 hover:scale-105"
            />
            <p className="text-sm text-gray-500 mt-2 italic hover:text-indigo-600 transition-colors duration-300">
              Swaad-Bite – Tasty Bites. Timely Delivered.
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white py-2.5 px-6 rounded-md text-base transition transform hover:scale-105 duration-300 shadow-md"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 px-6 rounded-md text-base transition transform hover:scale-105 duration-300 shadow-md"
              onClick={() => navigate("/order")}
            >
              Go to Orders
            </button>
          </div>
        </div>

        <footer className="mt-10 text-xs text-gray-400 hover:text-gray-600 transition-colors duration-300">
          © 2025 Swad-Bite. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default PaymentSuccess;
