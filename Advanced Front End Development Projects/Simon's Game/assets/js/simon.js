var sequence=[];
var count=0;
var current=0;
var game_length=0;
var strict_mode=false;

$("#start").on("click", function() {
	generateSequence();
});

$("#strict").on("click", function() {
	strict_mode=true;
});

$(".tile").on('click' , function() {
	results($(this).attr("id"));
});

function generateSequence() {
	var random=String(Math.round(Math.random()*3));
	sequence.push(random);
	console.log(sequence);
};
function results(tileClicked) {
	if (sequence[current]===tileClicked) {
		current+=1
		if (current>=sequence.length) {
			game_length+=1
			putcount();
			if (game_length===20) {
				console.log("Won the Game!");
				return;
			}
			current=0;
			generateSequence();
		}
		
	}
	else if (strict_mode) {
		game_length=0;
		current=0;
		sequence=[];
		putcount();
		generateSequence();
	}
};
function putcount() {
	$("#count").text(game_length);
}
