var mongoose = require('mongoose');

if (process.env.NODE_ENV == 'production') {
	mongoose.connect(process.env.MLAB_URL);
} else {
	mongoose.connect('mongodb://localhost/kingwear');
}

module.exports.Shoe = require('./shoes.js');
module.exports.User = require('./users.js')






