var mongoose = require('mongoose');

mongoose.connect(url);

var User = mongoose.model('User', {
  username: String
});

var News = mongoose.model('News', {
  title: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

var user = new User({
  username: 'wu'
});

var news = new News({
  title: '数据的交叉引用',
  author: user
});

user.save(function(err) {
  if(err) return console.log('save user failed: ', err);

  news.save(function(err) {
    if(err) return console.log('save news failed: ', err);
  });

  News.findOne().populate('author').exec(function(err, doc) {
    console.log('after populate: ', err, doc);
    // after populate: null {_id: xxxxxxxx, title: '数据的交叉引用', author: {_id: xxxxxxx, username: 'wu', __v: 0}, __v: 0}
  });
});
