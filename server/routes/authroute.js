
const express = require('express');
const { register, login , getAllUsers} = require('../controllers/authController');
const router = express.Router();
const { generateToken } = require("../utils")

router.post('/register', register);
router.post('/login', login);
const token = generateToken(player);

router.get('/users', getAllUsers);



module.exports = router;
