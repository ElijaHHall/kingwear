
var db = require('./models');

var sampleKicks = [{
	type: 'Sneaker',
	brand: 'Nike',
	size: 10,
	gender: 'Men'
}];
var sampleShoes = [];

sampleShoes.push({
	name: 'Air Force 1',
	size: 10
});

db.Shoe.remove({}, function(err, shoes){

db.Shoe.create(sampleKicks, function(err, shoes){
	if(err) { return console.log('ERROR', err); }
	console.log('all shoes:', shoes);
	console.log('created', shoes.length, 'shoes');
	process.exit();
});


});