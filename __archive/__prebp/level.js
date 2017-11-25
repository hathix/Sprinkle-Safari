/**
	Contains the Level class.
*/

/**
	A level.
	@param actNum [int] 1-based act number.
	@param stageNum [int] 1-base stage number.
	@param grid [string] the tiles on the grid (grass, dirt, etc.) expressed in string form. Put a space between each row.
	@param background [string] the type of tile to use as the background for the whole page (grass, dirt, etc.) Use the full name.
	@param obstacles [Obstacle/Steppable[]] all obstacles and steppables on the level
	@param enemies [Enemy[]] all enemies on the level
	@param allyPositions [int[][]] the preferred positions of allies. Like [0,3],[5,4],[8,7]...
	@param startDialogues [Dialogue[]] {optional} the dialogues that will be spoken at the start of this level.
	@param endDialogues [Dialogue[]] {optional} the dialogues that will be spoken at the end of the level.
	@param newAlly [Ally] {optional} an ally that will join your team if you don't have enough players.
*/
function Level(actNum,stageNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly){
	this.actNum = actNum;
	this.stageNum = stageNum;
	this.grid = grid;
	this.background = background;
	this.obstacles = obstacles;
	this.enemies = enemies;
	this.allyPositions = allyPositions;
	this.startDialogues = startDialogues;
	this.endDialogues = endDialogues;
	this.newAlly = newAlly;
}

/**
	Returns the name of this level, like '1-1'.
	@return [string] the name, essentially the act number and the stage number combined.
*/
Level.prototype.getName = function(){
	return this.actNum + "-" + this.stageNum;
}

/**
	Interprets the level. This:
		* changes background tiles
		* removes all old objects from allObjecs
		* adds all the new objecs to allObjects
		* removes all old objects from the board
		* adds all the new objects to the board
	@param	{boolean}	shouldSave	true if state should be saved (for adventure), false otherwise (for minigames)
*/
Level.prototype.interpret = function(shouldSave){
	//update current level
	currentLevel = this;
	
	//SAVE STATE
	if(shouldSave)
		saveGame();		

	//update board background
	var rows = this.grid.split(" "); //an array of 15 strings; each string has 15 letters. Each string represents a row.
	for(var i=0; i<rows.length; i++){
		var tileAbbreviations = rows[i].split(""); //split each character
		for(var j=0; j<tileAbbreviations.length; j++){
			var tile = translateTileAbbreviation(tileAbbreviations[j]);
			getTile(i,j).css(
				'background','url(' + TILE_FOLDER + "/" + tile + '.png) no-repeat left top'
			);
			getTile(i,j).attr('alt',tile);
		}
	}
	
	//update page background
	$('body').css('background','url(images/tiles/translucent/' + this.background + '.png)');
	
	//add ally if necessary
	if(this.newAlly && numAllies() <= MAX_ALLIES_FOR_BONUS){
			addAlly(this.newAlly);
	}
	//just for testing, add an ally if none is there
	if(allies.length == 0){
		addAlly(new Ally('Elephant',0,0,5,MAIN_CHAR_NAME));
		addAlly(new Ally('Sheep',0,0,5,'Shoe'));
		addAlly(new Ally('Owl',0,0,4,'Casey'));
		addAlly(new Ally('Bear',0,0,4,'Fish'));
	}
	
	//set ally locations and heal all
	for(var i=0; i<allies.length; i++){
		allies[i].setLocation(this.allyPositions[i][0],this.allyPositions[i][1]);
		allies[i].refreshLocation();
		allies[i].fullHeal();
		allies[i].numAbilityUses = 0;
		allies[i].c_uses = 0;
	}
	
	//add stuff
	for(var i=0; i<this.obstacles.length; i++){
		addObject(this.obstacles[i]);
	}
	for(var i=0; i<this.enemies.length; i++){
		addEnemy(this.enemies[i]);
	}	
	
	//put all objects' divs on board
	for(var i=0; i<allObjects.length; i++){
		allObjects[i].putOnBoard();
	}
	
	//clear log
	$('#log').html('');
	Logger.log('Welcome to level ' + this.actNum + '-' + this.stageNum + '!','info');
	
	//start startDialogues
	startActiveLevelStartDialogues();
}

/**
	Helper function for Level.interpret(). It takes a one-letter abbreviation for a tile (grass, dirt) and returns the full name.
	@param abbreviation [char] a one-letter abbreviation for the tile, found in the compressed string Level.grid.
	@return [string] the full name of the tile.
	
	For example, 'g' becomes 'grass'.
*/
function translateTileAbbreviation(abbreviation){
	switch(abbreviation){
		case GRASS: return 'grass';
		case PATH: return 'path';
		case ROAD: return 'road';
		case DIRT: return 'dirt';
		case CONCRETE: return 'concrete';
		case TILE: return 'tile';
		case WOOD: return 'wood';
		case BRIDGE_NS: return 'bridge-ns';
		case BRIDGE_EW: return 'bridge-ew';
		case SNOW: return 'snow';
		case SAVANNAH: return 'savannah';	
		case WATER: return 'water';
	}
}	


/**
	Ends the level, clearing the board and clearing the object lists.
*/
Level.prototype.end = function(){
	/*if(this.stageNum + 1 > STAGES_PER_ACT){
		//TEMPORARY
		Logger.log('Congrats! You beat the first act! More acts coming soon!','info');
		return;
	}*/
	//remove any objects that are left
	cleanObjectLists();
	
	//clear board (tiles), get rid of any obstacles and enemies
	$('.obstacle').remove();
	$('.steppable').remove();
	$('.enemy').remove();
	
	//restore all allies' ability uses (reset the counter)
	for(var i=0; i<allies.length; i++){
		if(allies[i].ability.isInvokable){
			allies[i].numAbilityUses = 0;
		}
		//reset any crossover uses
		if(allies[i].isCrossover){
			allies[i].c_uses = 0;
		}
	}
	
	//hide dialogue if it's still there
	hideDialogue();
	
	//load new level
	var newAct = this.actNum;
	var newStage = this.stageNum + 1;
	if(newStage > STAGES_PER_ACT){
		//we finished the act, go to a new one
		newStage = 1;
		newAct++;
	}
	loadLevel(newAct,newStage);
}