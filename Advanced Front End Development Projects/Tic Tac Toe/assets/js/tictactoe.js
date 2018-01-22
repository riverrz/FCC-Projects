var player1mark = null;
var player2mark = null;
var currentmark=null;

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

$(".mark").click(function() {
	player1mark=$(this).text();
	if (player1mark==="O") {
		player2mark="X";
	}
	else {
		player2mark="O";
	}
	$("#pickPage").fadeOut(500, function() {
		$("#tiles").fadeIn(500);	
	});
	currentmark=player1mark;
	
});


$(".tile").click(function() {
	$(this).append("<h1>"+currentmark+"</h1>");
	if (currentmark===player1mark) {
		currentmark=player2mark;
	}
	else {
		currentmark=player1mark;
	}
});

