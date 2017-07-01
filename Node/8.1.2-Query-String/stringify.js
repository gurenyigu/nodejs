// querystring.stringify(obj[, sep[, eq[, options]]])
/*
obj <Object> 要序列化成一个 URL 查询字符串的对象。
sep <string> 用于界定查询字符串中的键值对的子字符串。默认为 '&'。
eq <string> 用于界定查询字符串中的键与值的子字符串。默认为 '='。
options
encodeURIComponent <Function> 当把对 URL 不安全的字符转换成查询字符串中的百分号编码时使用的函数。默认为 querystring.escape()。
querystring.stringify() 方法通过遍历对象的自有属性，从一个给定的 obj 产生一个 URL 查询字符串。

如果'obj'中的属性为<string> | <number> | <boolean> | <string[]> | <number[]> | <boolean[]>类型，则对应属性值都会被正常处理或转换；如果'obj'中包含其他类型的属性，这些类型的属性值会被强制转换为空字符串。
*/

const query = require('querystring');

var notObj = {
  foo: 'bar',
  baz: ['quz', 'quux'],
  corge: ''
};
var str;
// 序列化
console.log(str = query.stringify(notObj)); // 'foo=bar&baz=quz&baz=quux&corge='

// 反序列化
console.log(query.parse(str)); // { foo: 'bar', baz: [ 'quz', 'quux' ], corge: '' }

// 传入更多的参数, 序列化为更多形式
console.log(str = query.stringify(notObj, ';', ':')); // 'foo:bar;baz:quz;baz:quux;corge:'

// 对应的反序列化
console.log(query.parse(str, ';', ':')); // { foo: 'bar', baz: [ 'quz', 'quux' ], corge: '' }

// 默认情况下, 查询字符串中需要百分号编码的字符会作为 UTF-8 被编码. 如果需要的是另一种编码, 则 encodeURIComponent 选项需要被指定, 如下:
/*
// 假设 gbkEncodeURICompoent 函数已经存在
querystring.stringify({ w: '中文', foo: 'bar' }, null, null, { encodeURIComponent: gbkEncodeURICompoent });
*/
