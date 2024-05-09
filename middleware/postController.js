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

exports.createPost = async (req, res) => {
  res.status(201).json({ message: "create post" });
};
exports.createCommment = async (req, res) => {
  const postId = req.params.postId;
  res.status(201).json({ message: "create comment for post" });
};
