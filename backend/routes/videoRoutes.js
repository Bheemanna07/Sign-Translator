import express from "express";
import Video from "../models/Video.js";

const router = express.Router();

// ✅ Create Video
router.post("/videos/create-video", async (req, res) => {
  try {
    const video = new Video(req.body);
    const saved = await video.save();
    res.json({ videoId: saved._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to create video" });
  }
});

// ✅ Get All Videos
router.get("/videos/all-videos", async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
});

// ✅ Get Video By ID
router.get("/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch {
    res.status(404).json({ error: "Not found" });
  }
});

export default router;
