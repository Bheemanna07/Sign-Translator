import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET","POST"],
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

app.use("/sign-translator", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
