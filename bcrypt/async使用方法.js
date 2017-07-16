// 异步(推荐):
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myplaintextPassword = 's0/\/\P4$$0rD';
const someOtherPlaintextPassword = 'not_bacon';

// 技术1: 在单独的函数调用中生成一个 salt 和 hash
bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    // 储存 hash 到数据库中
  });
});

// 技术2: 自动生成salt 和 hash
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // 储存 hash 到数据库中
});

// 以上两种方法达到的结果一致


// 检查密码方法:
// 首先从你的数据库中加载密码 hash值
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
  // res == true(密码正确)
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
  // res == false(密码错误)
});

//  Promise:
// bcrypt 使用在全局提供的Promise 实现, NodeJS 大于等于 0.12的版本都有内置,
// 接收回调的异步方法, 如果 Promise 支持可用, 则未指定回调函数时返回 Promise
bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
  // 储存 hash 到数据库中
});
// 查找
// 从数据库获得 hash 值
bcrypt.compare(myPlaintextPassword, hash).then(function(res) {
  // res == true 密码验证正确
});
bcrypt.compare(someOtherPlaintextPassword, hash).then(function(res) {
  // res == false 密码验证有误
});
