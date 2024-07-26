const { app } = require("./app");
const serverless = require("serverless-http");
const placesRouter = require("../routes/places");

app.use("/.netlify/functions/handler/places", placesRouter);
module.exports.handler = serverless(app);
