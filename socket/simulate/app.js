var express = require('express');
var app = express();
var path = require('path');
var assert = require('assert');
// express 解析 post 前端数据
var b_parser = require('body-parser');

// 定义路由
const routes = require('./routes/index');
const user = require('./routes/user');
const zhuce = require('./routes/zhuce');
const chat = require('./routes/chat');

// 配置渲染模块
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);


// 用 extended 为 false 表示使用 querystring来解析数据, 这是URL-encoded解析器
app.use(b_parser.urlencoded({
  extended: false
}));
// 指定解析格式
app.use(b_parser.json());

// 设置public 目录
app.use(express.static(path.join(__dirname, 'public')));

// 定义路由
app.use('/', routes);
app.use('/user', user);
app.use('/zc', zhuce);
app.use('/chat', chat);

// 定义链接数据库全局属性
global.mongoClient = require('mongodb').MongoClient;
// 定义数据库地址, 全局属性
global.dbUrl = 'mongodb://127.0.0.1:27017/manage';

// 数据库 插入 操作

// 数据库查找操作

// 用户名密码查找

// 获取头像函数

// 头像数据库更新

// chat

// index

// zhuce

// user

// user post

// 用户名判断

// 用户名密码查找!

// header post

// 头像获取

// console.log(__dirname);

module.exports = app;
