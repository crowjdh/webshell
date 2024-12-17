const serialize = require('node-serialize');
const http = require('http');

function handlePost(req, res) {
  let body = ''

  req.on('data', function(data) {
    body += data;
  });

  req.on('end', function() {
    const user = serialize.unserialize(body);
    const { userName } = user;
    console.info(`Requested userName: ${userName}`);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(`User name: ${userName}`);
  });
}

http.createServer(function (req, res) {
  if (req.method == 'POST') {
    handlePost(req, res);
  }
}).listen('8080', '127.0.0.1');
