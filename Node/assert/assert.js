/*
对于Nodejs，assert 模块提供了一些断言测试，其实这个模块主要倾向于内部使用，但是也能被用于项目中，
*/
//引入断言模块
var assert = require('assert');

var a = 1;
var b = 2;

/*
断言验证之一  语法： assert.equal(actual,expected[,message])
译文：断言.相等(真实，预期，信息);
判断相等 第一个传 真实值 第二个参数 预期值 判断是否相等  返回值可选，填写则为抛出(throws)的信息
*/
assert.equal(a, b, 'ab不相等'); // 不想等报错
// 如上面相反  判断
b = 1;
assert.notEqual(a, b, 'ab相等'); // 相等报错

// 判断值是否为 假 如(false 0 null); 是则throws  错误信息
assert(true, 'false');

/*更多内容参考：
http://yijiebuyi.com/blog/ca2c0edf447624bd4d527490c9fce369.html
http://blog.csdn.net/jiangbo_phd/article/details/51899982
*/
