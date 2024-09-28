const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.findAll();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournaments', error });
  }
});

// Get tournament by ID
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findByPk(req.params.id);
    if (tournament) {
      res.json(tournament);
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tournament', error });
  }
});

// Create a new tournament
router.post('/', async (req, res) => {
  try {
    const newTournament = await Tournament.create(req.body);
    res.status(201).json(newTournament);
  } catch (error) {
    res.status(400).json({ message: 'Error creating tournament', error });
  }
});

// Update a tournament
router.put('/:id', async (req, res) => {
  try {
    const updated = await Tournament.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Tournament updated successfully' });
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating tournament', error });
  }
});

// Delete a tournament
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Tournament.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Tournament deleted successfully' });
    } else {
      res.status(404).json({ message: 'Tournament not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting tournament', error });
  }
});

// Add a user to a tournament
router.post('/:tournamentId/users/:userId', async (req, res) => {
    try {
      const tournament = await Tournament.findByPk(req.params.tournamentId);
      const user = await User.findByPk(req.params.userId);
      if (!tournament || !user) {
        return res.status(404).json({ message: 'Tournament or User not found' });
      }
      await tournament.addUser(user);
      res.json({ message: 'User added to tournament successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding user to tournament', error });
    }
  });
  
  // Get all users in a tournament
  router.get('/:tournamentId/users', async (req, res) => {
    try {
      const tournament = await Tournament.findByPk(req.params.tournamentId, {
        include: [User]
      });
      if (!tournament) {
        return res.status(404).json({ message: 'Tournament not found' });
      }
      res.json(tournament.Users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users in tournament', error });
    }
  });

module.exports = router;