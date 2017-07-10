const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.render('zhuce', {});
});

// app.get('/zc', function(req, res) {
//   res.sendFile(__dirname + '/views/zhuce.html');
// });

module.exports = router;
