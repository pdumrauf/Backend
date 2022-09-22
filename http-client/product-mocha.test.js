const request = require("supertest")("http://localhost:8080/products");
const expect = require("chai").expect;

const product = {
  title: "Created in mocha",
  price: 100,
  thumbnail: "an-url.com",
};

describe("test api products", () => {
  describe("GET ALL", () => {
    it("should return status 200", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });

    it("should return an array", async () => {
      const response = await request.get("/");
      expect(response._body).to.be.an("array");
    });
  });

  describe("GET ONE", () => {
    it("should return status 200", async () => {
      const response = await request.get("/");
      expect(response.status).to.eql(200);
    });

    it("should return a product", async () => {
      const response = await request.get("/29");

      expect(response._body).to.have.property("title");
      expect(response._body).to.have.property("price");
      expect(response._body).to.have.property("thumbnail");
      expect(response._body).to.have.property("id");
    });
  });

  describe("POST", () => {
    it("should return status 201", async () => {
      const response = await request.post("/").send(product);
      expect(response.status).to.eql(201);
    });
    it("should return a product", async () => {
      const response = await request.post("/").send(product);

      expect(response._body).to.have.property("title");
      expect(response._body).to.have.property("price");
      expect(response._body).to.have.property("thumbnail");
      expect(response._body).to.have.property("id");
    });
  });

  describe("UPDATE", () => {
    it("should return status 204", async () => {
        const response = await request.put("/29").send(product);
        expect(response.status).to.eql(204);
    });
  });

  describe("DELETE", () => {
    it("should return status 204", async () => {
        const response = await request.delete("/34");
        expect(response.status).to.eql(204);
    });
  });
});