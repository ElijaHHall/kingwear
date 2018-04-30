


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
			}
		});
	});

	$('#login-form').on('submit', function(e){
		e.preventDefault();

		var formInfo = {
			email: $('#email-input').val(),
			password: $('#pass-input').val()
		};
		console.log(formInfo);

		$.ajax({
			url: '/login',
			method: 'POST',
			data: formInfo,
			succes: function(response){
				window.location = '/profile';
			}
		});
	});
});
		console.log('submit');
