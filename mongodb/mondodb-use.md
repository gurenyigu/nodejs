# mongodb 的使用
#### 参考文档
* [mongodb文档](https://docs.mongodb.com/getting-started/node/insert/) 
* [mongodb-zh](http://docs.mongoing.com/manual-zh/) 
* [mongodb入门文档](http://javascript.ruanyifeng.com/nodejs/mongodb.html) 
* [mongoose文档](http://mongoosejs.com/) 

### 正确的启用mongodb数据库：
## ps -a 查看当前进程 是否存在 mongo 不存在则执行下面的命令
```bash
启动：
sudo service mongod start
重启：
sudo service mongod restart
```
正确的关闭数据库：
```bash
1、登录数据库后关闭服务
> use admin
switched to db admin 
> db.shutdownServer();
> exit 
bye

2、另外一种终端操作
kill -15, killall mongod
```

此时浏览器输入mongo配置的IP地址及端口号显示
```html
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```

进行本地数据库的操作：
```bash
进入数据库
> sudo mongo

> show dbs
显示所有的数据库(两个系统数据库)这时应有三个

创建数据库 / 进入一个数据库
> use exercise
创建名为exercise的数据库

> db.dropDatabase()
删除这个数据库

> db
查看当前所在数据库

> show collections
展示当前所在数据库的所有集合

增加:
> db.firstclass.insert({'name':'wu','age':20})
创建一个名为firstclass的集合 / 并插入一条数据

删除：
> db.name.drop()
删除刚刚创建的集合

* 以下集合操作，firstclass 以 name 代替
增：
> db.name.insert({'name':'huang','age':23})
WriteResult({'nMatched': 1, 'nUpserted': 0, 'nModified': 1})
出现的结果 语义依次为  匹配到  更新的  修改的 + 个数
插入数据，名字 ，年龄

```

### mongodb修改操作
* 文档的数据结构和JSON基本相同，所有的储存在和集中的数据都是BSON格式
  * BSON是一种JSON的一种二进制形式的储存格式，简称Binary JSON。
  
#### 变量！
```bash
> any = {'name':'yuan','age':23'}
> db.name.insert(any)
```

#### 更改 - save
```bash
如果不指定_id，save()方法类似于insert()方法。如果指定_id字段，则会该_id的数据
> db.name.save({'_id': ObjectId('××××××××××××××××××××××'),'name':'wu','age':20','gender':'male'})
为_id为 ObjectId("********************") 的文档添加一个"gender":"male"
若不指定_id,则插入一条文档数据
指定的_id若不存在则报错
```

#### 修改(更新) -update
```bash
 db.name.update({query},{update},upsert<boolean>,multi<boolean>,writeConcen<document>)
 参数说明：
 query : update的查找条件
 update : update的对象个一些更新的操作符(ps:$,$inc,$set)等，也可以理解为aql update$ 后面的
 upsert : 可选，这个参数指，如果不存在update的查询条件，是否插入新的文档。true为插入，默认是false，不插入
 multi : 可选，mongodb默认是false，值更新找到的第一条数据，如果设置true，则把所有满足query的项目全部更改
 writeConcern : 可选，抛出错误异常级别
```

```实例
> db.name.update({'name':'wu'},{$set:{'age':30}})
更改 查找条件 wu 的 age 修改为 30

> db.name.update({'name':'liu'},{$set:{'gender':'male'}},false)
未找到name是 liu的数据  不更该 不添加 不报错

> db.name.update({'name':'liu'},{$set:{'gender':'male','gender':'famale'}},true)
未找到name是 liu的数据  不更该 添加 不报错

> db.name.update({'gender':'famale'},{$set:{'age':22}},false,true)
将所有gender为 famale的 age 设置为 22 不填加  全局更改  不满足也不报错 会提示无匹陪 未更改 没添加 

> db.name.update({'name':'wu'},{$inc:{'age':3}},false,true)
为所有 name 为 wu的 age 增加 3  只可以增加数字 其他报错

> db.name.update({'name':'wu'},{$unset:{'age':1,'gender':1}}false,true)
将 文档所有 name 为wu 的数据中  age 和 gender 字段删除

> db.name.updae({'name':'jin'},{$push:{'age':20}},{$inc:{'age':5}},false,true)
对 name 为jin 的插入age 为 20 age 增加 5  第一项必须为false 不符合条件无法创建 无法全局修改 但第二项可以为true 但无效

> db.name.update({'name':'wu'},{$pushAll:{'like':['eat','play']}},true,true)
为 name 为 wu 的域插入多个数据 ，数据可以为新数据  不存在可插入 可全局更新

> db.name.update({'name':'wu'},{$pop:{'like':-1}},false,true)
删除 name 为 wu ，like 域中的 第一个参数 当只有一个参数时全部删除！ 不可以对非[域]中的参数删除 否则报错  指定 1 则为倒数第一个参数

> db.name.update({'name':wu'},{$pull:{'like':'eat'}},false,true)
删除 name 为 wu ，like 中 eat 的参数 遍历所有

> db.name.updata({'name':'wu'},{$pullAll:{'like':['hack','sleep']}},false,true)
删除 name 为 wu ，lile 域中的  hack sleep 遍历所有 若不存在参数 ‘hack’ sleep 不报错 提示未匹配

修改域名
> db.name.update({'age':32},{$rename:{'name':'名字'}},false,true)
查找 age 为32 的 将域名 name 修改为 名字 遍历所有  

添加数据，数据不存在时才添加
db.name.update({'名字':'wu'},{$addToSet:{'from':'china'}},false,true)
查找 名字 为 wu 的 添加数据  遍历所有
```

#### 删除文档 -remove
```bash
 db.collectionName.remove({query},justOne<boolean>,writeCocern<document>)
 参数说明：
 query : 删除指定条件文档
 justOne : 设置为true或者1 时，仅仅删除第一个符合条件的文档，默认删除所有符合条件的
 writeConcern: 抛出异常
 
 > db.name.remove({'age':10},1)
删除第一条符合条件的文档
 > db.name.remove({'age':10})
 删除所有符合条件的文档
 
 > db.name.remove({})
 删除该合计 所有文档
 
```

#### 查找文档 -find
```bash
db.name.find()
查看name合集所有 

db.name.findOne()
查看name和集中的第一个

> db.name.find({'name':'wu'})
条件查找

db.name.find({'age':{$lt: 22}})
查找年龄小于 10的文档  < 

db.name.find({'age':{$lte:22}})
查询年龄小于 等于10的文档  <=  

db.name.find({'age':{$gte: 23}})
查询年龄大于等于 23的文档  >

db.name.find({'age':{$gt:23}})
查询年龄大于 23的文档   >=

db.name.find({'age':{$ne: 22}})
查找年龄不等于 22的文档  /=

db.name.find({'age':{$mod:[10,0]}})
查询年龄能被 10整除的文档

db.name.find({'age':{$not:{$mod:[10,0]}}})
查询年龄不能被 10整除的文档

db.name.find({'like':{$all:['eat','sleep','play']}})
查询like域中包含 此三项内容的 文档

db.name.find({'like':{$size:3}})
查询like域中 个数为三个的项目

&& 条件查询
db.name.find({'name':'shuo','like':'sleep'})
查询 name 为shuo like 包含 sleep 的文档

db.name.find({'name':'shuo','like':'sleep'}).pretty()
查询 name 为shuo like 包含 sleep 的文档 某种格式显示

|| 条件查询
db.name.find({$or:[{'age':20},{'age':23}]}).pretty()
查找出age 为 20 或者 23 的文档 并按照某种格式 显示

&& || 与或的混合应用
db.name.find({'name':'wu',$or:[{'age':20},{'age':23}]}).pretty()
查询 name 为wu 年龄为 age 为 20/23 的文档 并按某种格式显示

```    

#### 查询控制结果
```bash
> db.name.find().limit(2)
出处查找结果的前两张

> db.name.find().skip(1)
skip跳过查询显示的前一条，后面的开始显示

> db.name.find().limit(10).skip(5)
查询 第五条 到 第10 条间的数据

> db.name.find().count()
统计查询达到项目个数

> db.name.find().sort({'age':1})
对查找结果  根据'age’ 进行升序排序  -1 则为降序排序

将查询到的文档根据指定数据形式输出：
db.name.find({},{'name':1,'age':1})
只显示 文档 姓名和年龄项

```

### MongoDB索引
* 索引是为了提高查询效率，使用索引可快速访问数据库表中的特定信息。索引是对值进行排序的一种结构。如果没有索引，那么查找时会扫描整个集合，数据量大时效率会很低。

### MongoDB聚合
aggregate(聚合)主要用于文档数据的统计计算。如：平均值，求和，个数等
```bash
db.name.count()
统计集合中  文档的个数 db.name.find().count() 相同

db.name.count({'age':23})
统计出文档中符合条件的个数

db.name.aggregate()
按照name 分组计算name相同每组个数
db.name.aggregate([{$group:{_id:'$name',num:{$sun:1}}}])

按照name值分组 计算每组中年龄 和
db.name.aggregate([{$group:{_id:'$name',num:{$sum:'$age'}}}])

按照name值分组，并计算组中年龄的平均值
db.name.aggregate([{$group:{_id:'$name',num:{$avg:'$age'}}}])

按照name值分组 并计算每组中年龄的最小值
db.name.aggregate([{$group:{_id:'$name',num:{$min:'$age'}}}])

按照name的分组 计算每组中的最大值
db.name.aggrefate([{$group:{_id:'$name',num:{$max:'$age'}}}])


```
