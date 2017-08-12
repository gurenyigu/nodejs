/*
文档的处理中间件: init / validate / save / remove
查询处理中间件: count / find / findOne / findOneAndRemove / findOneAndUpdate / update

其中包含两种处理类型:
1. 预处理 pre
2. 后置处理 post
*/

var mongoose = require('mongoose');

mongoose.connect(url);

var ResellerSchema = new mongoose.Schema({
  address: String
});

/* true: 意为并行操作, done: 执行操作的回调函数 */
ResellerSchema.pre('save', true, function(next, done) {
  console.log('这是 ResellerSchema 预处理 保存中间件.');
  next();
  done();
});

ResellerSchema.post('save', function(next) {
  console.log('这是 ResellerSchema 后置处理 保存中间件.');
  next();
});

var Reseller = mongoose.model('Reseller', ResellerSchema);

var reseller = new Reseller({
  address: '101st People Road'
});

reseller.save();
