

/** Creates an object that goes on the grid
	@param x the horizontal location of it on the grid to start (0-9)
	@param y the vertical location of it on the grid to start (0-9)
	@param elem [div] the div that will hold this object
	@param name [string] a name for the object (dirt, heart, etc)
	@param pictureSource the name of the picture (cow, dinosaur) - .png tacked on to end
	@param move a reference to a function that is called whenever this guy is told to move
				the method must have no parameters
	@param stepOn what is called when this object is stepped on
	@param canBeSteppedOn [boolean] whether or not this can be stepped on
*/
function GridObject(x,y,elem,pictureSource,name,move,stepOn,canBeSteppedOn){
	this.x = x;
	this.y = y;
	this.elem = elem;
	this.name = name.toLowerCase();
	this.pictureSource = pictureSource.toLowerCase();
	this.move = move;
	this.stepOn = stepOn;
	this.canBeSteppedOn = canBeSteppedOn;
	this.hash = this.name + Math.floor(Math.random() * 1000); //helps identify what is what... it's something like chicken65
	
	
	/*
		A wrapper around the move method
	*/
	this.doMove = function(){
		this.move();
	}
	
	/**
		The object should disappear fromt the grid and board.
	*/
	this.disappear = function(){
		this.elem.style.display = "none";
		currentLevel.removeObjectFromGrid(this);
	}
	
	/**
		Finds the number of pixels the top left of this animal should be vertically.
		@return [int]
	*/
	this.xPixels = function(){
		return this.x * TILE_SIZE;
	}
	
	/**
		Finds the number of pixels the top left of this animal should be horizontally.
		@return [int]
	*/
	this.yPixels = function(){
		return this.y * TILE_SIZE;
	}	
	
	/**
		Places the user on the board.
	*/
	this.putOnBoard = function(){
		this.elem.style.top = this.yPixels() + "px";
		this.elem.style.left = this.xPixels() + "px";
		var html = "<img src='" + this.getPicturePath() + "' />";
		this.elem.innerHTML = html;
		addToBoard(this.elem);
	}	
	
	/*
		Returns the location of this, but fixed so that it is in increments of the tile size
		@return an array, with [0] being x and [1] being y
	*/
	this.getLocation = function(){
		var loc = [this.x * TILE_SIZE, this.y * TILE_SIZE]; //see constants.js for tile size
		return loc;
	}
	
	/*
		Returns the full path to this thing's picture
		@return the path to the picture
	*/
	this.getPicturePath = function(){
		return this.pictureSource;
	}
}