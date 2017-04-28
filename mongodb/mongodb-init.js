var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://wudo:123456@ds163360.mlab.com:63360/first';
// 自己的网络服务器  失败。。。估计是数据库/地址的原因

var url = 'mongodb://127.0.0.1:27017/frist';
//本地数据库 使用终端查看 或者 robomongo 查看 frist 数据库

//定一个mydbInit函数 接收两个参数
var mydbInit = function(db, callback) {
  db.collection('home').insertOne({
    // 对collection名为 home 的合集 进行插入
    'famliy': {
      'father': 'ping',
      'mother': 'jun',
      'my': 'wu'
    },
    'age': {
      'father': 49,
      'mother': 49,
      'my': 20
    },
    'address': 'daxing'
  }, function(err, results) {

    assert.equal(err, null);
    // 执行插入错误检查

    console.log(results.result);
    console.log('Inserted a document into the restaurants collection.');
    callback();
  });
};

//node 两个参数 地址与一个参数
MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log(err);
    console.log('error!!');
  } else {
    console.log(db);
    //这个代码首先打印的参数
    assert.equal(err, null);
    console.log('Connected correctly to server.');
    //第二个打印的参数

    //执行myInit函数 并传入参数
    mydbInit(db, function() {
      console.log('Init Ok!');
      db.close();
    });

  }
});
