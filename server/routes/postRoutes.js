const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Post, User } = require("../models");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB file size limit
});

// Get all posts
router.get("/", async (req, res) => {
  console.log("GET /posts route hit");
  try {
    const posts = await Post.findAll();
    console.log("Posts fetched:", posts);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ message: "Error fetching posts", error: error.message });
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
});

// Create a new post
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("Received post data:", req.body);
      console.log("Received files:", req.files);

      const postData = {
        content: req.body.content,
        UserId: req.body.userId,
      };

      if (req.files && req.files.image) {
        postData.imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      if (req.files && req.files.video) {
        postData.videoUrl = `/uploads/${path.basename(
          req.files.video[0].path
        )}`;
      }

      const newPost = await Post.create(postData);
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res
        .status(500)
        .json({
          message: "Error creating post",
          error: error.message,
          stack: error.stack,
        });
    }
  }
);

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const updated = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated[0] === 1) {
      res.json({ message: "Post updated successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating post", error });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id },
    });
    if (deleted === 1) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
});

// Add a comment to a post
router.post("/:postId/comments", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.body.userId,
      PostId: post.id,
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment to post", error });
  }
});

// Get all comments for a post
router.get("/:postId/comments", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId, {
      include: [{ model: Comment, include: [User] }],
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post.Comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching comments for post", error });
  }
});

// Like a post
router.post("/:postId/like", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    const user = await User.findByPk(req.body.userId);
    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }
    await post.addLikedBy(user);
    await post.increment("likesCount");
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error liking post", error });
  }
});

// Share a post
router.post("/:postId/share", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    const user = await User.findByPk(req.body.userId);
    if (!post || !user) {
      return res.status(404).json({ message: "Post or User not found" });
    }
    await post.addSharedBy(user);
    await post.increment("sharesCount");
    res.json({ message: "Post shared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sharing post", error });
  }
});

module.exports = router;
