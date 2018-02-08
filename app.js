const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

// Add Handlebars as Template engine to express
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


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

// starting the express erver
const port = 5000;
app.listen(port, () => {
console.log(`Server started at ${port}`);

});