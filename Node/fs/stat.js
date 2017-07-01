var fs = require('fs');

fs.stat('dir', function(err, stats) {
  console.log(err ? err : stats);
});
//时间值  显示系统信息。 亦用来检测一个文件/文件夹是否存在。

try {
  // 定义一个块级变量, 获得返回的值
  let data = fs.statSync('/bin');
  // 并打印
  console.log(data);
} catch (err) {
  // 若读取有误, 则打印
  console.log(err);
}
