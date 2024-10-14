const router = require("express").Router();
const { body } = require("express-validator");
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);

router.get("/:id", postController.getPostById);

router.post(
  "/",
  [body("createDate").isDate(), body("updateDate").isDate()],
  postController.createPost
);

router.put("/:id", postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;
