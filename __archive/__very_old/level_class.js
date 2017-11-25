
/**
	Creates a level.
	@param stage [string] the numerical value of the level, like 1-1
	@param background [string] the tile that will be used for the backgrouns
	@param stuffOnGrid [array] an array of enemies, coins, and powerups
	@param preferredAllyLocations [5x2 array] an array of 5 arrays in the form of [x,y], the coordinates of the preferred starting locations of your players.
	@param startDialogues [Dialogue[]] an array of dialogues that will be spoken at the start of this level
*/
function Level(stage,background,stuffOnGrid,preferredAllyLocations,startDialogues){
	this.stage = stage;
	this.background = background;
	this.stuffOnGrid = stuffOnGrid;
	this.preferredAllyLocations = preferredAllyLocations;
	if(!startDialogues)
		startDialogues = [];
	this.startDialogues = startDialogues;
	this.numDialogues = startDialogues.length;
	this.dialogueIndex = -1;
	
	/*
		Returns the objects on the grid.
		@return the enemies, friends, coins, etc. on the grid
	*/
	this.getGridObjects = function(){
		return stuffOnGrid;
	};
	
	/*
		Removes the given GridObject from the grid (so you can't step on it.)
		@param object the GridObject to remove
	*/
	this.removeObjectFromGrid = function(object){
		//basically, go through the list of stuff and see if it matches. if so, remove it
		for(var i=0;i<this.stuffOnGrid.length;i++){
			var testing = this.stuffOnGrid[i]; //the object we're looking at	
			if(testing.hash == object.hash){
				//it's the same object
				stuffOnGrid.splice(i,1); //remove the thing at the given index
			}
		}
		//team
		for(var i=0;i<numTeammates();i++){
			var testing = team[i]; //the object we're looking at	
			if(testing.hash == object.hash){
				//it's the same object
				stuffOnGrid.splice(i,1); //remove the thing at the given index
			}
		}		
	}
	
	this.showNextDialogue = function(){
		if(this.numDialogues != 0){
			if(this.dialogueIndex < this.numDialogues - 1){
				var dialogue = this.startDialogues[++this.dialogueIndex];
				updateDialogue(this,dialogue);
			}
			else{
				//all out of dialogues
				hideDialogue();
			}
		}
	}
}