const express = require("express");
const router = express.Router();
const postController = require("../middleware/postController");
const validators = require("../middleware/validators");

// Get all Posts
router.get("/allPosts", validators.verifyToken, postController.allPosts);
// Get all posts created by User ID
router.get(
  "/byUser/:userId",
  validators.verifyToken,
  postController.getPostsByUser
);
// Get all posts that user ID commented on
router.get(
  "/commentedBy/:userId",
  validators.verifyToken,
  postController.getPostsCommentedByUser
);
// Get Comments for a post by its ID
router.get(
  "/:postId/comments",
  validators.verifyToken,
  postController.getCommentsForPost
);
// Create post
router.post("/createPost", validators.verifyToken, postController.createPost);
// Create comment with post ID
router.post(
  "/:postId/createCommment",
  validators.verifyToken,
  postController.createCommment
);

module.exports = router;
