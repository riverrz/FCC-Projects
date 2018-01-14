var cel=true;
$("button").text(String.fromCharCode(176)+"C");
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
		$("button").text(String.fromCharCode(176)+"F");
	}
	else {
		var newval = Math.round((5/9)*(value-32));
		$("button").text(String.fromCharCode(176)+"C");
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
	$.getJSON('https://fcc-weather-api.glitch.me/api/current?lat='+String(position.coords.latitude)+'&lon='+String(position.coords.longitude), function(data) {
		$("span").text(String(data["main"]["temp"]));
		$("#condition").text(String(data["weather"][0]["main"]));
		$("#icon").html("<img src="+String(data["weather"][0]["icon"])+">");
		if (data["weather"][0]["description"]==='smoke') {
			var iconString = "wi wi-"+String(data["weather"][0]["description"]);
		}
		else {
			var iconString = "wi wi-day-"+String(data["weather"][0]["description"]);	
		}
		
		$("#icon").html("<i class='"+iconString+"'></i>");
	});
}

