import axios from "axios";

// Create a single API instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// Orders
export const createOrder = (data) => API.post("/orderHistory", data);
export const getAllOrders = () => API.get("/orderHistory");
export const getOrdersByUser = (userId) => API.get(`/orderHistory/${userId}`);
export const saveOrder = (data) => API.post("/orderHistory", data);

// Feedback
export const getFeedback = () => API.get("/feedback");
export const submitFeedback = (data) => API.post("/feedback", data);

// If you want to use the deployed backend, uncomment this:
// export const submitFeedback = (feedbackData) => {
//   return axios.post('https://swadbite-backend-2.onrender.com/api/feedback/submit', feedbackData);
// };
// export const getFeedback = () => {
//   return axios.get('https://swadbite-backend-2.onrender.com/api/feedback/get');
// };
