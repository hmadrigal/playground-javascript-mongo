#!/usr/bin/nodejs

var MongoClient = require('mongodb').MongoClient;

// Open the connection to the mongo server
MongoClient.connect('mongodb://127.0.0.1:27017/test',function(err,db) {
	
	if (err) throw err;
	
	// find one document in the collection
	db.collection('coll').findOne({},function(err,doc) {
		
		if (err) throw err;

		// print the result
		console.dir(doc);
		
		// close the db
		db.close();
	});
	console.dir("Called findOne!");
});
