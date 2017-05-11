/**
	All the global variables and functions for them.
*/

var acts = [];
var difficultyLevel = DIFFICULTY_LEVELS[1];
var currentLevel = null;
var isMinigameOn = false;
var secretElephantClicked = false; //did they click the secret elephant in the splash screen?

/**
	Selected ally stuff. The selected ally is the one that is clicked; when the arrow button is pushed, this ally can move/attack.
*/
var activeAlly = null;

function setActiveAlly(ally){
	deselectActiveAlly();
	activeAlly = ally;
	ally.div.addClass('selected');
	ally.div.qtip('show');
	ally.div.unbind('click');
	ally.div.click(function(){
		deselectActiveAlly();
	});
}

function deselectActiveAlly(){
	if(activeAlly){
		activeAlly.div.removeClass('selected');
		activeAlly.div.unbind('click');
		activeAlly.div.click(function(){
			//set this as active
			var id = $(this).attr('id');
			setActiveAlly(getObjectById(id));
		});
		activeAlly = null;
	}
}

/**
	This enemy has just died and is being recruited. The dialog for its new name will access this and call its finishRecruiting() method
*/
var defeatedEnemy = null;

var killedAlly = null;

var allies = [];
var enemies = [];
var allObjects = [];

/**
	Empties the enemies list and cleans out the allObjects list. Only allies are left.
*/
function cleanObjectLists(){
	enemies = [];
	allObjects = [];
	for(var i=0; i<allies.length;i++){
		addObject(allies[i]);
	}
}

/**
	Determines how many allies you have.
	@return [int] how many allies there are
*/
function numAllies(){
	return allies.length;
}

/**
	Adds an ally to the list of allies.
	@param ally [Ally] the ally to Add
*/
var addAlly = function(ally){
	allies.push(ally);	
	addObject(ally);
	
	ally.putInTile();

	/*if(allies.length > MAX_ALLIES){
		//too many allies; must get rid of one
		showRemoveAllyDialog();
		return;
	}*/
}

/**
 * Use this in-game. Removes an ally and checks if there's none left; if there is, game over.
 */
var removeAlly = function(ally){
	removeAllyNoCheck(ally);
	
	//are there none left?
	if(allies.length == 0){
		//GAME OVER; at least in mini game; it wouldn't have reached this point if it was normal mode anyway
		gameOver();
	}
}

/**
 * Like removeAlly(), except it doesn't check to see if it's game over.
 * Call this if you're just cleaning out the list and not in game.
 */
var removeAllyNoCheck = function(ally){
	allies.remove(ally);
	removeObject(ally);
}

/**
	Adds an enemy to the list.
	@param enemy [Enemy]
*/
var addEnemy = function(enemy){
	enemies.push(enemy);
	addObject(enemy);
}

var removeEnemy = function(enemy){
	enemies.remove(enemy);
	removeObject(enemy);
	
	//are there none left?
	if(enemies.length == 0){
		allEnemiesDefeated(); //has varying repercussions
	}
}

/**
	Adds any object to the list.
	@param object [Object]
*/
var addObject = function(object){
	allObjects.push(object);
}

var removeObject = function(object){
	allObjects.remove(object);
	//take it out of its tile
	if(object.tile){
	    object.tile.relinquishContents();
	}
}