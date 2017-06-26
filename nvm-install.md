# [参考](https://segmentfault.com/a/1190000004404505)
# nvm
* 总的来说，nvm有点类似于`Python`的`virtualent`或者`Ruby`的`rvm`，每个`node`版本的模块都会被安装在各自版本的沙箱里面(因此切换版本后，模块要重新安装)，因此考虑到需要时对`Node`版本进行切换测试兼容性和一些模块对`node`版本的限制，我选择了使用`nvm`作为管理工具。

## nvm安装
```bash
$ curl -o- https://raw.githubsercontent.com/creationtx/nvm/v0.30.2/install.sh | bash
```
* 这里的nvm版本可以访问github，查看最新版本号安装。

## 配置环境变量
* ubuntu下打开
```bash
~/.bashrc
```
* 最后一行添加：
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```
* 然后执行：
```bash
. ./bashrc
```
## 终端输入nvm查看所有命令

### 查看`nodejs`远程服务器的所有版本
```bash
$ nvm ls-remote
```
### 安装/删除一个`node`版本
```bash
$ nvm install v****

$ nvm uninstall v****
```
### 查看本地所有版本
```bash
$ nvm ls
```
### 显示当前版本
```bash
$ nvm current
```
### 多版本切换及设置默认
```bash
$ nvm use v***
$ nvm alias default v***
```
### 给不同的版本号添加/删除别名
```bash
$ nvm alias <name> <version>

$ nvm unalias <name>
```
### 在当前版本node环境下，重新全局安装指定版本号的npm包
```bash
$ nvm reinstall-packages <version>
```
