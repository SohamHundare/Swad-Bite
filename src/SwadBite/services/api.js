import axios from "axios";

<<<<<<< HEAD
const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// Existing functions
export const createOrder = (data) => API.post("/orderHistory", data);
export const getAllOrders = () => API.get("/orderHistory");
export const getOrdersByUser = (userId) => API.get(`/orderHistory/${userId}`);
export const getFeedback = () => API.get("/feedback");
export const submitFeedback = (data) => API.post("/feedback", data);

// ✅ Add this
export const saveOrder = (data) => API.post("/orderHistory", data);
=======
export const submitFeedback = (feedbackData) => {
  return axios.post('https://swadbite-backend-2.onrender.com/api/feedback/submit', feedbackData);
};

export const getFeedback = () => {
  return axios.get('https://swadbite-backend-2.onrender.com/api/feedback/get');
};
>>>>>>> aad89e6f84c7736c994ce89e0dff4284cd4f3e3e
