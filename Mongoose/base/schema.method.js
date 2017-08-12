var mongoose = require('mongoose');
var url = 'mongodb://127.0.0.1:27017/one';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, '链接出错:'));
db.once('open', console.log.bind(console, '链接成功:'));

//  实例化 Schema
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  age: {
    type: Number,
    min: 18,
    max: 55
  },
  data: {
    type: Date,
    default: Date.now
  },
  Alive: Boolean,
});

// Virtual
// 现在我们可以定义一个Virtual 在 实例化的 Schema 上
blogSchema.virtual('name.full').get(function() {
  return this.name.first + ' ' + this.name.last;
});

// 创建一个模型
var Blog = mongoose.model('blog', blogSchema);

var admin = new Blog({
  name: {
    first: 'wu',
    last: 'dong shuo'
  },
  age: 20,
  Alive: true
});
/*
admin.save(function(err, admin) {
  if (err) console.error(err)
  else console.log(admin)
});
*/

//  假如想查看name的全称 每一次都要手动打印这个
console.log(admin.name.first + ' ' + admin.name.last);


// var Blog = mongoose.model('blog', blogSchema);
// 但是现在可以用virtual 方法
console.log('%s is name', admin.name.full);

Blog.find({}, function(err, data) {
  if (err) console.error(err);
  else console.log(data);
});
// 允许的 SchemaType 有： String Number Date  Buffer Boolean Mixed ObjectId Array

var animalSchema = new Schema({
  name: String,
  type: String
});

// 实例(Instance)化 Methods(方法)
// 文档有很多自己的实例方法，我们可以定义自己的实例方法。
animalSchema.methods.findSimilarTypes = function(cd) {
  return this.model('Animal').find({
    type: this.type
  }, cd);
};

//  (静态方法)statics:
animalSchema.statics.findByName = function(name, cd) {
  //  正则表达式匹配
  this.find({
    name: new RegExp(name, 'i')
  }, cd);
};

// 现在我们的每一个Animal 实例都只有findSimilarTypes findByName 方法

var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({
  name: 'wangcai',
  type: 'dog'
});
// 执行这个自定义方法前(因为这个方法是查询数据库)要保存下
/* dog.save(function(err, dog) {
  if (err) return console.log(err);
}); */
dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs);
  // db.close();
});


// var Animal = mongoose.model('animal', animalSchema);
//  将这个方法注册
Animal.findByName('wangcai', function(err, animals) {
  if (err) console.error(err);
  else console.log('查找到： %s', animals);
  db.close();
});
