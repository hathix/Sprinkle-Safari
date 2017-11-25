/**
	Builds and returns a level based on the stage.
	@param stageString [string] the numerical representation of the level, like 1-1
	@return [Level] the level whose stage you passed
*/
function getLevel(stageString){
	var actNum = parseInt(stageString.substring(0,1));
	var stageNum = parseInt(stageString.substring(2,3));
	
	switch(actNum){
		case 1:
			return getAct1Level(stageNum);
		case 2:
			return getAct2Level(stageNum);
	}
}

/**
	Sets the new active level.
	@param stage [string] the stage of the level, like 1-1
*/
function loadLevel(stage){
	alert("Welcome to level " + stage + "!");
	Logger.log("Welcome to level " + stage + "!");
	fullHealTeam();
	get("stuff_on_grid").innerHTML = "";
	
	currentLevel = getLevel(stage);
	interpretLevel(currentLevel); //that'll put it on the grid for us
	
	//put allies in the preferred locations
	for(var i=0;i < team.length; i++){
		var location = currentLevel.preferredAllyLocations[i]; //(x,y)
		var ally = team[i];
		ally.setLocation(location[0],location[1]);
		//put them on the board
		ally.putOnBoard();
	}
	
	//show first start dialogue
	currentLevel.showNextDialogue();
}

/**
	Finds the next level's name.
	@return [string] the level's stage, like '1-1'
*/
function nextLevel(){
	var stage = currentLevel.stage;
	var act = parseInt(stage.substring(0,1));
	var level = parseInt(stage.substring(2,3));
	
	if(level == STAGES_PER_ACT){
		//new act
		return (act + 1) + "-1";
	}
	else{
		//next stage
		return act + "-" + (level + 1);
	}	
}

/**
	Tries to end the level (if all enemies are dead.) If level is over, it loads the next one.
*/
function tryToEndLevel(){
	var enemies = getEnemies();
	if(enemies.length == 0){
		loadLevel(nextLevel());
	}
}