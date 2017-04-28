var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/frist';

// updateOne({},{},callback)第一个参数是匹配条件 第二个参数是要更新的数据项，第三个是回调函数
var updateDB = function(db, callback) {
  db.collection('one').updateMany({
      // 更新文档所有符合条件的 updateOne 更新符合条件的第一个
      age: 20
    }, {
      $set: {
        age: 21,
        // name: 'wu'
      }
    },
    function(err, results) {
      if (err) {
        console.log(err);
      } else {
        console.log(results.result);
        //  打印结果 匹配项  修改项  是否成功
        callback();
      }
    });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server.');

  updateDB(db, function() {
    // console.log(db);
    db.close();
    console.log('关闭数据库...');
  });
});
