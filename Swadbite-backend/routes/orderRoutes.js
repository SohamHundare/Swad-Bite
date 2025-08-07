const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/orderController");

router.post("/createorder", createOrder);
router.get("/getallorders", getAllOrders);

module.exports = router;
