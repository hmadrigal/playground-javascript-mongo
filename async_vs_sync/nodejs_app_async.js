var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/test',function(err,db){
	// checks if there was an error
	if (err)
		throw err;
	// print the result
	db.collection('coll').findOne({},function(err,doc) {
	
	// close the database
	db.close();

	});
	// declares success
	console.dir('Called findOne!');
});
