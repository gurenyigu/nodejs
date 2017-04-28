var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/frist';

var findDB = function(db, callback) {

  var cursor = db.collection('home').find();
  // 指定 collection 名为 home 的 进行查找
  // 一般查询
  cursor = db.collection('home').find({
    'address': 'daxing'
  });
  // 嵌套数据查询
  cursor = db.collection('home').find({
    'famliy.father': 'ping'
  });
  //运算符查询
  cursor = db.collection('home').find({
    'age.mother': {
      $gt: 30
    }
  }); // 年龄大于30的
  // cursor = db.collection('home').find({'age.my':{$lt:30}}); // 年龄小于30的

  // 逻辑运算查询
  // cursor = db.collection('home').find({'age.father':48,'address':'daxing'}); // 两个条件都，满足的
  cursor = db.collection('home').find({
    $or: [{
      'famliy.father': 'ping'
    }, {
      'age.father': 48
    }]
  }); // 两个其中一个满足的

  //排序 1 为升序 -1 为降序
  cursor = db.collection('home').find().sort({
    'age.father': 1,
    'family.father': 1
  });

  var i = 0;

  cursor.each(function(err, doc) {
    // 证明是一个持续触发的函数

    assert.equal(err, null);
    if (doc !== null) {
      console.log(doc);
      console.log(++i);
    } else if (err) {
      console.log('没有找到...');
    } else {
      callback();
    }
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(err, null);
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('Counectes correctly to server.');
    findDB(db, function() {
      console.log('关闭数据库...');
      db.close();
    });
  }
});
