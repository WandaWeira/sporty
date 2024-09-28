const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
});

// Create a new event
router.post('/', async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event', error });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  try {
    const updated = await Event.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Event updated successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating event', error });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

// Add a user to an event
router.post('/:eventId/users/:userId', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    const user = await User.findByPk(req.params.userId);
    if (!event || !user) {
      return res.status(404).json({ message: 'Event or User not found' });
    }
    await event.addUser(user);
    res.json({ message: 'User added to event successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user to event', error });
  }
});

// Get all users in an event
router.get('/:eventId/users', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId, {
      include: [User]
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event.Users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users in event', error });
  }
});

module.exports = router;