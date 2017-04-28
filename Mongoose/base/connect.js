//  调用mongoose 模块
var mongoose = require('mongoose');
// 定义mongodb数据库链接
var url = 'mongodb://localhost:27017/one';
//  连接地址
mongoose.connect(url);
//
var db = mongoose.connection;
// 如果连接出错  则执行函数操作
db.on('error', function() {
  console.error('connect error');
});
// 进行一次打开 打开成功执行函数
db.once('open', function() {
  console.log('connect ok!! mongodb working.');
  // 关闭数据库
  db.close();
});
