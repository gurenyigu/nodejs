// 同步使用方法
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$0rD';
const someOtherPlaintextPassword = 'not_bacon';

// 生成 hash 密码
// 方法一: 在单独的函数调用中生成一个 salt 和 hash
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(myPlaintextPassword, salt);
// 储存 hsah 到数据库

// 方法二: 自动生成salt 和 hash
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

// 与异步所达到的结果是一样的

// 密码检测
// 从数据库拿到 hash
bcrypt.compareSync(myPlaintextPassword, hash); // true
bcrypt.compareSync(somwOtherPlaintextPassword, hash); // false
