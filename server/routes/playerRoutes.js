const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching players', error });
  }
});

// Get player by ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching player', error });
  }
});

// Create a new player
router.post('/', async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating player', error });
  }
});

// Update a player
router.put('/:id', async (req, res) => {
  try {
    const updated = await Player.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Player updated successfully' });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating player', error });
  }
});

// Delete a player
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Player.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Player deleted successfully' });
    } else {
      res.status(404).json({ message: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting player', error });
  }
});

module.exports = router;