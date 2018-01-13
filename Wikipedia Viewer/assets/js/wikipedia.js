$("input").on("keypress", function(event) {
	if (event.which === 13) {
		if ($(this).val()!=="") {
			$("#container").removeClass("shift");
			$("li").remove();
			$("#text").addClass("hide");
			$.ajax({
				url: 'http://en.wikipedia.org/w/api.php',
				data: { action: 'query', list: 'search', srsearch: $("input").val(), format: 'json' },
				dataType: 'jsonp',
				success: processResult
			});
		}
	}
	
});

$("button").on("click" , function() {
	$("ul").fadeOut(500, function() {
		$("li").remove();
		$("#container").addClass("shift");
		$("#text").removeClass("hide");
	});
	$("input").val("");
	
});

function processResult(apiResult) {
	for (var i=0;i<apiResult.query.search.length; i++) {
		$("ul").append("<li><h1>"+apiResult.query.search[i].title+ '</h1>'+ apiResult.query.search[i].snippet+'</li>');
	}

	$("ul").show("blind" ,"slow");
}