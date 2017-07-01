var express = require('express');

var app = express();
var admin = express();


admin.on('mount', function(parent) {
  console.log('Admin Mounted');
  // console.log(parent);
});


admin.get('/', function(req, res) {
  console.log('admin' + admin.mountpath); // 打印出模式 为 admin/admin
  res.send('admin homepage');
});

var secret = express();


secret.on('mount', function(parent) {
  console.log('Secret Mounted');
  // console.log(parent);
});


secret.get('/', function(req, res) {
  console.log('secret' + secret.mountpath); // secret/secr*t
  res.send('admin secret');
});

admin.use('/secr*t', secret); // 路径： localhost:3000/admin/serc*t
app.use('/admin', admin);
// 相当以把admin路由的路绑定到'/admin'
// app.use(['/adm*n', '/manager'], admin);

app.listen(3000);
