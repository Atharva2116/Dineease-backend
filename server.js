import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tableRoutes from "./routes/tableRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

dotenv.config();

const app = express();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/food", foodRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});
export default app;

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
