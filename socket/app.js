var app = require('express')();
var server = require('http').Server(app);
// 将socket.io 绑定到服务器上 于是任何链接到该服务器的客户端都具备了实时通讯功能
var io = require('socket.io')(server);
server.listen(8000);

app.get('/', function(req, res) {
  // 打印出当前目录绝对路径
  console.log(__dirname);
  res.sendFile(__dirname + '/index.html');
});
// 服务器监听所有客户端 并返回该链接对象，
io.on('connection', function(socket) {
  console.log("a user connected!");
  // 通过socket、与客户端进行实时通讯
  // 不管是服务器 还是 客户端都有emit on 两个函数  通过这两个函数 就可以轻松实现服务器与客户端之间的双向通讯
  // emit 发射一个事件  或者说触发一个事件  第一个参数为事件名 第二个参数为要发送的数据 第三个参数为回调函数(可选 如需要对方收到信息后立即返回 则需要这个回调函数)
  socket.emit('news', {
    hello: '服务器发送消息.'
  });
  // 用来监听一个emit 发射事件 第一个参数为要监听的事件名 第二个参数为一个匿名函数 用来接收对方发来的数据(此函数第一个参数为接受的数据 ，第二个为可选参数  如有则为要返回的值)
  socket.on('other', function(data) {
    // 终端打印出前端发送的消息
    console.log(data);
  });
});

/*
socket.io 提供了三种默认的事件（客户端和服务器都有）：connect 、message 、disconnect.
当与对方建立连接后自动触发 connect 事件，
当收到对方发来的数据后触发 message 事件（通常为 socket.send() 触发），
当对方关闭连接后触发 disconnect 事件。

此外，socket.io 还支持自定义事件，毕竟以上三种事件应用范围有限，正是通过这些自定义的事件才实现了丰富多彩的通信。
最后，需要注意的是，在服务器端区分以下三种情况：

    socket.emit()：向建立该连接的客户端广播
    socket.broadcast.emit() ：向除去建立该连接的客户端的所有客户端广播
    io.sockets.emit() ：向所有客户端广播，等同于上面两个的和

*/
