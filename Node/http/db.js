var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/manage';

var findDB = function(db, username, callback) {
  var cursor = db.collection('one').find();

  cursor = db.collection().find({
    'uid': username
  });

  let i = 0;

  cursor.each(function(err, doc) {

    // assert.equal(err, null);
    if (doc !== null) {
      console.log(doc);
      console.log(++i);
    } else if (err) {
      console.log('没有数据...');
    } else {
      callback();
    }
  });
};

MongoClient.connect(url, function(err, db) {

  assert.equal(err, null);
  if (err) {}
});
