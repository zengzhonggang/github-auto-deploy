var http = require('http')
var createHandler = require('github-webhook-handler')
var spawn = require('child_process').spawn;
var url = require('url');
var config = require('./config');
var handler = createHandler({ path: '/webhook', secret: config.secret })
http.createServer(function (req, res) {
    res.end(req.url)
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(2222)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})
handler.on('push', function (event) {
    var params = url.parse(event.url, true).query;
    runCommand('sh', ['./auto_build.sh', config[params.p].code_path], function( txt ){
        console.log(txt);
    });
})
function runCommand( cmd, args, callback ){
    var child = spawn( cmd, args );
    var response = '';
    child.stdout.on('data', function( buffer ){ resp += buffer.toString(); });
    child.stdout.on('end', function(){ callback( resp ) });
}
