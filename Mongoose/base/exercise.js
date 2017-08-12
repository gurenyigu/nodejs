var mongoose = require('mongoose');
var assert = require('assert');

var url = 'mongodb://localhost:27017/one';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, '链接错误:'));
db.once('open', function() {
  console.log('连接成功');
});

//  mongoods 所有都是 schema 衍生出来的  并定义
var sebarSchema = mongoose.Schema({
  name: String
});

//  一个speak的方法 添加到methods 模式属性中  以后由sebarSchema编译的模型 都会存在这个方法
sebarSchema.methods.speak = function() {
  //  三目运算符 若未填写姓名 则打印 ： 后的字符串  否则打印 white name is huang
  var greeting = this.name ? 'white name is ' + this.name : 'I don it have name';
  //  函数执行打印 greeting 指向的内存
  console.log(greeting);
};

//  将我们刚定义的模式(sebarSchema) 编译到模型(User)中
var User = mongoose.model('user', sebarSchema);

// 定义一个小白
var white = new User({
  name: 'wang'
});
//  打印这个小白的名字
console.log(white.name);




//  刚定义的methods模式属性中的函数将被编译成Model原型 并在每个文档的实例上公开
//  一个新的模型 One
var One = mongoose.model('one', sebarSchema);
//  新模式实例化一个小黑
var black = new One({
  name: 'huang'
});
//  打印实例模型black 的名字
console.log(black.name);
white.speak();
// 执行上面定义的函数
black.speak();
// 将其保存到数据库
black.save(function(err, black) {
  if (err) return console.log(err);
  black.speak();
});
// 正则表达式 查询数据库
One.find({
  name: /^huang/
}, function(err, user) {
  if (err) return console.error(err);
  console.log('user: ', user);
});
//  查找数据库内容
One.find(function(err, User) {
  if (err) return console.error(err);
  console.log(User);
  //  关闭数据库
  db.close();
});

/* 唯一索引 与 辅助索引 */
var BookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    index: true
  }
});
