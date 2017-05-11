var ANIMAL_LEVEL = 10;
var WINS_TO_UNLOCK = [0, 0, 0, 5, 10, 25, 100]; //CHANGE THIS WHEN ADDING MINILEVEL
var NUM_MINI_LEVELS = WINS_TO_UNLOCK.length;
var allyNames; //filled in later
var miniLevels; //also filled in later

/**
 * Begins the minigame sequence.
 * @param	{String[]}	teamNames	an array of 5 strings containing the allies' names.
 */
function startMinigame(teamNames){
	if(teamNames == undefined){
	    //choose randomly from a list
		var nameList = ['Chase', 'Jimmy', 'Roy', 'Cliff', 'Cole', 'Freddy', 'Ryan', 'John', 'Carlos', 'Vance'];
		var numTeammates = 5;
		teamNames = [];
		for(var i=0; i<numTeammates; i++){
		    var randIndex = Math.floor(Math.random() * nameList.length);
		    teamNames.push(nameList[i]);
		    nameList.splice(i,1);
		}
	}
	allyNames = teamNames;
	
	//update # minigames won in the dialog
	$('#minigames-num-won').html(getMinigamesWon());
	
	//show level choosing dialog
	$('#minigame-stages').html(''); //empty it out first
	for(var i=0; i<NUM_MINI_LEVELS; i++){
		var stageNum = i + 1;
		
		//is it unlocked?
		if(getMinigamesWon() >= WINS_TO_UNLOCK[i]){
			//create thumbnail
			var img = $('<img />');
			img.addClass('minigame-thumbnail');
			img.attr('id', stageNum);
			img.attr('src', "images/minigame/stages/" + stageNum + ".png");
			img.attr('alt', 'Stage ' + stageNum);
			img.attr('title', 'Stage ' + stageNum);
			img.click(function(){
				//hide dialog
				$('#minigame-dialog').dialog('close');
				
				isMinigameOn = true;
				
				//load this level
				hideStartScreen();
				initializeGame();
				var id = parseInt($(this).attr('id'));
				startMiniLevel(id);
				for(var i=0; i<allObjects.length; i++){
					allObjects[i].refreshLocation();
				}
			});
			//add
			$('#minigame-stages').append(img);			
		}
		else{
			//locked!
			var winsNeeded = WINS_TO_UNLOCK[i];
			
			//create locked thumbnail
			var img = $('<img />');
			img.addClass('minigame-thumbnail');
			img.attr('id', stageNum);
			img.attr('src', "images/minigame/stages/locked.png");
			img.attr('alt', 'Locked!');
			img.attr('title', 'Locked! Need to win ' + winsNeeded + ' minigames to unlock!');
			
			//TODO put in a div that has a locked image in the bg and the num wins to unlock in the fg
			
			
			//add
			$('#minigame-stages').append(img);			
		}

	}
	
	//show dialog
	$('#minigame-dialog').removeClass('hidden');
	$('#minigame-dialog').dialog({
		resizable: false,
		height: 430,
		width: 500,
		modal: true,
		buttons: {
			"Cancel": function() {
				$(this).dialog("close");
			}
		},
		onBeforeClose: function(){
			//reset to usual
			isMinigameOn = false;
		}			
	});	
}

function startMiniLevel(stageNum){
	switch(stageNum){
	case 1:
		currentLevel = buildMiniLevel(1, 'WWggWWWWWWWWWWW WggggWWWWggWWWW WgggggWWggggWWW WgggggWggggggWW WggggWWddddgggW WgggggWBBWWdgWW WWgggggdddWWdWW gggddgggggddggg WWdWWdddgggggWW WWgdWWBBWgggggW WgggddddWWggggW WWggggggWgggggW WWWggggWWgggggW WWWWggWWWWggggW WWWWWWWWWWWggWW ', 'water', [new Obstacle("tree",5,11),new Obstacle("tree",6,12),new Obstacle("tree",8,2),new Obstacle("tree",9,3),new Obstacle("tree",11,10),new Obstacle("tree",11,9),new Obstacle("tree",12,9),new Obstacle("tree",3,4),new Obstacle("tree",3,5),new Obstacle("tree",2,5),new Obstacle("house1",7,7),new Obstacle("tree",3,10),new Obstacle("tree",11,4),], [[11, 11], [12, 12], [11, 13], [13, 13], [13, 11]], [[1, 1], [3, 1], [2, 2], [1,3], [3, 3]]);
		break;
	case 2:
		currentLevel = buildMiniLevel(2, 'ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ', 'tile', [new Obstacle("wall",3,3),new Obstacle("wall",3,11),new Obstacle("wall",11,11),new Obstacle("wall",11,3),new Obstacle("wall",4,3),new Obstacle("wall",5,3),new Obstacle("wall",6,3),new Obstacle("wall",8,3),new Obstacle("wall",9,3),new Obstacle("wall",10,3),new Obstacle("wall",11,4),new Obstacle("wall",11,5),new Obstacle("wall",11,6),new Obstacle("wall",11,7),new Obstacle("wall",11,8),new Obstacle("wall",11,9),new Obstacle("wall",11,10),new Obstacle("wall",10,11),new Obstacle("wall",9,11),new Obstacle("wall",8,11),new Obstacle("wall",7,11),new Obstacle("wall",6,11),new Obstacle("wall",4,11),new Obstacle("wall",5,11),new Obstacle("wall",3,10),new Obstacle("wall",3,9),new Obstacle("wall",3,7),new Obstacle("wall",3,8),new Obstacle("wall",3,6),new Obstacle("wall",3,5),new Obstacle("wall",3,4),], [[9,5],[10,6],[10,7],[10,8],[9,9]], [[5,5],[4, 6],[4,7],[4,8],[5,9]]);
		break;
	case 3:
		currentLevel = buildMiniLevel(3, 'sssssssssssssWW ssssssssssssssW sssssssssssssss sssssssssssssss sssssssssWBWsss sssssssssWBWssW ssssWWssWWsWWWW WssWWWWWWsssWWs WWWWssWWssssWss WWsssssssssWsss ssssssssssWWsss sssssssssssWsss sssssssssssbsss ssssWssssssWsss sssWWWssssWssss', 'snow', [new Obstacle("tree",3,0),new Obstacle("tree",4,1),new Obstacle("tree",2,3),new Obstacle("tree",4,5),new Obstacle("tree",7,3),new Obstacle("tree",8,1),new Obstacle("tree",11,3),new Obstacle("tree",13,4),new Obstacle("tree",4,2),new Obstacle("tree",5,5),new Obstacle("tree",2,12),new Obstacle("tree",6,10),new Obstacle("tree",8,13),new Obstacle("tree",13,9),new Obstacle("tree",14,13),], [[7,2],[12,3],[7,12],[4,8],[14,8]],[[1,1],[3,4],[9,9],[3,13],[12,11]]);
		break;
	case 4:
		currentLevel = buildMiniLevel(4, 'vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvWvvv vvvvwwwvvvWWWBW vvvwwwwwvvWvvvW vvvWWBWwvvWvvvW WWWWWwWWWWWvvWW WWWwwwwWWWWBWWW WvvvwwwwvvWBWWW vvvvvvvvvvvvWWW vvvvvvvvvvvvvWW vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv ', 'savannah', [new Obstacle("hotel",4,5),new Obstacle("shop",6,5),new Obstacle("house3",3,8),new Obstacle("house1",7,9),new Obstacle("tree",2,11),new Obstacle("tree",6,14),new Obstacle("tree",8,11),new Obstacle("tree",1,3),new Obstacle("tree",7,1),new Obstacle("tree",12,1),new Obstacle("tree",13,14),new Obstacle("tree",8,5),new Obstacle("sign",4,12),new Obstacle("sign",4,3),], [[2,2],[12,3],[6,4],[10,0],[9,6]], [[4,8],[9,14],[12,11],[1,13],[8,9]]);
		break;
	case 5:
		currentLevel = buildMiniLevel(5, 'cccrrccccccccrc cccrrccccccccrc cccrrccccccccrc cccrrccccccccrc cccrrrrrrrrrrrr cccrrrrrrrrrrrr cccrrggggrccccc cccrrgWWgrccccc cccrrggWgrccccc cccrrggggrccccc rrrrrccccrrrrrc cccrrccccrccccc cccrrccccrccccc cccrrccccrrrrrc cccrrcccccccccc ', 'concrete', [new Obstacle("shop",2,6),new Obstacle("shop",5,14),new Obstacle("hotel",2,13),new Obstacle("hotel",7,3),new Obstacle("hotel",12,3),new Obstacle("building",2,0),new Obstacle("building",5,11),new Obstacle("building",11,6),new Obstacle("bank",2,9),new Obstacle("bank",5,3),new Obstacle("bank",5,1),new Obstacle("hydrant",2,3),new Obstacle("hydrant",0,11),new Obstacle("hydrant",11,9),new Obstacle("hydrant",8,12),new Obstacle("hydrant",11,14),new Obstacle("hydrant",12,0),new Obstacle("house2",14,1),new Obstacle("house2",12,11),new Obstacle("house3",13,14),new Obstacle("house1",10,9),new Obstacle("tree",0,9),new Obstacle("tree",5,12),new Obstacle("tree",9,3)], [[3,0],[4,0],[3,1],[4,1],[4,2]],[[11,13],[12,13],[13,13],[12,12],[13,12]]);
		break;
	case 6:
		currentLevel = buildMiniLevel(6, 'WWWWWWWWWWggggg WWWWgggggWggggg WWWWgggggbggggg WWWWgggggWggggg WWWWWWgggWggggg gggggWgggWggggg gggggbgggWggggg gggggWgggWggggg gggggWgggbggggg gggggWgggWggggg gggggWgggWWWWWW gggggWgggggWWWW gggggbgggggWWWW gggggWgggggWWWW gggggWWWWWWWWWW ', 'water', [new Obstacle("shop",5,2),new Obstacle("shop",9,12),new Obstacle("hotel",7,4),new Obstacle("hotel",7,10),new Obstacle("house2",1,7),new Obstacle("house2",3,12),new Obstacle("house3",13,7),new Obstacle("house3",11,2),new Obstacle("hydrant",0,9),new Obstacle("hydrant",14,5),new Obstacle("tree",4,7),new Obstacle("tree",10,7),new Obstacle("tree",6,11),new Obstacle("tree",8,3),new Obstacle("tree",7,7),new Obstacle("tree",1,11),new Obstacle("tree",13,3),new Obstacle("tree",0,13),new Obstacle("tree",1,14),new Obstacle("tree",13,0),new Obstacle("tree",14,1),new Obstacle("tree",0,14),new Obstacle("tree",14,0),], [[11,3],[13,6],[11,6],[13,4],[10,8]], [[3,11],[1,8],[3,8],[1,10],[4,6]]);		break;
	case 7:
	   currentLevel = buildMiniLevel(7, 'vvvvvvWvvvWWWWW vtttttvvvWWWWWW vtWtWtvvvWWWWWW vtWtWtvvvWWWWWW vttttttttWWWddW vvvvvtvvtWWdddd WvvvvtvvtWddddW vvvvvttttbbdddd WvvWvWWWWWWWBWW WWWWWWWWWWWWssW WWWWWWWWWWsssss WWWWWWWWWsssWss WWWWWWWssssssss WWWWWWsssWsssss WWWWWWsssssWsss ', 'water', [new Obstacle("box",10,13),new Obstacle("box",11,12),new Obstacle("shop",2,5),new Obstacle("house3",3,6),new Obstacle("building",2,7),new Obstacle("hotel",7,2),new Obstacle("tree",6,2),new Obstacle("tree",7,1),new Obstacle("tree",8,2),new Obstacle("tree",7,3),new Obstacle("sign",12,5),new Obstacle("house1",1,0)], [[13,11],[11,10],[12,8],[8,12],[12,6]], [[8,4],[10,7],[14,5],[12,4],[4,5]]);
	}
	
	//currentLevel.interpret(false);
}

/**
 * Called when the user wins a minigame.
 */
function winMinigame(){
	$('#you-win-why').html('You defeated all the enemies! Congrats!');		
	//save the # of wins
	increaseMinigamesWon();	
}

function buildMiniLevel(stageNum, grid, background, obstacles,enemyPositions, allyPositions){
	var animalLevel = ANIMAL_LEVEL;
	
	//get rid of old allies (from previous calls to this function)
	cleanObjectLists();
	while(allies.length > 0){
		removeAllyNoCheck(allies[0]);
	}
	
	currentLevel = new Level('Minigame', stageNum, grid, background, obstacles, enemies, allyPositions);
	currentLevel.enemies = [];
	currentLevel.interpret(false);
	
	//create random allies
	//TEMPORARY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/*var allyTypes = ['Bee','TRex','Monkey','Chicken','Pig'];
	var enemyTypes = ['Cow','Tiger','Cat','Leopard','Panda'];*/
	//var allyNames = [,,,,];
	//var allyTypes = 
	for(var i=0; i<MAX_ALLIES; i++){
		var ally = new Ally(randomAnimalType(), allyPositions[i][0], allyPositions[i][1], animalLevel, allyNames[i]);
		ally.levelsWithTeam = 0;
		addAlly(ally);
		ally.putInTile();
		ally.fullHeal();
	}
	//create random enemies
	var enemies = [];
	var numEnemies = MAX_ALLIES;
	for(var i=0; i<numEnemies; i++){
		var enemy = new Enemy(randomAnimalType(), enemyPositions[i][0], enemyPositions[i][1], animalLevel, 0);
		addEnemy(enemy);
		enemy.putInTile();
	}
	
    //update all objects
    for(var i=0; i<allObjects.length; i++){
        //put all objects' divs on board
        allObjects[i].putOnBoard();
        //clear flags
        allObjects[i].flags.reset();
    }	
	
	return currentLevel;
}

/**
 * Returns a random animal type (one of the many that SS offers.)
 * @return	{String}	an animal type, like 'Elephant'
 */
function randomAnimalType(){
	/*if(Math.random() < 0.5) return 'Bunny';
	else return 'Peacock';*/ //uncomment to test 2 animals
	//if(Math.random() < 0.5) return 'Turtle'; //uncomment this line to test a certain animal
	
	//load array
	var types = [];
	for(type in STAT_DB){
		//Elephant or so
		if(type == 'Placeholder' || type == 'Ghost' || type.indexOf('Boss') != -1) continue; 
			//no placeholders or bosses; ghosts are broken since they may be unkillable based on who's there
		types.push(type);
	}
	
	//get random from there
	return randomFromArray(types);
}
