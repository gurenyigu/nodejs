/*
主程序 页面实现 添加数据库数据  删除数据库数据  info 查询数据库内容
程序主要进行 ： 网页读取   js 数据库操作函数引用 实现
*/

var http = require('http');
// http 模块
var fs = require('fs');
//文件系统操作模块
var query = require('querystring');
// 编码模块
var mongodb = require('./db');
// 引用 db 下的 index 默认被引用

var add;
var dele;

var a = http.createServer(function(req, res) {
  //创建一个服务器
  if ('/' === req.url) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile('./web.htl', function(err, file) {
      // 读取页面  出错则返回error 否则输出文件内容
      if (err) {
        res.write('Error for 404!');
        res.end();
      } else {
        res.write(file);
        res.end();
      }
    });
    // 当插入数据表单提交页面  提交后输出内容
  } else if ('/url' === req.url && 'POST' === req.method) {
    var content = '';
    // http data 事件绑定 函数提取data 内容
    req.on('data', function(chunk) {
      //将内容交给函数变量
      content += chunk;
      // 将得到的数据进行解码 交给全局函数 add
      add = query.parse(content);
      // 底下是测试参数
      console.log(content);
      content = query.parse(content);
      content = query.parse('name=wio');
      console.log(content);
    });
    // end  结束绑定 请求完成执行
    req.on('end', function() {
      // mongodb 执行插入数据库函数 index.js 中
      mongodb.insert(add);
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      // 页面写显示  （必须开头为字符串）
      res.write("Name:" + add.name);
      res.write("<hr />");
      res.write("Age:" + add.age);
      res.end();
    });
    // info 页面
  } else if ('/info' === req.url) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    // 执行 数据库文档查找函数
    mongodb.find({}, function(docs) {
      // each 遍历参数 遍历传过来的每一组文档
      docs.each(function(err, doc) {
        if (doc !== null) {
          //若文档不为空则打印没个文档中的name age内容
          res.write("Name:" + doc.name);
          res.write("<br />");
          res.write("Age:" + doc.age);
          res.write("<hr />");
        } else {
          res.write('end');
          res.end();
          //当文档遍历结束  执行 end
        }
      });
    });

    // 当网页删除表单执行时 执行
  } else if ('/delete' === req.url && req.method === 'POST') {
    var contentD = '';
    // 获取表单提交内容
    req.on('data', function(chunk) {
      contentD += chunk;
      //将获取的表单内容解码 交给全局变量
      dele = query.parse(contentD);
      console.log(contentD);
    });
    req.on('end', function() {
      // 测试参数
      /*      var show = {};
            if (dele.name == '') {
              show = dele.age;
              dele = {
                'age': show
              };
              // dele = JSON.stringify(show);
            } else if (dele.age == '') {
              show = dele.name;
              dele = {
                'name': show
              };
              // dele = JSON.stringify(show);
            } */
      console.log(dele.name);
      console.log(dele.age);
      //   JSON => string  JSON.stringify();
      //   string => JSON  JSON.parse();
      console.log(dele);
      //  执行数据库删除函数
      mongodb.delete(dele);
      // console.log(JSON.stringify(dele));
      console.log(dele);
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'charset': 'utf-8'
      });
      // 将dele的文档姓名打印
      res.write('delete user = ' + dele.name);
      res.write("<hr />");
      res.end();
    });
    // 不符合以上所有的请求则 执行
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    });
    res.end('<h1> 404 error</h1>');

  }

});
// 将听 8000 端口
a.listen(8000);
console.log('server: localhost:8000');
