//Make sure to run the following commands in your ec2 app:
//npm install mysql2

let http = require('http');

const noun = require("./Model/noun.js");

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(3000);

console.log("Server running!");