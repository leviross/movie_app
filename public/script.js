$(function(){
	$('.deleteMovie').on('click', function(event) {
		event.preventDefault();
		var id = $(this).data("id");
		var deleteThis = $(this);

		$.ajax({
			url:'/watch_list/' + deleteThis.data("id"),
			type: "DELETE",
			success:function(result) {
				deleteThis.closest('li').fadeOut('slow', function() {
					$(this).remove();
				})
			}
		})


	})
	$('.before').on('click', function(event) {
		//return;
		event.preventDefault();
		//alert('worked');
		var myButton = $(this);


		$.post('/added', {
			title: myButton.data('title'), 
			year: myButton.data('year'), 
			imdb: myButton.data('imdb')
		}, function(returnData) {
				// alert('is this working?');
				console.log(returnData);
				myButton.removeClass('before').addClass('after');


			})

	});
});





