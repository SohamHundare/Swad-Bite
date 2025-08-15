import React from 'react';
import './Offers.css';

const OfferDetails = ({ offer }) => {
  return (
    <div className="offer-details" data-aos="zoom-in">
      <h3>{offer.title}</h3>
      <img src={offer.image} alt={offer.title} />
      <p> Enjoy this exclusive deal only on SwadBite. Offer valid till end of this month !!</p>
    </div>
  );
};

export default OfferDetails;
