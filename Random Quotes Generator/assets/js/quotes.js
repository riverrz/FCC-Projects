var quotesData = {
	1: {
		quotes:"Never Give UP",
		author: "xyz",
		color: "#3f3f3f"
	},
	2: {
		quotes: "Say Bye",
		author: "abc",
		color: "#2be3cf"
	}
}

function generateQuote() {
	responsiveVoice.speak("Today's quote is ");
	var random=Math.ceil(Math.random()*2);
	$("h1").text('"   '+quotesData[random].quotes);
	$("span").text(quotesData[random].author);
	$("body").css("backgroundColor" , quotesData[random].color);
	responsiveVoice.speak(quotesData[random].quotes);
	responsiveVoice.speak("By "+quotesData[random].author);
}

// Quotes when the page loads
generateQuote();

// Generating quotes when the button is clicked
$("#new").on("click", function() {
	generateQuote();
});