const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
       
        console.log("FoodItems:", global.FoodItems); 
        console.log("FoodCategory:", global.FoodCategory); 

        
        if (global.FoodItems && global.FoodCategory) {
            res.send([global.FoodItems, global.FoodCategory]);
        } else {
            res.status(500).send("Data not found");
        }
    } catch (error) {
        console.error("Server error:", error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;
