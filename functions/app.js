require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const placesRouter = require("../routes/places");

app.use(cors()); // Allows all origins by default
app.options("*", cors()); // Preflight requests
app.use(express.json());

app.use("/api", placesRouter);
module.exports = { app };
