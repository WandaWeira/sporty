const express = require('express');
const router = express.Router();
const { Message, User } = require('../models');

// Send a private message
router.post('/send', async (req, res) => {
  try {
    const { senderId, recipientId, content } = req.body;
    const message = await Message.create({
      senderId,
      recipientId,
      content
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// Get user's inbox
router.get('/inbox/:userId', async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { recipientId: req.params.userId },
      include: [{ model: User, as: 'sender', attributes: ['id', 'username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inbox', error });
  }
});

// Get user's sent messages
router.get('/sent/:userId', async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { senderId: req.params.userId },
      include: [{ model: User, as: 'recipient', attributes: ['id', 'username'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sent messages', error });
  }
});

// Mark message as read
router.put('/:messageId/read', async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    await message.update({ isRead: true });
    res.json({ message: 'Message marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error });
  }
});

module.exports = router;
