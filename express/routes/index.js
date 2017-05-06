var express = require('express');
var router = express.Router();

/*  路由(Routing) 是一个URI (或者叫路径) 和一个特定的HTTP方法 (GET、POST等),组成的 涉及到应用如何响应客户端对某个网站节点的访问
 每个路由都可以有一个或者多个处理函数 ，当匹配到路由时，这个函数将被执行
 路由的定义由如下结构组成： app.Method(path, handler); 其中： app 是一个express的实例 ；Method 是某个HTTP请求方式的一个;  PATH 是服务器端的路径； Handerl是当前路由匹配到时要执行的函数、
*/

/* GET home page. */

// 中间件 ： 中间件的响应是随意的 可以是一个HTML错误页面、一句简单的话、一个JSON字符串 或者其他你想的东西
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
