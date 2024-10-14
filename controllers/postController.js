const { validationResult } = require("express-validator");
const Post = require("../models/Post");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
        .status(404)
        .json({ message: "There is no post with the requested id." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const post = new Post({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      createDate: req.body.createDate,
      updateDate: req.body.updateDate,
    });

    const savedPost = await post.save();

    return res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        createDate: req.body.createDate,
        updateDate: req.body.updateDate,
      },
      {
        new: true,
      }
    );

    if (!post) {
      return res
        .status(404)
        .json({ message: "There is no post with the requested id." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error);
  }
};
