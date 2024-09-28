const express = require('express');
const router = express.Router();
const { Club, Player, Coach, User, Post, Comment, Event, Tournament } = require('../models');

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clubs', error });
  }
});

// Get club by ID
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.id);
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching club', error });
  }
});

// Create a new club
router.post('/', async (req, res) => {
  try {
    const newClub = await Club.create(req.body);
    res.status(201).json(newClub);
  } catch (error) {
    res.status(400).json({ message: 'Error creating club', error });
  }
});

// Update a club
router.put('/:id', async (req, res) => {
  try {
    const updated = await Club.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated[0] === 1) {
      res.json({ message: 'Club updated successfully' });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating club', error });
  }
});

// Delete a club
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Club.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 1) {
      res.json({ message: 'Club deleted successfully' });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting club', error });
  }
});

// Add a player to a club
router.post('/:clubId/players/:playerId', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.clubId);
    const player = await Player.findByPk(req.params.playerId);
    if (!club || !player) {
      return res.status(404).json({ message: 'Club or Player not found' });
    }
    await club.addPlayer(player);
    res.json({ message: 'Player added to club successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding player to club', error });
  }
});

// Add a coach to a club
router.post('/:clubId/coaches/:coachId', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.clubId);
    const coach = await Coach.findByPk(req.params.coachId);
    if (!club || !coach) {
      return res.status(404).json({ message: 'Club or Coach not found' });
    }
    await club.addCoach(coach);
    res.json({ message: 'Coach added to club successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding coach to club', error });
  }
});

// Get all players in a club
router.get('/:clubId/players', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.clubId, {
      include: [{ model: Player, include: [User] }]
    });
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.json(club.Players);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching players in club', error });
  }
});

// Get all coaches in a club
router.get('/:clubId/coaches', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.clubId, {
      include: [{ model: Coach, include: [User] }]
    });
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.json(club.Coaches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coaches in club', error });
  }
});

// Send bulk message to club members
router.post('/:clubId/send-message', async (req, res) => {
  try {
    const club = await Club.findByPk(req.params.clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    const { senderId, content } = req.body;
    await club.sendBulkMessage(senderId, content);
    res.json({ message: 'Bulk message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending bulk message', error });
  }
});

module.exports = router;