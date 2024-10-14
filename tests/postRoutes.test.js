const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Mock de conexão com o banco de dados para testes
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

// Limpa o banco de dados após cada teste
afterEach(async () => {
  await Post.deleteMany({});
});

// Desconecta do banco de dados após todos os testes
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /posts", () => {
  it("Deve criar um novo post", async () => {
    // Cria um post no banco de dados
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
