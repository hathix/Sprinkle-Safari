/**
	Obstacle class and steppable class, both of which extend GridObject.
*/

/**
	An obstacle, which cannot be stepped on.
	@param type [string] the type of obstacle, like Water or Tree.
	@param x [int] the column
	@param y [int] the row
*/
function Obstacle(type,x,y){
	GridObject.call(this,type,OBSTACLE_FOLDER,makeDiv(),x,y);
	
	this.div.addClass('obstacle');
}
Obstacle.prototype = new GridObject;


/**
	A steppable, which can be stepped on (activating a special effect).
	@param type [string] the type of steppable, like a heart.
	@param x [int] the column
	@param y [int] the row
*/
function Steppable(type,x,y){
	GridObject.call(this,type,STEPPABLE_FOLDER,makeDiv(),x,y);
	
	this.div.addClass('steppable');
	
	this.onStep = function(stepper){
		if(stepper instanceof Enemy){
			//enemies can't use steppables
			return;
		}
		//determine raw onStep function and call it
		var func = this.rawOnStep();
		if(func(stepper))
			this.remove();
	};
}
Steppable.prototype = new GridObject;

/**
	Removes this steppable from the grid.
*/
Steppable.prototype.remove = function(){
	removeObject(this);
	this.div.remove();
}

/**
	The raw function to be called when this is stepped on. All the boilerplate will be taken care of separately.
	@return [function] a heart of the function.
*/
Steppable.prototype.rawOnStep = function(){
	switch(this.type){
	//the param "stepper is an Animal
	//return true if the object is to be removed after stepping
	case 'full-heart':
		return function(stepper){
			stepper.gainHPPercent(FULL_HEART);
			return true;
		};
	case 'half-heart':
		return function(stepper){		
			stepper.gainHPPercent(HALF_HEART);
			return true;
		};
	case 'quarter-heart':
		return function(stepper){	
			stepper.gainHPPercent(QUARTER_HEART);
			return true;
		};
	case 'flag':
		return function(stepper){
			//if it's a boss level, you can't step unless you have killed the boss
			for(var i=0; i<enemies.length; i++){
				if(enemies[i] instanceof Boss){
					Logger.log('You need to defeat the boss before you can finish the level!', 'info');
					break;
				}
			}
			
			if(stepper.name == MAIN_CHAR_NAME){
				startActiveLevelEndDialogues(); //level.end() will be called from that function
			}
			else{
				//inform the user
				Logger.log('hathix must step on the flag to finish the level.','info');
			}
			return false;
		};
	case 'secret-entrance':
		return function(stepper){
			//only activate if all enemies are dead
			if(enemies.length == 0){
				Logger.log("Wait, what's that massive hole in the --","urgent");
				currentLevel.end(true); //true to load secret level
			}
			else{
				//enemies still alive, give cryptic clue
				Logger.log("There's a little pothole in the ground here. How strange.","info");	
			}
			return false;	
		};	
	case 'template':
		return function(stepper){
			//code
		};
	}
}