const express = require("express");
const app = express();
const port = 5000;
const mongodb = require("./db");
const orderRoutes = require('./Routes/OrderRoutes');
const cors = require("cors");






app.use(cors({
  origin: 'http://localhost:3000',  
  methods: 'GET,POST,PUT,DELETE',  
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

mongodb();


app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello, world!");
});


app.use("/api/orders",orderRoutes);
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); 
});