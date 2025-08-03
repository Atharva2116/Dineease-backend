import mongoose from "mongoose";

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
    time: { type: String, default: null },
    duration: { type: String, default: null },
  },
  { collection: "tables" } // 👈 Add this line explicitly
);

const Table = mongoose.model("Table", tableSchema);
export default Table;
