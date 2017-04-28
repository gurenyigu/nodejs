var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var value = 0;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', function(socket) {
  io.emit('name', {
    name: 'user' + value
  });
  value += 1;
  socket.broadcast.emit('broadcast');
  io.sockets.emit('socket', {
    num: value
  });
  socket.on('chat message', function(msg, callback) {
    io.emit('message', msg);
    callback('OK', 'err');
  });
});

http.listen(8000, function() {
  console.log('listening on *:3000');
});
