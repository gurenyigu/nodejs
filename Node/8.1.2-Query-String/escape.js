// querystring  提供了一些实用工具, 用于解析与格式化URL查询字符串. 它可以通过以下方式被使用:
// querystring.escape(str)

const query = require('querystring');

// querystring.escape(str)
/*
querystring.escape() 方法对给定的 str 执行 URL 百分号编码。
querystring.escape() 方法是供 querystring.stringify() 使用的，且通常不被直接使用。 它之所以对外开放，是为了在需要时可以通过给 querystring.escape 赋值一个函数来重写编码的实现。
*/

// querystring.unescape(str)
/*
querystring.unescape() 方法对给定的 str 上的 URL 百分号编码的字符执行解码。
querystring.unescape() 方法是供 querystring.parse() 使用的，且通常不被直接使用。 它之所以对外开放，是为了在需要时可以通过给 querystring.unescape 赋值一个函数来重写解码的实现。
querystring.unescape() 方法默认使用 JavaScript 内置的 decodeURIComponent() 方法来解码。
*/
