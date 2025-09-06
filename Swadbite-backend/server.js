const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const testimonialRoutes = require('./routes/testimonialRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const orderHistoryRoutes = require("./routes/OrderHistory");


const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use("/api/orderHistory", orderHistoryRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/testimonials", testimonialRoutes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });