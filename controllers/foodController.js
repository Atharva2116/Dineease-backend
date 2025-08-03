import mongoose from "mongoose";
import Food from "../models/Food.js";

// GET all food items
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch food items", error: err.message });
  }
};
export const getFoodItemById = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching food with ID:", id);  // Should match Mongo shell ID

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("Invalid ObjectId format");
    return res.status(400).json({ message: "Invalid food item ID" });
  }

  try {
    const foodItem = await Food.findById(id);
    console.log("Query result:", foodItem);
    
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.json(foodItem);
  } catch (error) {
    console.error("Server error while fetching food item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
