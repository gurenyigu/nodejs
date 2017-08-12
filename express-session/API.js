// Example
// 一个简单的例子, 使用 express-session 来储存用户的页面浏览.

var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session');

var app = express();

app.listen(3000);

app.use(session({
  sesret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  var views = req.session.views;

  if (!views) {
    views = req.session.views = {};
  }

  // 获取 URL 路径
  var pathname = parseurl(req).pathname;

  // 计算 views
  views[pathname] = (views[pathname] || 0) + 1;

  next();
});

app.get('/foo', function(req, res, next) {
  res.send('你查看此网页 ' + req.session.views['/foo'] + ' 时间.');
});

app.get('/bar', function(req, res, next) {
  res.send('你查看此网页 ' + req.session.views['/bar'] + ' 时间.');
});
