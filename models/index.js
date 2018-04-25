var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/kingwear2');

if (process.env.NODE_ENV == 'production') {
	mongoose.connect(process.env.MLAB_URL);
} else {
	mongoose.connect('mongodb://localhost/kingwear2');
}

module.exports.Shoe = require('./shoes.js');
module.exports.User = require('./users.js')






