import React from 'react';
import { CreditCardIcon, BanknotesIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';


function PaymentMethods({ selected, onSelect }) {
  const methods = [
    {
      id: 'upi',
      label: 'UPI',
      icon: <DevicePhoneMobileIcon className="w-8 h-8 text-blue-500" />,
      desc: 'Pay instantly via any UPI app',
      color: 'blue'
    },
    {
      id: 'card',
      label: 'Card',
      icon: <CreditCardIcon className="w-8 h-8 text-purple-500" />,
      desc: 'Credit/Debit Card',
      color: 'purple'
    },
    {
      id: 'netbanking',
      label: 'Net Banking',
      icon: <BanknotesIcon className="w-8 h-8 text-green-500" />,
      desc: 'Direct bank transfer',
      color: 'green'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {methods.map((method) => (
        <label
          key={method.id}
          className={`payment-card border-2 rounded-lg p-4 cursor-pointer flex flex-col items-center 
            transition duration-200 hover:scale-105
            ${selected === method.id ? 'active-method ' : 'border-gray-200'}`}
          onClick={() => onSelect(method.id)}
          id={`${method.id}Option`}
        >
          <div className={`w-12 h-12 mb-3 bg-${method.color}-50 rounded-full flex items-center justify-center`}>
            {method.icon}
          </div>
          <span className="font-medium text-gray-800">{method.label}</span>
          <p className="text-xs text-gray-500 mt-1 text-center">{method.desc}</p>

        </label>
      ))}
    </div>
  );
}

export default PaymentMethods;