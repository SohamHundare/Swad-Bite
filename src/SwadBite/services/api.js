import axios from "axios";

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
