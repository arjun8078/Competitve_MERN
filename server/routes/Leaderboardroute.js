
const express = require('express');
const { getLeaderboard, updateScore } = require('../controllers/LeaderboardController');
const authMiddleware = require('../middlewares/authmiddlewares');
const router = express.Router();

router.get('/auth/leaderboard', authMiddleware, getLeaderboard);
router.patch('/player/:id/score', authMiddleware, updateScore);

module.exports = router;
