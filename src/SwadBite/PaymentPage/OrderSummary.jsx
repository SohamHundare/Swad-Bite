import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import Navbar from "../HomePAge/Navbar";
import { useNavigate } from "react-router-dom";
import { saveOrder } from "../services/api";
=======
>>>>>>> aad89e6f84c7736c994ce89e0dff4284cd4f3e3e

function OrderSummary() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    const cart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    const selectedMeal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
    const selectedPlan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

    if (cart.length > 0) setOrderItems(cart);
    else if (selectedMeal) setOrderItems([selectedMeal]);
    else if (selectedPlan) setOrderItems([selectedPlan]);
=======
    const rawCart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    const savedCart = Array.isArray(rawCart) ? rawCart : rawCart.items || [];

    const selectedMeal = JSON.parse(
      localStorage.getItem("swadbite_selectedMeal")
    );
    const selectedPlan = JSON.parse(
      localStorage.getItem("swadbite_selectedPlan")
    );

    if (savedCart.length > 0) {
      setOrderItems(
        savedCart.map((item) => ({ ...item, quantity: item.quantity || 1 }))
      );
    } else if (selectedMeal) {
      setOrderItems([
        { ...selectedMeal, quantity: selectedMeal.quantity || 1 },
      ]);
    } else if (selectedPlan) {
      setOrderItems([
        { ...selectedPlan, quantity: selectedPlan.quantity || 1 },
      ]);
    } else {
      setOrderItems([]);
    }
>>>>>>> aad89e6f84c7736c994ce89e0dff4284cd4f3e3e
  }, []);

  const baseFee = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
<<<<<<< HEAD
  const gst = +(baseFee * 0.18).toFixed(2);
=======
  const gst = +(baseFee * 0.08).toFixed(2);
>>>>>>> aad89e6f84c7736c994ce89e0dff4284cd4f3e3e
  const maintenance = +(baseFee * 0.02).toFixed(2);
  const total = +(baseFee + gst + maintenance).toFixed(2);

  const handleConfirmOrder = async () => {
    if (orderItems.length === 0) return alert("No items to order!");

    const newOrder = {
      items: orderItems.map(item => ({
        mealName: item.mealName || "",
        planName: item.planName || "",
        price: item.price || 0,
        quantity: item.quantity || 1,
      })),
      amount: total,
      date: new Date().toISOString(),
      status: "Pending",
    };

    try {
      console.log("📤 Sending order:", newOrder);
      const res = await saveOrder(newOrder);
      console.log("📥 Response:", res);

      if (res.status === 201) {
        alert("✅ Order placed successfully!");
        setOrderPlaced(true);

        // Clear cart & selections
        // localStorage.removeItem("swadbite_cart");
        // localStorage.removeItem("swadbite_selectedMeal");
        // localStorage.removeItem("swadbite_selectedPlan");
        setOrderItems([]);
      }
    } catch (err) {
      console.error("❌ Failed to place order:", err.response?.data || err.message);
      alert("Failed to place order. Check console for details.");
    }
  };

  if (orderItems.length === 0 && !orderPlaced) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen">
          <p>No order found. Please select a meal, plan, or cart items.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6 p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Order Summary
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {orderItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-gray-600 mb-2"
              >
                <span>
                  {item.mealName || item.planName} x {item.quantity}
                </span>
                <span>₹{(item.price || 0) * (item.quantity || 1)}</span>
              </div>
            ))}
            <div className="flex justify-between text-gray-600">
              <span>Base Fee</span>
              <span>₹{baseFee}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (08%)</span>
              <span>₹{gst}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Maintenance</span>
              <span>₹{maintenance.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-4">
              <span>Total</span>
              <span className="text-indigo-600 font-bold">₹{total}</span>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleConfirmOrder}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Confirm Order
            </button>
          </div>
        </div>

        {orderPlaced && (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
            ✅ Order is Successful! Redirecting to your orders...
          </div>
        )}
      </div>
    </>
  );
}

export default OrderSummary;
