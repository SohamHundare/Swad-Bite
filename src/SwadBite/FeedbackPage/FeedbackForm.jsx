import React, { useState } from 'react';
import './FeedbackForm.css';
import Navbar from '../HomePAge/Navbar';
// import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: '',
    hostel: '',
    foodType: '',
    comments: '',
    recommend: '',
    rating: 0,
  });

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!form.name.trim()) validationErrors.name = 'Name is required';
    if (!form.hostel.trim()) validationErrors.hostel = 'Hostel name is required';
    if (!form.foodType.trim()) validationErrors.foodType = 'Food type is required';
    if (!form.comments.trim()) validationErrors.comments = 'Comments required';
    if (!form.recommend) validationErrors.recommend = 'Please choose recommendation';
    if (selected === 0) validationErrors.rating = 'Please rate the mess';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert('Feedback submitted successfully!');
      // You can reset or send form here
    }
  };

  return (
    <>
    <Navbar/>
    <div className="feedback-page">
      <div className="feedback-container">
        <div className="feedback-header">
          <h2>SwadBite Feedback Form</h2>
          <p>We value your feedback!</p>
        </div>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="section">
          <label>Enter Name</label>
          <input type="text" name="name" onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="section">
          <label>Hostel/Mess Name</label>
          <input type="text" name="hostel" onChange={handleChange} />
          {errors.hostel && <span className="error">{errors.hostel}</span>}
        </div>

       <div className="section">
  <label>Type of Food</label>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="foodType"
        value="Veg"
        onChange={handleChange}
      />{' '}
      Veg
    </label>
    <label>
      <input
        type="radio"
        name="foodType"
        value="Non-Veg"
        onChange={handleChange}
      />{' '}
      Non-Veg
    </label>
    <label>
      <input
        type="radio"
        name="foodType"
        value="Both"
        onChange={handleChange}
      />{' '}
      Combo
    </label>
  </div>
  {errors.foodType && <span className="error">{errors.foodType}</span>}
</div>


        <div className="section">
          <label>Comments</label>
          <textarea name="comments" onChange={handleChange}></textarea>
          {errors.comments && <span className="error">{errors.comments}</span>}
        </div>

        <div className="section">
          <label>Would you recommend this mess to others?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="recommend"
                value="yes"
                onChange={handleChange}
              />{' '}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recommend"
                value="no"
                onChange={handleChange}
              />{' '}
              No
            </label>
          </div>
          {errors.recommend && <span className="error">{errors.recommend}</span>}
        </div>

        <div className="section satisfaction-table">
          <label>How satisfied are you?</label>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Very Bad</th>
                <th>Bad</th>
                <th>Okay</th>
                <th>Good</th>
                <th>Excellent</th>
              </tr>
            </thead>
            <tbody>
              {['Taste', 'Cleanliness', 'Service', 'Timeliness'].map((item, idx) => (
                <tr key={idx}>
                  <td>{item}</td>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <td key={val}>
                      <input type="radio" name={item} value={val} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <label>Rate the mess</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={(hovered >= star || selected >= star) ? 'filled' : ''}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => {
                  setSelected(star);
                  setForm((prev) => ({ ...prev, rating: star }));
                }}
              >
                ★
              </span>
            ))}
          </div>
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </div>
    </>
  );
};

export default FeedbackForm
