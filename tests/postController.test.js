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
