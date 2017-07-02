const fs = require('fs');
const http = require('http');
const query = require('querystring');

http.createServer((req, res) => {
  if (req.url == '/user' && req.method == 'POST') {
    let data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });

    req.on('end', function() {
      console.log(query.parse(data));
      res.writeHead(200, {
        'content-Type': 'text/html'
      });
      try {
        let content = fs.readFileSync('./user.html', 'utf-8');
        res.end(content);
      } catch (err) {
        error(err);
      }
    });
  } else if (req.url == '/' && req.method == 'GET') {
    res.writeHead(200, {
      'content-Type': 'text/html'
    });
    try {
      let content = fs.readFileSync('./index.html', 'utf-8');
      res.end(content);
    } catch (err) {
      error(err);
    }
  } else if (req.url == '/login' && req.method == 'GET') {
    res.writeHead(200, {
      'content-Type': 'text/html'
    });
    // console.log(1);
    try {
      let content = fs.readFileSync('./index.html', 'utf-8');
      res.end(content);
    } catch (err) {
      error(err);
    }
  } else {
    error();
  }

  function error(er) {
    res.end('Font 404!!!');
  }
}).listen(8000);
