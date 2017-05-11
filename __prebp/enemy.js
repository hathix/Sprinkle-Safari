/**
	Creates an enemy of the player.
	
	Extends Animal.
	
	@param type [string] the animal (Elephant, Penguin, Trex)
	@param x [int] the row that the animal is in
	@param y [int] the column that the animal is in
	@param level [int]
	@param recruitmentChance [float] {optional} the chance of recruitment after being defeated.
	@param name [string] {optional}	omit this if you want the default name to be chosen.
*/
function Enemy(type,x,y,level,recruitmentChance,name){
	name = name || type;
	this.recruitmentChance = recruitmentChance !== undefined ? recruitmentChance : CHANCE_OF_RECRUITMENT; //use default if nothing is provided
	Animal.call(this,type,name,makeDiv(),x,y,level);
	
	//enemies' HP is special: it varies from what it normally is based on the difficulty level
	//recalculate it now because Animal() doesn't
	this.currentHP = this.getMaxHP();
	
	this.div.addClass('enemy');
	this.div.qtip({
		content: {
			text: 'hi',
			title: {
				text: this.name,
				button: true,
			},
		},
		position: {
			container: $('#background_holder'),
			viewport: true //viewport is container
		},	
		show: {
			solo: true,
		    effect: function(offset) {
				$(this).fadeIn();
			}
		},
		hide: {
			event: 'unfocus',
			inactive: 2000, //will hide after not being touched for this many ms
			//fixed: true,		
		    effect: function(offset) {
				$(this).fadeOut();
			}			
		},
		style: {
			classes: 'ui-tooltip-red ui-tooltip-hoverstats ui-tooltip-shadow ui-tooltip-rounded',
		}
	});	
	this.updateQtip();
	
	this.mergeInAbility();
}

Enemy.prototype = new Animal;

/**
	Finds this enemy's maximum HP. It's overridden from Animal because Enemies' HP varies based on the difficulty level.
	@return [int] the HP value
*/
Enemy.prototype.getMaxHP = function(){ 
	var normalHP = Animal.prototype.calculateStat.call(this, this.statDB.baseHP, this.statDB.HPRaise, this.ivs.hp);
	return Math.round(normalHP * difficultyLevel.HPMultiplier);
}

/**
	This enemy is defeated. It can die or be recruited.
*/	
Enemy.prototype.defeated = function(){
	if(pushLuck(this.recruitmentChance))
		this.recruit();
	else
		this.die();
}
	
/**
	This enemy dies.
*/
Enemy.prototype.die = function(){
	Animal.prototype.die.call(this);
	Logger.log(this.name + ' died!','defeat');
	
	//remove from enemy list
	removeEnemy(this);
}
	
/**
	recruits this enemy into an ally.
*/
Enemy.prototype.recruit = function(){
	Logger.log(this.name + " was defeated!",'defeat');
	//remove this from list so it doesn't attack someone later... it's no longer an enemy, after all.
	removeEnemy(this);
	this.requestName();
	//the form will convert this animal later
}
	
/**
	Make a move or attack, based on the AI.
	@param target [Ally] the ally that this enemy needs to move toward or attack.
*/
Enemy.prototype.takeTurn = function(target){
	var distance = getDistance(this,target);
	
	if(this.ability == Abilities.Sniper){
		//are we in line? if not just move, we won't attack anyway
		if(isInLine(this, target) == false){
			this.move(getPreferredDirection(this,target));
			return;
		}
		//we ARE in line, so snipe if we can else just move
		//since we're in line, the direction is just one
		var didItAttack = this.tryToAttack(getShortestDirection(this, target));
		if(didItAttack == false){
			//move
			this.move(getPreferredDirection(this,target));
		}
		else{} //it did the attack in there
	}
	else{
		//we're normal. Consider using ability
		if(this.ability.isInvokable && this.canUseAbility() && pushLuck(this.ability.chanceOfUse)){
			var success = this.useAbility();
			if(success)
				return; //ability successfully invoked, turn used
			//else, ability couldn't be used so keep try to go normally
		}
		
		if(distance <= this.range && isInt(getRawDistance(this,target)) /* can't attack diagonally */){
			//close enough to attack
			this.attack(target);
		}
		else{
			//not in range; just move toward ally
			this.move(getPreferredDirection(this,target));
		}
	}
}

/**
	Updates the text in the Qtip. Call this after changing any stat.
*/
Enemy.prototype.updateQtip = function(){
	var description = this.ability.description;
	if(this.ability.isInvokable){
		//replace the # with uses left
		var usesLeft = this.ability.code.maxUses - this.numAbilityUses;
		description = description.replace("#", usesLeft);
	}		
	
	//based on health, add extra class to health bar
	var healthClass = '';
	if(this.getHPPercent() <= HEALTH_RED_THRESHOLD){
		healthClass = 'ui-state-error';
	}	
	
	this.div.qtip('option',{
		'content.text': '<div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="width: 100%;height:15px;">' +
				'<span>' + this.currentHP + '/' + this.getMaxHP() /*+ ' (' + Math.round(this.getHPPercent() * 100) + '%)'*/ + '</span>' +
				'<div style="width: ' + Math.round(this.getHPPercent() * 100) + '%;" class="ui-progressbar-value ui-widget-header ui-corner-left ' + healthClass + '"></div></div> ' +
				//'HP: <strong>' + this.currentHP + '</strong>/' + this.getMaxHP() + ' (' + Math.round(this.getHPPercent() * 100) + '%)<br />'+
				'<table>' + 
				'<tr><td>Level</td><td><strong>' + this.level + '</strong></td></tr>' +
				'<tr><td>Attack</td><td><strong>' + this.getAttack() + '</strong></td></tr>' + 
				'<tr><td>Defense</td><td><strong>' + this.getDefense() + '</strong></td></tr>' +
				'</table><br />' + 
				'Ability: <strong>' + this.ability.name + '</strong> - <em>' + description + '</em>'
		/*'content.text': '<div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="width: 100%;height:15px;"><div style="width: ' + Math.round(this.getHPPercent() * 100) + '%;" class="ui-progressbar-value ui-widget-header ui-corner-left"></div></div> ' +
				'HP: <strong>' + this.currentHP + '</strong>/' + this.getMaxHP() + ' (' + Math.round(this.getHPPercent() * 100) + '%)<br />' +
				'Level: <strong>' + this.level + '</strong><br />' +
				'Attack: <strong>' + this.getAttack() + '</strong><br />' + 
				'Defense: <strong>' + this.getDefense() + '</strong><br />'*/
	});
}

/**
	After this enemy has been recruited, it needs a name; this function uses jQuery UI to get that from the user.
*/
Enemy.prototype.requestName = function(){
	//update dialog title
	//$('#enemy-name-dialog').attr('title','Rename ' + this.name);
	//update dialog text
	$('#enemy-name-text').html('You defeated ' + this.name + ', and it wants to join your team! Give it a new name.');
	//update name field to default
	$('#enemy-name').attr('value',this.name);
	
	//the dialog will update name of global var defeatedEnemy; set us to that
	defeatedEnemy = this;
	$('#enemy-name-dialog').dialog('open');
}


/**
	A boss is an exceptionally strong enemy at the end of each level.
	@param type [string] what type of animal the boss is.
	@param name [string] the boss's name.
	@param x [int] the column
	@param y [int] the row
	@param level [int] doesn't really matter, only for show.
*/
function Boss(type,name,x,y,level){
	this.rawType = type;
	Enemy.call(this,type + "_Boss",x,y,level,0,name);
	
	this.ivs = {atk: 1, def: 1, hp: 1}; //prevent any stat variation
	this.currentHP = this.getMaxHP();
	this.updateQtip();
}
Boss.prototype = new Enemy;