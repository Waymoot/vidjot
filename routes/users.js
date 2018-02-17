const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Idea model
// require("../models/User");
// const User = mongoose.model("users");

// User Login route
router.get('/login', (req, res) => {
  res.render('users/login')
})

// User Register route
router.get('/register', (req, res) => {
  res.render('users/register')
})


module.exports = router;