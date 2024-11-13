// utils.js
const jwt = require("jsonwebtoken");


function generateToken(player) {
  return jwt.sign(
    {
      id: player._id,   
      role: player.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }      
  );
}

module.exports = { generateToken };
