/**
 * In charge of saving and loading the game state.
 */

/**
 * Keys used to access saved state.
 */
var SL_KEYS = {
	//saved game
	savedGameTag: 'ss-game-saved',
	currentLevel: 'ss-current-level',
	allies: 'ss-allies',
	difficultyLevel: 'ss-difficulty-level',
	
	//minigame
	minigamesWon: 'ss-minigames-won'
}

function saveGame(){
	//store tag showing that there is indeed a saved game
	$.store.set(SL_KEYS.savedGameTag, 'true');
	
	//store primitive level (just act and stage num)
	$.store.set(SL_KEYS.currentLevel, { act: currentLevel.actNum, stage: currentLevel.stageNum });
	
	//make all allies primitive (just basic info) and store them
	var primAllies = [];
	for(var i=0; i<allies.length; i++){
		primAllies.push(new PrimitiveAlly(allies[i]));
	}
	$.store.set(SL_KEYS.allies, primAllies);
	
	//store difficulty leveel
	$.store.set(SL_KEYS.difficultyLevel, difficultyLevel);
}

function loadGame(){
	//load primitive allies
	var primAllies = $.store.get(SL_KEYS.allies);
	for(var i=0; i<primAllies.length; i++){
		//build real ally from primitive ally
		var primAlly = primAllies[i];
		var ally = getAllyFromPrimitive(primAlly);
		
		ally.putOnBoard();
		allies.push(ally);
		allObjects.push(ally);
	}
	
	//load difficulty level
	difficultyLevel = $.store.get(SL_KEYS.difficultyLevel);
	
	//load primitive level
	var primLevel = $.store.get(SL_KEYS.currentLevel);
	loadLevel(primLevel.act, primLevel.stage);
}

/**
 * Returns whether or not a saved game exists.
 * @return	{boolean}	true if there is a saved game (evidenced by the saved game tag), false otherwise
 */
function isSavedGame(){
	return $.store.get(SL_KEYS.savedGameTag) != undefined;
}

/**
 * Clears all stored data for the adventure.
 */
function clearSavedData(){
	//by removing the saved game tag, SS will think there's no saved game. The new game will just override the old data.
	$.store.remove(SL_KEYS.savedGameTag);
}

/**
 * Creates a primitive ally, which is a normal ally stripped down to the bare minimum
 * @param	{Ally}	realAlly	an actual ally object.
 */
function PrimitiveAlly(realAlly){
	this.name = realAlly.name;
	this.type = realAlly.type;
	this.level = realAlly.level;
	this.experience = realAlly.experience;
	this.levelsWithTeam = realAlly.levelsWithTeam;
	this.ivs = realAlly.ivs;
}

/**
 * Returns the real ally that the given PrimitiveAlly represents.
 * @param	{PrimitiveAlly}	prim	a primitive ally that was loaded.
 * @return	{Ally}	an honest-to-goodness real Ally.
 */
function getAllyFromPrimitive(prim){
	var ally = new Ally(prim.type, 0, 0, prim.level, prim.name);
		ally.experience = prim.experience;
		ally.levelsWithTeam = prim.levelsWithTeam;
		ally.ivs = prim.ivs;	
	
	return ally;
}


/* MINIGAME */

/**
 * Returns the number of minigames ever won.
 */
function getMinigamesWon(){
	if($.store.get(SL_KEYS.minigamesWon) == undefined){
		//first time using it
		return 0;
	}
	return $.store.get(SL_KEYS.minigamesWon);
}

/**
 * Increases the number of minigames ever won by 1 and saves it.
 */
function increaseMinigamesWon(){
	$.store.set(SL_KEYS.minigamesWon, getMinigamesWon() + 1);
}
