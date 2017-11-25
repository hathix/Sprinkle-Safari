/**
	Makes a <div> that stands in front of the rest of the grid.
	@return [<div>]
*/
function makeFrontDiv(){
	var div = Div();
	div.style.zIndex = 3;
	return div;
}

function makeObstacle(x,y,type){
	return new GridObject(x,y,makeFrontDiv(),OBSTACLE_FOLDER + type + ".png",type,DO_NOTHING,DO_NOTHING,false);
}

function makeSteppable(x,y,type){
	return new GridObject(x,y,new Div(),STEPPABLE_FOLDER + type + ".png",type,DO_NOTHING,DO_NOTHING,true);
}

/**
	Generic code to make a powerup.
	@param x [int] the x location
	@param y [int] the y location
	@param type [string] the type - like 'potion'
	@param stepOn [function] - function to be called when this is stepped on. Use individual factories for this.
*/
function makePowerup(x,y,type,stepOn){
	return new GridObject(x,y,makeFrontDiv(),POWERUP_FOLDER + type + ".png",type,DO_NOTHING,stepOn,true);
}

/**
	Makes a heart to heal the stepper.
	@param x [int] the column
	@param y [int] the row
	@param type [string] either 'full' or 'half' or 'quarter'
*/
function makeHeart(x,y,type){
	type += '_heart';
	return makePowerup(x,y,type,GAIN_HEALTH);
}

//all the animals are stored here

/**
	Friendly wrapper around Animal() constructor.
	@param type [string] the animal (Elephant, Penguin, Trex)
	@param x [int] the row that the animal is in
	@param y [int] the column that the animal is in
	@param level [int]
	@param recruitmentChance [float] {optional} - defaults to CHANCE_OF_RECRUITMENT constant. Pass false if you don't want to pass anything.
	@param name [string] {optional} - defaults to type. Pass 0 if you don't want to pass anything.	
	
*/
function makeEnemy(type,x,y,level,recruitmentChance,name){
	return new Animal(type,false,makeFrontDiv(),x,y,level,0,name,recruitmentChance);
}

/**
	Makes a boss.
	@param name [string] the boss's name.
	@param x [int] the row that the boss is in
	@param y [int] the column that the boss is in
	@param level [int] doesn't really matter, just for experience
	@return [Animal] the boss
*/
function makeBoss(name,type,x,y,level){
	return new Animal(type,false,makeFrontDiv(),x,y,level,0,name,0);
}