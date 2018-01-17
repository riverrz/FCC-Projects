var numbers = document.querySelectorAll(".numbers");
var pressed=document.querySelector(".pressed");
var calculate= document.querySelector("#calculate");
var operators =document.querySelectorAll(".operator");
var result = document.querySelector("#result");

var first=null;
var second=null;
var index=null;


var ac=document.querySelector("#AC")
for (var i=0 ; i<numbers.length;i++) {
	numbers[i].addEventListener("click", function() {
		show(this.textContent);
	});
}

ac.addEventListener("click", function() {
	pressed.textContent="0";
	calculate.textContent="0";
	first=null;
	second=null;
	index=null;
});

for (var j=0;j<operators.length;j++) {
	operators[j].addEventListener("click", function() {
		if (first!=null && index!=null) {
			first=Number(evaluate().toFixed(1));
			calculate.textContent = String(first);
		}
		else {
			first=Number(calculate.textContent);	
		}
		index=calculate.textContent.length-1;
		show(this.textContent);
	});
}

result.addEventListener("click", function() {
	pressed.textContent=evaluate().toFixed(1);
	if (String(first).indexOf(".")===-1 && String(second).indexOf(".")===-1) {
		pressed.textContent=String(Math.round(Number(pressed.textContent)));
	}
	calculate.textContent= pressed.textContent;
	index=null;
});

function evaluate() {
	second=Number(calculate.textContent.slice(index+2));
	var operation=calculate.textContent[index+1];
	// check();
	var ans=0;
	switch (operation) {
		case "+":
			ans=first+second;
			break;
		case "-":
			ans=first-second
			break;
		case "x":
			ans=first*second;
			break;
		case "/":
			ans=first/second;
			break;
	}
	return(ans);
}


// function check()

function show(a) {
	pressed.textContent=String(a);
	if (calculate.textContent.length ===1 && calculate.textContent==='0') {
		calculate.textContent = pressed.textContent;
	}
	else {
		calculate.textContent = calculate.textContent + pressed.textContent;
		
	}
}