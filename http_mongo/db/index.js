/*
数据库操作函数 使用前启动数据库 sudo service mongod start
*/
//调用mongodb模块 中的 MongoClient 方法
var MongoClient = require('mongodb').MongoClient;
//  断言
var assert = require('assert');
// 引入mongodb数据库
var url = 'mongodb://127.0.0.1:27017/one';
// 定义插入数据库函数：具体参考mongodb文件夹
var insertDB = function(db, data, callback) {
  // 插入数据库方法：
  db.collection('one').insertOne(data, function(err, resulte) {
    if (err) console.log(err);
    // 回调函数执行 传入的callback函数(关闭数据库)
    callback();
  });
};
//每一个node.js执行文件，都自动创建一个module对象，同时，module对象会创建一个叫exports的属性，初始化的值是 {}
// 定义这个对像上的函数 insert 使引入这个函数时 可以使用这个方法
module.exports.insert = function(data) {
  console.log(data);
  //insert 函数 进行插入数据前的链接数据库
  MongoClient.connect(url, function(err, db) {
    // 断言 判断连接数据库是否出错 未出错 err 的值为空(null)
    assert.equal(null, err);
    // 执行之前定义好的插入执行函数
    insertDB(db, data, function() {
      //传入参数1 为 连接数据库的内容  参数2 为 前端传输处理来的数据 参数3 传入一个函数 执行callback 时 关闭数据库
      db.close();
    });
  });
};
// 定义查找函数 函数固定值写法 具体参考mongodb文件夹
var findDB = function(db, data, callback) {
  // 定义返回值dose 为 查找方法 以便遍历
  var docs = db.collection('one').find(data);
  // 执行返回值callback 函数传入docs
  callback(docs); // 先执行的callback 执行findDB callback 传入的参数 function(dose){...}
};
// 添加查找方法  函数 传入两个参数
module.exports.find = function(option, callback) {
  //链接数据库
  MongoClient.connect(url, function(err, db) {
    // 断言
    assert.equal(null, err);
    // 执行查找函数 传入三个参数
    findDB(db, option, function(docs) {
      // 执行 callback 为`.find 传入的callback函数`
      console.log('----------------------------', docs);
      callback(docs);
      db.close();
    });
  });
  // 数据库删除函数 以下为我自己写的  以上为老师提供
  var deleteDB = function(db, data, callback) {
    // 删除函数方法
    db.collection('one').deleteMany(data, function(err, results) {
      //判断语句
      if (err) console.log('js,error', err);
      // 成功打印方法提供的函数的result方法打印 返回操作的参数
      else console.log('resulte :', results.result);
      // 执行传入的函数
      callback();
    });
  };
  // 删除方法函数 接收一个 要删除的条件
  module.exports.delete = function(data) {
    // if (data = '{}') {
    //   db.close();
    //   return;
    // }
    console.log(data);
    //连接数据库
    MongoClient.connect(url, function(err, db) {
      // 断言
      assert.equal(null, err);
      console.log('delete函数');
      //执行删除函数
      deleteDB(db, data, function() {
        // 返回函数  关闭数据库
        db.close();
      });
    });
  };

};

/*
require 用来加载代码，而 exports 和 module.exports 则用来导出代码。但很多新手可能会迷惑于 exports 和 module.exports 的区别，为了更好的理解 exports 和 module.exports 的关系，我们先来巩固下 js 的基础。示例：

test.js

var a = {name: 1};
var b = a;

console.log(a);
console.log(b);

b.name = 2;
console.log(a);
console.log(b);

var b = {name: 3};
console.log(a);
console.log(b);

运行 test.js 结果为：

{ name: 1 }
{ name: 1 }
{ name: 2 }
{ name: 2 }
{ name: 2 }
{ name: 3 }

解释：a 是一个对象，b 是对 a 的引用，即 a 和 b 指向同一块内存，所以前两个输出一样。当对 b 作修改时，即 a 和 b 指向同一块内存地址的内容发生了改变，所以 a 也会体现出来，所以第三四个输出一样。当 b 被覆盖时，b 指向了一块新的内存，a 还是指向原来的内存，所以最后两个输出不一样。

明白了上述例子后，我们只需知道三点就知道 exports 和 module.exports 的区别了：

    module.exports 初始值为一个空对象 {}
    exports 是指向的 module.exports 的引用
    require() 返回的是 module.exports 而不是 exports

*/
