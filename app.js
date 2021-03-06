const express         = require('express');
const path            = require('path');         // core module for NodeJS, no need to install
const exphbs          = require('express-handlebars');
const methodOverride  = require('method-override');
const flash           = require('connect-flash');
const session         = require('express-session');
const bodyParser      = require('body-parser');
const passport        = require('passport');
const mongoose        = require('mongoose');

const app = express();

// Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Passport config
require('./config/passport')(passport);

// map global promise - get rid of warning (not necessary on this version of mongoose)
// mongoose.Promise = global.Promise
// connect to mongoose
mongoose
  .connect("mongodb://localhost/vidjot-dev") // useMongoDBClient is no longer necessary
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Add Handlebars as Template engine to express
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport session middleware (has to be after the session middleware)
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;   // user object (so we know the user is logged in)
  next();
});

// Index route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about");
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

// starting the express erver
const port = 5000;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
