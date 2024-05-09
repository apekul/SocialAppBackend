const express = require("express");
const router = express.Router();
const postController = require("../middleware/postController");

// Get all Posts
router.get("/allPosts", postController.allPosts);
// Get all posts created by User ID
router.get("/byUser/:userId", postController.getPostsByUser);
// Get all posts that user ID commented on
router.get("/commentedBy/:userId", postController.getPostsCommentedByUser);
// Get Comments for a post by its ID
router.get("/:postId/comments", postController.getCommentsForPost);

// Create post
router.post("/createPost", postController.createPost);
// Create comment with post ID
router.post("/:postId/createCommment", postController.createCommment);

module.exports = router;
