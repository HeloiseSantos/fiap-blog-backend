const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(201).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
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
});

router.post(
  "/",
  [body("createDate").isDate(), body("updateDate").isDate()],
  async (req, res) => {
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

      await post.save();

      return res.status(201).json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
);

router.put("/:id", async (req, res) => {
  try {
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
});

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    return res.status(204).json();
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
