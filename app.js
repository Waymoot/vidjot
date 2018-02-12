const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// map global promise - get rid of warning (not necessary on this version of mongoose)
// mongoose.Promise = global.Promise
// connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')  // useMongoDBClient is no longer necessary
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// Load Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Add Handlebars as Template engine to express
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// About Route
app.get('/about', (req, res) => {
  res.render('about');
});

// Process idea form
app.post('/ideas', (req, res) => {
  let errors = [];

  if(!req.body.title) {
    errors.push({text: 'Please add a title'})
  }
  if(!req.body.details) {
    errors.push({text: 'Please add some details'})
  }

  if (errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    res.send('passed');
  }
})

// Add Idea form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// starting the express erver
const port = 5000;
app.listen(port, () => {
console.log(`Server started at ${port}`);

});