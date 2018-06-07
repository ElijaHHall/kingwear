var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
	searchString: String,
	userId: String
 });



var Search = mongoose.model('Search', SearchSchema);


module.exports = Search;