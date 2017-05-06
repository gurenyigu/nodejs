var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 定义模块
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup(设置)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// 静态文件 中间件

// 将静态文件资源所在的目录作为参数传递给express.static 中间件就可以提供静态资源文件的访问了。
app.use(express.static(path.join(__dirname, 'public')));
// public 目录下的文件就可以访问了 http://localhost:3000/****
// 如需将静态资源存放在多个目录下 可以多次调用express.static(静态的) 中间件如：
// app.use(express.static('file'));
// 如果你希望所有通过express.static 访问的文件都存放在一个虚拟(virtual)的目录(不存在的目录)下 则可以：
//  app.use('/virtual',ecpress.static('public'));  http://localhost:3000/virtual/****

app.use('/', routes);
app.use('/users', users);

// catch 404 and forwarding to error handler 捕捉404 并转发到错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  /* 如果向next()传入参数 除了'route'字符串外 Express 会认为当前请求 有错误 的输出
  因此跳过后续其他非错误处理和路由/中间件函数。如果需做特殊处理，需要创建新的错误处理路由！！(如下)*/
  next(err);
});

// error handlers 错误处理

// development error handler 处理开发错误
// will print stacktrace  将显示错误信息
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
    console.log('执行err');
  });
}

// production error handler  结果错误处理
// no stacktraces leaked to user 没有跟踪错误信息显示给用户
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
  console.log('执行{}');
});


module.exports = app;
