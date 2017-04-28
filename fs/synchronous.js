var fs = require('fs');
var callback = fs.readFileSync('README.md','utf-8');
console.log(callback);
console.log('readFile the end!');
/*
每一个API几乎都有一个同步I/O的API。将文件名传入fs.readFileSync函数后，阻塞完成I/O读取，将文件的内容作为函数
的返回值赋值给callback变量，然后输出返回值，然后执行log。
*/
