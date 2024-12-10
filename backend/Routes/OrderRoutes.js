const express = require("express");
const Order = require("../models/OrderModel"); 
const router = express.Router();


router.post("/orderData", async (req, res) => {
  const { email, order_data, order_date } = req.body;

  
  if (!email || !order_data || !order_date) {
    return res.status(400).json({ error: "All fields (email, order_data, order_date) are required" });
  }

  try {
    
    const data = [{ Order_date: order_date }, ...order_data];

   
    const existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
     
      await Order.create({ email, order_data: [data] });
    } else {
     
      await Order.findOneAndUpdate(
        { email },
        { $push: { order_data: data } }
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/myorderData", async (req, res) => {
  const { email } = req.body;

  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    
    const myData = await Order.findOne({ email });

    if (!myData) {
      return res.status(404).json({ error: "No orders found for this email" });
    }

    res.status(200).json({ orderData: myData });
  } catch (error) {
    console.error("Error fetching order data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;