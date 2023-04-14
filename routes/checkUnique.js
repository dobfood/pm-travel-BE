import express from "express";
import Tour from "../models/Tour.js";
const router = express.Router();

router.get("/check-title/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const post = await Tour.findOne({ title });
    if (post) {
      res.send(false);
    } else {
      res.send(true);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
