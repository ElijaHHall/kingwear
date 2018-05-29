var mongoose = require('mongoose');
bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: String,
	password: String,
	passwordDigest: String
});

UserSchema.statics.createSecure = function(email, password, callback){
	var userModel = this;

	bcrypt.genSalt(function(err, salt){
		console.log('salt', salt);

		bcrypt.hash(password, salt, function(err, hash){
			userModel.create({
				email: email,
				passwordDigest: hash
			}, callback);
		});

	});
};

UserSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.passwordDigest);
};

UserSchema.statics.authenticate = function(email, password, callback) {

	this.findOne({email: email}, function(err, foundUser){
		console.log(foundUser);

		if(!foundUser) {
			console.log('No user with email' + email);
			callback('Error: user not found', null);
		} else if (foundUser.checkPassword(password)) {
			callback(null, foundUser);

		} else {
			callback('Error: incorrect password', null);
		}
	});
};

var User = mongoose.model('User', UserSchema);

module.exports = User;





