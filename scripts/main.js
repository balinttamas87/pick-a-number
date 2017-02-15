"use strict";


(function () { // IIFE to avoid not to mess up the global namespace

	//------------------------------------------------------
	//-------INITIAL VALUES & NECCESSARY ASSIGNMENTS--------
	//------------------------------------------------------
	var x = 1024 / 2; // We could guess numbers between 0 & 1024, but for the sake of the trick we restrict the user to 0 & 1000
	var lessOrGreater = "less";
	var y = 512; // Each time "Yes" or "No" button gets clicked the value gets halved
	var countClicks = 0;
	var question = "#" + (countClicks + 1) + " Is your number " + lessOrGreater + " then " + x + "?";
	var questionParagraph = document.getElementById("question");

	var btnPlay = document.getElementById("btnPlay");
	var btnStart = document.getElementById("btnStart");
	var btnYes = document.getElementById("btnYes");
	var btnNo = document.getElementById("btnNo");
	var btnPlayAgain = document.getElementById("btnPlayAgain");

	questionParagraph.innerHTML = question;


	//------------------------------------------------------
	//-----EXECUTE FUNCTIONS WHEN BUTTONS GET CLICKED-------
	//------------------------------------------------------
	btnYes.addEventListener("click", yesClicked, false);
	btnNo.addEventListener("click", noClicked, false);
	btnPlay.addEventListener("click", showInstructions, false);
	btnStart.addEventListener("click", start, false);
	btnPlayAgain.addEventListener("click", playAgain, false);

	function writeNumber (alertOrLog, number) {
		alertOrLog("Your number is: " + number + ".");
	}


	//------------------------------------------------------
	//---FUNCTIONS IN ORDER AS THEY HAPPEN WHILE PLAYING----
	//------------------------------------------------------
	function showInstructions() {
		document.getElementById("instructions").style.visibility = "visible";
		document.getElementById("btnStart").style.visibility = "visible";
	}

	function start() {
		document.getElementById("questions").style.border = "1px solid #ddd";
		document.getElementById("btnYes").style.visibility = "visible";
		document.getElementById("btnNo").style.visibility = "visible";
		document.getElementById("question").style.visibility = "visible";
	}

	function initialStepWithAnswer (userAnswer) {
		y = y / 2;
		var answer = userAnswer;
		countClicks++;
		window.console.log(answer);
	}

	function prepareForNextQuestion(isLessOrGreater, assignTo) {
		x = assignTo;
		window.console.log(x);
		lessOrGreater = isLessOrGreater;
		document.getElementById("question").innerHTML = "#" + (countClicks + 1) + " Is your number " + lessOrGreater + " then " + x + "?";
	}

	function resultEndOfGame(number) {
		writeNumber(window.console.log, number);
		document.getElementById("result").innerHTML = "Your number is " + number + ".";
		showBtnPlayAgain();
		btnYes.removeEventListener("click", yesClicked, false);
		btnNo.removeEventListener("click", noClicked, false);
	}

	function showBtnPlayAgain() {
		btnPlayAgain.style.visibility = "visible";
	}

	function playAgain() {
		location.reload();
	}


	//------------------------------------------------------
	//---------------------MAIN LOGIC-----------------------
	//------------------------------------------------------
	function yesClicked() {
			initialStepWithAnswer("true");
		if (lessOrGreater === "less") {
			if (countClicks === 10) {
				resultEndOfGame((x - 1));
			}
			else if (countClicks !== 10) {
				prepareForNextQuestion("less", x - y);
			}
		}
		else if (lessOrGreater === "greater") {
			if (countClicks === 10) {
				resultEndOfGame((x + 1));
			}
			else if (countClicks !== 10) {
				prepareForNextQuestion("greater", x + y);
			}
		}
	}

	function noClicked() {
		initialStepWithAnswer("false");
		if (lessOrGreater === "less") {
			if (countClicks === 10) {
				resultEndOfGame(x);
			}
			else if (countClicks !== 10) {
				prepareForNextQuestion("greater", x + y);
			}
		}
		else if (lessOrGreater === "greater") {
			if (countClicks === 10) {
				resultEndOfGame(x);
			}
			else if (countClicks !== 10) {
				prepareForNextQuestion("less", x - y);
			}
		}
	}
})();