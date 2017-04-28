/*
 HTTP协议构建在请求和相应的概念上，对应在Nodejs中就是由http.ServerRequest和
 http.ServerResponse这两个构架构造出来的对象
*/

var http = require("http");

var sev = http.createServer(function(req, res) {
  //创建一个服务器，回调函数 参数为request(请求)和response(响应)
  res.writeHead(200, {
    'Contenrt-Type': "text/html"
  });
  // 响应头文件 status(状态码)200。 Contenrt-Type(内容类型) text/html
  // 文本类型为 text/planin
  res.end('<h1>HELLO WORD!</h1>');
}).listen(8000); //监听8000端口

/*
终端运行服务器： node http.js

* npm 插件： 不用在每次更改后重复启用监听 安装： npm install nodemon -g 进行全局安装

这时有两个请求方法
(1) 终端输入： telnet 127.0.1.1 8000     请求： GET / HTTP/1.1 接俩下回车键
(2)浏览器输入URL 127.0.1.1：8000

*/
