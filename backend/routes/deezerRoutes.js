const express = require("express");
const router = express.Router();
require("dotenv").config();

// Deezer presave route
router.post("/presave", (req, res) => {
  const { songId } = req.body;

  if (!songId) {
    return res.status(400).json({ error: "Song ID is required" });
  }

  res.status(200).json({
    message: "Presave for Deezer",
    songId: songId,
    presaveStatus: "This is a placeholder, integration needed with Deezer API",
  });
});

module.exports = router;