const express = require("express");
const router = express.Router();
require("dotenv").config();

// Tidal presave route
router.post("/presave", (req, res) => {
  const { songId } = req.body;

  if (!songId) {
    return res.status(400).json({ error: "Song ID is required" });
  }

  res.status(200).json({
    message: "Presave for Tidal",
    songId: songId,
    presaveStatus: "This is a placeholder, integration needed with Tidal API",
  });
});

module.exports = router;