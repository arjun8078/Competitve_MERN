const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkAdminOrOwner = require("../middleware/checkAdminOrOwner");
const Player = require("../models/Player");


router.patch("/:id/score", authMiddleware, checkAdminOrOwner, async (req, res) => {
  const { score } = req.body;

  try {
    const player = await Player.findById(req.params.id);

    if (!player) {
      return res.status(404).send("Player not found");
    }

    player.score = score;
    await player.save();
    
    res.send({ message: "Score updated successfully", player });
  } catch (err) {
    res.status(500).send("Error updating score");
  }
});

module.exports = router;
