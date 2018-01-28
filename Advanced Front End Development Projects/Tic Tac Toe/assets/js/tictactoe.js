var player1mark = null;
var player2mark = null;
var currentmark=null;
var totalMoves=0;
var currentPlayMode=null;
var currentPlayer="Player 1";
var player1Tiles={};
var player2Tiles={};
var ans=false;
var cornerTiles=["1","3","7","9"];

var allTiles = $(".tile");

// Opening Page click event

$(".players").click(function() {
	currentPlayMode=$(this).attr("id");    // To check if 1player or 2players mode
	$("#firstPage").fadeOut(500, function() {
		$("#pickPage").fadeIn(500);
	})
});


$("#goBack").click(function() {
	$("#pickPage").fadeOut(500, function() {
		$("#firstPage").fadeIn(500);
	});
});

// Decides the playing mark of the players

$(".mark").click(function() {
	player1mark=$(this).text();
	if (player1mark==="O") {
		player2mark="X";
	}
	else {
		player2mark="O";
	}
	$("#pickPage").fadeOut(500, function() {
		$("#tiles").fadeIn(500, function() {           //Displays the playing board
			$("#player1").slideDown("slow");
		});	
	});
	currentmark=player1mark;
	
});

// For the Play again Button

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

// Work on individual tiles

allTiles.click(function() {
	
	
	totalMoves+=1;
	if (currentPlayer==="Player 1") {
		$(this).append("<h1>"+currentmark+"</h1>");
		currentmark=player2mark;
		$("#player2").slideDown("slow");
		$("#player1").slideUp("slow");
		player1Tiles[$(this).attr("id")]=1;
		currentPlayer = "Player 2";
		if ($(this).attr("id") in cornerTiles) {
			cornerTiles.splice(cornerTiles.indexOf($(this).attr("id")),1);
		}
	}
	else {
		$("#player1").slideDown("slow");
		$("#player2").slideUp("slow");
		if (currentPlayMode==="2players") {
			$(this).append("<h1>"+currentmark+"</h1>");
			player2Tiles[$(this).attr("id")]=1;	
		}
		else {
			generatePosition();     // Generates correct position for the tile and displays it
		}

		currentmark=player1mark;
		currentPlayer= "Player 1";
	}
	ans=checkResult();	
	if (!ans && totalMoves===9) {
		player1Tiles={};
		player2Tiles={};
		$(".playerBanner").slideUp("fast");
		$(".results").empty();
		$(".results").fadeIn(300,function() {
			$(this).append("Uuh... it's a Draw");	
			$(this).fadeOut(1600, function() {
				allTiles.empty();
				totalMoves=0;
				currentPlayer="Player 1";
				currentmark=player1mark;
				$("#currentPlayer").text(currentPlayer);
				$("#player1").slideDown("slow");
			});
		});

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
			$(".playerBanner").slideUp("fast");
			return true;

		}
	}
	for (var i=0;i<Object.keys(player2Tiles).length;i++) {
		if (checkHorizontal(2,Object.keys(player2Tiles)[i]) || checkVertical(2,Object.keys(player2Tiles)[i]) || mainDiagnol(2,Object.keys(player2Tiles)[i]) || invDiagnol(2,Object.keys(player2Tiles)[i])) {
			$(".results").empty();
			$(".results").fadeIn(800);
			$(".results").append("Player 2 Won :D");
			$(".results").append('<button class="reset">Play Again?</button>');
			$(".playerBanner").slideUp("fast");
			return true;
		}	
	}
	return false;
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
	return false;
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
	return false;
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
	return false;
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
	return false;
}


function generatePosition() {
	for (var i=0;i<Object.keys(player1Tiles).length;i++) {
		if (findHorizontal(Object.keys(player1Tiles)[i]) || findVertical(Object.keys(player1Tiles)[i]) || findDiagnol(Object.keys(player1Tiles)[i]) || findInvDiagnol(Object.keys(player1Tiles)[i])) {
			console.log("Found");
			return;
		}
	}
	if (!(5 in player2Tiles || 5 in player1Tiles)) {
			$("#5").append("<h1>"+currentmark+"</h1>");
			player2Tiles["5"]=1;	
		}
	else  {
			var random = Math.round(Math.random()*(cornerTiles.length-1));
			console.log(random);
			$("#"+cornerTiles[random]).append("<h1>"+currentmark+"</h1>");
			player2Tiles[cornerTiles[random]]=1;
			cornerTiles.splice(random,1);
	}
	
}

function findHorizontal(x) {
	x=Number(x)
	if (x%3===1) {
		if (x+1 in player1Tiles && !(x+2 in player2Tiles)) {
			return putmark(String(x+2));
		}
		else if (x+2 in player1Tiles && !(x+1 in player2Tiles)) {
			return putmark(String(x+1));
		}
	}
	else if (x%3===2) {
		if (x-1 in player1Tiles && !(x+1 in player2Tiles)) {
			return putmark(String(x+1));
		}
		else if (x+1 in player1Tiles && !(x-1 in player2Tiles)) {
			return putmark(String(x-1));
		}
	}
	else if (x%3===0) {
		if (x-1 in player1Tiles && !(x-2 in player2Tiles)) {
			return putmark(String(x-2));
		}
		else if (x-2 in player1Tiles && !(x-1 in player2Tiles)) {
			return putmark(String(x-1));
		}
	}

}
function findVertical(x) {
	x=Number(x)
	if (x===1 || x===2 || x===3) {
		if (x+3 in player1Tiles && !(x+6 in player2Tiles)) {
			console.log("yes");
			return putmark(String(x+6));
		}
		else if (x+6 in player1Tiles &&  !(x+3 in player2Tiles)) {
			return putmark(String(x+3));
		}	
	}
	else if (x===4 || x===5 || x===6) {
		if (x-3 in player1Tiles && !(x+3 in player2Tiles)) {
			return putmark(String(x+3));
		}
		else if (x+3 in player1Tiles && !(x-3 in player2Tiles)) {
			return putmark(String(x-3));
		}
	}
	else if (x===7 || x===8 || x===9) {
		if (x-3 in player1Tiles && !(x+3 in player2Tiles)) {
			return putmark(String(x+3));
		}
		else if (x+3 in player1Tiles && !(x-3 in player2Tiles)) {
			return putmark(String(x-3));
		}
	}

}

function findDiagnol(x) {
	x=Number(x)
	if (x===1) {
		if (5 in player1Tiles && !(9 in player2Tiles)) {
			return putmark("9");
		}
		else if (9 in player1Tiles && !(5 in player2Tiles)) {
			return putmark("5");
		}
	}
	else if (x===5) {
		if (1 in player1Tiles && !(9 in player2Tiles)) {
			return putmark("9");
		}
		else if (9 in player1Tiles && !(1 in player2Tiles)) {
			return putmark("1");
		}
	}
	else if (x===9) {
		if (5 in player1Tiles && !(1 in player2Tiles)) {
			return putmark("1");
		}
		else if (1 in player1Tiles && !(5 in player2Tiles)) {
			return putmark("5");
		}
	}
}

function findInvDiagnol(x) {
	x=Number(x)
	if (x===3) {
		if (5 in player1Tiles && !(7 in player2Tiles)) {
			return putmark("7");
		}
		else if (7 in player1Tiles && !(5 in player2Tiles)) {
			return putmark("5");
		}
	}
	else if (x===5) {
		if (3 in player1Tiles && !(7 in player2Tiles)) {
			return putmark("7");
		}
		else if (7 in player1Tiles && !(3 in player2Tiles)) {
			return putmark("3");
		}
	}
	else if (x===7) {
		if (5 in player1Tiles && !(3 in player2Tiles)) {
			return putmark("3");
		}
		else if (3 in player1Tiles && !(5 in player2Tiles)) {
			return putmark("5");
		}
	}
}

function putmark(x) {
	$("#"+x).append("<h1>"+currentmark+"</h1>");
	if (x in cornerTiles) {
		cornerTiles.splice(cornerTiles.indexOf(x),1);
	}
	player2Tiles[x]=1
	return true;
}