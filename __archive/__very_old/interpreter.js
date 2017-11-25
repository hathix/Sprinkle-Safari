
/*
	Interprets the current level and changes the background as necessary. This effectively loads the level
*/
function interpretLevel(level){
	//update background table
	var picturePath = TILE_FOLDER + level.background + ".png";
	for(var i=0;i<NUM_TILES_SIDE;i++){
		for(var j=0;j<NUM_TILES_SIDE;j++){
			getTile(i,j).style.background = "#FFFFFF url('" + picturePath + "') no-repeat left top";
		}
	}
	
	//add any objects on grid
	var container = document.getElementById("stuff_on_grid");
	for(var i=0;i<level.getGridObjects().length;i++){
		var object = level.getGridObjects()[i]; //this is the gridobject we'll be manipulating
		object.putOnBoard();
	}
}