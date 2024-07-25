require("dotenv").config(); // Load environment variables

const request = require("supertest");
const express = require("express");
const placesRouter = require("../routes/places");

const app = express();
app.use(express.json());
app.use("/places", placesRouter);

describe("POST /places/search", () => {
  it("should return place information for a valid text query", async () => {
    const response = await request(app)
      .post("/places/search")
      .send({ textQuery: "18 Olayinka Street" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("places");
    expect(response.body.places).toBeInstanceOf(Array);
  });

  it("should return a 400 error if textQuery is missing", async () => {
    const response = await request(app).post("/places/search").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
