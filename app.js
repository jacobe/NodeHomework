var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

var registrations = [];

app.get('/', function(req, res) {
	res.sendfile('html/index.html');
});

app.get('/api/registrations', function(req, res) {
	res.send(registrations);
});

app.post('/api/registrations', function(req, res) {
	registrations = req.body.registrations;
	res.end();
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});