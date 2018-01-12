var cel=true;
$("button").on("click", function() {
	var value=$("span").text();
	value=Number(value);
	convert(value);
});

getLocation();

function convert(value) {
	if (cel===true) {
		var newval = Math.round((1.8)*value +32);
		cel=false;
		$("button").text("F");
	}
	else {
		var newval = Math.round((5/9)*(value-32));
		$("button").text("C");
		cel=true;
	}
	$("span").text(String(newval));
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		alert("geolocation is not supported");
	}
}

function showPosition(position) {
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
	$.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+String(position.coords.latitude)+'&lon='+String(position.coords.longitude), function(data) {
		$("span").text(String(data["main"]["temp"]));
		console.log();
		$("#condition").text(String(data["weather"][0]["main"]));
		$("#icon").html("<img src="+String(data["weather"][0]["icon"])+">");
		var iconString = "wi wi-day-"+String(data["weather"][0]["description"]);
		$("#icon").html("<i class='"+iconString+"'></i>");
	});
}

