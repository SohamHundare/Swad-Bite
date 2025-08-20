// Complaint.jsx
import React, { useState } from 'react';
import './Complaint.css';

export default function Complaint({ formData, setFormData, setShowComplaint }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          place: "",
          foodType: "",
          messName: "",
          complaintType: "",
          description: "",
        });
      } else {
        alert("❌ Failed to store complaint.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Error submitting complaint.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fadein">
        <span className="close-btn" onClick={() => setShowComplaint(false)}>×</span>
        <h2>Register Your Complaint</h2>

        {submitted ? (
          <div className="success-message">
            ✅ Complaint submitted successfully. We'll look into it shortly!
          </div>
        ) : (
          <form className="complaint-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Place</label>
              <input
                type="text"
                placeholder="Enter your area/place"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Food Type</label>
              <select
                value={formData.foodType}
                onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
              >
                <option value="">--Select Food Type--</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div className="form-group">
              <label>Mess Name</label>
              <input
                type="text"
                placeholder="Enter Mess Name"
                value={formData.messName}
                onChange={(e) => setFormData({ ...formData, messName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Complaint Type</label>
              <select
                value={formData.complaintType}
                onChange={(e) => setFormData({ ...formData, complaintType: e.target.value })}
              >
                <option value="">--Select Complaint Type--</option>
                <option value="Food Related Issue">Food Related Issue</option>
                <option value="Delivery Issue">Delivery Issue</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Write your complaint in detail"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button type="button" className="submit-btn" onClick={handleSubmit}>
              Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
