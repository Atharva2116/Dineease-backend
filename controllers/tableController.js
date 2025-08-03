import Table from "../models/tableModel.js";

// GET all tables
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tables" });
  }
};

// PUT /api/tables/:id/book
export const bookTable = async (req, res) => {
  try {
    const { id } = req.params;
    const { time, duration } = req.body;

    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    if (table.isBooked) return res.status(400).json({ message: "Table already booked" });

    table.isBooked = true;
    table.time = time;
    table.duration = duration;

    await table.save();

    res.json({ message: "Table booked successfully", table });
  } catch (error) {
    console.error("Error booking table:", error);
    res.status(500).json({ message: "Error booking table" });
  }
};

// PUT /api/tables/:id/cancel
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const table = await Table.findById(id);
    if (!table) return res.status(404).json({ message: "Table not found" });

    table.isBooked = false;
    table.time = null;
    table.duration = null;

    await table.save();

    res.json({ message: "Booking cancelled", table });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
};
