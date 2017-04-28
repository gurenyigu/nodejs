var mongoose = require('mongoose');
//  断言
var assert = require('assert');
var url = 'mongodb://127.0.0.1:27017/one';
/*
使用mongoose进行数据库操作时，总是提示：
(node:5684) DeprecationWarning: Mongoose: mpromise (mongoose’s default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

解决方法：
在联接数据操作前, 设置一下Promise的值.
*/
mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;

db.on('error', function() {
  console.log('connect error');
});

db.once('open', function() {
  console.log('connect is OK.');
});
// 定义数据集的格式，mongoose.model方法将格式分配给指定数据集。是一个数据模型
var Schema = mongoose.Schema;
//  实例化这个模型 并定义他的数据模型内容
var useSchema = new Schema({
  name: String,
  age: Number,
  Dob: Date,
  isAlive: Boolean
});
//  将Schema 发布为 model ，这个模型变量名的首字母一定要大写
// 创建实例中的第一个参数为要创建的集合名默认末尾加s
var Model = mongoose.model('User', useSchema);
// find 查找所有  findOne 查找第一个
// {} 无条件查找  {} 内可以填写查找条件
Model.find({}, function(err, data) {
  assert.equal(null, err, 'find error');
  console.log(data);
});

Model.remove({
  name: 'wu'
}, function(err, data) {
  assert.equal(null, err, '删除失败！');
  console.log(data);
  console.log('remove done!');
});
// 由Model 发布生成的实体数据 其中的数据 和对entity的操作会对数据库造成影响
var entity = new Model({
  name: 'shaoxu',
  age: 20,
  Dob: '04/12/97',
  isAlive: true
});

//  entity 数据进行保存
entity.save(function(err, data) {
  // 断言 在出现错误时 抛出错误 并结束程序
  assert.equal(null, err, 'save error!!');
  // if (err) {
  //   console.error(err);
  // } else {
  console.log(data);
  console.log('save ok.');
  db.close();
  // }
});

/*
Schema 模型中有很多属性
1.String: 字符串类型
2.Number: 数字类型
3.Buffer: 二进制文件
4.Boolean: 布尔类型 true or false
5.Schema.Type.ObjectId: MongoDB中的一个典型的24个字符，12字节的十六进制的数字字符串
6.Schema.Type.Mixed: 任何数据类型
7.Array: 数组类型
8.Date: 日期类型
*/
