var MongoClient = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/course',function(err,db) {
	if (err) throw err;

	var query = { 'media.oembed.type' : 'video' };
	var projection = { 'media.oembed.url' : 1 , _id : 0 };

	db.collection('reddit').find(query).each(function(err,doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}
		console.dir(doc);
	});
});
