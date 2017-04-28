var fs = require('fs');

fs.stat('http.js',function(err,stats){
  console.error(err);
  console.log(stats);
});
//时间值  显示系统信息。 亦用来检测一个文件/文件夹是否存在。
