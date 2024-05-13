const Post = require("../models/Post");
const Comment = require("../models/Comment");
const jwt = require("jsonwebtoken");

// return all posts in DB
exports.allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPostsByUser = async (req, res) => {
  const userId = req.params.userId;
  res.status(201).json({ message: "returns all posts user created" });
};

exports.getPostsCommentedByUser = async (req, res) => {
  const userId = req.params.userId;
  res.status(201).json({ message: "returns all posts commented by user" });
};

exports.getCommentsForPost = async (req, res) => {
  const postId = req.params.postId;
  res.status(201).json({ message: "returns comments for post" });
};

// Create Post
exports.createPost = async (req, res) => {
  const { text } = req.body;
  const accessToken = req.headers["authorization"];

  try {
    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required." });
    }

    const post = new Post({
      userId: userId,
      text: text,
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Create post error" });
  }
};

// Create comment for post
exports.createCommment = async (req, res) => {
  const { text, parentCommentId } = req.body;
  const postId = req.params.postId;
  const accessToken = req.headers["authorization"];

  try {
    // Check if provided text exists. Trim to get rid of whitespace
    if (!text.trim()) {
      return res.status(400).json({ error: "Text field is required." });
    }

    // Check if commented post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Check if parent Comment id exists
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment not found." });
      }
    }

    // Extract user id from accessToken
    const decodedToken = jwt.decode(accessToken);
    const userId = decodedToken._id;

    const comment = new Post({
      userId: userId,
      postId,
      text: text,
      parentCommentId: parentCommentId,
    });

    await comment.save();
    res.status(201).json({ message: "create comment for post" });
  } catch (error) {
    res.status(500).json({ message: "Create comment error" });
  }
};
