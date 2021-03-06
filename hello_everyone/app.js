#!/usr/bin/nodejs
var express = require('express'),
	app = express(),
	// library of wrappers for express
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

// cons.swig - which is a template library - into express
app.engine('html',cons.swig);
app.set('view engine', 'html');
app.set('views',__dirname + '/views');

// creates a mongo client
var mongoClient = new MongoClient(new Server('localhost',27017, { 'native_parser' : true }));
var db = mongoClient.db('course');


// Registering routes
app.get('/', function(req,res) {
	db.collection('greet').findOne({},function(err,doc){
		res.render('hello', doc);
	});
});

app.get('*', function(req,res) {
	res.send('Page not found');
});

mongoClient.open(function(err,doc){
	if (err) throw err;
	
	app.listen(8080);
	console.log('Express server listening to localhost:8080');
});