var player1mark = null;
var player2mark = null;
var currentmark=null;
var totalMoves=0;
var allTiles = $(".tile");
var currentPlayer="Player 1";
var player1Tiles={};
var player2Tiles={};

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
		$("#tiles").fadeIn(500, function() {
			$("#player1").slideDown("slow");
		});	
	});
	currentmark=player1mark;
	
});
$(".results").on("click",".reset",function() {
	player1mark = null;
	player2mark = null;
	currentmark=null;
	totalMoves=0;
	currentPlayer="Player 1";
	player1Tiles={};
	player2Tiles={};
	$(".playerBanner").slideUp("slow");
	$(".results").fadeOut(500, function() {
		$("#tiles").fadeOut(300, function() {
			allTiles.empty();
			$("#pickPage").fadeIn(300);
		});
		
	});
});

allTiles.click(function() {
	$(this).append("<h1>"+currentmark+"</h1>");
	if (currentmark===player1mark) {
		currentmark=player2mark;
	}
	else {
		currentmark=player1mark;
	}
	totalMoves+=1;


	if (currentPlayer==="Player 1") {
		$("#player2").slideDown("slow");
		$("#player1").slideUp("slow");
		player1Tiles[$(this).attr("id")]=1;
		currentPlayer = "Player 2";
	}
	else {
		$("#player1").slideDown("slow");
		$("#player2").slideUp("slow");
		player2Tiles[$(this).attr("id")]=1;
		currentPlayer= "Player 1";
	}

	if (totalMoves===9) {
		player1Tiles={};
		player2Tiles={};
		$(".results").empty();
		$(".results").fadeIn(600,function() {
			$(this).append("It's a Draw");	
			$(this).fadeOut(1600, function() {
				allTiles.empty();
				totalMoves=0;
				currentPlayer="Player 1";
				currentmark=player1mark;
				$("#currentPlayer").text(currentPlayer);
			});
		});

	}
	else {
		checkResult();	
	}
	
});

function checkResult() {
	var check=0;
	if (Object.keys(player1Tiles).length<3 && Object.keys(player2Tiles).length<3) {
		return;
	}
	for (var i=0;i<Object.keys(player1Tiles).length;i++) {
		if (checkHorizontal(1,Object.keys(player1Tiles)[i]) || checkVertical(1,Object.keys(player1Tiles)[i]) || mainDiagnol(1,Object.keys(player1Tiles)[i]) || invDiagnol(1,Object.keys(player1Tiles)[i])) {
			$(".results").empty();
			$(".results").fadeIn(800);
			$(".results").append("Player 1 Won :D");
			$(".results").append('<button class="reset">Play Again?</button>');
			return;

		}
	}
	for (var i=0;i<Object.keys(player2Tiles).length;i++) {
		if (checkHorizontal(2,Object.keys(player2Tiles)[i]) || checkVertical(2,Object.keys(player2Tiles)[i]) || mainDiagnol(2,Object.keys(player2Tiles)[i]) || invDiagnol(2,Object.keys(player2Tiles)[i])) {
			$(".results").empty();
			$(".results").fadeIn(800);
			$(".results").append("Player 2 Won :D");
			$(".results").append('<button class="reset">Play Again?</button>');
			return;
		}	
	}
}

function checkHorizontal(y,x) {
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);

	// For Left Most Tiles

	if (x===1 || x===4 || x===7) {
		if (x in current && x+1 in current && x+2 in current) {
			return true;
		}
		else {
			return false;
		}	

	
	}
	//For Middle Tiles
	else if (x===2 || x===5 || x===8) {
		if (x in current && x-1 in current && x+1 in current) {
			return true;
		}
		else {
			return false;
		}
	}

	//For Right Most Tiles
	else if (x===3 || x===6 || x===9) {
		if (x in current && x-1 in current && x-2 in current) {
			return true;
		}
		else {
			return false;
		}
	}
}

function checkVertical(y,x) {
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);

	// For Top Most Tiles

	if (x===1 || x===2 || x===3) {
		if (x in current && x+3 in current && x+6 in current) {
			return true;
		}
		else {
			return false;
		}	

	
	}
	//For Middle Tiles
	else if (x===4 || x===5 || x===6) {
		if (x in current && x-3 in current && x+3 in current) {
			return true;
		}
		else {
			return false;
		}
	}

	//For Bottom Most Tiles
	else if (x===7 || x===8 || x===9) {
		if (x in current && x-3 in current && x-6 in current) {
			return true;
		}
		else {
			return false;
		}
	}
}

function mainDiagnol(y,x) {
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);

	// For Top-Left  Tile

	if (x===1) {
		if (x in current && x+4 in current && x+8 in current) {
			return true;
		}
		else {
			return false;
		}	

	
	}
	//For Middle Tile
	else if (x===5) {
		if (x in current && x-4 in current && x+4 in current) {
			return true;
		}
		else {
			return false;
		}
	}

	//For Bottom-Right  Tile
	else if (x===9) {
		if (x in current && x-4 in current && x-8 in current) {
			return true;
		}
		else {
			return false;
		}
	}
}

function invDiagnol(y,x) {
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);

	// For Top-Right  Tile

	if (x===3) {
		if (x in current && x+2 in current && x+4 in current) {
			return true;
		}
		else {
			return false;
		}	

	
	}
	//For Middle Tile
	else if (x===5) {
		if (x in current && x-2 in current && x+2 in current) {
			return true;
		}
		else {
			return false;
		}
	}

	//For Right Most Tiles
	else if (x===7) {
		if (x in current && x-2 in current && x-4 in current) {
			return true;
		}
		else {
			return false;
		}
	}
}