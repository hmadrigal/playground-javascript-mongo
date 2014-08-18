#!/usr/bin/nodejs
var express = require('express'),
	app = express();

app.get('/', function(req,res) {
	res.send('Hello, World!');
});

app.get('*', function(req,res) {
	res.send('Page not found');
});

app.listen(8080);
console.log('Express server listening to localhost:8080');

