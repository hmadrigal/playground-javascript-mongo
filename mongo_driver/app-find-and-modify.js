var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course',function(err,db){

	if (err) throw err;
	
	var query = { name : 'comments' };
	var sort = [];
	var operator = { $inc : { counter : 1 } };
	var options = { 'new' : true };

	//  NOTE: 
	//	1- Find and modify will fetch the modified record after it is updated.
	//	2- findAndModify function will only modify the first document in the returned collection
	//	3- findAndModify can return the document before it's modified or not, 
	//	by using options.new=true requests the modified record in the callback.
	db.collection('counters').findAndModify(query,sort,operator,options,function(err,doc){
		
		if (err) throw err;
		
		if (!doc) {
			console.log('No counter found for comments');
		} else {
			console.log('Number of comments: ' + doc.counter);
		}
	
		return db.close();
	});
});
