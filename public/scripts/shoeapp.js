
$(document).ready(function() {

console.log('string')

  $.ajax({
  	method: 'GET',
  	url: '/api/shoes',
  	success: function(response){
  		for(let i=0; i<response.shoes.length; i++){
  			$('#shoelist').append('<h4 id=' + response.shoes[i]._id + '>' + response.shoes[i].brand + '</h4> <button id="' + response.shoes[i]._id + '" name="submit" class="delete btn btn-danger"> Delete </button>');
  			console.log(response.shoes)
  		}
  	}
  });

  var shoelist = $('#shoelist');
  var allShoes = [];

  $('.form-horizontal').on('submit', function(e) {
  	e.preventDefault();
  	$.ajax({
  		method: 'POST',
  		url: '/api/shoes',
  		data: $(this).serialize(),
  		success: newShoeSuccess,
  		error: console.log('nope')
  	});
  });

  function newShoeSuccess(json) {
  	$('.form-group input').val('');
  	allShoes.push(json);
  	window.location.reload();
  }

 $('#shoe-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/shoe', formData, function(shoes) {
      console.log('shoe after POST', shoes);
      renderShoe(shoes);  //render the server's response
    });
    $(this).trigger("reset");
  });



 $('#shoelist').on('click', '.add-shoe', function(e){
 	var id= $(this).parents('.shoe').data('shoe-id');
 	console.log('id',id);
 	$('#shoeModal').data('shoe-id', id);
 	$('#shoeModal').modal();
 });

 $('#saveShoe').on('click', handleNewShoeSubmit);

//  $('#delete').on('click', handleDeleteShoeClick);

 

// function handleDeleteShoeClick(e){
// 	log("running");
// 	var shoeId = $(this).parents('.shoe').data('shoe-id');
// 	log('someone wants to delete a shoe id=' + shoeId);
// 	$.ajax({
// 		method: 'DELETE',
// 		url: ('/api/shoes' + shoeId),
// 		success: function() {
// 			log('he dead');
// 			$('shoelist'+ shoeId + '');
// 		}
// 	});

console.log('shoot')

$('body').on('click','.delete', function(){
	console.log('cash money');
	console.log($(this));

	var id = $(this).attr('id');
	console.log(id);
	
	$(this).prev().remove();

		$(this).remove();


	var heading = $(this).closest('h4');
	// heading.remove()
	// console.log(heading)

	$.ajax({
			url: '/api/shoes/' + id,
			method: 'DELETE',

			success: function() {
				console.log('working');
				$('shoelist' + delete + '');
			}
		});
});

function handleNewShoeSubmit(e){
	var shoeId = $('#shoeModal').data('shoe-id');
	var shoeName = $('#shoeName').val();
	var shoeBrand = $('#shoeBrand').val();

	var formData = {
		name: shoeName,
		shoeBrand: shoeBrand
	};

}


});