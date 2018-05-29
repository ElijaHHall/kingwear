
$(document).ready(function(){

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
			succes: function(response){
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
		// $('#search-bar').append($(h1));

	});
});