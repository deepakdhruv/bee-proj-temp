const mongoose = require("mongoose");

const mongourl = "mongodb+srv://dhruvgrover533:Deepak3168@cluster0.wkpl4.mongodb.net/foodDB";

const mongodb = async () => {
    try {
        
        await mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        
        const foodItemsCollection = mongoose.connection.db.collection("FoodItems");
        const foodCategoriesCollection = mongoose.connection.db.collection("FoodCategory");

       
        const foodItems = await foodItemsCollection.find({}).toArray();
        const foodCategories = await foodCategoriesCollection.find({}).toArray();

       
        global.FoodItems = foodItems;
        global.FoodCategory = foodCategories;

        // console.log(global.FoodItems); 
        // console.log(global.FoodCategory); 

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = mongodb;
