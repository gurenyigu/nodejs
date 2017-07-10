var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
// 绑定 ’当对方发送来数据时‘ 的事件 处理函数
io.on('connection', function(socket) {
  // console.log(socket);

  // 链接客户端后的握手包
  // var hs = socket.handshake;
  // console.log(hs);

  // sockets 每次连接的id
  for (var key in io.sockets.sockets) {
    console.log(key);
  }
  // console.log(socket.request.connection.remoteAddress);
  // var address = socket.handshake.address;
  // console.log("New connection from " + address.address + ":" + address.port);
  // console.log(io.sockets.sockets);
  // 将每此链接用户的key 唯一ID发送给前端
  socket.emit('id', key);
  //  接收名称为 send message 的消息数据 处理函数  接收参数分别为  事件名  匿名函数 接收第一个参数为 数据 和返回函数
  socket.on('send message', function(msg, callback) {
    // 将接受的数据发送给前端 发送的 名称 + 内容
    // 为了能够发射一个事件给所有人, Socket.IO 给了我们 io.emit
    io.emit('return message', msg);
    // 执行返回函数 传递参数为数据
    callback(msg);
    // socket.emit('return message', msg);
  });
  // 广播消息 (给除了自己的所有发送的消息)只需要在emit、send 方法前加上broadcast 标识符即可
  socket.broadcast.emit('broadcast');
  // console.log(io.sockets.clients());
});

http.listen(8000, function() {
  console.log('listening on http://localhost:8000');
});
