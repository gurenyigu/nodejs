var fs = require('fs');
var dir = 'dir';
fs.mkdir(dir,0o744,function(err){
  if(err){
    fs.rmdir(dir,function(err){
      if(err) console.log(err);
      else {
        console.log('文件夹存在，已经删除....');
      }
    });
  }else {
    console.log("创建成功...");
  }
})
// 通过删除文件与创建文件的返回参数 进行：有则删除  无则创建。
