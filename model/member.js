var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	}
});

var Member = mongoose.model('Member', memberSchema);
module.exports = mongoose.model('Member', Member);
