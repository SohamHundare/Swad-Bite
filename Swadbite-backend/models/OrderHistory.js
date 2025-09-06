const mongoose = require("mongoose");

const orderHistorySchema = new mongoose.Schema({
   
  items: [
    {
      mealName: String,
      planName: String,
      price: Number,
      quantity: Number,
    },
  ],
  amount: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OrderHistory", orderHistorySchema);
