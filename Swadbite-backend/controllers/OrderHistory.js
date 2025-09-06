const OrderHistory = require("../models/OrderHistory");

// Create new order
const createOrder = async (req, res) => {
  try {
    console.log("📥 Incoming Order:", req.body); // Debug
    const order = new OrderHistory(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(400).json({ error: err.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderHistory.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await OrderHistory.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const saveOrderToBackend = async (newOrder) => {
  try {
    const res = await saveOrder(newOrder);
    if (res.status === 201) {
      console.log("✅ Order saved to MongoDB:", res.data);
    }
  } catch (err) {
    console.error("❌ Error saving order:", err);
  }
};

module.exports = { getAllOrders,getOrdersByUser, createOrder,saveOrderToBackend  };