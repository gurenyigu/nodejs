/*
writeFile方法用于异步写入数据。fs.writeFile(filename,data,[encoding],[callback(err)]);
第一个参数是要写入的文件名，第二个传入写入的数据。这两个是必须传入的参数。
第三个可选参数，传入编码格式
第四个可选参数，传入一个函数，接收一个参数。回调函数返回错误信息。
*/

var fs = require("fs");
var data = '写入的新写入';
fs.writeFile('fs.md', data, function(err) {
  if (err) console.error(err);
  else if (!err) console.log("ok");
  else console.log(err);
  console.log('异步写入');
});

// 写入操作在文件 不存在的情况下 会创建一个文件

var databd = '会被覆盖的data内容';

try {
  fs.writeFileSync('writefs.md', databd, 'utf-8');
  console.log('同步写入');
} catch (err) {
  console.error(err);
}
