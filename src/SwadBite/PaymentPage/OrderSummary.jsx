import React, { useEffect, useState } from 'react';

function OrderSummary() {
  const [items, setItems] = useState([]);
  const [baseFee, setBaseFee] = useState(0);
  const [gst, setGst] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Get selected items with fees from localStorage (set during Cart -> Proceed to Payment)
    const paymentData = JSON.parse(localStorage.getItem("swadbite_payment_data")) || {};

    if (paymentData.items) {
      setItems(paymentData.items);
      setBaseFee(paymentData.baseFee || 0);
      setGst(paymentData.gst || 0);
      setMaintenance(paymentData.maintenanceFee || 0);
      setTotal(paymentData.total || 0);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        </div>
        <div className="p-6 space-y-4">
          {items.length > 0 && (
            <div>
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-gray-600">
                  <span>{item.mealName} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Base Fee</span>
            <span>₹{baseFee}</span>
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
