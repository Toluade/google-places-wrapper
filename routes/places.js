require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_PLACES_URL = "https://places.googleapis.com/v1/places:searchText";

router.post("/search", async (req, res) => {
  const { textQuery } = req.body;

  if (!textQuery) {
    return res.status(400).json({ error: "textQuery is required" });
  }

  try {
    const response = await axios.post(
      GOOGLE_PLACES_URL,
      { textQuery },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
