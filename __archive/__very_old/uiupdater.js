/**
	Sets the contents of the hovering information box.
	@param animal [Animal] the animal whose stats should be displayed
	@param event [Event] the event passed by onMouseOver.
*/
function setHoverInfo(animal,event){
	var hoverInfo = get("hover_info");
	hoverInfo.style.display = "block";
	hoverInfo.className = animal.isAlly ? "ally_info" : "enemy_info";
	
	get("hover_image").src = animal.getPicturePath();
	get("hover_name").innerHTML = animal.name;
	get("hover_hp_text").innerHTML = animal.currentHP + "/" + animal.maxHP() + " <i>(" + Math.round(animal.HPPercent() * 100) + "%)</i>";
	get("hover_level").innerHTML = animal.level;
	get("hover_attack").innerHTML = animal.attack();
	get("hover_defense").innerHTML = animal.defense();
	
	//experience; doesn't show for enemies
	get("hover_experience_wrapper").style.display = animal.isAlly ? "inline" : "none";
	get("hover_experience").innerHTML = "<strong>" + animal.experience + "</strong>; " + animal.experienceLeft() + " until next level";
	
	/*//draw on HP canvas
	var canvas = get("hover_hp_bar");
	var width = parseInt(canvas.style.width);
	var height = parseInt(canvas.style.height);
	var context = canvas.getContext("2d");
	//fill with white to clear
	context.fillStyle = "#FFFFFF";
	context.fillRect(0,0,width,height);
	//fill with green
	var fillWidth = Math.round(animal.HPPercent() * width);
	context.fillStyle = "#008000";
	context.fillRect(0,0,fillWidth,height);*/
}

/**
	Hides the hovering information box.
*/
function hideHoverInfo(){
	var infoDiv = document.getElementById("hover_info");
	infoDiv.style.display = "none";
}

/**
	Shows a dialogue on the dialogue popup.
	@param level [Level] the current level whose dialogues are being shown.
	@param dialogue [Dialogue] the dialogue to show.
*/
function updateDialogue(level,dialogue){
	get("dialogue").style.display = 'block';
	var className;
	if(dialogue.alignment == ALLY)
		className = 'ally_info';
	else if(dialogue.alignment == ENEMY)
		className = 'enemy_info';
	else
		className = 'neutral_info';
	get("dialogue").className = className;
	get("dialogue_image").src = dialogue.image;
	get("dialogue_speaker").innerHTML = dialogue.speaker;
	get("dialogue_text").innerHTML = dialogue.text;
	get("dialogue_next_button").onclick = function(){
		level.showNextDialogue();
	};
}

/**
	Hides the dialogue popup.
*/
function hideDialogue(){
	get("dialogue").style.display = 'none';
}

/*
	Sets the contents of the points div in the UI
	@param how many points you have
*/
function updatePoints(numPoints){
	var pointsDiv = document.getElementById("points");
	
	var pointString = padWithZeros(numPoints,NUM_DIGITS_FOR_POINTS); //pad with zeros so it's a fixed length
	
	pointsDiv.innerHTML = "<b>Points: </b>" + pointString;
}

function padWithZeros(number,numDigitsRequested){
	if(number == 0){
			//going through the math with this would crash the broswer, since log(0) is infinity and you'd loop to infinity
			var string = "";
			//add all the zeros
			for(var i=0;i<numDigitsRequested;i++){
				string += "0";
			}
			return string;
		}
		else{
			//pad the point totals so it has at least a certain number of zeros
			//this numDigits is how many digits are in the number (not how many are needed)
			var numDigits = Math.ceil(Math.log(number)/Math.LN10); //log is to base e, but dividing by ln(10) makes it effectively log10(x)... 
				//a bug with this is that 1000 returns 3, even though it has 4 digits, thanks to slight inaccuracy with floating-point numbers
			//42 would yield ~1.6, but it has 2 digits so we take the ceiling, which is 2
			
			//if the number is 1, 10, 100, etc., we need to increase the number of digits in the number by 1 (since numDigits would be 1.9999999, which goes to 2)
			if(number == 1 || number == 10 || number == 100 || number == 1000)
				numDigits++; //we can just hard code this in
			
			var tackOn = "";
			
			for(var i=0;i<(numDigitsRequested - numDigits);i++){
				//go once for each missing digit
				//see constants.js to see how many digits for points we have (as of now 4)	
				tackOn += "0";
			}
																		
			return tackOn + "" + number; //guaranteed to be the right length
		}
}