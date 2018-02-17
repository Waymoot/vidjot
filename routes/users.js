const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Idea model
// require("../models/User");
// const User = mongoose.model("users");

// User Login route
router.get('/login', (req, res) => {
  res.send('login')
})

// User Register route
router.get('/register', (req, res) => {
  res.send('register')
})


module.exports = router;