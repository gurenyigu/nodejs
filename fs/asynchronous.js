var fs = require('fs');
// 引用fs库
fs.readFile('nodejs-start.md','utf-8',function(err,data){
//  fs.readFile方法 异步读取
  if(err)console.log(err);
  else console.log(data);
});
fs.readFile('http.js','utf-8',function(err,data){
  if(err) console.log(err);
  else console.log(data);
});
fs.readFile('README.md','utf-8',function(err,data){
  if(err) console.log(err);
  else console.log(data);
});
console.log("异步进行处理...");
/*这里的代码会先执行log里的内容。fs.readFile 调用时所做的工作只是将异步I/O请求发送给操作系统，然后立即返回
执行下面的代码。执行完成后，进入事件循环监听状态(执行玩一遍，会从最开始交给系统的I/O开始轮询)。
由于I/O读写速度差异，输出顺序有异。当fs接收到I/O请求完成的事件时，事件循环会主动调用回调函数完成后续工作。
*/
