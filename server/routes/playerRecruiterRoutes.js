const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all player recruiters
router.get('/', async (req, res) => {
  try {
    const recruiters = await PlayerRecruiter.findAll();
    res.json(recruiters);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching player recruiters', error });
  }
});

// Get player recruiter by ID
router.get('/:id', async (req, res) => {
  try {
    const recruiter = await PlayerRecruiter.findByPk(req.params.id);
    if (recruiter) {
      res.json(recruiter);
    } else {
      res.status(404).json({ message: 'Player recruiter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching player recruiter', error });
  }
});

// Create a new player recruiter
router.post('/', async (req, res) => {
  try {
    const newRecruiter = await PlayerRecruiter.create(req.body);
    res.status(201).json(newRecruiter);
  } catch (error) {
    res.status(400).json({ message: 'Error creating player recruiter', error });
  }
});

// Update a player recruiter
router.put('/:id', async (req, res) => {
  try {
    const updated = await PlayerRecruiter.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Player recruiter updated successfully' });
    } else {
      res.status(404).json({ message: 'Player recruiter not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating player recruiter', error });
  }
});

// Delete a player recruiter
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PlayerRecruiter.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Player recruiter deleted successfully' });
    } else {
      res.status(404).json({ message: 'Player recruiter not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting player recruiter', error });
  }
});

module.exports = router;