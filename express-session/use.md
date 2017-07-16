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
