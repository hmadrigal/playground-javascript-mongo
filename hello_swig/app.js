#!/usr/bin/nodejs
var express = require('express'),
	app = express(),
	// library of wrappers for express
	cons = require('consolidate');

// cons.swig - which is a template library - into express
app.engine('html',cons.swig);
app.set('view engine', 'html');
app.set('views',__dirname + '/views');

app.get('/', function(req,res) {
	res.render('hello', { name: 'Swig' });
});

app.get('*', function(req,res) {
	res.send('Page not found');
});

app.listen(8080);
console.log('Express server listening to localhost:8080');

