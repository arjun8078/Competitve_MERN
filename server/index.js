require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); 
const authRoutes = require('./routes/authroute');
const leaderboardRoutes = require('./routes/Leaderboardroute');
const playerRoutes=require


const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api', leaderboardRoutes);
app.use("/api/player", playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
