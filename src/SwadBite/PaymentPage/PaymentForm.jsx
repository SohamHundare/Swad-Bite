import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentMethods from './PaymentMethods';

import RupayImg from '../Images/RupayImg.png';
import MAstercardImg from '../Images/Mastercard-logo.png';
import VisaImg from '../Images/Visa-image.png';

function PaymentForm(props) {
  const navigate = useNavigate();

  const [upiInput, setUpiInput] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');


  //fetching price from local storage

  // const meal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
  // const plan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

  // const price = plan?.price || meal?.price || 0;
  // const gst = +(price * 0.18).toFixed(2);
  // const maintenance = +(price * 0.02).toFixed(2);
  // const total = +(price + gst + maintenance).toFixed(2);

  const [orderItems, setOrderItems] = useState([]);
  
  useEffect(() => {
    const rawCart = JSON.parse(localStorage.getItem("swadbite_cart")) || [];
    const savedCart = Array.isArray(rawCart) ? rawCart : rawCart.items || [];

    const selectedMeal = JSON.parse(localStorage.getItem("swadbite_selectedMeal"));
    const selectedPlan = JSON.parse(localStorage.getItem("swadbite_selectedPlan"));

    if (savedCart.length > 0) {
      setOrderItems(savedCart.map(item => ({ ...item, quantity: item.quantity || 1 })));
    } else if (selectedMeal) {
      setOrderItems([{ ...selectedMeal, quantity: selectedMeal.quantity || 1 }]);
    } else if (selectedPlan) {
      setOrderItems([{ ...selectedPlan, quantity: selectedPlan.quantity || 1 }]);
    } else {
      setOrderItems([]);
    }
  }, []);

  const baseFee = orderItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  const gst = +(baseFee * 0.08).toFixed(2);
  const maintenance = +(baseFee * 0.02).toFixed(2);
  const total = +(baseFee + gst + maintenance).toFixed(2);

  // UPI validation
  function checkUpiValid() {
    if (!upiInput.includes('@')) {
      return false;
    }
    const upiParts = upiInput.split('@');
    if (upiParts.length !== 2) {
      return false;
    }
    const userPart = upiParts[0];
    const bankPart = upiParts[1];

    return userPart.length > 0 && bankPart.length > 0;
  }

  // Card validation
  function checkCardValid() {
    const noSpaces = cardNumber.replace(/\s/g, '');

    if (noSpaces.length !== 16 || isNaN(noSpaces)) {
      return false;
    }

    if (!cardExpiry.includes('/')) {
      return false;
    }

    const expParts = cardExpiry.split('/');
    const month = expParts[0];
    const year = expParts[1];

    if (!month || !year || Number(month) < 1 || Number(month) > 12) {
      return false;
    }

    if (cardCvv.length < 3 || cardCvv.length > 4 || isNaN(cardCvv)) {
      return false;
    }

    if (cardName.trim().length === 0) {
      return false;
    }

    return true;
  }

  // Bank selection validation
  function checkBankValid() {
    return selectedBank.trim().length > 0;
  }

  // Handlers for different payment methods
  function payWithUpi() {
    if (!upiInput) {
      setErrorMessage('Please enter your UPI ID.');
      return;
    }
    if (!checkUpiValid()) {
      setErrorMessage('Enter a valid UPI ID (e.g. yourname@upi).');
      return;
    }
    setErrorMessage('');
    navigate('/payment/paymentdetails');
  }

  function payWithCard() {
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      setErrorMessage('Please fill all card details.');
      return;
    }
    if (!checkCardValid()) {
      setErrorMessage('Enter valid card details.');
      return;
    }
    setErrorMessage('');
    navigate('/payment/paymentdetails');
  }

  function payWithNetBanking() {
    if (!checkBankValid()) {
      setErrorMessage('Please select your bank.');
      return;
    }
    setErrorMessage('');
    navigate('/payment/paymentdetails');
  }

  // Show form based on selected method
  function showFormBasedOnMethod() {
    if (props.selectedMethod === 'upi') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="upiId">UPI ID</label>
            <div className="relative">
              <input
                type="text"
                id="upiId"
                placeholder="yourname@upi"
                className="input pl-10"
                value={upiInput}
                onChange={(e) => setUpiInput(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-mobile-alt text-gray-400"></i>
              </div>
            </div>
          </div>
          {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
          <button
            type="button"
            className="primary-btn w-full"
            onClick={payWithUpi}
          >
            <i className="fas fa-external-link-alt mr-2" /> Pay ₹{total}
          </button>
          {/* <button onClick={handleRazorpayPayment} className="primary-btn w-full">
            Pay ₹1,200.00 via Razorpay
          </button> */}

        </div>
      );
    }

    if (props.selectedMethod === 'card') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              className="input"
              placeholder="1234 5678 9012 3456"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="text"
                className="input"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                maxLength={5}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                className="input"
                placeholder="123"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value)}
                maxLength={4}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              className="input"
              placeholder="Enter name as on card"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
          </div>
          {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
          <button
            type="button"
            className="primary-btn w-full"
            onClick={payWithCard}
          >
            Pay ₹{total}
          </button>
          {/* <button onClick={handleRazorpayPayment} className="primary-btn w-full">
            Pay ₹1,200.00 via Razorpay
          </button> */}
          {/* <button onClick={handleStripeCheckout} className="primary-btn w-full">
            Pay ₹1,200 with Card
          </button> */}



          <div className="flex justify-center space-x-4 mt-4">
            <img src={VisaImg} alt="Visa" className='h-10 w-20' />
            <img src={MAstercardImg} alt="Mastercard" className='h-10 w-20' />
            <img src={RupayImg} alt="RuPay" className='h-10 w-20' />
          </div>
        </div>
      );
    }

    if (props.selectedMethod === 'netbanking') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Bank</label>
            <select
              className="input"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">-- Select your bank --</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="pnb">Punjab National Bank</option>
            </select>
          </div>
          {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
          {/* <button onClick={handleRazorpayPayment} className="primary-btn w-full">
            Pay ₹1,200.00 via Razorpay
          </button> */}
           <button
            type="button"
            className="primary-btn w-full"
            onClick={payWithNetBanking}
          >
            Pay ₹{total}
          </button>

          <p className="text-xs text-gray-500 text-center">
            You will be redirected to your bank’s secure website to complete the payment.
          </p>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden transition duration-200 hover:scale-105">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">Payment Details</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Student Info */}
        <div className="p-4 bg-gray-50 rounded-lg flex items-center">
          <img
            src="https://th.bing.com/th/id/OIP.7aSqWv_UPDbm1O84xkzY4wHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Student"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="font-medium text-gray-900">Payment for: Mess Fees</h3>
            <p className="text-sm text-gray-500">Current Month: August 2025</p>
          </div>
        </div>

        <PaymentMethods selected={props.selectedMethod} onSelect={props.onChange} />

        {showFormBasedOnMethod()}
      </div>
    </div>
  );
}

export default PaymentForm;
