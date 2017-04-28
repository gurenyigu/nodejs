# [expressjs 官方文档](http://www.expressjs.com.cn)
## Express.js 是基于Node.js 中HTTP模块 和Connect 组件的WEB框架，这些组件叫作中间件，他们是以约定大于配置的原则作为开发的基础概念的。

### Express的安装
* Express.js 的包有两种形式：
```bash
express-generator: 一个提供在命令行中快速搭建应用的全局NPM包
$ npm install express-generator -g --save

express: 在Node.js应用中的node_mondules文件里的本地模块包
$ npm install express --save
```
* 命令行：
```bash
$ express -h

创建一个项目 在当前目录
$ express myProject(项目名称)

自动安装package.json中的所有模块
$ cd myProject
$ npm install

注意strat, 在package.json中  一般为：
(linux/MacOS下)
$ DEBUG=myProject npm start
(windows下)
> set DEBUG=myProject & npm start
```
