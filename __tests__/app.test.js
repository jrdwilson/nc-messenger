// const db = require("../db/connection.js");
// const testData = require("../db/data/test-data/index.js");
// const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
require("jest-sorted");

describe("app.js", () => {
  describe("/api", () => {
    test("missing endpoint should return 404 ", () => {
      return request(app).get("/api/missingEndpoint").expect(404);
    });

    describe("/api/chat", () => {
      describe("GET", () => {
        test("GET /api/chat should return all chat data", () => {
          return request(app)
            .get("/api/chat")
            .expect(200)
            .then(({ body }) => {
              expect(typeof body.chat).toBe("object");
            });
        });
      });
    });
  });
});
