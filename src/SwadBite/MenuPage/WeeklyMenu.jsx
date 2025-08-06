import React from 'react';
import { useNavigate } from 'react-router-dom';
const menuData = {
  Monday: {
    breakfast: ['Poha', 'Masala Chai', 'Toast with Butter'],
    lunch: ['Dal Tadka', 'Jeera Rice', 'Aloo Gobi', 'Salad'],
    dinner: ['Palak Paneer', 'Phulka Roti', 'Boondi Raita', 'Gulab Jamun']
  },
  Tuesday: {
    breakfast: ['Upma', 'Filter Coffee', 'Banana'],
    lunch: ['Rajma', 'Steamed Rice', 'Bhindi Fry', 'Papad'],
    dinner: ['Vegetable Pulao', 'Mix Veg Curry', 'Curd', 'Kheer']
  },
  Wednesday: {
    breakfast: ['Aloo Paratha', 'Curd', 'Pickle'],
    lunch: ['Chole', 'Bhature', 'Onion Salad'],
    dinner: ['Matar Paneer', 'Tandoori Roti', 'Lassi', 'Rasgulla']
  },
  Thursday: {
    breakfast: ['Idli with Sambar', 'Coconut Chutney', 'Filter Coffee'],
    lunch: ['Sambar Rice', 'Beans Poriyal', 'Curd', 'Appalam'],
    dinner: ['Kadhi', 'Moong Dal Khichdi', 'Fried Papad', 'Halwa']
  },
  Friday: {
    breakfast: ['Masala Dosa', 'Sambar', 'Chutney'],
    lunch: ['Paneer Butter Masala', 'Butter Naan', 'Salad'],
    dinner: ['Lauki Kofta', 'Roti', 'Mint Raita', 'Rice Kheer']
  },
  Saturday: {
    breakfast: ['Bread Pakora', 'Masala Tea', 'Boiled Eggs'],
    lunch: ['Pav Bhaji', 'Onion Rings', 'Lemon Soda'],
    dinner: ['Vegetable Biryani', 'Onion Raita', 'Gajar Halwa']
  },
  Sunday: {
    breakfast: ['Sheera', 'Sabudana Khichdi', 'Lassi'],
    lunch: ['Poori', 'Aloo Sabzi', 'Kachumber Salad', 'Sweet Shrikhand'],
    dinner: ['Veg Hakka Noodles', 'Manchurian Gravy', 'Lemonade']
  }
};

const WeeklyMenu = () => {

  const navigate = useNavigate();
  return (
    <div className="menu-container">
      <style>{`
        body {
          font-family: 'Segoe UI', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #fdf6e3;
        }

        .menu-container {
          padding: 2rem;
          background: #fffaf0;
          color: #4b3e2b;
        }

        .menu-title {
          font-size: 2.5rem;
          margin: 0;
          color: #7a5c3e;
          letter-spacing: 2px;
          text-align: center;
        }

        .since-text {
          font-size: 1rem;
          color: #9c8669;
          text-align: center;
          margin-bottom: 2rem;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: 1.5fr 3fr 3fr 3fr;
          gap: 1.2rem;
          margin-bottom: 3rem;
        }

        .menu-day {
          font-weight: bold;
          font-size: 1.05rem;
          color: #5e4a36;
          padding-top: 8px;
        }

        .menu-meal {
          font-size: 0.95rem;
          color: #4b3e2b;
        }

        .header {
          background: #f59e0b; /* amber-500 */
          color: white;
          font-weight: bold;
          border-radius: 8px;
          padding: 0.5rem;
          text-align: center;
        }

        .subscription-section {
          padding: 3rem 2rem;
          background: #fff4d9;
          border-top: 2px solid #e1c78f;
          text-align: center;
        }

        .subscription-title {
          font-size: 2rem;
          color: #7a5c3e;
          margin-bottom: 2rem;
          letter-spacing: 1px;
        }

        .subscription-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          justify-content: center;
        }

        .subscription-card {
          background-color: #fff9ed;
          border: 1px solid #e8d5b7;
          border-left: 6px solid #e0b861;
          border-radius: 12px;
          padding: 1.8rem 1.2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.07);
          transition: all 0.3s ease;
        }

        .subscription-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .subscription-card h3 {
          font-size: 1.4rem;
          color: #7a5c3e;
          margin-bottom: 0.5rem;
        }

        .subscription-card .price {
          font-size: 1.6rem;
          color: #3d2e1e;
        }

        .subscription-card .price span {
          font-size: 0.9rem;
          color: #7e6a54;
        }

        .subscription-card ul {
          list-style: none;
          padding: 0;
          margin: 1rem 0;
          text-align: left;
          color: #4f4031;
        }

        .subscription-card ul li {
          margin-bottom: 0.5rem;
        }

        .subscription-card button {
          background-color: #f59e0b; /* amber-500 */
          color: white;
          border: none;
          padding: 0.6rem 1.3rem;
          font-size: 0.95rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .subscription-card button:hover {
          background-color: #d97706; /* darker amber for hover */
        }
      `}</style>

      <h1 className="menu-title">WEEKLY MENU</h1>
      <p className="since-text">Since 2001</p>

      <div className="menu-grid">
        <div className="menu-day header">Day</div>
        <div className="menu-meal header">Breakfast</div>
        <div className="menu-meal header">Lunch</div>
        <div className="menu-meal header">Dinner</div>

        {Object.entries(menuData).map(([day, meals]) => (
          <React.Fragment key={day}>
            <div className="menu-day">{day}</div>
            <div className="menu-meal">{meals.breakfast.join(', ')}</div>
            <div className="menu-meal">{meals.lunch.join(', ')}</div>
            <div className="menu-meal">{meals.dinner.join(', ')}</div>
          </React.Fragment>
        ))}
      </div>

      <div className="subscription-section">
        <h2 className="subscription-title">Subscription Plans</h2>
        <div className="subscription-grid">
          <div className="subscription-card basic">
            <h3>Basic Plan</h3>
            <p className="price">₹799 <span>/ Week</span></p>
            <ul>
              <li>✔ Breakfast Only</li>
              <li>✔ 7 Days Access</li>
              <li>✔ Home-Style Meals</li>
            </ul>
            <button onClick={() =>{navigate("/payment")}}>Subscribe</button>
          </div>

          <div className="subscription-card standard">
            <h3>Standard Plan</h3>
            <p className="price">₹1299 <span>/ Week</span></p>
            <ul>
              <li>✔ Lunch + Dinner</li>
              <li>✔ 7 Days Access</li>
              <li>✔ Fresh Ingredients</li>
            </ul>
            <button onClick={() =>{navigate("/payment")}}>Subscribe</button>
          </div>

          <div className="subscription-card premium">
            <h3>Premium Plan</h3>
            <p className="price">₹1799 <span>/ Week</span></p>
            <ul>
              <li>✔ All 3 Meals</li>
              <li>✔ 7 Days Access</li>
              <li>✔ Priority Service</li>
            </ul>
            <button onClick={() =>{navigate("/payment")}}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyMenu;
