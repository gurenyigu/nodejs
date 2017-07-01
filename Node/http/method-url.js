/* 实现 网页输入内容 点击跳转 页面 显示内容
   实质创建服务器 将一个页面中的输入框内容作为参数传递给 另一个页面参数 进行显示
*/

var http = require('http');
// 引入HTTP模块
var query = require('querystring');
// 引入 nodejs querystring 模块

var serv = http.createServer(function(req, res) {
  //创建一个服务器
  if ('/' == req.url) {
    // 当请求url 内容为 / (默认页面) 时
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // 编写头信息
    res.end(["<head><meta charset = 'utf-8'></head>", '<h1>填写表格后提交</h1>', "<form method = 'POST' action = '/label'>",
      "<fieldset><label>填写表单啊</label><p>Name</p><input type = 'text' name = 'name'><p>Age</p><input type = 'number' name = 'age'><br><br><button>Submit</button></form>"
    ].join(' '));
    // 请求结束发送


  } else if ('/label' == req.url) {
    console.time('useTime');
    // 上面表单中指定表单为post方法 url 为/label
    var data = '';

    req.on('data', function(chunk) {
      // data事件持续触发。
      data += chunk;
      // 获得每一次的触发data的chunk(块)内容

      // 获取键
      // console.log(query.parse(data));
      // for (var k in query.parse(data)) {
      //   console.log(k);
      //   key = k;
      // }
    });
    req.on('end', function() {
      res.writeHead(200, {
        'Content-Type': 'text/html;'
      });
      var value = query.parse(data);
      // 指定头编码 utf-8  否则会 麻将文
      res.end(["<!DOCTYPE html><head><meta charset = 'utf-8'></head><body>", '<h3> method =<em>' + req.method + '</em> <br> name =' + value['name'] + '<br>age = ' + value['age'] + '</h3></body></html>'].join(' '));
      // req.method 方法解析当前请求方法  当正常操作 填写表单后 /label 显示post方法
      // 当直接在url地址栏输入 /label时 req.method 显示为GET方法
      console.timeEnd('useTime');

      //  nodejs 中提供了模块解码 解码呈现 键值对的node对象
      console.log(query.parse(data));
      // 浏览器将接受的包里中文 编码为%EF%FD...这样的形式 原生js方法编码函数  如下
      var char = '中文';
      var code = '';
      console.log(code = encodeURIComponent(char)); // %E4%B8%AD%E6%96%87
      // 解码 方法
      console.log(decodeURIComponent(code)); // 中文

    });
  }
}).listen(8000);

/*
GET 与 POST 还有一个重大区别
GET 产生一个TCP数据包  POST产生两个TCP数据包

对于GET方式的请求，浏览器会把http header 和 data 一并发送出去 服务器响应200(反回数据)
而 对于post方法， 浏览器先发送header 服务器响应100 continue 浏览器再发送data 服务器再响应200 ok(返回数据)
举例：
GET方法只需要跑一趟就把货物送到了，而POST得跑两次，第一次想去先去和服务器打个招呼‘嗨，我等下要送一批货进来，你们打开门迎接我’，然后再将货物送过去
因为POST需要两步，时间上小号要多些，看起来GET要比POST更有效，其实不然
1.GET与POST都有自己的语义，不能混用
2.据研究在网络环境好的情况下，发一次包的时间和发两次包的事件差别基本可以无视，而在网络环境差的环境下，发两次包的TCP在验证数据包完整性上，有很大优势
3.并不是所有浏览器都会在POST中发两次包，Firefox就只发送一次
*/
