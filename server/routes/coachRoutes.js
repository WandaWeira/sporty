const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all coaches
router.get('/', async (req, res) => {
  try {
    const coaches = await Coach.findAll();
    res.json(coaches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coaches', error });
  }
});

// Get coach by ID
router.get('/:id', async (req, res) => {
  try {
    const coach = await Coach.findByPk(req.params.id);
    if (coach) {
      res.json(coach);
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coach', error });
  }
});

// Create a new coach
router.post('/', async (req, res) => {
  try {
    const newCoach = await Coach.create(req.body);
    res.status(201).json(newCoach);
  } catch (error) {
    res.status(400).json({ message: 'Error creating coach', error });
  }
});

// Update a coach
router.put('/:id', async (req, res) => {
  try {
    const updated = await Coach.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Coach updated successfully' });
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating coach', error });
  }
});

// Delete a coach
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Coach.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Coach deleted successfully' });
    } else {
      res.status(404).json({ message: 'Coach not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coach', error });
  }
});

module.exports = router;