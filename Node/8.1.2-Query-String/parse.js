// querystring.parse(str[, sep[, eq[, options]]])
/*
str <string> 要解析的 URL 查询字符串。
sep <string> 用于界定查询字符串中的键值对的子字符串。默认为 '&'。
eq <string> 用于界定查询字符串中的键与值的子字符串。默认为 '='。
options <Object>
decodeURIComponent <Function> 当解码查询字符串中百分号编码的字符时使用的函数。默认为 querystring.unescape()。
maxKeys <number> 指定要解析的键的最大数量。默认为 1000。指定为 0 则移除键数的限制。
*/
// querystring.parse() 方法能把一个 URL 查询字符串（ str） 解析成一个键值对的集合。

var str = 'name=wu&age=20';
console.log(query.parse(str)); // { name: 'wu', age: '20' }

// 注意: querystring.parse() 方法返回的对象不继承自 JavaScript 的 Object.
// 这意味着典型的 Object 方法如 obj.toString() obj.hasOwnProperty() 等没有被定义且无法使用.

// 默认情况下, 查询字符串中的百分号编码的字符会被认为使用了 UTF-8 编码. 如果使用的是另一种字符编码, 则 decodeURIComponent 选项需要被指定:

// 假设gbkDecodeURIComponent 函数已经存在
// querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null, { decodeURIComponent: gbkDecodeURIComponent });
