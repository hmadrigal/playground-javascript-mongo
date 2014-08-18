#!/usr/bin/nodejs
var express = require ('express'),
	app = express(), //Web framework to handle routing requests
	cons = require('consolidate'); // Templating library adapter for Express

app.engine('html',cons.swig);
app.set('view engine','html');
app.set('views', __dirname + '/views');
app.use(express.bodyParser());
app.use(app.router)

// Handler for internal server erros
function errorHandler(err,req,res,next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', { 
		error : err,
		errorMessage : err.message.replace('\n','<br>'),
		errorStack : err.stack.replace('\n','<br>') 
	} );
}

app.use(errorHandler);

app.get('/', function (req, res, next) {
	res.render('fruitPicker', {  fruits: [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function (req,res,next) {
	var favorite = req.body.fruit;
	if (typeof favorite == 'undefined') {
		next(Error('Please chooa fruit'));
	} else {
		res.send('Your favorite fruit is ' + favorite );
	}
});

app.listen(3000);
console.log('Express server listening on port 3000');

