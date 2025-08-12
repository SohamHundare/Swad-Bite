// routes/feedbackRoutes.js
import express from "express";
const router = express.Router();
import { submitFeedback, getFeedback } from "../controllers/feedbackController.js";

router.post("/submit", submitFeedback);
router.get("/get", getFeedback);

export default router; 