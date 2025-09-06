const express = require("express");
const router = express.Router();

// ✅ Import the correct controller (OrderHistory, not Feedback)
const { createOrder, getAllOrders, getOrdersByUser,saveOrderToBackend  } = require("../controllers/OrderHistory.js");

// Routes
router.post("/", createOrder);        // Create new order
router.get("/", getAllOrders);        // Get all orders
router.get("/:userId", getOrdersByUser); // Get orders by userId
router.post("/save", saveOrderToBackend); // Save order to backend


module.exports = router;
