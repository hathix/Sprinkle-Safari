const UP_KEYCODE = 38;
const LEFT_KEYCODE = 37;
const DOWN_KEYCODE = 40;
const RIGHT_KEYCODE = 39;

/*
	Get the user's key press and change that to a letter
	if it's w/a/s/d then move
*/
function moveOnKeyPress(e){
	var keynum;
	if(window.event)
		keynum = e.keyCode; //IE
	else if(e.which)
		keynum = e.which; //everyone else
	
	//move
	switch(keynum){
		case UP_KEYCODE:
			takeTurn(MOVE_UP);
			return;
		case LEFT_KEYCODE:
			takeTurn(MOVE_LEFT);
			return;
		case DOWN_KEYCODE:
			takeTurn(MOVE_DOWN);
			return;
		case RIGHT_KEYCODE:
			takeTurn(MOVE_RIGHT);
			return;
	}
	
	//attack
	var pressed = String.fromCharCode(keynum);
	switch(pressed){
		case "w":
		case "W":
			attack(MOVE_UP);
			return;
		case "a":
		case "A":
			attack(MOVE_LEFT);
			return;
		case "s":
		case "S":
			attack(MOVE_DOWN);
			return;
		case "d":
		case "D":
			attack(MOVE_RIGHT);
			return;
	}
}
	
	//each object on the map takes its turn (only enemies move)
	/*for(var i=0;i<currentLevel.stuffOnGrid.length;i++){
		var object = currentLevel.stuffOnGrid[i]; //this is who we're manipulating
		object.doMove();
	}*/
	
	/*//disable window.onkeydown for a little
	//see main.js
	window.onkeydown = function(event){} //empty; nothing happens on key press
	wait(300);	
	window.onkeydown = function(event){
		moveOnKeyPress(event); //this is the real thing
	}*/

//utility methods for all movers

/**
	Sees if the given object can move in the given direction
	@param mover the object that wants to move
	@param direction the array of how to move: [xchange, ychange]
	@return true if you can move, false if you can't
*/
function canMove(mover,direction){
	//get the user's future location
	var x = mover.x + direction[0];
	var y = mover.y + direction[1];
	if(x < 0 || y < 0 || x >= NUM_TILES_SIDE || y >= NUM_TILES_SIDE) return false; //outside bounds
	
	var enemies = getEnemies();
	for(var i=0;i<enemies.length;i++){
		var object = enemies[i];
		if(object.x == x && object.y == y && object.hash != mover.hash){
			//there's an enemy where you want to move
			return false;
		}
	}
	
	//check for user's team
	for(var i=0;i<numTeammates();i++){
		//loop through all the stuff on the map
		var object = team[i]; //what we're checking now
		if(object.x == x && object.y == y && object.hash != mover.hash){
			//you stepped on a teammate; bad
			return false;
		}
	}

	//check for obstacles
	for(var i=0;i<currentLevel.stuffOnGrid.length;i++){
		var object = currentLevel.stuffOnGrid[i];
		if(object.x == x && object.y == y){
			if(object.canBeSteppedOn === false)
				return false;
		}	
	}

	return true;
}