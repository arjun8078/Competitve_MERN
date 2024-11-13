
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  playerId: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  role: { type: String, default: 'player' },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Player', playerSchema);
