const express = require('express');
const router = express.Router();
const assert = require('assert');

router.get('/', function(req, res) {
  res.render('user', {});
});

// app.get('/user', function(req, res) {
//   res.sendFile(__dirname + '/views/user.html');
// });

module.exports = router;
