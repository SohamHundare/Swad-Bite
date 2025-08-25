// src/services/api.js
import axios from 'axios';

export const submitFeedback = (feedbackData) => {
  return axios.post('https://swadbite-backend-2.onrender.com/api/feedback/submit', feedbackData);
};

export const getFeedback = () => {
  return axios.get('https://swadbite-backend-2.onrender.com/api/feedback/get');
};
