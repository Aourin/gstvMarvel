
var http 	    = require('http');
var express     = require('express');
var app         = express(); 	
var md5 	    = require('MD5');
var marvelApi   = require('marvel-api');
var url 	 	= require('url');
var Character 	= require('./server/Character');

app.configure(function() {
		app.use(express.static(__dirname + '/public/')); 		// Sets up public folder
		app.use(express.logger('dev')); 						// Will log request to console
		app.use(express.bodyParser()); 							
});
//Connect to local mongo
// mongoose.connect('mongodb://localhost/gstvMarvel');

app.get('/app/*', function(req, res) {
	res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//setup marvel client
var marvel = marvelApi.createClient({
  publicKey: '7ac0dc0b1cb2d8d6f1d0597f5f8ea7a2', 
  privateKey: '5118d2d8273845e9efce263b006dbcebd62aa605'
});

//Get a list of characters by offset and name
app.get('/api/v1/characters',function(req,res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	//Checks if the query name is empty
	if(query.name == (null || undefined)){
		console.log('search with no name');
		marvel.characters.findAll(10,offset)
			.then(function(characters){
				res.json(characters);
			})
			.fail(function(){
				res.json({isSucessful: false, error: 'Error retrieving characters'});
			})
			.done();
	} else{
		//queries based on a name string
		var offset = query.offset || 0;
		marvel.characters.findNameStartsWith(query.name,10, offset)
			.then(function(characters){
				console.log('worked');
				res.json(characters);
			})
			.fail(function(){
				res.json({isSucessful: false, error: 'Error retrieving characters with name ' + query.name});
			})
			.done();
	}
	
});

//API for getting a character by id
app.get('/api/v1/characters/:character_id',function(req,res){

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	//Finds a single character
	marvel.characters.find(req.params.character_id)
		.then(function(character){
			res.json(character);
		})
		.fail(function(){
			res.json({isSuccessful: false, error: 'Error retrieving character'});
		});
})
//API for getting a characters comics
app.get('/api/v1/characters/:character_id/comics',function(req,res){
	marvel.characters.comics(req.params.character_id, 10, 0)
		.then(function(comics){
			res.json(comics);
		})
		.fail(function(){
			res.json({isSuccessful: false, error: 'Error getting characters comics'});
		});
})
//API Test  route
app.get('/api/v1/test',function(req,res){
	res.json({isSuccessful: true, message: "Test Route Called"});
})

app.listen(80);