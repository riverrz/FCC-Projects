$(".players").click(function() {
	$("#firstPage").fadeOut(500, function() {
		$("#pickPage").fadeIn(500);
	})
});

$("#goBack").click(function() {
	$("#pickPage").fadeOut(500, function() {
		$("#firstPage").fadeIn(500);
	});
});