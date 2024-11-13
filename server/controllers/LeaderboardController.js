
const Player = require('../models/Players');

exports.getLeaderboard = async (req, res) => {
  try {
    const players = await Player.find().sort({ score: -1, name: 1 }).limit(10);
    res.send(players);
  } catch (error) {
    res.status(500).send('Error retrieving leaderboard');
  }
};

exports.updateScore = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;

  if (req.user.role !== 'admin' && req.user.playerId !== id) {
    return res.status(403).send('Access denied.');
  }

  try {
    const player = await Player.findByIdAndUpdate(id, { score }, { new: true });
    res.send(player);
  } catch (error) {
    res.status(500).send('Error updating score');
  }
};
