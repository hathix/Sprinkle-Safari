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
							setDifficultyLevel(DIFFICULTY_LEVELS[index]);
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
				setDifficultyLevel(DIFFICULTY_LEVELS[index]);
			}
		});
		buttonset.append(button);
	}
	buttonset.buttonset();
	dialog.removeClass('hidden');
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
		$('#log-content').html('');
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
	$("#arrows button").each(function(){
		var self = $(this);
		
		if(self.attr('id') != 'skip-button'){
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
		}
	});
}

/**
	Initializes the keyboard keys that do certain things, such as the arrow buttons take a turn.
*/
function initializeKeyboardShortcuts(){
	$(document).keydown(function(event){
		var keyCode = event.which;
		
		//if they used alt+number, switch to that numbered ally
		if(event.ctrlKey && event.shiftKey && keyCode <= 53 && keyCode >= 49){	//18 = alt
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
			//have each ally show their HP
			for(var i=0; i<numAllies(); i++){
				var hpRaw = allies[i].getHPPercent(); //e.g. 0.2
				var hpString = Math.round(hpRaw * 100) + "%"; //e.g. 20%
				
				var style = 'green'; //class the badge should be
				if(hpRaw <= HEALTH_RED_THRESHOLD){
					//low health
					style = 'red';
				}
				
				allies[i].showBadge(hpString, style, 1500); //show for 1.5s
			}
			
			event.preventDefault();
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
		case 192: //`
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
	
/**
 * Instructs the active ally to attack if it can, or move otherwise.
 * If the active ally is stunned, this just returns and the user will have to try again
 * @param	{Direction}	direction	the direction to act in.
 */
function takeTurn(direction){
	if(!activeAlly) return;
	if(activeAlly.flags.getFlag(FLAG_STUNNED) == true){
		//can't do anything, just return and ask to try again
		Logger.log(activeAlly.name + " is stunned and cannot act this turn! Use another animal!", "info");
		return;
	}
	if(activeAlly.flags.getFlag(FLAG_LOCKDOWN_TURNS_LEFT) > 0){
		//can't do anything
		Logger.log(activeAlly.name + " is in Lockdown and cannot move for " + activeAlly.flags.getFlag(FLAG_LOCKDOWN_TURNS_LEFT) + " more turns!", "ability");
		return;
	}
	
	//attack if you can, else move
	if(activeAlly.tryToAttack(direction)){}	
	else{
		if(activeAlly.canMove(direction))
			activeAlly.move(direction);
		else
			return;
	}
	
	endTurn();
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
	
	//stall for a bit before enemy turn
	enemyTurn();
	
	//refresh team info tab
	updateTeamInfo();
}

/**
	The enemies get their turn.
*/
function enemyTurn(){
	var selectedEnemy = getEnemyClosestToAlly(); //will only choose non-stunned enemies
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

	//create a new ally with the same stats
	var ally = new Ally(enemy.type,enemy.x,enemy.y,enemy.level,name);
	ally.ivs = enemy.ivs;
	ally.fullHeal(); //ensure that they don't have too much/too little HP (ivs have been changed)
	//put enemy in list and on board
	addAlly(ally);
	ally.putOnBoard();
	
	Logger.log(name + " joined the team!",'recruit');
	updateTeamInfo();
	

	if(allies.length > MAX_ALLIES){
		//too many allies; must get rid of one
		showRemoveAllyDialog();
		return;
	}
}

/**
 * Opens a dialog requesting the user to remove one ally from their team.
 * @param	{function}	callback	[optional] a function that will be called once the user removes an ally.
 */
function showRemoveAllyDialog(callback){
	//clear each td in the ally dialog (the td has ally info)
	$('#remove-ally-dialog td').html('');
	
	//update the text in the dialog
	//the ally who's just joined and caused this is the last one in the array
	var offender = allies[numAllies()-1];
	$('#remove-ally-text').html('<strong>' + offender.name + '</strong> wants to join the team, but the team is already full, so one teammate must go! Choose the teammate who will leave the team:');
	
	//go through each ally# td in the remove ally dialog and stock it with the ally's info
	for(var i=0; i<numAllies(); i++){
		var ally = allies[i];
		//there's a name, image, text (stats), "remove" button
		var name = $('<h3>' + ally.name + '</h3>');
		var img = $('<img src="' + ally.getPicturePath() +  '" />');
		
		//borrow stats from Ally.updateQtip()
		//based on health, add extra class to health bar
		var healthClass = 'hp-healthy';
		if(ally.getHPPercent() <= HEALTH_RED_THRESHOLD){
			healthClass = 'ui-state-error';
		}
		var stats = $('<p><div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="width: 100%;height:15px;">' +
				'<span>' + ally.currentHP + '/' + ally.getMaxHP() /*+ ' (' + Math.round(ally.getHPPercent() * 100) + '%)'*/ + '</span>' +
				'<div style="width: ' + Math.round(ally.getHPPercent() * 100) + '%;" class="ui-progressbar-value ui-corner-left hp-bar-content ' + healthClass + '"></div></div> ' +
				'<table>' + 
				'<tr><td>Level <strong>' + ally.level + '</strong></td></tr>' +
				'<tr><td><img src="images/interface/sword.png" alt="Attack" title="Attack" /> <strong>' + ally.getAttack() + '</strong></td></tr>' + 
				'<tr><td><img src="images/interface/shield.png" alt="Defense" title="Defense" /> <strong>' + ally.getDefense() + '</strong></td></tr>' + 
				'<tr><td>Ability: <abbr title="' + ally.ability.description + '">' + ally.ability.name + '</abbr></td></tr></table></p>');
				
		//remove button
		var removeButton = $('<button>Goodbye</button>');
		removeButton.data('for', ally.id);
		if(i == 0){
			//main character, can't remove
			removeButton.attr('disabled','disabled');
			removeButton.html('Must stay');
		}
		if(i == numAllies() - 1){
			//last one, the one that wants to join the team
			name.append(' <em>(new)</em>');
			removeButton.html('Sorry');
			//look below to see change to td
		}
		removeButton.button();
		removeButton.click(function(){
			//remove this ally
			var ally = getObjectById($(this).data('for'));
			removeAlly(ally);
			ally.div.remove();
			Logger.log(ally.name + ' left the team...', 'info');
			
			//update the team info (team members changed)
			updateTeamInfo();
			
			//close dialog
			$('#remove-ally-dialog').dialog('close');
		});
		
		if(callback)
			removeButton.click(callback); //it'll call callback upon an enemy being removed
		
		//update that td
		var td = $('#ally' + (i));
		if(i == numAllies() - 1){
			//last one - do it again to edit td
			td.addClass('ui-state-highlight');
		}
		td.append(name);
		td.append(img);
		td.append(stats);
		td.append(removeButton);
	}
	
	//show dialog
	$('#remove-ally-dialog').removeClass('hidden');
	$('#remove-ally-dialog').dialog({
		width: 930,
		height: 535,
		modal: true,
		beforeClose: function(){
			//if there's still too many allies, keep this open
			if(numAllies() > MAX_ALLIES)
				return false;
			return true;
		}
	});	
}

/**
 * Updates the contents of the team info tab, showing the user's team.
 */
function updateTeamInfo(){
	var teamInfo = $('#team-info');
	teamInfo.html('');
	
	for(var i=0; i<allies.length; i++){
		var ally = allies[i];
		//make some html for them
		var container = makeDiv();
		container.addClass('ally-info-block');
		
		//pretty much same stuff from their qtip
		
		//image
		var image = $('<img src="' + ally.getPicturePath() + '" class="ally-info-image" />');
		image.attr('title','Click to activate')
		image.data('animal', ally.id); //register the ally it is associated with
		image.click(function(){
		   //activate the ally it's associated with
		   var id = $(this).data('animal');
		   setActiveAlly(getObjectById(id));
		});
		container.append(image);
		
		//name
		var nameDiv = $('<div class="ally-info-name">' + ally.name + '</div>');
		container.append(nameDiv);
		
		//hp bar
		//based on health, add extra class to health bar; green if healthy, red if not
		var healthClass = 'hp-healthy';
		if(ally.getHPPercent() <= HEALTH_RED_THRESHOLD){
			healthClass = 'ui-state-error';
		}		
		var hpBar = $('<div class="ally-info-hp-bar ui-progressbar ui-widget ui-widget-content ui-corner-all">' +
				'<span class="ally-info-hp-label">' + ally.currentHP + '/' + ally.getMaxHP() /*+ ' (' + Math.round(this.getHPPercent() * 100) + '%)'*/ + '</span>' +
				'<div style="width: ' + Math.round(ally.getHPPercent() * 100) + '%;" class="ui-progressbar-value ui-corner-left hp-bar-content ' + healthClass + '"></div></div>');
		container.append(hpBar);
		
		//stats
		//if it's shiny, add a star next to stats
		var shinyStar = '';
		if(ally.isShiny())
			shinyStar = '<img src="images/interface/star.png" alt="Shiny" title="This animal is shiny!" />';		
		var statsTable = $('<table class="ally-info-stats"><tr>' +
					'<td>' + shinyStar + ' Level <strong>' + ally.level + '</strong></td>' +
					'<td><img src="images/interface/sword.png" alt="Attack" title="Attack" /> <strong>' + ally.getAttack() + '</strong></td>' +
					'<td><img src="images/interface/shield.png" alt="Defense" title="Defense" /> <strong>' + ally.getDefense() + '</strong></td>' +
				'</tr></table>');
		container.append(statsTable);
		
		teamInfo.append(container);
	}
}

/**
 * Loads the given difficulty level and sets global variables accordingly. 
 */
function setDifficultyLevel(diffLevel){
	difficultyLevel = diffLevel;
	//set globals
	ENEMY_HP_MULTIPLIER = orDefault(difficultyLevel.HPMultiplier, 1);
	EXPERIENCE_PER_LEVEL = BASE_EXPERIENCE_PER_LEVEL * orDefault(difficultyLevel.expMultiplier, 1);
}

/**
	Loads and interprets the level whose act and stage numbers are given.
	@param actNum [int] the 1-based act number.
	@param stageNum [int] the 1-based stage number.
*/
function loadLevel(actNum,stageNum){
	if(actNum > NUM_ACTS){
		//finished the last act!
		youWin();	
	}
	
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
	else{
		//normal adventure win
		//save game for hall of fame
		//saveGame(); //no point saving game; no impact
		//add hall of fame
		addHallOfFameEntry(new HallOfFame(true));
	}
	
	Logger.log('YOU WIN!', 'urgent');
	$('#win-dialog').removeClass('hidden');
	$('#win-dialog').dialog({
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
		Logger.log('Your main character died! Why don\'t you start this level over?','urgent');		
	}
	
	$('#board').hide(
		'explode', {}, 2000, function(){
			$('#game-over-dialog').removeClass('hidden');
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
