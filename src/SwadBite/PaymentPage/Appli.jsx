import React, { useState } from 'react';
import './styles.css';
import Header from './Header';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';
import SecurePayment from './SecurePayment';
import NeedHelp from './NeedHelp';
import Navbar from '../HomePAge/Navbar';
import image from '../Images/Advertise.jpg'

function Appli() {
  const [method, setMethod] = useState('upi');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <Header />


      <main className="flex-grow container mx-auto px-4 py-8">
       <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentForm selectedMethod={method} onChange={setMethod} />
            <div className="w-full h-auto mt-6 rounded-lg shadow-lg transition duration-200 hover:scale-105">
              <img src={image} alt="Payment Illustration"/>
            </div>
          </div>

          {/* Right Column: OrderSummary + SecurePayment stacked */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <OrderSummary />
            <SecurePayment />
            <NeedHelp/>
          </div>
      </div>

      </main>

    </div>
  );
}

export default Appli;
