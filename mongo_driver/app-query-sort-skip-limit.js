var MongoClient = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/course',function(err,db) {
	if (err) throw err;

	// [1] Using options in find methods
	// Also sort,skip, and limit can be speccified as parameters of the find
	//var options = {
	//	skip : 1,
	//	limit : 4,
	//	sort : { [ grade,1  ] , [ student, -1  ]  }
	//};
	
	// var cursor = db.collection('grades').find({},{},options);
	
	// [2] Calling methods directly from the cursor
	var cursor = db.collection('grades').find({});
	// The execution order of the skip, limit, and sort are being handled by the driver. So, it wil perform sort,skip and limit
	cursor.skip(1);
	cursor.limit(4);
	cursor.sort(  'grade' , 1   );

	// sort can be multiple, and ascending (1) or descending (-1)
	//cursor.sort( [ [ grade ,  1] , [student , -1] ] );	

	cursor.each(function(err,doc) {
		if (err) throw err;

		if (doc == null) {
			return db.close();
		}
		console.dir(doc);
	});
});
