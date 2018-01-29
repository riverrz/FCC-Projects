var player1mark = null;
var player2mark = null;
var currentmark=null;
var totalMoves=0;
var currentPlayMode=null;
var currentPlayer="Player 1";
var player1Tiles={};
var player2Tiles={};
var ans=false;
var completeTiles=["1","2","3","4","5","6","7","8","9"];

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
	completeTiles=["1","2","3","4","5","6","7","8","9"];
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
	
	totalMoves+=1; // Including the move made by the user

	if (currentPlayer==="Player 1") {
		$(this).append("<h1>"+currentmark+"</h1>");
		$("#player2").slideDown("slow");
		$("#player1").slideUp("slow");
		player1Tiles[$(this).attr("id")]=1;
		completeTiles.splice(completeTiles.indexOf($(this).attr("id")),1);

		ans=checkResult();  // Checks if someone won

		if (currentPlayMode==="1player" && totalMoves!==9) {   // Runs if 1 Player Mode On 
			currentmark=player2mark;
			$("#player1").slideDown("slow");
			$("#player2").slideUp("slow");
			generatePosition(); 		// Generates correct position for the tile and displays it	
			currentmark=player1mark;
			totalMoves+=1;   // Includes the move of computer	
		}
		else {
			currentPlayer="Player 2";
			currentmark = player2mark;
		}
	}
	else if (currentPlayMode==="2players" && currentPlayer==="Player 2") {   // For 2 Player Mode
		$("#player1").slideDown("slow");
		$("#player2").slideUp("slow");
		$(this).append("<h1>"+currentmark+"</h1>");
		player2Tiles[$(this).attr("id")]=1;	
		currentmark=player1mark;
		currentPlayer="Player 1";
	}

	ans=checkResult();  // Checks if someone won

	if (!ans && totalMoves===9) {     // If no one one reset all the moves and available moves
		player1Tiles={};
		player2Tiles={};
		completeTiles=["1","2","3","4","5","6","7","8","9"];
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

function checkResult() {           // Function to evaluate if someone won
	var check=0;
	if (Object.keys(player1Tiles).length<3 && Object.keys(player2Tiles).length<3) {
		return;
	}

	// To see if Player 1 won

	for (var i=0;i<Object.keys(player1Tiles).length;i++) {      
		if (checkHorizontal(1,Object.keys(player1Tiles)[i]) || checkVertical(1,Object.keys(player1Tiles)[i]) || mainDiagnol(1,Object.keys(player1Tiles)[i]) || invDiagnol(1,Object.keys(player1Tiles)[i])) {
			won("Player 1");
			return true;

		}
	}

	// To see if Player 2 won

	for (var i=0;i<Object.keys(player2Tiles).length;i++) {  
		if (checkHorizontal(2,Object.keys(player2Tiles)[i]) || checkVertical(2,Object.keys(player2Tiles)[i]) || mainDiagnol(2,Object.keys(player2Tiles)[i]) || invDiagnol(2,Object.keys(player2Tiles)[i])) {
			won("Player 2");
			return true;
		}	
	}
	return false;
}

function won(winner) {			// Generates results page with winner's name
	$(".results").empty();
	$(".results").fadeIn(800);
	$(".results").append(winner+" Won :D");
	$(".results").append('<button class="reset">Play Again?</button>');
	$(".playerBanner").slideUp("fast");
}

function checkHorizontal(y,x) {    	// Checks if any 3 horizontal tiles matches
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);
	if (x===1 || x===4 || x===7) {
		if ( x in current && x+1 in current && x+2 in current) {
			return true;
		}	
	}
	
	return false;
}


function checkVertical(y,x) {			// Checks if any 3 vertical tiles matches
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);
	if (x===1 || x===2 || x===3) {
		if (x in current && x+3 in current && x+6 in current) {
			return true;
		}	
	}
	
	return false;
}


function mainDiagnol(y,x) {			// Checks if the main diagnol has matching tiles 
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}
	x=Number(x)
	if (x===1 && 1 in current && 5 in current && 9 in current) {
		return true;
	}
	return false;	
}


function invDiagnol(y,x) {				// Checks if the reverse-main diagnol has matching tiles 
	if (y===1) {
		var current=player1Tiles;	
	}
	else {
		var current=player2Tiles;
	}

	x=Number(x);

	if (x===3 && 3 in current && 5 in current && 7 in current) {
		return true;
	}
	return false;
}

function generatePosition() {  		// Generates valid position in 1 Player Mode

	for (var i=0;i<Object.keys(player2Tiles).length;i++) {		// Generates based on its own current Tiles
		if (findHorizontal(Object.keys(player2Tiles)[i],player2Tiles) || findVertical(Object.keys(player2Tiles)[i],player2Tiles) || findDiagnol(Object.keys(player2Tiles)[i],player2Tiles) || findInvDiagnol(Object.keys(player2Tiles)[i],player2Tiles)) {
			return;
		}
	}
	for (var i=0;i<Object.keys(player1Tiles).length;i++) {		// Generates based on Player 1's current Tiles
		if (findHorizontal(Object.keys(player1Tiles)[i],player1Tiles) || findVertical(Object.keys(player1Tiles)[i],player1Tiles) || findDiagnol(Object.keys(player1Tiles)[i],player1Tiles) || findInvDiagnol(Object.keys(player1Tiles)[i],player1Tiles)) {
			return;
		}
	}

	if (!(5 in player2Tiles || 5 in player1Tiles)) { 			// Chooses Middle Tile if available and no 3 consecutive tiles.
			$("#5").append("<h1>"+currentmark+"</h1>");
			player2Tiles["5"]=1;
			completeTiles.splice(completeTiles.indexOf("5"),1);
			
		}
	else  { 													// Chooses any random tiles if middle is not available and no 3 consecutive tiles are available										

			var random = Math.round(Math.random()*(completeTiles.length-1));
			$("#"+completeTiles[random]).append("<h1>"+currentmark+"</h1>");
			player2Tiles[completeTiles[random]]=1;
			completeTiles.splice(random,1);
	}
	
}

function findHorizontal(x,currentlist) {				// Finds a horizontal candidate tile 
	x=Number(x)
	if (x%3===1) {
		if (x+1 in currentlist && completeTiles.indexOf(String(x+2))!==-1) {
			return putmark(String(x+2));
		}
		else if (x+2 in currentlist && completeTiles.indexOf(String(x+1))!==-1) {
			return putmark(String(x+1));
		}
	}
	else if (x%3===2) {
		if (x-1 in currentlist && completeTiles.indexOf(String(x+1))!==-1) {
			return putmark(String(x+1));
		}
		else if (x+1 in currentlist && completeTiles.indexOf(String(x-1))!==-1) {
			return putmark(String(x-1));
		}
	}
	else if (x%3===0) {
		if (x-1 in currentlist && completeTiles.indexOf(String(x-2))!==-1) {
			return putmark(String(x-2));
		}
		else if (x-2 in currentlist && completeTiles.indexOf(String(x-1))!==-1) {
			return putmark(String(x-1));
		}
	}

}
function findVertical(x,currentlist) {				// Finds a vertical candidate tile
	x=Number(x)
	if (x===1 || x===2 || x===3) {
		if (x+3 in currentlist && completeTiles.indexOf(String(x+6))!==-1) {
			return putmark(String(x+6));
		}
		else if (x+6 in currentlist &&  completeTiles.indexOf(String(x+3))!==-1) {
			return putmark(String(x+3));
		}	
	}
	else if (x===4 || x===5 || x===6) {
		if (x-3 in currentlist && completeTiles.indexOf(String(x+3))!==-1) {
			return putmark(String(x+3));
		}
		else if (x+3 in currentlist && completeTiles.indexOf(String(x-3))!==-1) {
			return putmark(String(x-3));
		}
	}
	else if (x===7 || x===8 || x===9) {
		if (x-3 in currentlist && completeTiles.indexOf(String(x+3))!==-1) {
			return putmark(String(x+3));
		}
		else if (x+3 in currentlist && completeTiles.indexOf(String(x-3))!==-1) {
			return putmark(String(x-3));
		}
	}

}

function findDiagnol(x,currentlist) {				// Finds a diagnol candidate tile
	x=Number(x)
	if (x===1) {
		if (5 in currentlist && completeTiles.indexOf(String(9))!==-1) {
			return putmark("9");
		}
		else if (9 in currentlist && completeTiles.indexOf(String(5))!==-1) {
			return putmark("5");
		}
	}
	else if (x===5) {
		if (1 in currentlist && completeTiles.indexOf(String(9))!==-1) {
			return putmark("9");
		}
		else if (9 in currentlist && completeTiles.indexOf(String(1))!==-1) {
			return putmark("1");
		}
	}
	else if (x===9) {
		if (5 in currentlist && completeTiles.indexOf(String(1))!==-1) {
			return putmark("1");
		}
		else if (1 in currentlist && completeTiles.indexOf(String(5))!==-1) {
			return putmark("5");
		}
	}
}

function findInvDiagnol(x,currentlist) {				// Finds a reverse-diagnol candidate tile
	x=Number(x)
	if (x===3) {
		if (5 in currentlist && completeTiles.indexOf(String(7))!==-1) {
			return putmark("7");
		}
		else if (7 in currentlist && completeTiles.indexOf(String(5))!==-1) {
			return putmark("5");
		}
	}
	else if (x===5) {
		if (3 in currentlist && completeTiles.indexOf(String(7))!==-1) {
			return putmark("7");
		}
		else if (7 in currentlist && completeTiles.indexOf(String(3))!==-1) {
			return putmark("3");
		}
	}
	else if (x===7) {
		if (5 in currentlist && completeTiles.indexOf(String(3))!==-1) {
			return putmark("3");
		}
		else if (3 in currentlist && completeTiles.indexOf(String(5))!==-1) {
			return putmark("5");
		}
	}
}

function putmark(x) {								// Generates Tile based on decision 
	$("#"+x).append("<h1>"+currentmark+"</h1>");
	player2Tiles[x]=1
	completeTiles.splice(completeTiles.indexOf(x),1);
	return true;
}