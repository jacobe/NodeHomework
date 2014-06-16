var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var nStore = require('nStore');

var app = express();
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile('html/index.html');
});

app.get('/api/registrations', function(req, res) {
	var date = moment(req.query.date).startOf('isoweek').toISOString();
	registrations.get(date, function(err, doc, meta) {
		res.send(doc ? doc.registrations : []);
	})
});

app.post('/api/registrations', function(req, res) {
	var date = req.body.startDate;
	registrations.save(date, req.body, function (err) {
		if (err) throw err;
	});
	res.end();
});

// nStore is a simple key-value store written in node js. Could easily be exchanged with MongoDB or other.
var server;
var registrations = nStore.new('data/registrations.db', function() {
	if (server) return;
	console.log('Database loaded');
	server = app.listen(3000, function() {
		console.log('Listening on port %d', server.address().port);
	});
});
