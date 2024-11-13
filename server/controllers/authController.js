
const Player = require('../models/Players');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, playerId, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newPlayer = new Player({ name, playerId, password: hashedPassword, role });
    await newPlayer.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  const { playerId, password } = req.body;

  try {
    const player = await Player.findOne({ playerId });
    if (!player || !(await bcrypt.compare(password, player.password))) {
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ _id: player._id, role: player.role, playerId: player.playerId }, process.env.JWT_SECRET);
    res.send({
      token,
      userId: player._id,
      role: player.role,
    });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
  
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await Player.find({}, { password: 0 }); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send('Error fetching users');
    }
  };
