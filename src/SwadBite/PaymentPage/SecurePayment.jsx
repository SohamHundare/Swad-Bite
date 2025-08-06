import React from 'react';
import secureImg from './Secure.png';
function SecurePayment(params) {

    return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Secure Payment</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Your payment information is processed securely. We do not store any of your card details.</span>
          </div>

          <div className='flex justify-between'>
            <img src={secureImg} alt="" />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SecurePayment;