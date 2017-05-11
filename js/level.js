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
	this.tiles = [];
	
	//this may be set later, if there's a new ally but they refuse to take it in
	this.skipNewAlly = false;
}

/**
	Returns the name of this level, like '1-1'.
	@return [string] the name, essentially the act number and the stage number combined.
*/
Level.prototype.getName = function(){
	return this.actNum + "-" + this.stageNum;
}

Level.prototype.numRows = function(){
    return this.tiles.length;
}

Level.prototype.numCols = function(){
    return this.tiles[0].length;
}

Level.prototype.getTile = function(coords){
    return this.tiles[coords.y][coords.x];
}

/**
 * Returns all tiles in this level, in a 1D array. 
 */
Level.prototype.getAllTiles = function(){
    return this.tiles.flatten();
}

/**
 * Returns a list of all tiles in this level that are within the given radius of the viewer.
 * Things that the viewer can't step on are viewed as walls.
 * A* pathfinding with prices is used.
 * @param {boolean} ignorePrices    [optional] true if you want to just get ALL tiles within the radius, ignoring any walls that may exist. Use this if you don't care about walls. Pass false (or omit) if you care about walls (you can't choose walls).
 */
Level.prototype.getTilesInRadius = function(viewer, radius, ignorePrices){
    if(ignorePrices){
        var okTiles = [];
        //ask each of our tiles if it's in radius. that's it.
       this.getAllTiles().forEach(function(tile){
           var distance = tile.distanceTo(viewer.tile);
           if(distance != 0 && distance <= radius) //can't choose viewer's tile
               okTiles.push(tile);    
       });
       return okTiles;
    }
    
    //otherwise, use pricesy
    var priceMatrix = this.reduceTilesToPrices(viewer);
    //a* pathfind
    var coords = viewer.getCoords();
    var graph = new Graph(priceMatrix);
    var start = graph.nodes[coords.y][coords.x];
    var okTiles = [];
    //to optimize, start out by only finding tiles within the manhattan radius
    for(var r=0; r<this.numRows(); r++){
        for(var c=0; c<this.numCols(); c++){
            //see if this tile is within the range of the viewer
            //if something's within manhattan distance, it might be within a* distance
            //if it's NOT in manhattan, it will definitely not be within a* distance
            var distance = astar.manhattan(coords, new Coords(c,r)); //c -> x, r -> y
            if(distance != 0 && distance <= radius){ //can choose the tile the viewer's on
                //it's in range
                //optimize: if what's here is a wall, skip
                if(priceMatrix[r][c] == GraphNodeType.WALL) continue;
                //pathfind to it to determine the distance that has to be covered
                //ONLY works if all passable tiles are 1
                var path = astar.search(graph.nodes, start, graph.nodes[r][c], false); // no diagonals
                var spaces = path.length;
                if(spaces != 0 && spaces <= radius){ //spaces == 0 -> no path
                    okTiles.push(this.tiles[r][c]);
                    //cache the path to the tile
                    this.tiles[r][c].setPathTo(path);
                }
            }
        }
    }
    
    return okTiles;
}

/**
 * Based on the viewer's price values for a tile, creates and returns an int matrix containing the prices of each tile, from the viewer's point of view.
 * @param {Animal} viewer   an animal to determine the price of each tile
 * @return {int[][]}    an int matrix of the same size as the tile grid, except each tile has been replaced with the appropriate cost.
 */
Level.prototype.reduceTilesToPrices = function(viewer){
    var priceMatrix = [];
    for(var r=0; r<this.numRows(); r++){
        var array = [];
        for(var c=0; c<this.numCols(); c++){
            var tile = this.tiles[r][c];
            var price = viewer.reduceTileToPrice(tile);
            array.push(price);
        }
        priceMatrix.push(array);
    }
    
    /*
    //debug
    var str = "";
    for(var i=0; i<priceMatrix.length; i++){
        str += priceMatrix[i] + "\n";
    }
    alert(str);
    */
   
    return priceMatrix;
} 

/**
 * Highlights each of the given tiles. The user is asked to click on one. When they click, the callback is called.
 * @param {Tile[]} tiles    a list of tiles the user may choose.
 * @param {String} cssClass the class to use to style each of the highlighted tiles.
 * @param {function} callback   will be called when a tile is clicked. The tile that is clicked will be passed as the parameter.
 */
Level.prototype.requestTile = function(tiles, cssClass, callback){
    //the second callback we'll use in tile.setHighlight will remove all highlights
    var cleanupCallback = function(clickedTile){
        currentLevel.unhighlightAll(tiles);
    };
    
    tiles.forEach(function(tile){
        tile.setHighlight(cssClass, callback, cleanupCallback);
    });
}

/**
 * Removes highlighting from all tiles. If you know which ones are highlighted, pass those.
 * If you don't pass any tiles, we'll check each tile in the level.
 * @param {Tile[]} tilesHighlighted [optional] the tiles you want to un-highlight. Pass this if a) you know exactly which tiles are highlighted (it's more efficient - don't have to check all), or b) you only want to unhighlight a select subset of tiles.
 */
Level.prototype.unhighlightAll = function(tilesHighlighted){
    //they specified
    if(tilesHighlighted){
        tilesHighlighted.forEach(function(tile){
            tile.unhighlight();    
        });    
    }
    
    //just dehighlight them all
    this.tiles.flatten().forEach(function(tile){
        tile.unhighlight();  
    });
}

/**
	Interprets and beings the level. This:
		* changes background tiles
		* removes all old objects from allObjecs
		* adds all the new objecs to allObjects
		* removes all old objects from the board
		* adds all the new objects to the board
	@param	{boolean}	shouldSave	true if state should be saved (for adventure), false otherwise (for minigames)
*/
Level.prototype.interpret = function(shouldSave){
	currentLevel = this; //global
	
	//SAVE STATE
	if(shouldSave)
		saveGame();			

	//update tiles
	var rows = this.grid.trim().split(" "); //an array of 15 strings; each string has 15 letters. Each string represents a row
	for(var i=0; i<rows.length && i<NUM_TILES_SIDE; i++){
	    this.tiles[i] = [];
		var tileAbbreviations = rows[i].split(""); //split each character
		for(var j=0; j<tileAbbreviations.length; j++){
			var background = translateTileAbbreviation(tileAbbreviations[j]);
			var tile = new Tile(new Coords(j,i), background);
			this.tiles[i][j] = tile;
		}
	}
	
	//put tiles in view
    var board = $('#background');
    for(var r=0; r<this.numRows(); r++){
        var tr = $('<tr></tr>');
        for(var c=0; c<this.numCols(); c++){
            this.tiles[r][c].addToView(tr);
        }
        board.append(tr);
    }	
	
	//update page background
	$('html').css('background','url(images/tiles/translucent/' + this.background + '.png)');
	
	//add new ally if it's legal
	var newAllyJoined = false;
	var newAllyButFull = false;
	if(this.newAlly && this.skipNewAlly == false){
		if(numAllies() < MAX_ALLIES && numAllies() < this.allyPositions.length){
			//it's legal to add a new ally because we have space
			//if allyPositions < MAX_ALLIES, that's a sign there's only supposed to be so many allies
			addAlly(this.newAlly);
			//make a note to show the log once it's been cleared
			newAllyJoined = true;
		}
		else{
			//we're full. Ask the user to get rid of an ally (show the dialog) later.
			newAllyButFull = true;
		}
	}
	if(this.newAlly){		
		//we'll re-set ally's location later on, make note of it
		var newAllyLocation = [this.newAlly.x, this.newAlly.y];
	}
	
	/*if(this.actNum == 1 && this.stageNum == 1){
		//first level, add the main character if necessary
		if(numAllies() == 0){
			addAlly(new Ally('Elephant',0,0,1,MAIN_CHAR_NAME));	
		}
	}*/
	
	//set ally locations and heal all
	for(var i=0; i<allies.length; i++){
		allies[i].setLocation(this.allyPositions[i][0],this.allyPositions[i][1]);
		allies[i].refreshLocation();
		allies[i].fullHeal();
	}
	
	//if new ally was added, put it where it was supposed to go
	if(this.newAlly /* newAllyJoined */){
		//if the new ally said it was at 0,0 - leave it where it is, it doesn't need to be put anywhere in particular
		//otherwise, it specified a location, so put it there
		if(newAllyLocation[0] != 0 && newAllyLocation[1] != 0)
			this.newAlly.setLocation(newAllyLocation[0], newAllyLocation[1]);
	}
	
	//add stuff
	for(var i=0; i<this.obstacles.length; i++){
		addObject(this.obstacles[i]);
	}
	for(var i=0; i<this.enemies.length; i++){
		addEnemy(this.enemies[i]);
	}	
	
	//update all objects
	for(var i=0; i<allObjects.length; i++){
		//put all objects' divs on board
		allObjects[i].putOnBoard();
		//clear flags
		allObjects[i].flags.reset();
	}
	
	//if there's a tutorial associated with this level, show it
	var name = this.getName();
	var diff = difficultyLevel.name;
	if((name == '1-1' || name == '1-2' || name == '1-3')
		/*&& (diff == "Easy" || diff == "Normal") //*/){ 
		$('#tutorial-overlay').css('background-image','url(images/tutorials/' + name + '.png)');
		$('#tutorial-overlay').show();
	}
	//start startDialogues UNLESS they're showing tutorial... in that case, start later
	else{
		startActiveLevelStartDialogues();
	}
	
	//clear log, which may have been filled with junk from init earlier
	$('#log-content').html('');
	Logger.log('Welcome to level ' + this.actNum + '-' + this.stageNum + '!','info');	
	
	if(newAllyJoined){
		if(this.newAlly.name != MAIN_CHAR_NAME) //don't show it if the main char "joined", they were "there" from start
			Logger.log(this.newAlly.name + ' joined the team!', 'recruit');
	}
	
	//update team info tab
	updateTeamInfo();
	
	//now that level has been initialized...
	//if there is a new ally but we're full (we checked earlier), now show the dialog
	if(newAllyButFull){
		addAlly(this.newAlly);
			//now we have 6, and we can't show it... ask to get rid of one, then reload
			showRemoveAllyDialog(
				function(){
				//reload the level to show it again
				//keep a flag to NOT try for the new ally again... else next time we load the level it'll ask again
				currentLevel.skipNewAlly = true;
				cleanObjectLists(); //prevents duplicates of enemies/obstacles
				currentLevel.interpret();
			});		
	}
	
	
	sendJSONData({ act: currentLevel.actNum, stage: currentLevel.stageNum }, 'tracking.json', false); //don't overwrite; keep all data, even duplicates
	
	for(var i=0; i<allObjects.length; i++){
	    allObjects[i].putInTile();
	}
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
		case RED_CARPET: return 'red-carpet';
	}
}	


/**
	Ends the level, clearing the board and clearing the object lists.
	@param loadSecretStage [boolean] true if you want to load the act's secret stage (the user stepped on the entrance.)
		Optional - don't include the arg to load the next level as usual.
*/
Level.prototype.end = function(loadSecretStage){
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
	
	//remove background tiles
	$('#background').html('');
	
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
	//FOR NOW DISABLE IT
	if(loadSecretStage){
		//go to secret level
		loadLevel(this.actNum, SECRET_STAGE);
	}
	else if(this.stageNum == SECRET_STAGE){
		//this is a secret level, you can't go ahead a stage so just jump ahead an act
		loadLevel(this.actNum + 1, 1);
	}
	else{
		//just load next level
		var newAct = this.actNum;
		var newStage = this.stageNum + 1;
		if(newStage > STAGES_PER_ACT){
			//we finished the act, go to a new one
			newStage = 1;
			newAct++;
		}
		loadLevel(newAct,newStage);
	}
}