const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); 
require("dotenv").config();

const app = express();
// const paymentRoutes = require("./routes/stripeRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/stripe", require("./routes/stripeRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

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
