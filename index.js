let http = require('http');

//Alexa heading
//const skill = require('http://nodejs-redirect-2143773779.us-east-2.elb.amazonaws.com/'); // Path to your Alexa skill
//const handler = skill.handler;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(3000);
