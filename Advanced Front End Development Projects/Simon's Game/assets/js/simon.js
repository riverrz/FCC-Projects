var sequence=[];
var count=0;
var current=0;
var game_length=1;
var strict_mode=false;
var started=false;
var colors =[
	["#330000","#ff0000"],
	["#006600", "#66ff66"],
	["#000033", "#6666ff"],
	["#666600", "#ffff1a"]
];
var sounds = [
	"/home/shivam/Desktop/FCC-Projects/Advanced Front End Development Projects/Simon's Game/assets/audio/sound1.mp3", 
	"/home/shivam/Desktop/FCC-Projects/Advanced Front End Development Projects/Simon's Game/assets/audio/sound2.mp3", 
	"/home/shivam/Desktop/FCC-Projects/Advanced Front End Development Projects/Simon's Game/assets/audio/sound3.mp3", 
	"/home/shivam/Desktop/FCC-Projects/Advanced Front End Development Projects/Simon's Game/assets/audio/sound4.mp3", 
];


$("#start").on("click", function() {
	started=true;
	putcount();
	generateSequence();
	displaySequence();
});

$("#strict").on("click", function() {
	strict_mode= !(strict_mode);
	$(this).toggleClass("selected");
});

$(".tile").on('click' , function() {
	var index=$(this).attr("id");
	var audio= new Audio(sounds[index]);
	audio.play();
	results(index);
});
$(".tile").on("mousedown", function() {
	if (started) {
		var index = Number($(this).attr("id"));
		$(this).css("background-color",colors[index][1]);	
	}
	
});
$(".tile").on("mouseup", function() {
	if (started) {
		var index= Number($(this).attr("id"));
		$(this).css("background-color", colors[index][0]);
	}
});

function generateSequence() {
	var random=String(Math.round(Math.random()*3));
	sequence.push(random);
};
function results(tileClicked) {
	if (!started) {
		return;
	}

	if (sequence[current]===tileClicked) {
		current+=1
		if (current>=sequence.length) {
			game_length+=1
			putcount();
			if (game_length===20) {
				$(".row").fadeOut("slow", function() {
					$(".winning_page").fadeIn("slow", function() {
						$(".winning_page").fadeOut("slow", function() {
							reset();
							started=false;
							$(".row").fadeIn("slow");
						});
					});
				});
				return;
			}
			current=0;
			generateSequence();
			displaySequence();
		}
		
	}
	else if (strict_mode) {
		reset();
		generateSequence();
		mismatch();
	}
	else {
		current=0;
		mismatch();
	}
};
function reset() {
	game_length=1;
	current=0;
	sequence=[];
	putcount();
};

function putcount() {
	$("#count").text(game_length);
};

function displaySequence() {
	putcount();
	if (!started) {
		return;
	}
	var count = 0;
	var index;
	var close=setInterval(function(){
		index=sequence[count];
		$("#"+index).css("background", colors[Number(index)][1]);
		var audio= new Audio(sounds[index]);
		audio.play();
		setTimeout(function(){
			$("#"+index).css("background", colors[Number(index)][0]);
		},650);
		count+=1;
		if (count===sequence.length) {
			clearInterval(close);
		}
		
	},1500);

};

function mismatch() {
	var check=0;
	$("#count").text("--");
	var audio = new Audio("/home/shivam/Desktop/FCC-Projects/Advanced Front End Development Projects/Simon's Game/assets/audio/wrong.mp3");
	audio.play();
	setTimeout(function() {
		displaySequence();
	}, 1000); 
};