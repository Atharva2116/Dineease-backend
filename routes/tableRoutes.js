import express from "express";
import Table from "../models/tableModel.js";

const router = express.Router();

// GET all tables
router.get("/", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tables" });
  }
});

// PUT book a table
router.put("/:id/book", async (req, res) => {
  const { time, duration } = req.body;
  console.log("Booking request received:", req.body);

  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    if (table.isBooked) return res.status(400).json({ message: "Already booked" });

    table.isBooked = true;
    table.time = time;
    table.duration = duration;

    await table.save();
    console.log("Table booked:", table);
    res.json({ message: "Table booked successfully", table });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error booking table" });
  }
});

// PUT cancel booking
router.put("/:id/cancel", async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    table.isBooked = false;
    table.time = null;
    table.duration = null;

    await table.save();
    res.json({ message: "Booking cancelled", table });
  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

export default router;
