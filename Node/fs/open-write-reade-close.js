var fs = require("fs");
var buf = new Buffer(1024);
var rfile = 'fs.md';
var wfile = 'writefs.md';
var buffer = new Buffer(1024); //new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
var string = '这是 write 写入的';

fs.open(rfile, 'r+', function(err, fd) {

  console.log('初始buffer: ', buffer);
  if (err) {
    console.log(err);
    return;
  } else {
    console.log('open文件的fd(文件描述符fill descriptor): ', fd); // 9

    /*
    fs.read(fd, buffer, offset, length, position, callback)
    从 fd 指定的文件中读取数据。
    buffer 是数据将被写入到的 buffer。
    offset 是 buffer 中开始写入的偏移量。
    length 是一个整数，指定要读取的字节数。
    position 是一个整数，指定从文件中开始读取的位置。 如果 position 为 null，则数据从当前文件位置开始读取。
    回调有三个参数 (err, bytesRead, buffer)。
    */
    fs.read(fd, buffer, 0, 5, 0, function(err, bytesRead, buffer) {
      if (err) {
        console.log(err);
      } else {
        console.log('读取文件并写入后的buffer:', buffer);
      }
    });
  }
  fs.close(fd, function(err) {
    //fd 是open方法中回调函数的一个参数
    if (err) console.log(err);
  });


  /*
  fs.write(fd, string[, position[, encoding]], callback)
  写入 string 到 fd 指定的文件。
  如果 string 不是一个字符串，则该值将被强制转换为一个字符串。
  position 指向从文件开始写入数据的位置的偏移量。 如果 typeof position !== 'number'，则数据从当前位置写入.
  encoding 是期望的字符串编码。
  回调有三个参数 (err, written, string)，其中 written 指定传入的字符串被写入多少字节。 注意，写入的字节与字符串的字符是不同的。详见 Buffer.byteLength。
  不同于写入 buffer，该方法整个字符串必须被写入。 不能指定子字符串。 这是因为结果数据的字节偏移量可能与字符串的偏移量不同。
  注意，多次对同一文件使用 fs.write 且不等待回调，是不安全的。 对于这种情况，强烈推荐使用 fs.createWriteStream。
  在 Linux 上，当文件以追加模式打开时，指定位置的写入是不起作用的。 内核会忽略位置参数，并总是将数据追加到文件的末尾。
  */

  fs.open(wfile, 'r+', function(err, fd) {
    if (err) {
      console.log(err);
    } else {
      fs.write(fd, string, 0, 'utf-8', function(err, written, string) {
        if (err) {
          console.log(err);
        } else {
          console.log('written: ', written); // 22 写入长度
          console.log('被写入的string: ', string); // 这是 write 写入的
        }
      });
    }
    fs.close(fd, function(error) {
      if (error) console.log(error);
      return;
    });
  });
});
