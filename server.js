
var http 	    = require('http');
var express     = require('express');
var app         = express(); 	
var md5 	    = require('MD5');
var marvelApi   = require('marvel-api');
var url 	 	= require('url');
var mongoose	= require('mongoose');
var Character 	= require('./server/Character');

app.configure(function() {
		app.use(express.static(__dirname + '/public/')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
});
//Connect to local mongo
mongoose.connect('mongodb://localhost/gstvMarvel');


app.get('/app/*', function(req, res) {
	res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var marvel = marvelApi.createClient({
  publicKey: '7ac0dc0b1cb2d8d6f1d0597f5f8ea7a2', 
  privateKey: '5118d2d8273845e9efce263b006dbcebd62aa605'
});
//Get a list of characters by offset and name
app.get('/api/v1/characters',function(req,res){
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

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
		var offset = query.offset || 0;
		console.log('search with name');
		console.log(query.name);
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

//api for getting a character by id
app.get('/api/v1/characters/:character_id',function(req,res){

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	console.log(query);
	marvel.characters.find(req.params.character_id)
		.then(function(character){
			res.json(character);
		})
		.fail(function(){
			res.json({isSuccessful: false, error: 'Error retrieving character'});
		});
})
app.get('/api/v1/characters/:character_id/comics',function(req,res){
	marvel.characters.comics(req.params.character_id, 10, 0)
		.then(function(comics){
			res.json(comics);
		})
		.fail(function(){
			res.json({isSuccessful: false, error: 'Error getting characters comics'});
		});
})
// app.get('/api/v1/characters',function(req,res){
app.get('/api/v1/test',function(req,res){
	Character.findOne('123',function(err,character){
		if(err)
			res.send(err);
		if(character == null)
			res.json({});
		else
			res.json(character);
	})
})
// })

app.listen(80);