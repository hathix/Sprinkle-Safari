/**
	Main controller of the game.
*/	

/**
	Creates a brand-new game.
*/
function newGame(){
	clearSavedData();
	
	//determine what difficulty level they want
	//create dialog to show
	var dialog = $('#difficulty-level-dialog');
	var buttonset = $('#difficulty-level-buttonset');
	//stock with the various diff levels
	for(var i=0; i<DIFFICULTY_LEVELS.length; i++){
		var diffLevel = DIFFICULTY_LEVELS[i];
		var id = 'diff' + i;
		var button = $('<input type="radio" name="difficultyLevel" id="' + id + '" />');
		//by default, normal is checked
		if(diffLevel.name == "Normal"){
			button.attr('checked', 'checked');
		}
		buttonset.append($('<label for="' + id + '">' + diffLevel.name + '</label>'));
		button.data('index', i);
		button.click(function(){
			//set this diff level
			var index = parseInt($(this).data('index'));
			
			//warn them
			var warning;
			switch(DIFFICULTY_LEVELS[index].name){
				case "Hard":
					warning = "Are you sure you want to play on Hard mode? It will be difficult!";
					break;
				case "Insane":
					warning = "Are you sure you want to play on Insane mode? It will be much, much more difficult!";
					break;
				case "Fiendish":
					warning = "Are you sure you want to play on Fiendish mode? It will be absurdly difficult! Seriously! Turn back now while you can, kiddo!";
					break;
			}
			if(warning){
				//make them confirm
				var dialog2 = $('<div title="Difficulty level selection">' + warning + '</div>');
				dialog2.dialog({
					width: 600,
					height: 200,
					modal: true,
					buttons: {
						"Yes, I'm sure": function() {
							difficultyLevel = DIFFICULTY_LEVELS[index];
							$(this).dialog('close');
							},
						"No, just kidding": function() {
							$(this).dialog('close');
							}
					}
				});
			}
			else{
				//no warning, just do it
				difficultyLevel = DIFFICULTY_LEVELS[index];
			}
		});
		buttonset.append(button);
	}
	buttonset.buttonset();
	dialog.dialog({
		width: 500,
		height: 350,
		modal: true,
		buttons: {
			"Begin": function() { $(this).dialog('close'); }
		},
		beforeClose: function(){
			//NOW start the game
			startNewGame();			
		}
	});
}

/**
 * Called after newGame(). This actually begins and shows the first level.
 */
function startNewGame(){
	hideStartScreen();
	initializeGame();
	loadLevel(1,1);
	Logger.log('Welcome to Sprinkle Safari! All messages will be logged here.','urgent');
	
	//give alert about difficulty level
	var logText;
	switch(difficultyLevel.name){
		case "Hard":
			logText = "You're playing Hard mode? Good luck!"
			break;
		case "Insane":
			logText = "Wow, you're playing Insane mode! Good luck (you'll need it)!";
			break;
		case "Fiendish":
			logText = "You're playing Fiendish mode?!? You're brave. Or crazy. Or both.";
			break;
	}	
	if(logText)
		Logger.log(logText, 'info');
}

/**
	Continue the game from where it was last saved.
*/
function continueGame(){
	initializeGame();
	loadGame();
}

/**
	Initializes the buttons, arrows, etc.
*/
function initializeGame(){
	//initialize buttons
	$('#clear-log').click(function(){
		$('#log').html('');
	});
	$('#skip-turn').click(skipTurn);
	
	initializeEnemyNameDialog();
	initializeArrows();
	initializeKeyboardShortcuts();
}

/**
	Initializes the dialog used when an enemy is recruited but its name is needed.
*/
function initializeEnemyNameDialog(){
		$("#enemy-name-dialog").dialog({
			autoOpen: false,
			height: 300,
			width: 500,
			modal: true,
			buttons: {
				"OK": function() {
					var valid = true;
					var nameBox = $('#enemy-name');
					var nameBoxValue = nameBox.attr('value');
					nameBox.removeClass('ui-state-error');

					//make sure something's in the text box
					valid = valid && nameBoxValue != ""; 

					if (valid){
						recruitEnemy(defeatedEnemy,nameBoxValue);
						$(this).dialog('close');
					}
					else{
						//something's missing
						nameBox.addClass('ui-state-error');
					}
				},
			},
			close: function() {
				$('#enemy-name').removeClass('ui-state-error');
				if(defeatedEnemy){
					//user hit x button
					$(this).dialog('open');
				}
			}
		});		
}

/**
	Initializes all the arrow buttons.
*/
function initializeArrows(){
	$("#arrows input[type='image']").each(function(){
		var self = $(this);	
		
		self.attr('src','images/arrows/move.png');
		
		self.click(function(){
			//if no one is active, don't do anything
			if(activeAlly == null){
				return;
			}
			
			//determine which way to when clicked
			var direction;
			if(self.hasClass('Up')) direction = UP;
			if(self.hasClass('Right')) direction = RIGHT;
			if(self.hasClass('Down')) direction = DOWN;
			if(self.hasClass('Left')) direction = LEFT;			
			
			takeTurn(direction);
		});	

	});
}

/**
	Initializes the keyboard keys that do certain things, such as the arrow buttons take a turn.
*/
function initializeKeyboardShortcuts(){
	$(document).keydown(function(event){
		var keyCode = event.which;
		
		//if they used alt+number, switch to that numbered ally
		if(event.altKey && keyCode <= 53 && keyCode >= 49){	//18 = alt
			//determine which number was pressed and choose that character
			var allyNum = MAX_ALLIES + 100; //so that if nothing's found, this exits
			switch(keyCode){
				case 49: //1
					allyNum = 1;
					break;
				case 50: //2
					allyNum = 2;
					break;
				case 51: //3
					allyNum = 3;
					break;
				case 52: //4
					allyNum = 4;
					break;
				case 53: //5
					allyNum = 5;
					break;
			}
			//convert from humans' 1-based to computer's 0-based
			allyNum -= 1;
			
			//if they pressed 1-5 and that index is valid...
			if(allyNum < numAllies()){
				setActiveAlly(allies[allyNum]);
			}
		}
		else if(event.altKey){
			//just alt was pressed
			//have each ally show what number they are to make it easier for the user to select one
			for(var i=0; i<numAllies(); i++){
				allies[i].showBadge(i + 1, 'tipsy');
			}
		}
		
		if(keyCode == 34){
			//page down; go to next dialogue
			$('#dialogue_next_button').click();
		}
		if(keyCode == 27){
			//esc; close dialogue
			$('#dialogue_close_button').click();
		}
		
		//character actions
		if(activeAlly == null)
			return; //do nothing if no one is active
			
		switch(keyCode){
		case 35: //end
			skipTurn();
			break;
		case 17: //ctrl
			//use active ally's ability
			if(activeAlly.ability.isInvokable)
				activeAlly.useAbility();
			break;
		case 38: //up arrow
			takeTurn(UP);
			break;
		case 39: //right arrow
			takeTurn(RIGHT);
			break;
		case 40: //down arrow
			takeTurn(DOWN);
			break;
		case 37: //left arrow
			takeTurn(LEFT);
			break;
		}
	});
}

/* controller methods */
	
function takeTurn(direction){
	//attack if you can, else move
	if(attack(direction)){}
	else{ 
		move(direction); 
	}
	
	endTurn();
}	
	
/**
	The player moves the active ally.
	@param direction [Direction] the direction to move in
*/	
function move(direction){
	if(activeAlly){
		activeAlly.move(direction);
	}
}

/**
	The player uses the active ally to attack.
	@param direction [Direction] the direction to attack in.
	@return [boolean] true if an attack was carried out, false otherwise.
*/	
function attack(direction){
	if(activeAlly){
		if(activeAlly.tryToAttack(direction)){
			return true;
		}		
		return false;
	}
}	

/**
	The user forfeits its turn and lets the enemies go again.
*/
function skipTurn(){
	Logger.log('You skipped your turn!','info');
	endTurn();
}

/**
	The player's turn ends. This calls enemyTurn().
*/
function endTurn(){
	//hideDialogue();
	//tell the allies their turn is over
	for(var i=0; i<allies.length; i++){
		allies[i].onTurnEnd();
	}
	
	enemyTurn();
}

/**
	The enemies get their turn.
*/
function enemyTurn(){
	var selectedEnemy = getEnemyClosestToAlly();
	if(selectedEnemy){
		var closestAlly = getClosestFoe(selectedEnemy);
		
		selectedEnemy.takeTurn(closestAlly);
	}
	
	//tell the enemies their turn is over
	for(var i=0; i<enemies.length; i++){
		enemies[i].onTurnEnd();
	}
}

/**
	Converts the given enemy to an ally.
	@param enemy [Enemy] the enemy to recruit.
	@param name [string] the new name of the enemy.
*/
function recruitEnemy(enemy,name){
	//get rid of the enemy from the list and board
	//removeEnemy(enemy); already done by Enemy.recruit()
	enemy.div.remove();
	defeatedEnemy = null;

	if(allies.length >= MAX_ALLIES){
		//too many allies; can't accept another
		Logger.log(name + ' wanted to join the team, but there is no more room!','recruit');
		return;
	}
	//create a new ally with the same stats
	var ally = new Ally(enemy.type,enemy.x,enemy.y,enemy.level,name);
	//put enemy in list and on board
	addAlly(ally);
	ally.putOnBoard();
	
	Logger.log(name + " joined the team!",'recruit');
}

/**
	Loads and interprets the level whose act and stage numbers are given.
	@param actNum [int] the 1-based act number.
	@param stageNum [int] the 1-based stage number.
*/
function loadLevel(actNum,stageNum){
	var level = acts[actNum - 1].getStage(stageNum);
	if(!level || !level.grid){
		//no more levels... finished the game!
		youWin();
	}
	else{
		//go to next level
		level.interpret(true); //true means you should save
	}
}

/**
 * Call this method when there are no enemies remaining on the board; that is, when the last one has just died.
 */
function allEnemiesDefeated(){
	if(isMinigameOn == false){
		//normal game, just inform them
		Logger.log('There are no more enemies! Move hathix to the flag to finish the level!', 'info');
	}	
	else{
		//minigame, they won
		youWin();
	}
}

/**
 * Either you finished the game (adventure), or you killed all the enemies (minigame)
 */
function youWin(){
	if(isMinigameOn){
		winMinigame();
	}
	
	Logger.log('YOU WIN!', 'urgent');
	$('#minigame-win-dialog').dialog({
		width: 650,
		height: 280,
		modal: true,
		buttons: {
			"Play again!": function() { location.reload(true); }
		}
	});		
}

/**
	The main character died, or the last character died, based on the mode.
*/
function gameOver(){
	if(isMinigameOn){
		Logger.log('Your last team member died! GAME OVER!', 'urgent');
		//make this one little change...
		$('#game-over-who-died').html('Your entire team died, which means game over.');
	}
	else{
		Logger.log('Your main character died! GAME OVER!','urgent');		
	}
	
	$('#board').hide(
		'explode', {}, 2000, function(){
			$('#game-over-dialog').dialog({
				width: 650,
				height: 280,
				modal: true,
				buttons: {
					"Try again?": function() { location.reload(true); }
				}
			});
		}
	);
}
