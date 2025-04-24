const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com/api/token";

// Middleware to authenticate with Spotify
const authenticateSpotify = async (req, res, next) => {
  try {
    const response = await axios.post(
      SPOTIFY_ACCOUNTS_URL,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
        },
      }
    );
    req.spotifyToken = response.data.access_token;
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to authenticate with Spotify" });
  }
};

// Route to handle Spotify presave
router.post("/presave", authenticateSpotify, async (req, res) => {
  const { userId, playlistId, trackUri } = req.body;

  if (!userId || !playlistId || !trackUri) {
    return res
      .status(400)
      .json({ error: "userId, playlistId, and trackUri are required" });
  }

  try {
    const response = await axios.post(
      `${SPOTIFY_API_BASE_URL}/users/${userId}/playlists/${playlistId}/tracks`,
      { uris: [trackUri] },
      {
        headers: {
          Authorization: `Bearer ${req.spotifyToken}`,
        },
      }
    );
    res.status(200).json({ message: "Track added to playlist successfully!" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add track to playlist",
      details: error.response.data,
    });
  }
});

module.exports = router;