## Request
* req对象表示 HTTP的 request,他的属性是用来请求string、parameters、body、HTTP headers等.在某些文档总被成为req,但是你要知道它代表的是request,但是实际名称还是由回调函数的参数决定的.
* 示例:
```js
app.get('/user/:id', function(req, res){
  res.send('user' + req.param.id);
});
```
* 当然你也可以写为:
```js
app.get('/user/:id', function(request, response){
  request.send('user' + request.param.id);
});
```

### req.app
* 主文件中引用我们自己创建的中间件模块出口函数,下面的代码运行 http://localhost:3000/viewdirectory 查看路由目录
```js
 //  index.js 文件中
 app.get('/viewdirectory', require('./mymiddleware.js'));
```
```js
// mymiddleware 文件中
module.exports = function(req, res){
  res.send('The views directory is' + req.app.get('views'));
  // 结果 The views directory is/home/wds/nodejs/express/ExpressAPI/4.x/req.app_example/views
}
```

### req.baseUrl
* 在路径上安装路由 , 例子:
```js
var greet = express.Router();

greet.get('/js', function(req, res){
  console.log(req.baseUrl); // /greet
  res.send('出版者');
});

app.use('/greet', greet); // 加载路由到 '/greet'
```

* 无论是您使用一个路径模式加载路由还是一组路径模式加载加载路由,baseUrl 属性返回的是字符串,而不是模式!在下面的例子中,greet将加载两个路径模式.
```js
app.use(['/gre+t', '/hel{2}o'], greet);  // 加载的路由在 '/gre+t' 或 '/hel{2}o'
```
* 如果访问 /greet/js, res.baseUrl 是 '/greet',访问 /hello/js, res.baseUrl 是 '/hello'
* req.baseUrl 类似于 mounthpath ,但是mounthpath返回的是路径模式!

### req.body
* 提交的请求主体中包含键值对数据.默认情况下他是没有构建 未被定义的,所以当你使用body-parsing需要中间件,比如body-parser 和 multer.
* 下面这个例子展示如何用body-parser构建一个req.body.

```js
var app = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // 解析 application / json
app.use(bodyParser.urlencoded({ extended: true})); // 解析 application / x-www-from-urlencoded
app.use(muter());  // 解析 muterpart / form-datya

app.post('/', function(req, res){
  console.log(req.body);
  res.json(req.body);
});
```

### req.cookies
* 当采用 cookie-parser 中间件,这个属性是一个对象,其中包含请求发送的 cookie .如果请求不包含cookie ,默认为{}.
  ```js
  // Cookie: name=tj
  req.cookie.name // => 'tj'
  ```
* [想了解更多?](https://github.com/expressjs/cookie-parser)

### req.fresh

### req.hostname
* HTTP 头包含的 主机名 'host'
```js
// Host: 'example.com:3000'
req.hostname
// => 'example.com'
```

### req.ip
// 请求远程IP地址
```js
req.ip
// => '127.0.0.1'
```

### req.ips
* 当信任代理设置是正确的,该属性包含一个数组中指定的IP地址“X-Forwarded-For”请求头。否则,它包含一个空数组。
* 信任代理的更多信息参见:[app.set](http://www.expressjs.com.cn/4x/api.html#app.set)

### req.originalUrl
  * req.url 不是Express 的本地方法, 他是继承 node [http module](https://nodejs.org/api/http.html#http_message_url)

* 这个属性与 req.url 相似,但是它保留了原始请求的url,目的用于让你在路由内部自由重写req.url.下面这个例子将app.use() 重写到挂载点
```js
// GET /search?q=Something
req.originalUrl
// => '/search?q=something'
```

### req.params
* 一个包含属性的对象,可以映射出指定路由的属性,例如您有路由'/user/:name',req.params.name 就可以拥有name属性.着丰富额对象默认为{}
```js
// GET /user/wd
req.params.name
// => 'wd'
```
* 当你使用一个正则表达式定义的路由,捕获这个数组可以使用req.params[n],这条规则适用于不知名的通配符匹配字符串路由 比如: /file/*
```js
// GET /file/javascripts/jquery.js
req.params[0]
// => 'javascripts/jquery.js'
```

### req.path
* 包含请求URL 路径的一部分
```js
// example.com/user?sort=desc
req.path
// => '/users'
```
  * 当访问来自一个中间件,挂载点不包含在req.path.查看:[app.use()](http://www.expressjs.com.cn/4x/api.html#app.use)

### req.protocol
* 请求协议字符串,使用的传输层协议是'http'/'https'.当信任代理设置信任socket 地址,'X-Forwarded-For'的值头('http' ro 'https')字段存在则被信任和使用.
```js
req.protocol
// => 'http'
```

### req.query
* 这个对象包含属性为查询每个路线参数字符串.如果无查询字符串它是个{}对象
```js
// GET /search?q=tobi+ferret
req.query.q
// => 'tobi ferret'

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
req.query.order
// => 'desc'
req.query.shoe.color
// => 'blue'
req.query.shoe.type
// => 'converse'
```

### req.route
* 当前匹配路由字符串,举例:
```js
app.get('user/:id?', function(req, res){
  console.log(req.route);
  res.send('GET');
});
```
* 示例展示之前的代码片段
```js
{ path: '/user/:id?',
  stack:
    [ { handle: [Function: userIdHandler],
        name: 'userIdHandler',
        params: undefined,
        keys: [],
        regexp: /^\/?$/i,
        method: 'get' } ],
      methods: {get: true } }
```

### req.secure
* 一个Boolean值, 如果已经建立传输层安全链接,他是true的. 举例:
```js
'https' == req.protocol;
```

### req.signedCookies
* 当我们使用[cookie-parser](https://www.npmjs.com/package/cookie-parser)中间件,这个属性中包含请求发送签署的cookies,无符号和准备使用.签署的cookies属于在不同的对象意图展示给开发者.另外,恶意攻击能够放置在req.cookie值之前(这很容易被欺骗).注意.签署的cookie 不能让其隐藏或者加密.仅仅是简单的防止篡改(因为使用的签名是个人的隐私),如果没有签署的cookie发送,则默认为{}.
```js
// Cookie: user=tobi.CP7AWaXDfAKIRfH49dQzKJx7sKzzSoPq7/AcBBRVwlI3
req.signedCookies.user
// => 'tobi'
```
* 更多信息参考: [cookie-parser](https://github.com/expressjs/cookie-parser)

### req.stale
* 指出请求是否'stale(陈旧)',它和 req,fresh 相反,跟多信息参考:[req.fresh](http://www.expressjs.com.cn/4x/api.html#req.fresh)
```js
req.stale
// => true
```

### req.subdomains
* 请求网络域名中的一组子域名
```js
// Host: 'tobi.ferrets.example.com'
req.subdomains
// => ['ferrets', 'tobi']
```

### req.xhr
* 一个Boolean 值, 如果请求'X-Requested-With'头字段为 'HMLHttpRequest' 他是true.表示请求来自一个类似jQuery库
```js
req.xhr
// => true
```

### req.accepts(types)
* 根据HTTP请求头字段,检查指定的内容是否是可以接受的.方法返回最佳的匹配.或者如果没有指定内容类型是可接受的,则返回undefined(这钟情况下,application 应响应 406 'Not Acceptable')
* 他的值类型可能是MIME类型字符串(如: 'application/json'), 一个用都好分割的类表,或者一个数组.对于一个列表或者数组,方法返回最佳匹配(如果有的话).
```js
// Accept: text/html
req.accepts('http');
// => 'html'

// Accept: text/*, application/json
req.accepts('html');
// => 'html'
req.accepts('text/html');
// => 'text/html'
req.accepts(['json', 'text']);
// => 'json'
req.accepts('application/json');
// => 'application/json'

// Accept: text/*, application/json
req.accepts('image/png');
req.accepts('png');
// => undefined

// Accepr: text/$*;q=.5, application/json
req.accepts(['html', 'json']);
// => 'json'
```
* 如果向了解更多,参考[accepts](https://github.com/expressjs/accepts)

### req.acceptsCharsets(charset[,...])
### req.acceptsEncodings(encoding[,...])
### req.acceptsLanguages(lang[,...])

### req.get(field)
* 返回指定的HTTP请求头字段(匹配不区分大小写).Referrer and Referrer 是可互换的
```js
req.get('content-Type');
// => 'text/plain'

req.get('content-type');
// => 'text/plain'

req.get('Something');
// => undefined
```
* 类似 req.header(field)

### req.is(type)
* 如果传入的MIME类型 与 HTTP响应头字段类型匹配返回true, 否则返回false.
```js
// 用 Content-Type: text/html; charset=utf-8
req.is('html');
req.is('text/html');
req.is('text/*');
// => true

// 现在  Content-Type is application/json
req.is('json');
req.is('application/json');
req.is('application/*');
// => true

req.is('html');
// => false
```
