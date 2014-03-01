var express = require('express');
var http = require('http');
var swig = require('swig');
var reload = require('reload')
var app = express();

//static them files
app.use(express.static(__dirname + '/static'));

//set up the sockets
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
var io = require('socket.io').listen(server, { log: false });
reload(server, app)
server.listen(app.get('port'), function() {
	console.log("Web server listening on port " + app.get('port'));
}); 

//set up the swig
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
  	res.render('index'); 
});

io.sockets.on('connection', function(socket) {
	console.log('bye?');
});