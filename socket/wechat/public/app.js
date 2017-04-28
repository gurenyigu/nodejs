var app = require('express')();
var http = require('http').Server(app).listen(8000);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/html/index.html');
});
