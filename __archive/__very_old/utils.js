/**
	Factory function for making a <div> element.
*/
function Div(className,id){
	var div = document.createElement("div");
	if(className)
		div.className = className;
	if(id)
		div.id = id;
	return div;
}

/**
	Alias for document.getElementById(id).
*/
function get(id){
	return document.getElementById(id);
}

/**
	Runs a trial.
	@param chance [float] the decimal chance that this method will return true.
	@return [boolean] true if the trial succeeded, false otherwise
*/
function pushLuck(chance){
	return Math.random() < chance;
}

/**
	Puts the given HTML element on the board.
	@param elem [HTML Element]
*/
function addToBoard(elem){
	//<TODO>: if it already has it, don't add it
	var grid = document.getElementById("stuff_on_grid");
	grid.appendChild(elem);
}

/**
	Gets input from the user using a text box.
	@param text [string] some text to notify the user with.
	@param defaultInput [string] {optional} the default text to put in the text box.
*/
function getInput(text,defaultInput){
	//<TODO>: much nicer prompt
	var result;
	do{
		result = prompt(text,defaultInput);
	} while(!result || result == MAIN_CHAR_NAME); //can't have 2 hathix's
	return result;
}

/**
	Finds all the enemies on the board.
	@return [Animal[]] the enemies
*/
function getEnemies(){
	var enemies = [];
	for(var i=0;i<currentLevel.stuffOnGrid.length;i++){
		var object = currentLevel.stuffOnGrid[i];
		if(object.isAnimal && object.isAlly == false)
			enemies.push(object);
	}
	
	return enemies;
}

/**
	Finds the GridObjects (animal or object) at the given location and returns them in an array.
	@param x [int] the horizontal coordinate
	@param y [int] the vertical coordinate
	@return [empty array] if nothing is found
	@return [Animal/GridObject array] if something is found.
*/
function getObjectsAt(x,y){
	var objects = [];
	for(var i=0;i<currentLevel.stuffOnGrid.length;i++){
		var object = currentLevel.stuffOnGrid[i];
		if(object.x == x && object.y == y)
			objects.push(object);
	}
	//search allies
	for(var i=0;i<numTeammates();i++){
		var object = team[i];
		if(object.x == x && object.y == y)
			objects.push(object);
	}
	
	return objects;
}

/**
	Finds the Animal at the given location.
	@param x [int] the horizontal coordinate
	@param y [int] the vertical coordinate
	@return [null] if nothing is found
	@return [Animal] if something is found
*/
function getAnimalAt(x,y){
	for(var i=0;i<currentLevel.stuffOnGrid.length;i++){
		var object = currentLevel.stuffOnGrid[i];
		if(object.x == x && object.y == y && object.isAnimal)
			return object;
	}
	//search allies
	for(var i=0;i<numTeammates();i++){
		var object = team[i];
		if(object.x == x && object.y == y)
			return object;
	}
	
	//nothing found
	return null;
}

/**
	Finds the direction a would have to go to get to b.
	@param a [GridObject/Animal] the object that wants to move
	@param b [GridObject/Animal] the target
	@return [int[]] a direction (MOVE_UP, etc.)
*/
function getDirectionTo(a,b){
	var rawX = rawXDistance(a,b);
	var rawY = rawYDistance(a,b);
	var absX = xDistance(a,b);
	var absY = yDistance(a,b);

	if(absY > absX){
		if(rawY > 0)
			return MOVE_UP;
		else
			return MOVE_DOWN;
	}
	else{
		if(rawX > 0)
			return MOVE_LEFT;
		else
			return MOVE_RIGHT;
	}
}

/**
	Finds the distance between two animals using the Distance Formula.
	@param a [Animal] the first animal
	@param b [Animal] the second animal
	@return [float] the distance between the two, in grid spaces
*/
function distanceBetween(a,b){
	var xdiff = xDistance(a,b);
	var ydiff = yDistance(a,b);
	return Math.sqrt(xdiff + ydiff);
}

/**
	Finds the horizontal distance between two animals.
	@param a [Animal] the first animal
	@param b [Animal] the second animal
	@return [int] the distance between the two, in grid spaces	
*/
function xDistance(a,b){
	return Math.abs(rawXDistance(a,b));
}

/**
	Finds the vertical distance between two animals.
	@param a [Animal] the first animal
	@param b [Animal] the second animal
	@return [int] the distance between the two, in grid spaces	
*/
function yDistance(a,b){
	return Math.abs(rawYDistance(a,b));
}

/**
	Returns the non-absolute horizontal distance between the two objects.
	@return +ve if b is below a; -ve if b is above a
*/
function rawXDistance(a,b){
	return a.x - b.x;
}

/**
	Returns the non-absolute vertical distance between the two objects.
	@return +ve if b is right of a; -ve if b is left of a
*/
function rawYDistance(a,b){
	return a.y - b.y;
}

/**
	For debugging: lists all the fields of an object.
	@param object
*/
function dir(object){
	var text = "";
	for(field in object){
		text += field + "<br />";
	}	
	document.write(text);
}