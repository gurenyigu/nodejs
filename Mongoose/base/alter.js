var mongoose = require('mongoose');

var url = 'mongodb://127.0.0.1:27017/one';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, '链接出错，可能是未启动数据库或者地址出错：'));
db.once('open', console.log.bind(console, '连接数据库成功...'));

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  age: {
    type: Number,
    max: 55,
    min: 18
  },
  Alive: Boolean,
  date: {
    type: Date,
    default: Date.now
  }
});

var Blog = mongoose.model('blog', BlogSchema);
var user1 = new Blog({
  name: {
    first: 'liu',
    last: 'shuang'
  },
  age: 22,
  Alive: true
});
/*
// 保存到数据库
user1.save(function(err, user1) {
  if (err) return console.error(err)
  else console.info(user1);
});
//  或者：
Blog.create({
  name: {
    first: 'wang',
    last: 'lei'
  },
  age: 45,
  Alive: true
}, function(err, small) {
  if (err) return handleError(err);
  // db.close();
});
*/
// 查询数据库
Blog.find({
  age: {
    $gte: 21,
    $lte: 65
  }
}, function(err, data) {
  if (err) return console.error(err)
  else console.log(data);
});

// 或者
// Model.findById(id, [fields], [options], [callback])
// Model.findOne(conditions, [fields], [options], [callback])
/*
Blog.where('age').gte(21).lte(65).where('name', /^wang/i).exec(function(err, data) {
  if (err) return console.error(err)
  else console.log('where: %s', data);
});
*/
// 删除数据
/*
Blog.remove({
  name: {
    first: 'liu',
    last: 'shuang'
  }
}, function(err) {
  if (err) return console.error(err);
});
*/
// 更新数据
// Model.findOneAndUpdate([conditions], [update], [options], [callback])
Blog.findOneAndUpdate({
    name: {
      first: 'wang',
      last: 'lei'
    }
  }, {
    age: 35
  },
  function(err, data) {
    if (err) return console.error(err)
    else console.log(data);
    db.close();
  });
