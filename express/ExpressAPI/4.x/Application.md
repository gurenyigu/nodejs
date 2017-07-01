## `Application`(应用程序)
* app 对象通常表示ecpress()application. 通过创建它来调用express()函数产生Express方法。
```js
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello express!');
});

app.listen(3000);
```
* 这个`app` 对象含有的方法有：
  * HTTP响应路由：参考例子，[app.method](http://www.expressjs.com.cn/4x/api.html#app.METHOD) and [app.param](http://www.expressjs.com.cn/4x/api.html#app.param).
  * 配置中间件：参考,[app.route](http://www.expressjs.com.cn/4x/api.html#app.route).
  * 渲染HTML视图：参考[app.render](http://www.expressjs.com.cn/4x/api.html#app.render).
  * 注册一个模板引擎：参考[app.engine](http://www.expressjs.com.cn/4x/api.html#app.engine).
* 它同样设置(属性)如何影响`application`默认行为：参考[Application settings](http://www.expressjs.com.cn/4x/api.html#app.settings.table).

## Properties(属性)
### app.locals
* `app.locals`是一个`JavaScript`对象。这个属性在`Application`中是局部变量。
* 设置一次`app.locals`属性就存留在`application`的整个生命周期。相比`res.locals`，它只存在请求周期有效。
* 你可以在模板中访问局部变量并渲染`application`。在模板中可以为你提供辅助函数，以及`app-level` 数据。注意：无论如何你也不可以在中间件中访问局部变量。
```js
app.locals.title = 'My app';
app.locals.strftime = require('strftime');
app.locals.email = 'me@myapp.com';
```

### app.mountpath
* `app.mountpath`属性路径模式安装子程序。
  * 子程序实例是由`express`产生的，可以用来处理请求路由。
```js
var express = require('express');

var app = express();  // 主程序
var admin = express(); // 子程序

admin.get('/', function(req, res){
  console.log(admin.mountpath); //  /admin
  res.send('Admin Homepage');
});

app.use('/admin', admin); // 嵌入子程序
```
* 它与`req`对象中`baseUrl`属性相似，除了 `req.baseUrl` 返回的是一个匹配的URL路径，而不是一个匹配的模式。
* 如果子程序嵌入在多个路径模式，`app.mountpath`返回嵌入的模式列表，如下所示：
```js
var admin = express();

admin.get('/', function(req, res){
  console.log(admin.mountpath); // [ 'adm*n', '/manager']
  res.send('Admin Homepage');
});

var secret = express();
secret.get('/', function(req, res){
  console.log(secret.mountpath);
  res.send('Admin Secret');
});

admin.use('/secr*t', secret);  // 加载'/secret' 的路由 '/sect*t/' ，在'admin'的子程序上
app.use(['/adm*n', '/manager'], admin); // 加载 'admin' 的路由  ‘/adm*n’ ,在父程序'app'上
```

## Events
### app.on('mount', callback(parent));

* 嵌套子程序事件触发一个被嵌套在父应用的程序。父应用程序会传递给回调函数。
```js
var admin = express()
admin.on('mount', function(parent){
  console.log('Admin Mounted');
  console.log(parent); // 指出父应用程序
});

admin.get('/', function(req, res){
  res.send('Admin Homepage');
});

app.use('/admin', admin);
```

## `Methods`
### [更多方法参考](http://www.expressjs.com.cn/4x/api.html#app.all)
