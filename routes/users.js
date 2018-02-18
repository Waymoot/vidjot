const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

// Load User model
require("../models/User");
const User = mongoose.model("users");

// User Login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// User Register route
router.get("/register", (req, res) => {
  res.render("users/register");
});

// Login Form Post
router.post('/login', (req, res, next) => {
passport.authenticate('local', {
  successRedirect: '/ideas',
  failiureRedirect: '/users/login',
  failuireFlash: true
})(req, res, next);
})

// Register form post
router.post("/register", (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({ text: "Passwords do not match" });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: "Password must be at least 4 characters " });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    // first check if users email already exist
    User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        req.flash("error_msg", "Email is already registered");
        res.redirect("/users/register");    // TODO: send the data back to the form?
      } else {
        // now update the database
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                res.redirect("/users/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

module.exports = router;
