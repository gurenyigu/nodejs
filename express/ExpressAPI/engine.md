## 在`Express`中使用模块引擎
* 需要在应用中进行如下设置才能让`Express`渲染模板文件:
  * `views`, 放模板文件的目录，比如: `app.set('views','./views')`;
  * `view engine`, 模板引擎，比如: `app.set('view engine', 'jade')`;
* 然后就可以安装相应的模板引擎npm软件包
```bash
$ npm install jade --save
```
  * 和`Express`兼容的模块引擎，比如`res.render()`调用其导出方法`__express(filePath, options, callback)`渲染模块。有一些模板引擎不遵守这种约定，[Consolidate](https://www.npmjs.org/package/consolidate)能将Node中所有流行的模板引擎映射为这种约定，这样就可以和`Express`无缝链接。
* 一旦`view engine`设置成功，就不需要显示指定引擎，或者在应用中加载模板引擎模块，Express已经在内部加载，如下所示。
```js
app.set('view engine', 'jade');
```
* 在`views`目录下生成名为`index.jade`的`Jade`模板文件，内容如下:
```HTML
html
  head
    title!= title
  body
    h1!= message
```
* 然后创建一个路由渲染`index.jade`文件。如果没有设置`view engine`,您需要指明试图文件的后缀，否则就会遗漏它。
```js
app.get('/', function(req, res){
  res.render('index', {title: 'Hey', message: 'Hello jade!'});
});
```
* 此时向主页发送请求，'index.jade', 会被渲染成HTML。

## 模板引擎在`express`中是如何工作的
* 通过 `app.engine(ext, callback)` 方法即可创建一个你自己的模板引擎。其中，ext是指文件拓展名、callback是模板引擎的主函数，接收文件路径、参数对象和回调函数作为参数。
* 下面的代码演示是一个非常简单的能够渲染'.ntl'的文件的模板引擎。
```js
var fs = require('fs');
app.engine('ntl', function(filePath, options, callback){
  // 定义模板引擎
  fs.readFile(filePath, function(err, content){
    if(err) return callback(new Error(err));
    // 这是一个功能极简的模块引擎
    var rendered = content.toString().replace('#title#', '<title>' + options.title + '</title>')
    .replace('#message#', '<h1>' + options.message + '</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views');// 指定视图所在的位置
app.set('view engine', 'ntl');// 注册模块引擎
```

* 现在'.ntl' 文件就可以被正确的渲染了。现在在`views`目录创建一个名为'index.ntl'的模块内容如下：
```html
#title#
#message#
```

* 然后，按下面示例设置路由：
```js
app.get('/', function(req, res){
  res.render('index', {title: 'Hey', message: 'Hello engine!'});
});
```
* 访问网站首页就能看到由'index.ntl'文件渲染出来的HTML页面了。
