var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	}
});

var Member = mongoose.model('Member', memberSchema);
module.exports = mongoose.model('Member', Member);
