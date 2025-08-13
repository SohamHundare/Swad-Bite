// src/services/api.js
import axios from 'axios';

export const submitFeedback = (feedbackData) => {
  return axios.post('http://localhost:5000/api/feedback/submit', feedbackData);
};

export const getFeedback = () => {
  return axios.get('http://localhost:5000/api/feedback/get');
};
