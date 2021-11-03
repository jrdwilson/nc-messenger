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
  });
});
