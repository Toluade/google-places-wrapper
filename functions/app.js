require("dotenv").config();

const express = require("express");
const app = express();
const placesRouter = require("../routes/places");

app.use(express.json());

app.use("/api", placesRouter);
module.exports = { app };
