import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/createorder", createOrder);
router.get("/getallorders", getAllOrders);

export default router;
