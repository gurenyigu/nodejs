## `route`
* 路由是指如何定义应用的端点`(URIs)` 以及如何响应客户端的请求
* 路由是由一个`URI`、`HTTP`请求(GET、POST等)和若干个句柄组成，它的结构如下：app.Method(path,[callback...],callback),app是`express`对象的一个实例，Method是一个HTTP请求方法，`path`是服务器上的路径，`callback`是当路由匹配时要执行的函数。

一个基础路由示例：
```js
var express = require('express');
var app = express();

// 当一个GET请求主页时  响应 ‘helloworld’
app.get('/',function(req,res){
  res.send('helloworld');
});
```

* `Express` 定义了如下和HTTP请求对应的路由方法：get,post,put,head,delete,options,trace,copy,lock,mkcol,move,purge,propfind,proppatch,unlock,report,mkactivity,checkout,merge,m-search,notify,subscribe,unsubscribe,path,search,connect.

* `app.all()`是一个特殊的路由方法，没有任何`HTTP`方法与其对应，他的作用是对于一个路径上的所有请求加载中间件。
* 下面一个例子中，来自'/secret'的 请求，不管使用GET，POST，PUT，DELETE或者其他任何HTTP模块支持的 HTTP 请求，句柄都会的得到执行。

```js
app.all('/secret',function(req,res,next){
  console.log('Accessing(访问) the secret section(部分) ...');
  next(); // 接下来执行下面的处理程序 参考 hello.js
});
```
## 路由路径
* 路由路径和请求方法一起定义了请求的端点，它可以是字符串，字符串模式或者正则表达式。
  * `Express`使用[path-to-regexp](https://www.npmjs.com/package/path-to-regexp)匹配路由路径(node 插件)，参考文档查阅其定义路由的方法。
  * [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/)一个测试基本`Express`路径的在线工具，但不支持模式匹配。

#### 使用 字符串 匹配路径的请求示例：
```js

// 匹配根目录：
app.get('/',function(req,res){
  res.send('root');
});

// 匹配 /about 路径的请求
app.post('/about',function(req,res){
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.put('/random.text',function(res,req){
  res.send('random.text');
});
```
#### 使用 字符串模式 的路由路径示例
```js
// 匹配 acd 和 abcd
app.get('/ab?cd',function(req,res){
  res.send('ab?cd');
});

// 匹配abcd、abbcd、abbbcd等
app.get('/ab+cd',function(req,res){
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRADEMEcd、ab123cd等
app.get('/ab*cd',function(req,res){
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e',function(req,res){
  res.send('ab()?e');
});
```
* 字符?、+、* 和()是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。

#### 使用 正则表达式 的路由路径的示例
```js
// 匹配任何路径中含有 a 的路径
app.get(/a/,function(req,res){
  res.send('/a/');
});

// 匹配 butterfly、drahonfly等以 fly 结尾的字符串
app.get(/.*fly$/, function(req,res){
  res.send('/.*fly$/');
});
```

## 路由句柄
* 可以为请求处理提供多个回调函数，其行为类似 中间件。唯一的区别就是这些回调函数有可能调用next('route')方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权限交给剩下的路径。
* 路由句柄有多种形式，可以是一个函数、一个函数数组、或者是两者的混合，如下所示。

#### 一个处理函数
```js
app.get('/example/a',function(req,res){
  res.send('Hello from A!');
});
```
#### 使用多个回调函数处理路由(记得指定next对象):
```js
app.get('example/b',function(req,res,next){
  console.log('响应将由下一个函数发送...');
  next();
},function(req,res){
  res.send('hello from b!');
});
```

#### 使用回调函数数组处理路由
```js
var cb0 = function(req,res,next){
  console.log('CB0');
  next();
}

var cb1 = function(req,res,next){
  console.log('CB1');
  next();
}

var cb2 = function(req,res){
  res.send('hello from c!');
}

app.get('/example/c',[cb0,cb1,cb2]);
```

#### 混合使用函数和函数数组处理路由：
```js
var cb0 = function(req,res,next){
  console.log('CB0');
  next();
}

var cb1 = function(req,res,next){
  console.log('CB1');
  next();
}

app.get('/example/d',[cb0,cb1],function(req,res,next){
  console.log('响应将由下一个函数处理...');
  next();
},function(req,res){
  res.send('hello from D!');
});
```
## 响应方法 `response`
* 下列中响应对象 (res) 的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

| 方法 | 描述 |
| --- |:---:|
| res.download() | 提示下载文件 |
| res.end() | 终结响应处理流程 |
| res.json() | 发送一个JSON格式的响应 |
| res.jsonp() | 发送一个支持JSONP的JSON格式的响应 |
| res.redirect() | 重定向请求 |
| res.render() | 渲染试图模块 |
| res.send() | 发送各种类型的响应 |
| res.sendFile | 以八位字节流的形式发送文件 |
| res.sendStatus() | 设置响应状态码，并将其以字符串形式作为响应体的一部分发送 |

### `app.route()`
* 可使用 app.route() 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样有助于创建模块化路由，减少代码沉余和拼写错误。下面的示例程序使用`app.route()`定义了链式路由的句柄
```js
app.toute('/book')
  .get(function(req,res){
    res.send('Get a random book');
  })
  .post(function(req,res){
    res.send('Add a book');
  })
  .put(function(req,res){
    res.send('Update the book');
  });
```
<<<<<<< HEAD
## `express.Router`
* 可使用 `express.Router` 类创建模块化、可挂载的路由句柄。`Router`实例是一个完整的中间件和路由系统，因此常称其为一个'mini-app'。下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将他们挂载至应用路径上。
### [具体示例参考]()
=======
## express.Router
* 可使用 express.Router 类创建模块化、可挂载的路由句柄。Router实例是一个完整的中间件和路由系统，因此常称其为一个'mini-app'。下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将他们挂载至应用路径上。
### [具体示例参考](https://github.com/gurenyigu/nodejs/tree/master/express/ExpressAPI/Router)
>>>>>>> 157b63a87c94ba79db5ce6d5192af302e311b36f
