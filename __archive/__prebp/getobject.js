/*	
	Low level facilities for getting an object.
*/

/**
	The main workhorse function. It finds any object based on many parameters.
	@param viewer [GridObject] the object that will be the center of our search
	@param direction [Direction] the direction the object is looking in.
	@param distance [int] how far to look, in tiles.
	@return [GridObject[]] array of found objects (normally just one)
*/
function getObjects(viewer,direction,distance){
	//offsets from where user is
	var xOff = direction.x * distance;
	var yOff = direction.y * distance;
	
	return getObjectsAt(viewer.x + xOff,viewer.y + yOff);
}

/**
	Returns a list of all objects at the specified location.
	@param x [int] the column
	@param y [int] the row
*/
function getObjectsAt(x,y){
	var objects = [];
	for(var i=0;i<allObjects.length;i++){
		var object = allObjects[i];
		if(object.x == x && object.y == y)
			objects.push(object);
	}
	return objects;
}

/**
	Same as getObjects(), except it only returns 1 enemy.
	@return [Animal] - just one.
	@return [null] if nothing is there.
*/
function getAnimal(viewer, direction, distance){
	var objects = getObjects(viewer,direction,distance);
	for(var i=0;i<objects.length;i++){
		if(objects[i] instanceof Animal)
			return objects[i];
	}
	
	return null;
}

/**
	Returns the animal at the given location.
	@param x [int] the column.
	@param y [int] the row.
	@return [Animal] the animal there, or [null] if no one is there
*/
function getAnimalAt(x,y){
	var objects = getObjectsAt(x,y);
	for(var i=0;i<objects.length;i++){
		if(objects[i] instanceof Animal)
			return objects[i];
	}
	
	return null;
}

/**
	Finds the closest animal in the given group to the viewer
	@param viewer [Animal] can be Ally or Enemy.
	@param groupToSearch [Animal[]] which animals to search.
	@return [Animal] The closest animal in the group
*/
function getClosestAnimal(viewer,groupToSearch){
	//preprocess
	var dictionary = []; //data on all animals to search
	for(var i=0; i<groupToSearch.length; i++){
		var animal = groupToSearch[i];
		dictionary.push({
			distance: getDistance(viewer,animal),
			animal: animal
		});
	}
	
	//competition: who is closest
	var closest = {
		distance: 100,
		animal: null
	};
	
	for(var i=0; i<dictionary.length; i++){
		var animal = dictionary[i];
		if(animal.distance < closest.distance){
			//new closest animal
			closest = animal;
		}
		else if(animal.distance == closest.distance){
			//so they're tied. if the new one's showy, it wins; else older wins.
			if(animal.animal.ability == Abilities.Showy)
				closest = animal;
			//else closest remains
		}
	}
	
	return closest.animal || groupToSearch[0]; //in case of some error
}

/**
 * Returns an array containing all the foes of this animal.
 * @param	{Animal}	viewer	the animal to check the foes of.
 */
function getFoes(viewer){
	return viewer instanceof Ally ? enemies : allies;
}

/**
 * Returns an array containing all the friends of this animal.
 * @param	{Animal}	viewer	the animal to check the friends of. Ally returns allies, Enemy returns enemies.
 */
function getFriends(viewer){
	return viewer instanceof Ally ? allies : enemies;
}

/**
	Finds the closest foe to the viewer.
	@param viewer [Animal] can be Ally or Enemy.
	@return [Animal] the opposite of what the viewer is. Also the closest.
*/
function getClosestFoe(viewer){
	//search opposite group
	var groupToSearch = getFoes(viewer);
	
	return getClosestAnimal(viewer,groupToSearch);
}

/**
	Finds the closest friend (same side) to the viewer.
	@param viewer [Animal] can be Ally or Enemy.
	@return [Animal] the same as what the viewer is. Also the closest.
*/
function getClosestFriend(viewer){
	//search opposite group
	var groupToSearch = getFriends();
	
	return getClosestAnimal(viewer,groupToSearch);
}

/**
	Finds the enemy who is closest to an ally.
	@return [Enemy] the enemy who is the closest to an ally out of all the enemies.
*/
function getEnemyClosestToAlly(){
    if(enemies.length == 0) return null;
    var closestEnemy = null;
    var closestDistance = 1000;
    
    for(var i=0; i<foes.length; i++){
        var enemy = foes[i];
        
        //only get enemies who aren't incapable of moving
        var flags = enemy.flags;
        if(flags.getFlag(FLAG_STUNNED) == true || flags.getFlag(FLAG_LOCKDOWN_TURNS_LEFT) > 0){
            continue;
        }
        
        var distance = getDistance(enemy,getClosestFoe(enemy));
        if(distance < closestDistance){
            closestEnemy = enemy;
            closestDistance = distance;
        }
    }
    
	return closestEnemy;
}

/**
 * Returns an array of all the friends (teammates) of the given animal who are just 1 space away.
 * @param	{Animal}	viewer	the animal to check the friends of
 * @return	{Animal[]}}	every animal on the same team that's next to viewer, in any order
 */
function getAdjacentFriends(viewer){
	var allFriends = getFriends(viewer);
	var neighbors = [];
	for(var i=0; i<allFriends.length; i++){
		if(getDistance(viewer, allFriends[i]) == 1){ //if it's 0 we're looking at this exact animal
			neighbors.push(allFriends[i]);
		}
	}
	
	return neighbors;
}

/**
	Finds a GridObject by its ID.
	@param id [string] the object's ID; also the ID of its div.
	@return [GridObject] if one is found that matches.
	@return [null] if nothing matches.
*/
function getObjectById(id){
	for (var i=0; i<allObjects.length; i++){
		if(allObjects[i].id == id)
			return allObjects[i];
	}
	return null;
}

/**
	Finds the object who owns the given div.
	@param div [$div] a jQuery object containing a div.
	@return [GridObject] the object that owns the div
*/
function getObjectByDiv(div){
	return getObjectById(div.attr('id'));
}

/**
 * Returns true if there is a foe one space away from the viewer.
 * @param	{Animal}	viewer	an Animal
 * @return	{boolean}	if the nearest foe is one space away 
 */
function isAdjacentFoe(viewer){
	//don't use getClosestFoe() cause that's slow
	var foes = getFoes(viewer);
	for(var i=0; i<foes.length; i++){
		if(getDistance(viewer, foes[i]) <= 1){
			//yup, someone's adjacent
			return true;
		}
	}
	
	//no one found
	return false;
}

/**
	Finds the grid distance between two GridObjects regardless of direction.
	@param a [GridObject]
	@param b [GridObject]
	@return [int] the distance.
*/
function getDistance(a,b){
	return getPointDistance(a.x, a.y, b.x, b.y)
}

/**
 * Returnsthe distance between two points.
 * @param {int}	x1,y1	the first point's coordinates
 * @param {int}	x2,y2	the second point's coordinates
 * @return {int} the distance between them in the grid system (no diagonals)
 */
function getPointDistance(x1, y1, x2, y2){
	var xdiff = Math.abs(x1 - x2);
	var ydiff = Math.abs(y1 - y2);
	//no need for distance formula; the game is grid-based so there's no diagonals
	return xdiff + ydiff;	
}

/**
	Finds the distance between two objects not using the grid system; the distance formula is used.
	@param a [GridObject]
	@param b [GridObject]
	@return [float] the distance.
*/
function getRawDistance(a,b){
	var xdiff = Math.abs(a.x - b.x);
	var ydiff = Math.abs(a.y - b.y);
	return Math.sqrt(xdiff*xdiff + ydiff*ydiff);
}

/**
	Finds the distance between a and b in the given direction.
	@param a [GridObject]
	@param b [GridObject]
	@param direction [Direction] {optional} defaults to the shortest direction.
	@return [float] the distance (absolute.)
*/
function getDistanceInDirection(a,b,direction){
	if(!direction){
		direction = getShortestDirection(a,b);
	}
	if(direction.x != 0){
		//we care about x coord
		return Math.abs(a.x - b.x);
	}
	else if(direction.y != 0){
		//we care about y coord
		return Math.abs(a.y - b.y);
	}
	else{
		//direction has x = 0 and y = 0, shouldn't happen
		throw 'Error: direction.x = 0 & direction.y = 0';
	}
}

/**
 * Returns the difference in coordinates between a and b, or the values that if added to a's coordinates yields b's coordinates. If a is (0, 5) and b is(3, 3), it returns [3, -2].
 * @return	{int[]}	the coordinate difference
 */
function getCoordinateDifference(a,b){
	return [b.x - a.x, b.y - a.y];
}

/**
 * Returns true if a and b are contained within the same row or column; that is, they are in line with each other.
 * @param	{GridObject}	a
 * @param	{GridObject}	b
 * @return	{boolean}	true if they are in line, false otherwise.
 */
function isInLine(a, b){
	var coordDiff = getCoordinateDifference(a, b);
	return coordDiff[0] == 0 || coordDiff[1] == 0;
}

/**
	Finds the directions a could go to get to b. Often a could go right or up (or something) to get to b, so this would return right and up.
	@param a [GridObject]
	@param b [GridObject]
	@return [Direction[]] - UP,DOWN,LEFT,RIGHT - directions given in no particular order
*/
function getDirections(a,b){
	var x = a.x - b.x;
	var y = a.y - b.y;
	
	var directions = [];
	
	if(y > 0){
		//b is above a
		directions.push(UP);
	}
	else if(y < 0){
		//b is below a
		directions.push(DOWN);
	}
	else{
		//b and a have same x-coordinate, so no x movement necessary
	}
	
	if(x > 0){
		//b is left of a
		directions.push(LEFT);
	}
	else if(x < 0){
		//b is right of a
		directions.push(RIGHT);
	}
	else{
		//b and a have same y-coordinate, so no y movement necessary
	}
	
	return directions;
}

/**
	Finds the shortest direction a would have to go to get to b.
	@param a [Animal] because Animal.canStepOn() might be called.
	@param b [GridObject]
	@param directions [Direction[]] {optional} the directions you want to test. Be sure that these are the directions a must go to get to b. Defaults to getDirections(a,b).
	@return [Direction] - UP, DOWN, LEFT, RIGHT.
*/
function getShortestDirection(a,b,directions){
	if(!directions){
		//use default
		directions = getDirections(a,b);
	}
	
	if(directions.length == 1){
		return directions[0];
	}
	else if(directions[0] < directions[1]){
		return directions[0];
	}
	else{
		return directions[1];
	}
}

/**
	Finds the best direction a would have to go to get to b. This usually yields the shortest route, but if the shortest route is blocked (a can't step on it) the other one is used.
	@param a [Animal] because Animal.canStepOn() might be called.
	@param b [GridObject]
	@param directions [Direction[]] {optional} the directions you want to test. Be sure that these are the directions a must go to get to b. Defaults to getDirections(a,b).
	@return [Direction] - UP, DOWN, LEFT, RIGHT.
*/
function getPreferredDirection(a,b,directions){
	if(!directions){
		//use default
		directions = getDirections(a,b);
	}
	
	var preferredDirection;
	if(directions.length == 1){
		//only 1 element
		preferredDirection = directions[0];
	}
	else{
		//find the shorter direction
		var directions = getDirections(a,b);
		var dir0Distance = getDistanceInDirection(a,b,directions[0]);
		var dir1Distance = getDistanceInDirection(a,b,directions[1]);
		
		if(dir0Distance < dir1Distance){
			//direction 0 would be better as long as nothing is there
			//is something there? and can we step on it?
			var cantStep = false;
			var objects = getObjectsAt(a.x + directions[0].x, a.y + directions[0].y);
			for(var i=0; i<objects.length; i++){
				if(a.canStepOn(objects[i]) == false) cantStep = true;
			}
			
			//if cantStep, direction[0] is a no go, so use directions[1]
			preferredDirection = cantStep ? directions[1] : directions[0];
		}
		else{
			//just the opposite of the above
			var cantStep = false;
			var objects = getObjectsAt(a.x + directions[1].x, a.y + directions[1].y);
			for(var i=0; i<objects.length; i++){
				if(a.canStepOn(objects[i]) == false) cantStep = true;
			}
			
			//if cantStep, directions[1] is a no go, so use directions[0]
			preferredDirection = cantStep ? directions[0] : directions[1];			
		}
	}//end if/else about directions.length
	return preferredDirection;
}