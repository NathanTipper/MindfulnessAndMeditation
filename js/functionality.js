var stressInfo = 
[
	"According to Statistics Canada, 23 per cent of people over the age of 15 report that most days are “quite a bit” or “extremely” stressful, and that number rises to 30 per cent among the 35 to 54 age group.",
	"In its most acute forms, the researchers say, the stress of perfectionism can lead to eating disorders, high blood pressure, depression and thoughts of suicide.",
	"When it comes down to it, stress is among our greatest health threats. It’s been linked to complications such as high blood pressure, heart disease, obesity and diabetes."
]
var stressInfoIndex = 0;
var stressInfoText;

function smooth_scroll(target) {
	console.log("Hello");
	if(target == "#stress-of-today") {
		stressInfoText = document.querySelector(".stress-info-text");
		stressInfoText.classList.add("title-animation");
		stressInfoText.addEventListener("animationend", stressTitleAnimationEnd, false);
		setTimeout(function() {
			document.querySelector("#front-page-header").style.display = "none";
			document.querySelector(target).scrollIntoView( {behavior: 'instant', block: 'start'});
		}, 5000);
	}
	document.querySelector(target).scrollIntoView({ behavior: 'smooth', block: "start"});
}

function stressTitleAnimationEnd() {
	console.log("animation end");
	stressInfoText.removeEventListener("animationend", stressTitleAnimationEnd);
	stressInfoText.classList.remove("title-animation");
	pauseFactsAnimation();
}

function pauseFactsAnimation() {
	setTimeout(function() { 
		stressInfoText.classList.add("fact-animation");
		stressInfoText.innerHTML = stressInfo[stressInfoIndex++];
		stressInfoText.addEventListener("animationiteration", stressFactIterationEnd, false);
		stressInfoText.addEventListener("animationend", stressFactAnimationEnd, false);
		stressInfoText.style.fontSize = "3vw";
		stressInfoText.style.left = "0%";
	}, 250);
}

function stressFactIterationEnd() {
	console.log("iteration end");
	if(stressInfoIndex < stressInfo.length) {
		console.log("changing text after iteration");
		stressInfoText.innerHTML = stressInfo[stressInfoIndex++];
	}
}

function stressFactAnimationEnd() {
	smooth_scroll("#stress-info");
	setTimeout(function() {
		document.querySelector("#stress-of-today").style.display = "none";
		document.querySelector("#stress-info").scrollIntoView({ behavior: 'instant', block: 'start'});
	}, 1000);
	document.querySelector("body").style.overflow = "scroll";
}