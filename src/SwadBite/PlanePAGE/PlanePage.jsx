import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';




const PlanPage = ({ user }) => {
  const [activeLink, setActiveLink] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!user) {
    return <div className="error">User not found. Please log in.</div>;
  }

  const planStartDate = new Date('2025-06-27');
  const planEndDate = new Date('2025-07-26');
  const currentDate = new Date();

  const totalDays = (planEndDate - planStartDate) / (1000 * 60 * 60 * 24);
  const daysUsed = (currentDate - planStartDate) / (1000 * 60 * 60 * 24);
  const remainingDays = Math.max(totalDays - daysUsed, 0);
  const progressPercent = Math.round((daysUsed / totalDays) * 100);

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  const handleCalendarClick = () => {
    setShowCalendar(prev => !prev);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className="container">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes growProgressSlow {
          from { width: 0%; }
          to { width: ${progressPercent}%; }
        }

        .container {
  position: relative;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  z-index: 0;
}

.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url('https://wallpapers.com/images/hd/food-photography-background-kepimuxrxth4bjjw.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px);
  opacity: 0.7;
  z-index: -1;
}


        // nav {
        //   background-color: white;
        //   display: flex;
        //   justify-content: space-between;
        //   align-items: center;
        //   padding: 15px 30px;
        //   box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        //   animation: slideInLeft 1s ease-out;
        // }

        // nav .logo {
        //   font-size: 24px;
        //   font-weight: bold;
        // }

        // nav .nav-links a {
        //   margin-left: 20px;
        //   text-decoration: none;
        //   color: black;
        //   font-weight: bold;
        //   position: relative;
        //   transition: color 0.3s;
        // }

        // nav .nav-links a.active {
        //   color: orange;
        // }

        // nav .nav-links a::after {
        //   content: "";
        //   position: absolute;
        //   left: 0;
        //   bottom: -3px;
        //   width: 0%;
        //   height: 2px;
        //   background: orange;
        //   transition: width 0.3s;
        // }

        // nav .nav-links a:hover::after {
        //   width: 100%;
        // }

        .main {
          max-width: 1000px;
          margin: 30px auto;
          background-color:white;
          padding: 30px;
          border-radius: 8px;
          animation: fadeIn 1.2s ease;
          opacity: 0.9;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .user-info img {
          height: 60px;
          width: 60px;
          border-radius: 50%;
          border: 2px solid black;
          transition: transform 0.3s;
        }

        .user-info img:hover {
          transform: scale(1.1);
        }

        .right-side {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 15px;
          margin-top: 10px;
          position: relative;
        }

        .renew-button {
          background-color: orange;
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          border: none;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: background 0.3s, transform 0.2s;
        }

        .renew-button:hover {
          background-color: #ff9933;
          transform: scale(1.05);
        }

        .calendar-box {
          background-color: white;
          color: black;
          padding: 10px 20px;
          border-radius: 20px;
          border: 1px solid orange;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          transition: transform 0.2s;
          text-align: center;
        }

        .calendar-box:hover {
          transform: scale(1.05);
        }

        .calendar-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          margin-top: 5px;
        }

        .custom-calendar {
          position: absolute;
          top: 60px;
          right: 0;
          z-index: 999;
          background-color: #fff3e0;
          padding: 5px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          width: 250px;
        }

        .quote {
          margin: 20px 0;
          text-align: center;
          font-weight: bold;
          opacity: 0;
          animation: fadeIn 2s ease 1s forwards;
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          color: #A34F00;
          margin-top: 30px;
        }

        .progress-bar {
          margin-top: 10px;
          height: 20px;
          background-color: #d3b8ac;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress {
          height: 100%;
          background-color: #923f1c;
          text-align: left;
          color: white;
          font-size: 12px;
          line-height: 20px;
          padding-left: 5px;
          animation: growProgressSlow 4s ease forwards;
        }

        .footer-quote {
          margin-top: 30px;
          text-align: center;
          color: #444;
          font-style: italic;
          opacity: 0.7;
          transition: all 0.5s;
        }

        .footer-quote:hover {
          color: #000;
          opacity: 1;
        }

        .react-calendar {
          border: none;
          width: 100%;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }

        .react-calendar__tile--active {
          background: orange !important;
          color: white !important;
          border-radius: 50%;
        }
      `}</style>

      {/* <nav>
        <div className="logo">Swaad Bite</div>
        <div className="nav-links">
          {['Home', 'Explore', 'Feedback', 'Orders', 'Plans'].map((item) => (
            <a
              key={item}
              href="#"
              className={activeLink === item ? 'active' : ''}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </a>
          ))}
        </div>
      </nav> */}

      <div className="main">
        <div className="header">
          <div className="user-info">
            <img src={user.photo} alt="profile" />
            <div>
              <h2>Welcome back {user.name}!</h2>
              <p>Your SwaadBite subscription is active.</p>
            </div>
          </div>
          <div className="right-side">
            <button className="renew-button">Renew Plan</button>
            <div className="calendar-container">
              <div className="calendar-box" onClick={handleCalendarClick}>
                <FaCalendarAlt />
                <div>Calendar</div>
                <div>{selectedDate.toLocaleDateString('en-GB')}</div>
              </div>
              {showCalendar && (
                <div className="custom-calendar">
                  <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="quote">
          "Good food brings good mood. Stay consistent. Stay nourished."
        </div>

        <div className="section-title">Plan Details</div>
        <p><b>Plan Type:</b> Monthly</p>
        <p><b>Start Date:</b> 2025-06-27</p>
        <p><b>End Date:</b> 2025-07-26</p>
        <p>{remainingDays.toFixed(0)} days remaining in your plan.</p>

        <div className="progress-bar">
          <div className="progress">
            {progressPercent}%
          </div>
        </div>

        <div className="section-title">Mess Details</div>
        <p><b>Mess Name:</b> FindYourMess Central</p>
        <p><b>Owner Name:</b> Priya Sharma</p>

        <div className="footer-quote">
          "Track your meals, manage your days — your plan, your control."
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
