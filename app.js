const express = require('express');

const app = express();
const port = 5000;

// how middleware works
app.use(function(req, res, next){
  //console.log(Date.now());
  req.name = 'Daniel Lindskog';
  next();
});

// Index route
app.get('/', (req, res) => {
  console.log(req.name);
  res.send(req.name);
});

// About Route
app.get('/about', (req, res) => {
  res.send('ABOUT');
});

app.listen(port, () => {
console.log(`Server started at ${port}`);

});