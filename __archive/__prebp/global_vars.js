/**
	All the global variables and functions for them.
*/

var acts = [];
var difficultyLevel = DIFFICULTY_LEVELS[1];
var currentLevel = null;
var isMinigameOn = false;

/**
	Selected ally stuff. The selected ally is the one that is clicked; when "Move" or "Attack" are clicked in the Qtip, this ally can move/attack.
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
			//unfortunately we have to indirectly find out whose div was clicked
			var x = parseInt($(this).css('left')) / TILE_SIZE;
			var y = parseInt($(this).css('top')) / TILE_SIZE;
			setActiveAlly(getAnimalAt(x,y));
		});
		activeAlly = null;
	}
}

/**
	This enemy has just died and is being recruited. The dialog for its new name will access this and call its finishRecruiting() method
*/
var defeatedEnemy = null;

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
	removeFromArray(ally,allies);
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
	removeFromArray(enemy,enemies);
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
	removeFromArray(object,allObjects);
}