var express = require('express');

var app = express();

app.all('/', function(req, res, next) {
  console.log('执行all...');
  next();
});


app.get('/', function(req, res, next) {
  res.send('hello express!!');
});

/* 请求路由：
app.get('/user/:id', function(req, res, next) {
  console.log('Request URL: %s', req.originalUrl);
  next();
}, function(req, res, next) {
  // res.send('Request Type: %s', req.method); 执行故障？？？
  res.send('User Info'); // 终止并发送响应
  // console.log('User Info');  //  若使用console 则请求被挂起
});
//  不会执行的路由
app.get('/user/:id', function(req, res, next) {
  res.end(req.params.id);
});
 */

/* 路由转跳  */
app.get('/user/:id', function(req, res, next) {
  if (req.params.id == ':admin') {
    console.log(req.params.id);
    next('route');
  } else {
    console.log(req.params.id);
    next();
  }
}, function(req, res, next) {
  // res.render('regular(常规渲染页面)');
  res.send('非admin时的界面' + req.params.id);
});
// 处理 /user/:id ，渲染一个特殊页面
app.get('/user/:id', function(req, res, next) {
  // res.render('special(一个特殊的页面)');
  res.send('admin的界面' + req.params.id);
});

/* 在Express 中，404并不是一个错误(error) 因此，错误处理器中间件并不捕获404.这是因为404只是意味着某些功能没有实现
也就是说，Express 执行了所有的中间件、路由之后还是没有捕获到任何输出。你所需要做的就是在其他中间件的后面添加一个
处理404的中间件，如：*/
app.use(function(req, res, next) {
  res.status(404).send('对不起，您请求的GET不存在的！');
});

/*错误处理器：
错误处理器中间件的定义和其他中间件一样，惟一的区别是参数为 ：
*/
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('您已经火星了！！！');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Express app listening at http://%s:%s', host, port);
});
