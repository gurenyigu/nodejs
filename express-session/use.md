```javascript
var session = require('express-session');
```

* session(options)
* 使用给定的 options 创建 session 中间件

###### 注意:
* session 数据不会保存在 cookie 中, 仅在sessionID中. session 数据储存在服务器上.
* 在 1.5.0 版本后, 此模块工作不再需要用 cookie-parser 中间件.此模块现在可以直接在 req/res 上读取和写入cookie. 使用 cookie-parser 可能会导致问题, 如果该模块和 cookie-parser 解析器之间的 secret 不一样

###### 警告:
* 默认服务器端 session 储存, `MemoryStore`(记忆储存)其本身就不是为生产环境而设计的.它会在大多情况下泄露记忆,不会超过单个进程, 用于调试和开发.

* 更多stores 明细, 查看: [compatible session stores](https://www.npmjs.com/package/express-session#compatible-session-stores)

###### Options
* `express-session` 在 options 对象中接收这些属性

###### cookie
* 对 session ID cookie 设置对象. 默认值为: {path: '/', httpOnly: true, secure: false, maxAge: null}.

* 以下是额可以在此对象中设置的选项.

> cookie.domain
>> `Set-Cookie`属性 指定 `Domain`(域) 的值. 默认没有设置域, 并且大多数客户端会考虑将 Cookie 应用于当前域.

> cookie.expires
>> `Set-Cookie`属性 指定 `Date` 对象的值. 默认不设置到期时间. 大多数客户端都会认为这是一个'非持久性的Cookie', 并会在退出Web浏览器应用时将其删除.

* 注意,如果在 options 中设置了 expires 和 maxAge. 那么在对象中最后一个定义是有效的.

* 注意, 不应该直接设置 `expires` 选项, 而只能使用 `maxAge` 选项.

> cookie.httpOnly
>> `Set-cookie`属性指定 HttpOnly 布尔值. 事实上, `HttpOnly`属性要设置, 否则没有. 默认情况下, `HttpOnly` 属性需要被设置

* 注意, 设置属性为 true 时, 正规客户端不允许其 JavaScript 的 document.cookie 中查看 cookie

> cookie.MaxAge
>> 指定 `Set-cookie` 属性 计算 `Expires`(过时期限) 的 number(毫秒单位). 可以通过获取当前服务时间 并将 `maxAge` 毫秒 单位添加到该值来计算 过期时间.默认情况下, 没有设置超时.

* 注意,如果在 options 中设置了 expires 和 maxAge. 那么在对象中最后一个定义是有效的.

> cookie.path
>> Set-cookie 指定 Path 值. 默认设置为 '/', 这是域的根路径.

> cookie.sameSite
>> `Set-Cookie` 指定 `SameSite` 属性, 布尔 或者 字符串 值.
>>> `true` 设置为 SameSite 属性, 将 `Strict` 来严格执行相同的网站.
>>> `false` 将不设置 `SameSite` 属性
>>> `lax` 设置为 SameSite 属性, 将 `Lax` 来松懈执行相同网站
>>> `strict` 设置为 SameSite 属性, 将 `Strict` 来严格执行相同网站

* 有关不同执行级别更多信息 可以在规范中找到.
[更多](https://tools.ietf.org/html/draft-west-first-party-cookies-07#section-4.1.1)

* 注意,这是一个尚未标准化的属性, 可能会在未来修改. 这也意味着许多客户端可以忽略此属性, 直到他们兼容.

> cookie.secure
>> 指定 `Set-cookie` 的 `Secure` 属性的布尔值. 事实上, `Secure` 设置此属性, 否则不是, 默认没有设置.

* 注意, 将其设置为 true时, 如果浏览器没有 HTTPS链接, 则兼容的客户端将来不会将 cookie 发送回服务器.

* 请注意 `secure: true` 是推荐的. 但是需要一个支持 https 的网站. 即HTTPS 是安全 cookie所必须的. 如果 secure 设置了, 并且通过 HTTP 访问您的站点, 则 cookie 不会被设置. 如果node.js位于代理后面并使用 `secure: true`, 则需要在 express 中设置 'trust proxy':

```JavaScript
var app =express()
app.set('trust proxy', 1); // 相信第一代理
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: true}
}));
```

* 为了在生产中使用安全的 cookie , 但允许在开发中进行测试, 以下是基于NODE_ENV在快速启用此设置的示例:
```JavaScript
var app = express();
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // 相信第一代理
  app.cookie.secure = true; // cookie 安全服务
}

app.use(session(sess));
```
* cookie.secure 选项也可以设置为特殊值 'auto', 使用此设置自动匹配确定的链接安全性.使用此设置要注意, 如果该站点可用作 HTTP 和 HTTPS, 则一旦在 HTTPS上设置 cookie, 则HTTP将不可见.在 Express 'trust proxy' 被正确设置以及简化开发 VS 生产匹配时, 这是有用的.

> genid(配置)
>> 函数调用生成新的 sessionID. 函数返回一个将被用作 sessionID 的字符串.这个函数特定一个 req 第一个参数 如果向生成ID 时使用附加到 req 的一些值.

> 默认值是函数通过 uid-safe库生成的 IDs.

* 注意, 务必生成惟一的 ID 以便seesion不冲突.

```javascript
app.use(session({
  genid: function(req) {
    return genuuid(); // 使用 UUIDs 生成 session IDs
  },
  secret: 'keyboard cat'
}))
```

> name
>> 在 response 中设置的 sessionID cookie的名称. (并在请求中读取)
>> 默认值为 'connext.sid'

* 注意,如果有多个应用在相同的主机名上运行(这只是 name , 即 localhost 或 127.0.0.1, 不同的方案和端口不会命名不同的主机名), 那么需要将 session cookie 彼此分开. 最简单的办法是金蛋的将每个应用设置不同的名称.

> proxy(代理)
>> 在设置安全cookie时信任反向代理(通过 'X-Forwarded-Proto'头)
>> 默认值是 undefined

* `true` 将使用 'X-Forwarded-Proto' 头
* `false` 所有头部否会被忽略, 只有在有直接 TLS/SSL 链接下, 链接才被认为是安全的
* `undefined` 使用'trust proxy' 设置 express

> resave
>> 强制将 session 保存回 session store. 即使在请求期间 session 未被修改. 根据 store ,这也许是必要的, 但他可以穿件竞争条件, 客户端向您的服务器发出两个并行请求, 并且在其他请求结束时,在一个请求中对 session 所做的更改可能会被覆盖, 即使不做任何修改.(这个行为也取决于正在使用的 store)

>> 默认值为 `true`, 但是使用默认值已经被废弃, 因为默认值将来会改变. 研究这个设置, 并选择适合的例子的内容. 通常可能需要`false`

>> 怎么知道这对我的商店是必要的, 最好的方法就是检查 store 是否实现了 `touch` 方法. 如果这么做, 那么可以安全的设置 `resave: false`, 如果没有实现`touch`方法,并且 在 store 储存的session 设置有效期限, 则可能需要 `resave: true`

> rolling
>> 强制在每个 response 中设置 session identifier(标识符) cookie. 到期将重置为原始 maxAge, 重置到期的倒计时.

>> 默认值为 `false`

* 注意, 将此选项设置为 true 但是将 `saveUninitialized` 选项设置为 false, 将不会在具有未初始化的  session 的 response 中设置该 cookie

> saveUninitialized(未初始化)
>> 强制将一个 'uninitalized' 的 session 保存到 store. session 在新建时未 初始化 但为修改.选择 `false` 对于实现登录 session 很有用, 减少服务器储存使用量, 在设置Cookie前遵守需要许可的法律.选择 `false` 有助于客户端在不进行 session 的情况下进行多个并行 response 请求的竞争条件.

>> 默认值为 true, 但是使用默认值已经被废弃, 因为默认值将来会改变. 研究这个设置, 并选择适合的例子的内容.

* 注意, 如果使用 Session 与 PassportJS 结合使用, Passport 将在 session 中添加一个空的 Passport 对象, 以提供用户验证后使用, 这将被视为对 session的修改, 从而保存session. 这在 PassportJS 0.3.0 中被修复.


> secret(秘密)
>> Required(必选) option
>> 这是用于签署 session ID cookie 的 secret. 这可以是一个单个 secret 字符串, 或多个 secrets 的数组. 如果提供了 一个数组 secrets, 只有第一个元素将用于签署 session ID cookie, 而验证 requests 时会考虑所有 元素.

> store
>> session store 实例, 默认为新的 `MemoryStore` 实例.

> unset
>> 控制结果 取消 req.session(通过删除, 设置为 null 等)
>> 默认值为 'keep'

>> `destroy` 当 response ends, seesion 将被销毁(删除)
>> `keep` store 中的 session 将被保留, 但是在 request 期间, 进行的修改将会被忽略而不被保存.

> req.session
>> store(储存) or access(访问) session data, 只需要 request 属性 req.session, 通常由 store 序列化为 JSON, 所以 嵌套对象通常很友好. 下面是一个具体用户计数器,例子:

```javascript
// 使用 session 中间件
app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}}));

// req.session 访问 session
app.get('/', function(req, res, next){
  var sess = req.session;
  if(sess.views) {
    sess.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    var sess.views = 1;
    res.end('welcome to the session demo .refresh!');
  }
});
```

###### Session.regenerate(callback)
* 要重新 生成 session, 只需要调用该方法即可. 一旦完成, 新的 SID 和 session 实例将在 req 初始化. session 和 callback 将被回调
* regenerate(再生, 重生)
```javascript
req.session.regenerate(function(err) {
  // 这里将有一个新的 session
});
```

##### Session.destroy(callback)
* 销毁 session 并将 req.session 属性设置取消. 一旦完成,将调用 callback.
* destroy(销毁, 破坏)
```javascript
req.session.destroy(function(err){
  // 不可以访问的 session 在这里
});
```

##### Session.reload(callback)
* 从 store 中重新加载 session 数据, 并重新填充到 req.session 对象中. 一旦完成 执行回调函数
```javascript
req.session.reload(function(err) {
  // session 更新
});
```

##### Session.save(callback)
* 将  session 保存到 store, 用内存中的内容 替换 store 中的内容.(尽管store 可能会做其他事情, 具体查看store 文档, 查看标准行为.)

* 如果 sassion data 被更改, 则在 HTTP响应结束时自动调用此方法.(尽管这种行为可以通过中间件构造函数中的各种选项进行更改),因此, 通常不需要调用此方法

* 在某些情况下, 调用此方法(例如: long-lived requests or WebSockets) 很有用.
```javascript
req.session.save(function(err){
  // 保存 session
});
```

###### Session.touch()
* 更新 maxAge 属性. 通常不需要调用, 因为 session 中间件为您执行次操作.

###### req.session.id
* 每个 session 都有一个与之关联唯一 ID. 此属性是 req.sessionID 的别名, 无法修改. 拿到这个属性, 可以从 sessionID 访问 session 对象.(??? 已添加它, 以便从 session 对象访问 sessionID)

###### req.session.cookie
* 每个 session 都有一个 唯一的cookie 对象陪伴它. 这允许你更改每个访问者的 session cookie. 例如, 可以将 req.session.cookie.expires 设置为 false. 以便 cookie 仅在用户代理的持续时间内保存.

###### Cookie.maxAge
* 另外 req.session.cookie.maxAge 将返回剩余时间(以毫秒为单位), 我们也可以重新分配一个新值来适当的调整.expires属性. 以下是基本相同的.
```javascript
var hour = 3600000;
req.session.cookie.expires = new Date(Date.now() + hour);
req.session.cookie.maxAge = hour;
```
* 例如, 当maxAge设置为 60000(一分钟), 并且30秒已经过去时, 他将返回 30000, 直到当前请求完成时调用 req.session.touch() 将 req.session.maxAge重置为原始值.
```javascript
req.session.cookie.maxAge; // => 30000
```

###### req.session.ID
* 要获取已加载 sessionID, 请访问请求属性 req.sessionID.这只是在加载/创建 session 时设置的只读值.


##### Session Store Implementation
* 每个 session store 必须是 EventEmitter 与 Implement 具体方法. 以下方法是必须的, 推荐的和可选的列表.

* Required(必需)的方法是这个模块将始终在 store 中调用的方法.
* Recommended(推荐)的方法是这个模块将在 store 中调用的方法
* Optional(可选)方法是这个模块根本不调用, 但有助于向用户呈现统一的 stores.

* 更多 Implementation 示例查阅 (connect-redis)[http://github.com/visionmedia/connect-redis] repo.

###### store.all(callback)
* Optional
* 这个可选方法用于获取(store)储存中的所有 sessions 以数组形式. callback 形如: callback(error, sessions)

###### store.destroy(sid, callback)
* Required
* 这个必须的方法用于从给定 sessionID(sid) 的 store 中销毁/删除绘画. 一旦 session 被销毁, 触发的 callback 形如: callback(error)

###### store.clear(callback)
* Optional
* 此可选方法用于从 store 中删除所有 sessions. 清除store 后触发 callback 形如: callback(error)

###### store.length(callback)
* Optional
* 此可选方法用于获取 store 中所有 session 的长度. 回调函数形如: callback(error, len)

###### store.get(sid, callback)
* Required
* 这个必须的方法用于从给定 sessionID(sid) 的 store 中获取 session, 回调形如: callback(error, session)

* session 参数 如果找到应该是一个 session, 如果没有找到 session(并且没有错误), 则为 null 或者 undefined, 当 error.code === 'ENOENT' 时会发生特殊情况, 形如: callback(null, null)

###### store.set(sid, session, callback)
* Required
* 这个必须的方法用于将给定的 sessionID(sid) 和 会话(session)对象 插入 session 到store. session 在 store中设置后, 触发的函数形如: callback(error)

###### store.touch(sid, session, callback)
* Recommended
* 这个推荐方法用于将给定session ID(sid) 和 会话(session)对象时 '联系' 一个给定的 session

* 这主要用于 store 当 store 会自动删除空闲 session 时使用 并且 该方法用于在给定 session active 时向 store 发送信号.


### 兼容 session store
* 以下模块实现与此模块兼容的 session store. 请使用 PR 添加额外模块.
(详情查看: )[https://www.npmjs.com/package/express-session#compatible-session-stores]
