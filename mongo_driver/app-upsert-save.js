var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/course',function(err,db) {
	if (err) throw err;
	
	var query = {  assignment : 'hw1' };
	db.collection('grades').findOne(query,function(err,doc){
		if (err) throw err;

		if (!doc) return db.close();		

		doc['date_returned'] = new Date();
		// save will check if the doc has _id value, if so it will perform an upsert
		// otherwise it will insert the document.
		db.collection('grades').save(doc,function(err,saved){
			if (err) throw err;
			
			console.dir('Successfully saved ' + saved + ' document!');
			
			return db.close();
		});
	});
});
