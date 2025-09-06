import React, { useState, useEffect } from "react";
import bgImage from "../Images/MessImage.png";
import foodImg from "../Images/foodImg.png";
import secureImg from "./Secure.png";

function PaymentDetailsPage() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const rawCart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    const savedCart = Array.isArray(rawCart) ? rawCart : rawCart.items || [];

    const meal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
    const plan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

    if (savedCart.length > 0) {
      setOrderItems(
        savedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))
      );
    } else if (meal) {
      setOrderItems([{ ...meal, quantity: meal.quantity || 1 }]);
    } else if (plan) {
      setOrderItems([{ ...plan, quantity: plan.quantity || 1 }]);
    } else {
      setOrderItems([]);
    }
  }, []);

  const baseFee = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const gst = +(baseFee * 0.08).toFixed(2);
  const maintenance = +(baseFee * 0.02).toFixed(2);
  const total = +(baseFee + gst + maintenance).toFixed(2);

  const [isTakeaway, setIsTakeaway] = useState(false);
  const isLoggedIn = localStorage.getItem("user") !== null;
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = () => {
    if (isTakeaway) {
      return formData.name && formData.phone;
    }
    return (
      formData.name &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.pincode
    );
  };

  const handlePay = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");

    const userId = localStorage.getItem("swadbite_userId") || "guest";

    // Make sure items have price and quantity
    const items = orderItems.map((item) => ({
      name: item.mealName || item.planName || "Food",
      price: item.price,
      quantity: item.quantity || 1,
    }));

    const orderPayload = {
      userId,
      customerName: formData.name,
      isTakeaway,
      items,//items is an array we built
      amount: total,
      deliveryAddress: isTakeaway ? "Takeaway" : formData.address,//newly added later
    };

    try {
      const res = await fetch(
        "https://swadbite-backend-2.onrender.com/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderPayload),
        }
      );
      console.log("Payload being sent to backend:", orderPayload);

      // better error handling
      const text = await res.text();
      if (!res.ok) {
        console.error(
          "Backend responded with error:",
          text,
          "status:",
          res.status
        );
        throw new Error(text || `Backend error ${res.status}`);
      }
      const data = JSON.parse(text);

      if (!data.id) throw new Error("No session ID returned from backend");

      // make sure Stripe.js is loaded
      
      const stripe = window.Stripe("pk_test_51RsL62JRAH6EQmuz8uUbQq5NttBJ8BUN4K8YkdFI6wI06pQ8AowdR4Mfxg9FCIGOLAPQKNlbJvJhLbloTcirknMh00XBkKT1Nu");
      await stripe.redirectToCheckout({ sessionId: data.id });

      
    } catch (err) {
      console.error("Payment process error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden font-sans">
      <div
        className="absolute top-0 left-0 w-full h-80 bg-cover bg-center blur-sm brightness-75 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-20">
        <div className="bg-white shadow-xl rounded-xl p-6 md:flex md:gap-8">
          <div className="hidden md:flex w-1/2 justify-center items-center min-h-[550px]">
            <img
              src={foodImg}
              alt="Food"
              className="w-100 object-contain rounded-xl animate-float"
            />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Delivery Details
            </h2>

            {!isLoggedIn && (
              <p className="text-center text-sm text-red-600 mb-4">
                You are not logged in. Please provide your details to continue
                or log in for faster checkout.
              </p>
            )}

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="takeaway"
                checked={isTakeaway}
                onChange={() => setIsTakeaway(!isTakeaway)}
                className="mr-2 w-4 h-4 text-indigo-600"
              />
              <label htmlFor="takeaway" className="text-sm text-gray-700">
                Opt for Takeaway (No Delivery Required)
              </label>
            </div>

            {error && (
              <div className="mb-3 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handlePay}>
              <div>
                <label className="block text-sm text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="w-full mt-1 p-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  className="w-full mt-1 p-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {!isTakeaway && (
                <>
                  <div>
                    <label className="block text-sm text-gray-700">
                      Delivery Address
                    </label>
                    <textarea
                      name="address"
                      onChange={handleChange}
                      rows="3"
                      className="w-full mt-1 p-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                    ></textarea>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        className="w-full mt-1 p-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-700">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        onChange={handleChange}
                        className="w-full mt-1 p-2 text-sm border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="primary-btn w-full">
                Confirm & Pay ₹{total}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-sm">
                Your payment is secured with 256-bit encryption
              </p>
              <img src={secureImg} alt="Secure" className="mx-auto mt-2 w-24" />
            </div>




            <div className="mt-5 text-center text-sm">
              <p className="text-gray-500">Need help with payment?</p>
              <a
                href="/support"
                className="text-indigo-600 hover:underline font-medium"
              >
                Contact Support
              </a>
            </div>

            <footer className="mt-10 border-t pt-4 text-center text-xs text-gray-400">
              © 2025 Swad-Bite. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetailsPage;
