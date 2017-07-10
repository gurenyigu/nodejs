var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('chat', {});
});

router.post('/', function(req, res) {
  res.render('chat', {});
});

// app.get('/chat', function(req, res) {
//   res.sendFile(__dirname + '/views/chat.html');
// });
//
// app.post('/chat', function(req, res) {
//   res.sendFile(__dirname + '/views/chat.html');
// });

module.exports = router;
