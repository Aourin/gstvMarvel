
var http 	 = require('http');
var express  = require('express');
var app      = express(); 	
var md5 	 = require('MD5');
var marvelApi  = require('marvel-api');

app.configure(function() {
		app.use(express.static(__dirname + '/public/')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
});

// listen (start app with node server.js) ======================================

console.log('started');

app.get('/app/*', function(req, res) {
	res.sendfile('public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var marvel = marvelApi.createClient({
  publicKey: '7ac0dc0b1cb2d8d6f1d0597f5f8ea7a2', 
  privateKey: '5118d2d8273845e9efce263b006dbcebd62aa605'
});

app.get('/api/v1/characters',function(req,res){
	var offset = req.params.offset;
	marvel.characters.findAll(offset,10)
		.then(function(characters){
			res.json(characters);
		})
		.fail(function(){
			res.json({isSucessful: false, error: 'Error retrieving characters'});
		})
		.done();
	
});
app.get('/api/v1/character',function(req,res){

})

app.listen(80);