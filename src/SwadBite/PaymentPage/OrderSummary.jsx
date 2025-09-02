import React, { useEffect, useState } from "react";

function OrderSummary() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
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
  }, []);

  const baseFee = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );
  const gst = +(baseFee * 0.08).toFixed(2);
  const maintenance = +(baseFee * 0.02).toFixed(2);
  const total = +(baseFee + gst + maintenance).toFixed(2);

  if (orderItems.length === 0) {
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
        </div>
      </div>
    </>
  );
}

export default OrderSummary;
