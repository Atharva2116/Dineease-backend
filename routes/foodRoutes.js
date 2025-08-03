import express from "express";
import { getAllFoodItems, getFoodItemById } from "../controllers/foodController.js";

const router = express.Router();

// GET all food items
router.get("/", getAllFoodItems);

// GET a single food item by ID
router.get("/:id", getFoodItemById);

export default router;
