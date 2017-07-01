/*
fs模块是文件操作的封装，它提供了文件的读写、更改、移除、目录、链接等posix文件系统操作。
与其他模块不同的是，fs模块中所有的操作都提供了异步的和同步的两个版本，例如读取文件内容的函数
有异步的fs.readFile()和同步的fs.readFile().
*/

/*
fs.readFile(filename,[encoding],[callback(err,data)]);是读取文件的函数
他接受一个必选参数filename，填写将要读写的文件名
第二个参数encoding是可选的，填写文件的字符编码。不传入参数时callback是第二个参数。
callback是回调函数，用于接收文件内容。提供两个参数err与data。
err表示错误发生返回错误信息。
data是文件内容，若encoding指定‘utf-8’则是解析后的字符串，否则返回Buffer形式的ascii编码
*/
// 添加编码格式
var fs = require("fs");
fs.readFile('fs.md', 'utf-8', function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});

//未填加编码格式
fs.readFile('fs.md', function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});

//同步读写版本
try {
  var content = fs.readFileSync('fs.md', 'utf-8');
  // 同步版本接收两个参数，文件名与文件编码
  console.log(content + '内容');
  // 返回值是文件内容，若读取错误则是undefined
} catch (error) {
  //如果error则进行处理
  console.error(error);
  //打印错误信息
}
