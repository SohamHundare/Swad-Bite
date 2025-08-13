const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
require("dotenv").config();
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();

app.use(cors());
app.use(express.json({limit:'10mb'}));

// Existing routes
app.use("/api/stripe", require("./routes/stripeRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Add this line for testimonials API
app.use("/api/testimonials", testimonialRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });