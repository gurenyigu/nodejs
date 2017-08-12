## Nodejs 异常逻辑的危害有哪些
1. 服务器异常 (可以通过重启服务器或其他方式解决, 所以危害不是很大)
  * Nodejs 代码异常会导致 Nodejs 占用服务器资源异常. 例如: `内存泄露` `Nodejs操作句柄过多` 这些虽然危害性不是很大, 但是查询困难, 需要借助第三方工具
  ```javascript
  /* 内存泄露的示例代码: */
  var http = require('http');
  var server = http.createServer(function(req, res) {
    for(var i = 0; i < 1000; i++) {
      server.on('require', function leakyfunc() {});
    }
    res.end('Hello World\n');
  }).listen(3000, '127.0.0.1');
  server.setMaxListeners(0);
  console.log('Server running at http://127.0.0.1:3000/. Process PID: ', process.pid);
  /* 每次访问都会导致函数常驻内存，使内存逐渐增大 */

  /* 操作句柄过多 */
  var Mongodb = require('mongodb');
  var http = require('http');
  var server = http.createServer(function(req, res) {
    var mongo = new Mongodb();
    res.end('new mongo success\n');
  }).listen(3000, '127.0.0.1');
  console.log('Server running at http://127.0.0.1:3000/. Process PID: ', process.pid);
  /* 每个链接都会创建一个 Mongodb 句柄, 连接量一大句柄就会越来越多, 这会导致其他请求无法访问 Mongodb */
  ```
## 进程退出 (非常致命, 会导致服务器无法使用)


## Nodejs 异常逻辑
1. nodejs 变量异常
  * 未定义变量 例如: var a = b + c;
  * 未包含对象 例如: var a = {'t': 1}; console.log(a.w);
  * 变量类型错误 例如: var a = 'abcde'; JSON.stringify(a);
2. nodejs 函数异常
  * 函数未声明
  * 函数回调异常
  * 待回调函数同步返回
  * 回调函数中抛出错误
3. nodejs 调用异常
  * 对象与数组
  ```javascript
  var arr = [1, 2, 3];
  var obj = {'1': 1, '2': 2, '3': 3};
  console.log(arr[4]); // undefined
  console.log(obj[4]); // undefined
  var objArr = [{'test': 1}, {'test': 2}];
  objArr[0]['test'];
  objArr[2];
  objArr[2]['test'];// error ! not defined
  // 这中操作会导致程序终止
  ```
  * exports 与 module.exports
    * exports 只能返回一个对象, 可以调用对象中数属性
    * module.exports 可以返回多种数据类型, 更多样
    ```javascript
    /* -----test.js----- */
    exports.test = function() {
      console.log('exports test');
    };
    /* ------test_exports.js------- */
    module.exports = function() {
      console.log('module exports test');
    };

    var exportsTest = require('./test');
    exportsTest.test(); // 对象调用属性

    var module.ExportsTest = require('./test_exports');
    moduleExportsTest(); // 是一个函数 直接调用
    ```
