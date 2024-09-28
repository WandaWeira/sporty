const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all scouts
router.get('/', async (req, res) => {
  try {
    const scouts = await Scout.findAll();
    res.json(scouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scouts', error });
  }
});

// Get scout by ID
router.get('/:id', async (req, res) => {
  try {
    const scout = await Scout.findByPk(req.params.id);
    if (scout) {
      res.json(scout);
    } else {
      res.status(404).json({ message: 'Scout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scout', error });
  }
});

// Create a new scout
router.post('/', async (req, res) => {
  try {
    const newScout = await Scout.create(req.body);
    res.status(201).json(newScout);
  } catch (error) {
    res.status(400).json({ message: 'Error creating scout', error });
  }
});

// Update a scout
router.put('/:id', async (req, res) => {
  try {
    const updated = await Scout.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Scout updated successfully' });
    } else {
      res.status(404).json({ message: 'Scout not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating scout', error });
  }
});

// Delete a scout
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Scout.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Scout deleted successfully' });
    } else {
      res.status(404).json({ message: 'Scout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting scout', error });
  }
});

module.exports = router;