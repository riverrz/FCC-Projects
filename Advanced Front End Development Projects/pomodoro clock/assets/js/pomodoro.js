var breakLength=1;
var sessionLength=1;
var start=0;
var sessionMode=true;
var paused = false;
$("#breaksub").click(function() {
	if (breakLength!==1) {
		breakLength-=1;
		$("#breaklen").text(String(breakLength));
	}
});
$("#breakadd").click(function() {
	breakLength+=1;
	$("#breaklen").text(String(breakLength));
});

$("#sessionsub").click(function() {
	if (sessionLength!==1) {
		sessionLength-=1;
		$("#sessionlen").text(String(sessionLength));
		$("#minute").text(String(sessionLength));
	}
});
$("#sessionadd").click(function() {
	sessionLength+=1;
	$("#sessionlen").text(String(sessionLength));
	$("#minute").text(String(sessionLength));
});

$("#start").click(function() {
	start+=1;
	if (start===1) {
		timer();
	}
});
$("#pause").click(function() {
	if (paused===false) {
		$("#pause").text("Resume");
	}
	else {
		$("#pause").text("Pause");
	}
	paused=!paused;
});
function timer() {
	var minute=sessionLength-1;
	var second2=5;
	var second1=10;
	var paddingClock=240;
	var heightFill=0;
	var sessionChange=240/(sessionLength*60);
	var breakChange = 240/(breakLength*60);
	var change=sessionChange;
	var color="green";
	var c=setInterval(function(){
		if (paused===true) {
			return;
		}
		if (minute===0 && second2===0 && second1===0) {
			paddingClock=240;
			heightFill=0;
			$("#clock").css("padding-top", String(paddingClock)+"px");
			$(".fill").css("height",String(heightFill)+"px");
			second2=0;
			second1=0;
		 	sessionMode= !sessionMode;
		 	if (sessionMode) {
				$(".content").text("Session");
				minute=sessionLength;
				change=sessionChange;
				color="green";
			}
			else {
				$(".content").text("Break");
				minute=breakLength;
				change=breakChange;
				color="red";
			}
			$("#minute").text(String(minute));
			return;
		}
		else if (second2===0 && second1===0) {
			minute-=1;
			second2=5;
			second1=10;
		}
		else if (second1===0) {
			second2-=1;
			second1=10;
		}
		second1--;
		$("#minute").text(String(minute));
		$("#second2").text(String(second2));
		$("#second1").text(String(second1));
		paddingClock-=change;
		heightFill+=change;
		$("#clock").css("padding-top", String(paddingClock)+"px");
		$(".fill").css("height",String(heightFill)+"px");
		$(".fill").css("background-color",color);


	},1000);
}
