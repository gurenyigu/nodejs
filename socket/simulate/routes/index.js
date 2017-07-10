var express = require('express');
var router = express.Router();
var assert = require('assert');


router.get('/', function(req, res) {
  // res.sendFile(__dirname + '../views/index.html');
  res.render('index', {});
});

// 用户名判断

router.post('/verify', function(req, res, next) {
  console.log(req.body);
  var data = req.body;

  mongoClient.connect(dbUrl, function(err, db) {
    assert.equal(err, null, '数据库链接出错!');
    console.log('连接成功!');
    dbFind(db, data.user, function(boolean) {
      console.log('查找完成!');
      db.close();
      res.send(boolean);
    });
  });

});

// 用户名密码查找!
router.post('/verify_pwd', function(req, res) {
  console.log(req.body);
  var data = req.body;
  mongoClient.connect(dbUrl, function(err, db) {
    assert.equal(err, null, '数据库链接出错!');
    console.log('链接成功!');
    dbFind_pwd(db, data.user, data.password, function(boolean) {
      db.close();
      res.send(boolean);
    });
  });
});

// 请求用户页面
router.post('/user', function(req, res) {
  console.log(req.body); // { user: 'fsdafsdaf', pwd: [ '12345678w', '12345678w' ] }
  var data = req.body;
  console.log(data.user, data.pwd);

  // 数据库插入
  mongoClient.connect(dbUrl, function(err, db) {
    assert.equal(err, null, '链接数据库出错!');
    console.log('链接成功!');
    dbFind(db, data.user, function(boolean) {
      if (!boolean) {

        dbInit(db, data.user, data.pwd, function() {
          console.log('添加完成!');
          db.close();
        });

      } else {
        console.log('用户数据已经存在, 不再重复添加!');
        db.close();
      }

      // res.sendFile(__dirname + '/views/user.html');
      res.render('user', {});
    });

  });
});

// 头像添加
router.post('/header', function(req, res) {
  console.log(req.body);
  var data = req.body;
  mongoClient.connect(dbUrl, function(err, db) {
    assert.equal(err, null, '数据库链接出错!');
    console.log('链接成功!');
    dbUpdate(db, data.user, data.header, function() {
      db.close();

      res.send(true);
    });
  });
});

// 头像获取
router.post('/getHeader', function(req, res) {
  console.log(req.body);
  var data = req.body;

  mongoClient.connect(dbUrl, function(err, db) {
    assert.equal(err, null, '数据库链接错误!');
    console.log('链接成功');
    dbFHeader(db, data.user, function(id) {
      db.close();
      res.send(id);
    });
  });
});


/*  数据库函数   */

// 增
function dbInit(db, user, pwd, callbake) {
  db.collection('chat').insertOne({
    'user': user,
    'password': pwd
  }, function(err, results) {
    assert.equal(err, null, '添加数据出错!');
    // console.log(results);
    callbake();
  });
}

// 改
function dbUpdate(db, user, header, callbake) {
  db.collection('chat').updateMany({
    'user': user
  }, {
    $set: {
      'header': header
    }
  }, function(err, results) {
    assert.equal(err, null, '数据更新出错!');
    callbake();
  });
}

// 查
function dbFind(db, user, callbake) {
  // console.log(user);
  var cursor = db.collection('chat').find({
    'user': user
  });
  // console.log(cursor);

  var data = false;
  cursor.each(function(err, doc) { // 这个重复触发的方法会导致 send() 执行多次
    assert.equal(err, null, '查找数据出错!');
    if (doc !== null) {
      data = true;
      console.log('找到数据!');
    } else {

      console.log('没有数据了.');
      return callbake(data); // 在最后没有数据时返回
    }
  });

}

// 用户名密码查找
function dbFind_pwd(db, user, pwd, callbake) {
  var cursor = db.collection('chat').find({
    'user': user,
    'password': pwd
  });

  var data = false;
  cursor.each(function(err, doc) {
    assert.equal(err, null, '查找数据出错!');
    if (doc !== null) {
      data = true;
      console.log('查找到数据!');
    } else {
      console.log('没有数据了!');
      return callbake(data);
    }
  });
}

// 获取头像函数
function dbFHeader(db, data, callbake) {
  var cursor = db.collection('chat').find({
    'user': data
  });
  var id = 0;
  cursor.each(function(err, doc) {
    assert.equal(err, null, '数据库查找出错!');
    if (doc !== null) {
      id = doc.header;
      // console.log(doc.header);
    } else {
      console.log('没有数据了!');
      return callbake(id);
    }
  });
}

module.exports = router;
