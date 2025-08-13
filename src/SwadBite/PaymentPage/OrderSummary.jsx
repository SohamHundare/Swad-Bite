import React from 'react';

function OrderSummary() {

  const meal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
  const plan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

  const price = plan?.price || meal?.price || 0;
  const gst = +(price * 0.18).toFixed(2);
  const maintenance = +(price * 0.02).toFixed(2);
  const total = +(price + gst + maintenance).toFixed(2);
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Base Fee</span>
            <span>₹{price}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (18%)</span>
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
  );
}

export default OrderSummary;