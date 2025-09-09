let http = require('http');

//Alexa heading
const skill = require('arn:aws:lambda:us-west-2:884178322167:function:f8d892d9-3fc6-43fc-9fc9-8eeb4682a06e:Release_0'); // Path to your Alexa skill
const handler = skill.handler;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(3000);
