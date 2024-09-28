const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
});

// Update a post
router.put('/:id', async (req, res) => {
  try {
    const updated = await Post.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Post updated successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
});

// Add a comment to a post
router.post('/:postId/comments', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      const comment = await Comment.create({
        content: req.body.content,
        UserId: req.body.userId,
        PostId: post.id
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment to post', error });
    }
  });
  
  // Get all comments for a post
  router.get('/:postId/comments', async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.postId, {
        include: [{ model: Comment, include: [User] }]
      });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post.Comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments for post', error });
    }
  });

// Like a post
router.post('/:postId/like', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    const user = await User.findByPk(req.body.userId);
    if (!post || !user) {
      return res.status(404).json({ message: 'Post or User not found' });
    }
    await post.addLikedBy(user);
    await post.increment('likesCount');
    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
});

// Share a post
router.post('/:postId/share', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.postId);
    const user = await User.findByPk(req.body.userId);
    if (!post || !user) {
      return res.status(404).json({ message: 'Post or User not found' });
    }
    await post.addSharedBy(user);
    await post.increment('sharesCount');
    res.json({ message: 'Post shared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sharing post', error });
  }
});

module.exports = router;