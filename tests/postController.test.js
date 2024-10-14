const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const Post = require("../models/Post");

// Mock Post model
jest.mock("../models/Post");

describe("Post Controller", () => {
  describe("getPosts", () => {
    it("should return posts list", async () => {
      // ARRANGE
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Post.find.mockResolvedValue([{ title: "Post 1" }, { title: "Post 2" }]);

      // ACT
      await getPosts(req, res);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { title: "Post 1" },
        { title: "Post 2" },
      ]);
    });

    it("should return error 500 if an error occurs", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Post.find.mockRejectedValue(new Error("Error fetching posts"));

      await getPosts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

describe("getPostById", () => {
  it("deve retornar um post por ID", async () => {
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simula o Post.findById() retornando um post
    Post.findById.mockResolvedValue({ title: "Post 1" });

    await getPostById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ title: "Post 1" });
  });

  it("should return 404 if post is not found", async () => {
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Post.findById.mockResolvedValue(null);

    await getPostById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "There is no post with the requested id.",
    });
  });

  it("should return 500 if an error occurs", async () => {
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Post.findById.mockRejectedValue(new Error("Error fetching post"));

    await getPostById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.any(Error));
  });
});
