var http = require('http');
var fs = require('fs');

var port = 1234;
var localhost = '127.0.0.1';

var server = http.createServer(function(request, response){
    var url = request.url;

    if (url == '/') {
        fs.readFile('./server_in_here/index.html', function(err, data) {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.end(data);
        })
    } else {
        fs.readFile('./server_in_here' + url, function(err, data) {
            if(err){
                console.log(404 + ':' + url);
                response.writeHead(404);
                response.end("File does not exist");
                return;
            } else {
                response.writeHead(200, {"Content-Type": "text/html"});
                response.end(data);
            }
        })
    }
})

server.listen(port, localhost);
console.log('Server listening on: ' + localhost + ':' + port);
