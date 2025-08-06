import React from 'react';

function OrderSummary() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Base Fee</span><span>₹1,000.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (18%)</span><span>₹180.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Maintenance</span><span>₹20.00</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-4">
            <span>Total</span><span className="text-indigo-600 font-bold">₹1,200.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;