

var express    = require('express');
var  app       = express();
var bodyParser = require('body-parser');
var db         = require('./models');
var session    = require('express-session');
var User 	   = require('./models/users');
var Shoe 	   = require('./models/shoes');

app.set('port', process.env.PORT || 3001);
app.set('views', './views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
	secret: 'cookie',
	cookie: {maxeAge:30*60*1000},		
	resave: true,
	saveUninitialized: true

}));

app.get('/', function homepage (req, res) {
	db.Shoe.find(function(err, dataShoe) {
		res.render('home', { shoe: dataShoe});
	});
});

// app.post('/api/shoes', function (req, res) {
// 	db.Shoe.create(req.body).then(function(postShoe){
// 		res.send(postShoe);
// 	});
// });

app.get('/main', function(req, res){
	res.render('main');
});

app.get('/home', function(req, res){
	res.render('home');
});

app.get('/signup', function(req, res){
	console.log('signup get');
	res.render('signup');
});
   
app.post('/signup', function(req, res){
	console.log('signup post');

	User.createSecure(req.body.email, req.body.password, function(err, newUserDoc){
		console.log(req.body.email);
		// db.User.save({})

		res.json(newUserDoc);
	});
});

app.get('/profile', function (req, res) {
  // find the user currently logged in
  db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
    res.render('profile.ejs', {username:currentUser});
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
	console.log('login get');
	res.render('login');
});
app.get('/shoes', function(req, res){
	console.log('shoe searched');
	res.render('searched');
});

app.listen(app.get('port'), () => { 
	console.log(`✅ PORT: ${app.get('port')} 🌟`);

});