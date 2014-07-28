var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

var Character 	=	new Schema({
	character_id: {
		type: String,
		required: true
	},
	votes: [],
	type: String,
	gender: String,
	race: String,
	location: String,
	comments: []
});

module.exports = mongoose.model('Character',Character);