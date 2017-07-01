var fs = require('fs');

/*
测试 path 指定的文件或目录的用户权限。 mode 是一个可选的整数，指定要执行的可访问性检查。 以下常量定义了 mode 的可能值。 可以创建由两个或更多个值的位或组成的掩码。

fs.constants.F_OK - path 文件对调用进程可见。 这在确定文件是否存在时很有用，但不涉及 rwx 权限。 如果没指定 mode，则默认为该值。
fs.constants.R_OK - path 文件可被调用进程读取。
fs.constants.W_OK - path 文件可被调用进程写入。
fs.constants.X_OK - path 文件可被调用进程执行。 对 Windows 系统没作用（相当于 fs.constants.F_OK）。
最后一个参数 callback 是一个回调函数，会带有一个可能的错误参数被调用。 如果可访问性检查有任何的失败，则错误参数会被传入。 下面的例子会检查 /etc/passwd 文件是否可以被当前进程读取和写入。
*/
fs.access('fs.md', fs.constants.R_OK && fs.constants.W_OK, (error) => {
  console.log(error ? 'no access' : 'can read&write');
});
