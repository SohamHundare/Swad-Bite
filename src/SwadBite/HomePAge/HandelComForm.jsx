import React, { useState, useRef } from 'react';
import Complaint from './Complaint';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export default function HandelComForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    place: '',
    foodType: '',
    messName: '',
    complaintType: '',
    description: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [showComplaint, setShowComplaint] = useState(false);
  const wrapperRef = useRef(null);

  const toggleComplaint = () => {
    setShowComplaint((prev) => !prev);
  };


  const handleSubmit = () => {
    const { name, phone, place, foodType, messName, complaintType, description } = formData;
    if (!name || !phone || !place || !foodType || !messName || !complaintType || !description) {
      alert("Please fill out all fields");
      return;
    }

    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <>
      <button
  id="complaint-icon"
  onClick={toggleComplaint}
  className="fixed bottom-6 left-6 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-md flex items-center gap-2 shadow-lg z-[100] animate-float">
  <ChatBubbleLeftRightIcon className="h-5 w-5" />
  <span className="font-semibold text-sm">Complaints</span>
</button>


      {/* Complaint Form in Wrapper */}
      {showComplaint && (
        <div
          ref={wrapperRef}
          className="fixed bottom-24 left-6 bg-white p-4 rounded-lg shadow-lg z-[100]"
        >
          <Complaint
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            setShowComplaint={setShowComplaint}
            submitted={submitted}
          />
        </div>
      )}
    </>
  );
}
