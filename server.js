

var express    = require('express');
var  app       = express();
var bodyParser = require('body-parser');
var db         = require('./models');
var session    = require('express-session');
var User 	   = require('./models/users');

app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
	saveUnitialized : true,
	resave: true,
	secret: 'cookie',
	cookie: {maxeAge:30*60*1000}
}));

app.get('/', function homepage (req, res) {
	db.Shoe.find(function(err, dataShoe) {
		res.render('signup', { shoe: dataShoe});
	});
});

app.post('/api/shoes', function (req, res) {
	db.Shoe.create(req.body).then(function(postShoe){
		res.send(postShoe);
	});
});
app.get('/home', function(req, res){
	res.render('home');
})
app.get('/signup', function(req, res){
	res.render('signup');
});
   
app.post('/signup', function(req, res){
	User.createSecure(req.body.email, req.body.password, function(err, newUserDoc){
		res.json(newUserDoc);
	});
});

app.get('/profile', function(req, res){
	User.findOne({_id: req.session.userId}, function(err, userDoc){
		res.render('profile', {user: userDoc});
	});
});

app.post('/sessions', function(req, res){
	User.authenticate(req.body.email, req.body.password, function(err, existingUserDoc){
		if (err) console.log('error is' + err);
		req.session.userId = existingUserDoc.id;
		res.json(existingUserDoc);
	});
});

app.get('/login', function(req, res){
	res.render('login');
});

app.listen(app.get('port'), () => { 
	console.log(`✅ PORT: ${app.get('port')} 🌟`);

});