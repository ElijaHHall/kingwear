var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var shoeSchema = new Schema ({
	type: String,
	brand: String,
	size: Number,
	gender: String
});







var Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;