var mongoose = require('mongoose');

var url = 'mongodb://127.0.0.1:27017/one';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, '链接出错，可能是未启动数据库或者地址出错：'));
db.once('open', console.log.bind(console, '连接数据库成功...'));

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  name: {
    frist: String,
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
    /* 设置默认值 */
    default: Date.now
  },
  edit: {
    type: String,
    /* 预定义修饰符, 用来去除该字段首位空格 */
    trim: true
  },
  blog: {
    type: String,
    /* 根据给定地址进行处理(判断有无协议头, 有则不管, 无则添加) 上传到数据库的修改 */
    set: function(url) {
      if(!url) return url;
      if(0 !== url.indexOf('http://') && 0 !== url.indexOf('https://'))
      return url = 'http://' + url;
    },
    /* 这是对获得的数据处理,从数据库得到后的处理, 与上面设置同理, 为地址判断并添加协议 */
    get: function(url) {
      if(url) return url;
      if(0 !== url.indexOf('http://') && 0 !== url.indexOf('https://'))
      return url = 'http://' + url;
    }
  }
});

/* 设置虚拟属性, 这种属性可以提供便利,不会对数据库进行操作, 下面进行一个简单的应用 */
BlogSchema.full('fullName').get(function() {
  return this.fristName + ' ' + this.lastName;
});

/* 使得到数据中存在虚拟属性, 也就是 fullName: */
BlogSchema.set('toJSON', {getters: true, full: true});

var Blog = mongoose.model('blog', BlogSchema);
var user1 = new Blog({
  name: {
    first: 'liu',
    last: 'shuang'
  },
  age: 22,
  Alive: true
});

/* 虚拟属性显示 */
console.log(user1.fullName);

/* 设置的 BlogSchema.set */
console.log(JSON.stringify(user1));

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
