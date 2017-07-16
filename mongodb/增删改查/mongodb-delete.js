var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/frist';

var removeDB = function(db, callback) {
  db.collection('home').deleteMany({
      //删除符合条件的所有文档  deleteOne 删除符合的第一个
      'famliy.father': 'ping',
      'address': 'daxing'
    },
    function(err, results) {
      console.log(results.result);
      // 打印删除结果
      callback();
    }
  );
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log('Connected correctly to server.');
  removeDB(db, function() {
    db.close();
  });
});
