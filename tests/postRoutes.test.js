const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Mock database connection for testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

// Clear the database after each test
afterEach(async () => {
  await Post.deleteMany({});
});

// Disconnect from database after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /posts", () => {
  it("Should create a new post", async () => {
    // Creates a post in the database
    const post = new Post({
      title: "Título do Post",
      author: "Autor do Post",
      description: "Descrição do Post",
      createDate: "2023-10-13",
      updateDate: "2023-10-13",
    });
    await post.save();

    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
