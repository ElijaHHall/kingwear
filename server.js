
var express    = require('express');
var  app       = express();
var bodyParser = require('body-parser');
var db         = require('./models');
var session    = require('express-session');
var User 	   = require('./models/users');
var Shoes 	   = require('./models/shoes');



app.use(bodyParser());

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

app.get('/api/shoes/:id', function shoesShow(req, res) {
	console.log("work pls");
  // find all shoes in db
  db.Shoe.findOne({_id:req.params.id}, function(err, shoe) {
  	console.log("trying");
  	console.log(shoe);
    res.json({ shoe: shoe });
  });
});

app.get('/api/shoes', function shoesIndex(req, res) {
	console.log("work pls");
  // find all shoes in db
  db.Shoe.find({}, function(err, allShoes) {
  	console.log("trying");
  	console.log(allShoes);
    res.json({ shoes: allShoes });
  });
});

app.post('/api/shoes', function shoesCreate(req, res){
	console.log("working");
	console.log(req.body);
	var newShoe = {
		type: req.body.type,
		userId: req.body.userId,
		brand: req.body.brand,
		size: req.body.size,
		gender: req.body.gender,
		searchUrl: req.body.searchUrl
	};

	db.Shoe.create(req.body, function(err, newShoes){
		console.log(newShoes);
		res.json({newShoes: newShoes});
	});
});

app.delete('/api/shoes/:id', function deleteShoe(req, res) {
	db.Shoe.remove({_id: req.params.id }, function(err) {
		if(err){ return console.log(err); }
		console.log('removal of id= ' + req.params.id +' successful.');
		res.status(200).send();
	});
});


app.listen(app.get('port'), () => { 
	console.log(`✅ PORT: ${app.get('port')} 🌟`);

});