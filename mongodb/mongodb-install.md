# 安装
### [mongodb官网](https://www.mongodb.com/)

```bash
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```
##### 添加源 及公共keyserver
### ubuntu软件安装源在 /etc/apt/sources.list 中

```bash
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" 
$ sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```
* 注意上方的链接版本可以更改记得查看最新版本

* 现在添加好源后进行同步软件
```bash
$ sudo apt-get update
```
* 下面进行mongodb数据库的安装
```bash
$ sudo apt-get install -y mongodb-org
```
* mongodb 配置文件地址：
```bash
$ etc/mongod.conf
```
* mongodb默认端口27017 IP 127.0.0.1

# [mongodb图形化界面](https://robomongo.org/download)
* 下载压缩文件后tar zxvf  ********** 文档名 进行解压
 * 解压目录中bin robomongo 进行运行
```bash
$ ./robomongo
```
