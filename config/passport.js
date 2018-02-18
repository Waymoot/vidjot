const localStrategy = require('passport-local').Strategy;
const mongoose      = require('mongoose');
const bcrypt        = require('bcryptjs');

// Load User Model
const User = mongoose.model('users');

module.exports = function (passport){
  passport.use(new localStrategy({usernameField: 'email'}, (email, password, done) => {
    // check for the user
    User.findOne({
      email: email
    }).then(user => {
      if(!user) {
        return done(null, false, {message: 'No user Found'});
      }
    })
  }))
}