
//call jquery
$(document).ready(function(){
//getting from id on signup ejs

	
	
	$('#signup-form').on('submit', function(e){
		e.preventDefault();

		var formInfo = {
			email: $('#email-input').val(),
			password: $('#pass-input').val()
		};

		console.log(formInfo);

		$.ajax({
			url: '/signup',
			method: 'POST',
			data: formInfo,
			success: function(response){
				$('h1').append(response.email + 'is now signed up!');
				window.location = '/profile';

			}
		});
	});

	$('#login-form').on('submit', function(e){
		console.log('listening');
		e.preventDefault();

		var formInfo = {
			email: $('#email-input').val(),
			password: $('#pass-input').val()
		};
		console.log(formInfo);

		$.ajax({
			url: '/sessions',
			method: 'POST',
			data: formInfo,
			success: function(response){
				window.location = ('/profile');
			}
		});
	}); // this is the end of the log in for submit event listener;

	


	$("#save-button").click(function(event){
		console.log('searched');
		e.preventDefault();

		var searchInfo = {
			searchString: $('.form-group')

		}

	})
});