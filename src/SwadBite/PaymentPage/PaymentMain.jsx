import React from "react";
import { Routes, Route } from "react-router-dom";
import Appli from "./Appli";
import PaymentDetailsPage from "./PaymentDetails";
import PaymentSuccess from "./PaymentSuccess";
import Header from "./Header";
import OrderSummary from "./OrderSummary";
import PaymentForm from "./PaymentForm";
import PaymentMethods from "./PaymentMethods";
import SecurePayment from "./SecurePayment";
import NeedHelp from "./NeedHelp";
import PaymentFail from "./PaymentFail";

function PaymentMain() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Appli />} />
        <Route path="/paymentdetails" element={<PaymentDetailsPage />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/fail" element={<PaymentFail />} />
        <Route path="/header" element={<Header />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/payment-form" element={<PaymentForm />} />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/secure-payment" element={<SecurePayment />} />
        <Route path="/need-help" element={<NeedHelp />} />
      </Routes>
    </div>
  );
}

export default PaymentMain;
