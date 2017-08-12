// 预定义验证器:
/*
1. *: required (必填)
2. Number: max, min (最大, 最小)
3. String: enum, match (规定数组中的值, 正则必须匹配)
*/
// 自定义验证器:
/* validate: function() {} */
var mongoose = require('mongoose');

mongoose.connect(url);

var OrderSchema = new mongoose.Schema({
  count: {
    type: Number,
    requierd: true,
    max: 1000,
    min: 10
  },
  status: {
    type: String,
    enum: ['create', 'sucess', 'failed']
  },
  desc: {
    type: String,
    match: /book/ig,
    validate: function(desc) {
      return desc.length >= 10;
    }
  }
});

var Order = mongoose.model('Order', OrderSchema);

var order = new Order();
order.count = 100;
order.status = 'sucess';
order.desc = 'this is Book';

order.save(function(err) {
  if(err) {
    return console.log('save failed: ' err);
  }
  console.log('save sucess!');
});
