require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const app = express();
const placesRouter = require("../routes/places");

app.use("/.netlify/functions/app/places", placesRouter);
module.exports.handler = serverless(app);
