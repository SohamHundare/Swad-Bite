<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
require("dotenv").config();
const testimonialRoutes = require('./routes/testimonialRoutes');
=======
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import stripeRoutes from "./routes/stripeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
>>>>>>> af750bba76d2ef5c61141da24e9426c7e4a78728

dotenv.config();
const app = express();


  // const paymentRoutes = require("./routes/stripeRoutes");
app.use(cors());
app.use(express.json({limit:'10mb'}));

<<<<<<< HEAD
// Existing routes
app.use("/api/stripe", require("./routes/stripeRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
=======
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
>>>>>>> af750bba76d2ef5c61141da24e9426c7e4a78728

// Add this line for testimonials API
app.use("/api/testimonials", testimonialRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
<<<<<<< HEAD
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
=======
  .catch((err) => console.error("MongoDB connection failed:", err.message));





>>>>>>> af750bba76d2ef5c61141da24e9426c7e4a78728
