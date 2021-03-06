var MongoClient = require('mongodb').MongoClient,
	request = require('request');

MongoClient.connect('mongodb://localhost:27017/course',function(err,db){
	if (err) throw err;
	request('http://www.reddit.com/.json',function(error,res,body){
		if ( !error && res.statusCode == 200 ){
			var obj = JSON.parse(body);
			var stories = obj.data.children.map(function (story) { return story.data; });
			db.collection('reddit').insert(stories,function(err,data){
				if (err) throw err;
				console.dir("Importing : " + data.length + ' documents.');
				db.close();
			});
		}
	});
});
