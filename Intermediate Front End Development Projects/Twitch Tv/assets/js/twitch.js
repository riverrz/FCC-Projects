$.getJSON('https://wind-bow.gomix.me/twitch-api/users/ESL_SC2?callback=?', function(data) {
	var image=data.logo;
	$(".logo").append("<img src="+"'"+image+"'"+">");
	console.log(data);
	$(".name").append("<a href="+"'"+data._links.self+"' target='_blank' "+'>'+ data.display_name+"</a>");
});
