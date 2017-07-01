var express = require('express');
var app = express();

app.get('/viewdirectory', require('../mymiddleware'));

app.listen(3000);
