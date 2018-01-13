$("input").on("keypress", function(event) {
	if (event.which === 13) {
		if ($(this).val()!=="") {
			$("#container").removeClass("shift");
			$("li").remove();

			$.ajax({
				url: 'http://en.wikipedia.org/w/api.php',
				data: { action: 'query', list: 'search', srsearch: $("input").val(), format: 'json' },
				dataType: 'jsonp',
				success: processResult
			});
			$("ul").fadeIn();
		}
	}
	
});

$("button").on("click" , function() {
	$("ul").fadeOut(500, function() {
		$("li").remove();
		$("#container").addClass("shift");
	});
	$("input").val("");
});

function processResult(apiResult) {
	for (var i=0;i<apiResult.query.search.length; i++) {
		$("ul").append("<li>"+apiResult.query.search[i].title+'</li>');
		$("ul").append("<li>"+apiResult.query.search[i].snippet+"</li>");
	}
}