var 
	MongoClient = require('mongodb').MongoClient
;

MongoClient.connect('mongodb://localhost:27017/weather',function(err,db) {
	if (err) throw err;
	
	var cursor = db.collection('data')
		.aggregate([
			{ $sort : { Temperature : -1 } },
			{ $group : { _id :  '$State',  highestTemperature : { $max : '$Temperature' }, documentId : { $first : '$_id'  } } }
		], {
			allowDiskUsage : true,
			cursor : { batchSize : 1000}
		});

	var foundDocIds = [];
	cursor.on('data',function(group){
		foundDocIds.push(group.documentId);
		//db.collection('data').findAndModify( { _id : group.documentId }, {}, {$set : { month_high : true } }, { 'new' : true }, function(err,doc) {
		//	if (err) throw err;
		//	console.log(doc);
		//});
		//console.log(group);
	});

	cursor.on('end',function(){
		//console.log(foundDocIds);
		foundDocIds.forEach(function(docId) {
			db.collection('data').findAndModify( { _id : docId }, {}, {$set : { month_high : true} }, { 'new' : true }, function(err,doc) {
				if (err) throw err;
				// NOTE: Workaround to detect when to close the connection. Checking if it's the last doc ID
				if (foundDocIds[foundDocIds.length-1] == docId)
					db.close();
				console.log(doc);
			});
		});
	});
});

