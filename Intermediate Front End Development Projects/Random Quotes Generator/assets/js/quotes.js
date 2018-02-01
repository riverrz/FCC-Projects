
var tweet="";
var tweetUrl="";
function generateQuote() {
	$.ajax({
          url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies',
          headers: {
            'X-Mashape-Key': 'O7iTZLDUmYmshesEET9FNisKTATLp1o1RWdjsnVv0D9SKqXw9w'
          },
          method: 'GET',
          dataType: 'json',
          contentType: 'application/x-www-form-urlencoded',
          success : function(data){
          	$("h1").text('"   '+data.quote);
			$("span").text(data.author);
			responsiveVoice.speak(data.quote);
			responsiveVoice.speak("By "+data.author);
			tweet = data.quote;
			tweetUrl = "https://twitter.com/intent/tweet?text='" + tweet + "'";
			$("#tweet").attr("href", tweetUrl);
          }
	});	
}


// Quotes when the page loads
generateQuote();

// Generating quotes when the button is clicked
$("#new").on("click", function() {
	generateQuote();
});

