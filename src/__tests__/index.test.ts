import supertest from "supertest";
import server from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const request = supertest(server);

describe("Endpoints Testing suite", () => {
  beforeAll((done) => {
    mongoose.connect(process.env.MONGO_TEST_CONNECTION!).then(() => {
      console.log("Connected to Atlas");
      done();
    });
  });

  it("should test that getting all events from api/event is working correctly", async () => {
    const response = await request.get("/api/event");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("should test that when we add a new event, we can retrieve it right away", async () => {
    const validEvent = {
      sam: 888,
      payload: "test event 888",
    };

    const response = await request.post("/api/event").send(validEvent);
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();

    const response2 = await request.get("/api/event/" + response.body._id);
    expect(response2.status).toBe(200);
    expect(response2.body.sam).toEqual(validEvent.sam);
  });

  afterAll((done) => {
    mongoose.connection.dropDatabase().then(() => {
      mongoose.connection.close().then(done);
    });
  });
});
