require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PASSKEY = process.env.PASSKEY;
const GOOGLE_PLACES_URL = "https://places.googleapis.com/v1/places:searchText";

router.post("/search", async (req, res) => {
  console.log("✅ search router");

  const body = {};
  console.log("req:", req);
  if (req.body) {
    // console.log("body", req.body);
    body["passkey"] = req.body["passkey"];
    body["textQuery"] = req.body["textQuery"];
  } else if (req.apiGateway) {
    // console.log("body", "req.apiGateway.event.body");
    const reqBody = await req.apiGateway.event.body;
    body["passkey"] = JSON.parse(reqBody)["passkey"];
    body["textQuery"] = JSON.parse(reqBody)["textQuery"];
  } else {
    console.log("❌ Bad request. No body present");
    return res.status(400).json({ error: "Bad request. No body present" });
  }

  if (!body.passkey || body.passkey !== PASSKEY) {
    console.log("❌ Unauthorized - passkey is required");
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (!body.textQuery) {
    console.log("❌ textQuery is required");
    return res.status(400).json({ error: "textQuery is required" });
  }

  try {
    const response = await axios.post(
      GOOGLE_PLACES_URL,
      { textQuery: body.textQuery },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location",
        },
      }
    );

    console.log("✅ successful");
    res.json(response.data);
  } catch (error) {
    console.log("❌ Server error");
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
