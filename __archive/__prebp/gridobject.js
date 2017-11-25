
/** 
	The superclass for all objects that go on the grid (animals, obstacles, steppables.)
	@param type [string] Generally type for animal/obstacle (house, squirrel, etc.)
	@param pictureFolder [string] relative path to the picture folder for this object.
	@param div [div] a jQuery object holding the div that is to hold this object.
	@param x the horizontal location of it on the grid to start (0-9)
	@param y the vertical location of it on the grid to start (0-9)
*/
function GridObject(type,pictureFolder,div,x,y){
	this.type = type || "";
	this.pictureFolder = pictureFolder || "";
	this.div = div || makeDiv();
	this.x = x || 0;
	this.y = y || 0;	
	this.id = this.type + "" + Math.floor(Math.random() * 1000); //helps identify what is what... it's something like chicken65
	this.div.attr('id',this.id);
}

/**
	Finds the number of pixels the top left of this animal should be vertically.
	@return [int]
*/
GridObject.prototype.xPixels = function(){
	return this.x * TILE_SIZE;
}

/**
	Finds the number of pixels the top left of this animal should be horizontally.
	@return [int]
*/
GridObject.prototype.yPixels = function(){
	return this.y * TILE_SIZE;
}	

/**
	Places the object's div on the board.
*/
GridObject.prototype.putOnBoard = function(){
	this.div.html("<img src='" + this.getPicturePath() + "' />");
	this.refreshLocation(); //sets location
	$('#board').append(this.div);
}	

/**
	Updates the location of this object's div.
*/
GridObject.prototype.refreshLocation = function(){
	this.div.animate({
			top: this.yPixels(),
			left: this.xPixels()
		}, 0
	);
}

/**
	An alternative to refreshLocation(), this animates the location change of the div.
*/
GridObject.prototype.animateMove = function(){
	//disable buttons, then re-enable after movement is done (prevents overlapping of animations)
	$('input[type="image"]').attr('disabled','disabled');
	this.div.animate({
			top: this.yPixels(),
			left: this.xPixels()
		}, ANIMATION_LENGTH, 'linear', function(){
			$('input[type="image"]').removeAttr('disabled');
		}
	);
}

/**
	Changes the location of this object.
	@param x [int] the column.
	@param y [int] the row.
*/
GridObject.prototype.setLocation = function(x,y){
	this.x = x;
	this.y = y;
}

/**
	Returns the location of this, in terms of pixels,
	@return [int[]] - [xPixels, yPixels];
*/
GridObject.prototype.getLocationPixels = function(){
	return [this.xPixels, this.yPixels];
}

/**
	Returns the full path to this thing's picture
	@return the path to the picture
*/
GridObject.prototype.getPicturePath = function(){
	return this.pictureFolder + "/" + this.type.toLowerCase() + ".png";
}