var numbers = document.querySelectorAll(".numbers");
var pressed=document.querySelector(".pressed");
var calculate= document.querySelector("#calculate");
var operators =document.querySelectorAll(".operator");
var result = document.querySelector("#result");
var sign=document.querySelector(".sign");
var first=null;
var second=null;
var index=null;


var ac=document.querySelector("#AC")
var ce=document.querySelector("#CE");



ac.addEventListener("click", function() {
	pressed.textContent="0";
	calculate.textContent="0";
	first=null;
	second=null;
	index=null;
});
ce.addEventListener("click", function() {
	pressed.textContent="0";
	calculate.textContent="0";
	first=null;
	second=null;
	index=null;
});
sign.addEventListener("click", function() {
	alert("Made By - Shivam Kumar");
});

for (var i=0 ; i<numbers.length;i++) {
	numbers[i].addEventListener("click", function() {
		show(this.textContent);
	});
}

for (var j=0;j<operators.length;j++) {
	operators[j].addEventListener("click", function() {
		if (first!=null && index!=null && index!=calculate.textContent.length-1) {
			first=Number(evaluate());
			calculate.textContent = String(first);
		}
		else if (first!=null && index===calculate.textContent.length-1){
			calculate.textContent = calculate.textContent.slice(0,index);	
		}
		else {
			first=Number(calculate.textContent);	
		}
		show(this.textContent);
		index=calculate.textContent.length-1;
	});
}

result.addEventListener("click", function() {
	pressed.textContent=evaluate();
	if (String(first).indexOf(".")===-1 && String(second).indexOf(".")===-1) {
		pressed.textContent=String(Number(pressed.textContent)).slice(0,8);
	}
	calculate.textContent= pressed.textContent;
	index=null;
});

function evaluate() {
	second=Number(calculate.textContent.slice(index+1));
	var operation=calculate.textContent[index];
	var ans=0;
	var cf=10*(calculate.textContent.length-1 - index);
	switch (operation) {
		case "+":
			ans=((first*cf)+(second*cf))/cf;
			break;
		case "-":
			ans=((first*cf)-(second*cf))/cf;
			break;
		case "x":
			ans=((first*cf)*(second*cf))/(cf**2)
			break;
		case "/":
			ans=((first*cf)/(second*cf));
			break;
	}
	return(ans);
}


function show(a) {
	pressed.textContent=String(a);
	if (calculate.textContent.length ===1 && calculate.textContent==='0') {
		calculate.textContent = pressed.textContent;
	}
	else {
		calculate.textContent = calculate.textContent + pressed.textContent;
		
	}
}