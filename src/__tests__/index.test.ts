import supertest from "supertest";
import server from "../app";

const request = supertest(server);

describe("Elevator Testing suite", () => {
  it("should test that getting destination from api/all-destinations works correctly", async () => {
    const response = await request.get("/api/all-destinations");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.length).toEqual(1);
    expect(response.body[0]).toEqual(4);
  });

  it("should test that when we add a new request, we can retrieve it right away", async () => {
    const validReq = {
      destination: 12345,
      direction: 0,
    };

    const response = await request.post("/api/new-req").send(validReq);
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.length).toEqual(2);
    expect(response.body[1]).toEqual(12345);
  });

  it("should test that when we send a seies of requests they are stored in a right way as destinations", async () => {
    await request.get("/api/reset");
    const reqArr = [
      {
        destination: 7,
        direction: -1,
      },
      {
        destination: 2,
        direction: 1,
      },
      {
        destination: 3,
        direction: 1,
      },
      {
        destination: 1,
        direction: -1,
      },
      {
        destination: 6,
        direction: 1,
      },
      {
        destination: 5,
        direction: -1,
      },
    ];

    await Promise.all(
      reqArr.map(async (elem) => {
        await request.post("/api/new-req").send(elem);
      })
    );

    const response = await request.get("/api/all-destinations");

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify([4, 6, 7, 5, 2, 3, 1])
    );
  });
});
