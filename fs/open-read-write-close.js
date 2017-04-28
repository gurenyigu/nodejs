var fs = require("fs");
var buf = new Buffer(1024);
var rfile = 'fs.md';
var wfile = 'writefs.md';

fs.open(rfile,'r+',function(err,fd){
  if (err){
    console.log(err);
    return;
  }else {
    console.log(fd);
    fs.readFile(rfile,'utf-8',function(err,data){
      if(err){
        console.log(err);
      }else{
        fs.writeFile(wfile,data,function(err){
          if(err) {
            console.log(err);
          }
        });
      }
    });
  }
  fs.close(fd,function(err){
    //fd 是open方法中回调函数的一个参数
    if(err) console.log(err);
  });
});
