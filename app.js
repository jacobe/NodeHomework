var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

// This simulates a database, keeping data in-memory for the app lifetime.
var registrations = {};

app.get('/', function(req, res) {
	res.sendfile('html/index.html');
});

app.get('/api/registrations', function(req, res) {
	var date = moment(req.query.date).startOf('isoweek').toISOString();
	res.send(registrations[date] || []);
});

app.post('/api/registrations', function(req, res) {
	var startDate = req.body.startDate;
	registrations[startDate] = req.body.registrations;
	res.end();
});

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});