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
			if(stepper.name == MAIN_CHAR_NAME){
				startActiveLevelEndDialogues(); //level.end() will be called from that function
			}
			else{
				//inform the user
				Logger.log('Hathix must step on the flag to finish the level.','info');
			}
			return false;
		};
	case 'template':
		return function(stepper){
			//code
		};
	}
}