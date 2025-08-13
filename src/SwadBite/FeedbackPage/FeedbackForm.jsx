import React, { useState , useEffect} from 'react';
import './FeedbackForm.css';
import Navbar from '../HomePAge/Navbar';
import { submitFeedback } from '../services/api'; // Ensure this file exists and has your POST API

const FeedbackForm = () => {
  const [form, setForm] = useState({
    name: '',
    hostel: '',
    foodType: '',
    comments: '',
    recommend: '',
    rating: 0,
    satisfaction: {
      Taste: '',
      Cleanliness: '',
      Service: '',
      Timeliness: '',
    },
  });

  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(`Changed ${name} to ${value}`); 
    if (['Taste', 'Cleanliness', 'Service', 'Timeliness'].includes(name)) {
      setForm((prev) => ({
        ...prev,
        satisfaction: {
          ...prev.satisfaction,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate basic fields
    if (
      !form.name.trim() ||
      !form.hostel.trim() ||
      !form.foodType ||
      !form.recommend ||
      selected === 0
    ) {
      alert('Please fill all required fields and give a star rating before submitting.');
      return;
    }

    const safeSatisfaction = {
      Taste: form.satisfaction.Taste || '',
      Cleanliness: form.satisfaction.Cleanliness || '',
      Service: form.satisfaction.Service || '',
      Timeliness: form.satisfaction.Timeliness || '',
    };

    console.log('Satisfaction values:', safeSatisfaction);

    const allSatisfactionFilled = Object.values(safeSatisfaction).every(
      (val) => typeof val === 'string' && val.trim() !== ''
    );

    console.log('All satisfaction filled?', allSatisfactionFilled);

    if (!allSatisfactionFilled) {
      alert('Please fill all satisfaction rating fields.');
      return;
    }

    const data = {
      ...form,
      satisfaction: safeSatisfaction,
      rating: selected,
    };

    try {
      const res = await submitFeedback(data);
      if (res.status === 201) {
        alert('✅ Feedback submitted successfully!');
        setForm({
          name: '',
          hostel: '',
          foodType: '',
          comments: '',
          recommend: '',
          satisfaction: {
            Taste: '',
            Cleanliness: '',
            Service: '',
            Timeliness: '',
          },
          rating: 0,
        });
        setSelected(0);
      } else {
        alert('❌ Something went wrong while submitting.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Backend error response:', error.response.data);
        console.dir(error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      alert('❌ Failed to submit feedback. Check console for details.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="feedback-page">
        <div className="feedback-container">
          <div className="feedback-header">
            <h2>SwadBite Feedback Form</h2>
            <p>We value your feedback!</p>
          </div>

          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="section">
              <label>Enter Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="section">
              <label>Hostel/Mess Name</label>
              <input
                type="text"
                name="hostel"
                value={form.hostel}
                onChange={handleChange}
              />
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
                    checked={form.foodType === 'Veg'}
                    onChange={handleChange}
                  />{' '}
                  Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="foodType"
                    value="Non-Veg"
                    checked={form.foodType === 'Non-Veg'}
                    onChange={handleChange}
                  />{' '}
                  Non-Veg
                </label>
                <label>
                  <input
                    type="radio"
                    name="foodType"
                    value="Both"
                    checked={form.foodType === 'Both'}
                    onChange={handleChange}
                  />{' '}
                  Combo
                </label>
              </div>
              {errors.foodType && <span className="error">{errors.foodType}</span>}
            </div>

            <div className="section">
              <label>Comments</label>
              <textarea
                name="comments"
                value={form.comments}
                onChange={handleChange}
              ></textarea>
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
                    checked={form.recommend === 'yes'}
                    onChange={handleChange}
                  />{' '}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="recommend"
                    value="no"
                    checked={form.recommend === 'no'}
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
                          <input
                            type="radio"
                            name={item}
                            value={String(val)}
                            checked={form.satisfaction[item] === String(val)}
                            onChange={handleChange}
                          />
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
                    className={hovered >= star || selected >= star ? 'filled' : ''}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => {
                      setSelected(star);
                      setForm((prev) => ({ ...prev, rating: star }));
                    }}
                    style={{ cursor: 'pointer', fontSize: '24px' }}
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

export default FeedbackForm;
