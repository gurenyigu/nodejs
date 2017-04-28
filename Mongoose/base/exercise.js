var mongoose = require('mongoose');
var assert = require('assert');

var url = 'mongodb://localhost:27017/one';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, '链接错误:'));
db.once('open', function(callback) {
  console.log('连接成功');
});
//  mongoods 所有都是 schema 衍生出来的  并定义
var sebarSchema = mongoose.Schema({
  name: String
});
//  将我们刚定义的模式(sebarSchema) 编译到模型(User)中
var User = mongoose.model('user', sebarSchema);

// 定义一个小白
var white = new User({
  name: 'wang'
});
//  打印这个小白的名字
console.log(white.name);
//  添加到methods 模式属性中
sebarSchema.methods.speak = function() {
  //  三目运算符 若未填写姓名 则打印 ： 后的字符串  否则打印 white name is huang
  var greeting = this.name ? 'white name is ' + this.name : 'I don it have name';
  //  函数执行打印 greeting 指向的内存
  console.log(greeting);
};
//  刚定义的methods模式属性中的函数将被编译成Model原型 并在每个文档的实例上公开
var One = mongoose.model('one', sebarSchema);
var black = new One({
  name: 'huang'
});
//  打印实例模型black 的名字
console.log(black.name);
// 执行上面定义的函数
black.speak();
// 将其保存到数据库
black.save(function(err, black) {
  if (err) return console.log(err);
  black.speak();
});
//  查找数据库内容
One.find(function(err, User) {
  if (err) return console.error(err);
  console.log(User);
  //  关闭数据库
  db.close();
});
