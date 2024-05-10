const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

exports.allPosts = async (req, res) => {
  res.status(201).json({ message: "returns all posts" });
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

    const post = new Post({
      userId: userId,
      text: text,
    });
    await post.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create comment
exports.createCommment = async (req, res) => {
  const postId = req.params.postId;
  res.status(201).json({ message: "create comment for post" });
};
