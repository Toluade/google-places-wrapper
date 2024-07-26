require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const app = express();
const placesRouter = require("../routes/places");

// const PORT = process.env.PORT || 3003;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

app.use("/.netlify/functions/app/places", placesRouter);
module.exports.handler = serverless(app);
