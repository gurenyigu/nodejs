var birds = require('./birds');

var express = require('express');
var app = express();

app.use('/birds', birds);

app.listen(3000);

// nodemon 监听这个程序 访问： http://localhost:27017/birds  显示： Birds home page
//  访问： http://localhost:27017/birds/about  显示： About birds
//  其他没有效果
