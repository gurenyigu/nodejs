# [nodejs官网](https://nodejs.org/en/download/)

## 安装`nodejs`可以参考`foke`的`node`项目源码中的`README`，亦可以使用以下方法
```bash
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
## 开发环境的安装：
```bash
$ sodu apt-get install -y build-essential
```
---
# [npmg官网](https://www.npmjs.com/)
## `npm`是与`nodejs`一起安装的包管理工具，能解决`nodejs`代码部署上的很多问题，常见的使用场景有以下几种：
* 允许用户从`NPM`服务器下载别人编写的第三方包到本地使用
* 允许用户从`NPM`服务器下载并安装别人编写的命令行程序到本地使用
* 允许用户将自己编写的包或命令行程序上传到`NPM`服务器供他人使用
### 查看npm版本
```bash
$ npm -v
```
---
## 使用npm

* 当前用户安装(local)与全局安装(global)
### 当前用户安装
```bash
$ npm install express 
```
* ### 安装的包会在`./node_modules`下运行npm命令时的所在目录，会在当前执行`npm`命令时生成`node_modules`目录。
* ### 代码通过`require()`来引用安装包

### 全局安装
```bash
$ npm install experss -g
```
* ### 将安装的包放在/usr/local下，或者`node`的安装目录。
* ### 可以直接在命令行里使用。

## 查看安装的模块
```bash
$ npm ls
$ npm ls -g
```

## 强制重新安装模块
```bash
$ npm install <packageName> --force
```

### 更新已安装的模块
* 如果想更新已安装的模块，就要用到`npm update`命令。它会先到远程仓库查询最新版本，然后查询本地版本。如果本地不存在，或者远程版本较新，则安装
```bash
$ npm update <packageName>
```
---
> ## `package.json`
* `package.json`文件描述了一个NPM包的所有相关的信息，其中有：作者，简介，依赖包，构建信息等。格式必须是`JSON`格式。`package.json`位于模块的目录下，用于定义包的属性。

* 每个项目的根目录下面，一般都有一个`package.json`文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。`npm install`命令根据这个配置文件，自动下载所需的模块，配置项目所需的运行和开发环境。
    >> ### sctipt字段
    * `package.json`中的`script`字段中指定了运行脚本命令的`npm`命令行缩写，比如`start`指定了运行`npm run start`时，所要执行命令。
    * 下面的设置指定了`npm run preinstall` 、`npm run postinstall` 、`npm run start` 、 `npm run test`时，所要执行的命令。
    ```js
    "scripts": {
      "preinstall": "echo here it comes!",
      "postinstall": "echo there it goes!",
      "start": "node index.js",
      "test": "tap test/*.js"
    }
    ```
    >> ### `dependencies`字段，`devDependencies`字段
    * `dependencies`字段指定了项目运行所依赖的模块，`devDependencies`指定项目开发所需要的模块。
    * 他们都指向一个对象。该对象的各个成员，分别由模块名和对应的版本要求组成，表示依赖的模块及其版本范围。
    ```bash
    {
      "devDependencies": {
      "browserify": "~13.0.0",
      "karma-browserify": "~5.0.1"
      }
    }
    ```
    * 对应的版本可以加上各种限定，主要有以下几种：
    * >>指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。
        >>>波浪号（tilde）+ 指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
        >>>插入号（caret）+ 指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
        >>>latest：安装最新版本。
        
    * `package.json`文件可以手动编辑，一般不推荐，可以使用`npm init`命令自动生成包信息
    ```bash
    $ npm init
    $ npm init --Yes
    ```
    * 这个命令在终端交互式填写`package.json`文件信息，其中项目名(name)版本信息(version)必填，其他选填。
    * 若使用别人的项目，则使用`npm install`命令，则会自动安装所有需要的模块。
    
    * 如果一个模块不在`package,json`文件中，可以选择安装这个模块，并使用相应的参数将其写入`package.json`文件中。
    * 上面的代码表示单独安装`express`模块，`--save`参数表示将该模块写入`dependencies`属性中，--seve-dev表示将该模块写入`devDependencies`属性中。
    ```bash
    $ npm install express --save
    
    $ npm install express --save-dev
    ```
    * 全局安装举例：
    安装路径：/usr/local/lib/node_modules中 
    ```bash
    nodemon安装
    $ sudo npm install nodemon -g --save
    mongodb安装
    $ sudo npm install mongodb -g --save
    ```
    
    * 卸载模块
    
    ```bash
    $ npm uninstall ***
    $ npm uninstall *** -g
    ```
    
    * 清理缓存
    
    ```bash
    $ npm cache clean 
    ```
