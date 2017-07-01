var express = require('express');

var app = express();

app.locals.title = 'My app.';

app.get('/', function(req, res) {
  res.send(app.locals.title); // My app.
  app.locals.email = 'my@email.com';
});

console.log(app.locals.email); // undefined

app.listen(3000);
