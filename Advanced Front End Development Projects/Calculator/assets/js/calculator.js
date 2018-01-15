var numbers = document.querySelectorAll(".numbers");
var pressed=document.querySelector(".pressed");
var calculate= document.querySelector("#calculate");

for (var i=0 ; i<numbers.length;i++) {
	numbers[i].addEventListener("click", function() {
		show(this.textContent);
	});
}

document.querySelector("#AC").addEventListener("click", function() {
	pressed.textContent="0";
	calculate.textContent="0";
});

function show(a) {
	pressed.textContent=String(a);
	if (calculate.textContent.length ===1 && calculate.textContent==='0') {
		calculate.textContent = pressed.textContent;
	}
	else {
		calculate.textContent = calculate.textContent + pressed.textContent;
	}
}