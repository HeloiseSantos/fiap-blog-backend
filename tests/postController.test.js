const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const Post = require("../models/Post");
const { validationResult } = require("express-validator");

// Mock Post model
jest.mock("../models/Post");

jest.mock("express-validator", () => {
  return {
    validationResult: jest.fn(),
  };
});

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
      // ARRANGE
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Post.find.mockRejectedValue(new Error("Error fetching posts"));

      // ACT
      await getPosts(req, res);

      // ASSERT
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

describe("getPostById", () => {
  it("deve retornar um post por ID", async () => {
    // ARRANGE
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulate Post.findById() returning a post
    Post.findById.mockResolvedValue({ title: "Post 1" });

    // ACT
    await getPostById(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ title: "Post 1" });
  });

  it("should return 404 if post is not found", async () => {
    // ARRANGE
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Post.findById.mockResolvedValue(null);

    // ACT
    await getPostById(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "There is no post with the requested id.",
    });
  });

  it("should return 500 if an error occurs", async () => {
    // ARRANGE
    const req = { params: { id: "123" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Post.findById.mockRejectedValue(new Error("Error fetching post"));

    // ACT
    await getPostById(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("createPost", () => {
  it("should create a new post", async () => {
    // ARRANGE
    const req = {
      body: {
        title: "Título Teste",
        author: "Autor Teste",
        description: "Descrição Teste",
        createDate: "2024-10-13",
        updateDate: "2024-10-14",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock validationResult to return no errors
    validationResult.mockImplementation(() => ({
      isEmpty: () => true,
    }));

    // Object returned by save()
    const mockSavedPost = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      createDate: req.body.createDate,
      updateDate: req.body.updateDate,
    };

    // Defining the mock for Post with a mocked instance
    const mockPostInstance = {
      save: jest.fn().mockResolvedValue(mockSavedPost),
    };

    // Mock the Post implementation so that it returns mockPostInstance
    Post.mockImplementation(() => mockPostInstance);

    // ACT
    await createPost(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      title: "Título Teste",
      author: "Autor Teste",
      description: "Descrição Teste",
      createDate: "2024-10-13",
      updateDate: "2024-10-14",
    });

    expect(mockPostInstance.save).toHaveBeenCalled();
  });

  it("should return error 400 if there are validation errors", async () => {
    // ARRANGE
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simulating validation error
    validationResult.mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: "Validation error" }],
    });

    // ACT
    await createPost(req, res);

    // ASSERT
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: [{ msg: "Validation error" }],
    });
  });

  it("should return error 500 if an error occurs when creating the post", async () => {
    // ARRANGE
    const req = {
      body: {
        title: "Título de Teste",
        author: "Autor de Teste",
        description: "Descrição de Teste",
        createDate: "2024-10-13",
        updateDate: "2024-10-14",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock validationResult to return no errors
    validationResult.mockImplementation(() => ({
      isEmpty: () => true,
    }));

    const mockPostInstance = {
      save: jest.fn().mockRejectedValue(new Error("Error creating post")),
    };

    Post.mockImplementation(() => mockPostInstance);

    // ACT
    await createPost(req, res);

    // ASSERT
    expect(mockPostInstance.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.any(Error));
  });
});
