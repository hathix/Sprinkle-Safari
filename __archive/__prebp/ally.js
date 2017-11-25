/**
	Creates an allied player.
	
	Extends Animal.
	
	@param type [string] the animal (Elephant, Penguin, Trex)
	@param x [int] the row that the animal is in
	@param y [int] the column that the animal is in
	@param level [int]
	@param name [string] {optional}	omit this if you want the user to choose a name.
*/
function Ally(type,x,y,level,name){
	name = name != undefined ? name : type;
	Animal.call(this,type,name,makeDiv(),x,y,level);
	this.experience = 0;	
	this.levelsWithTeam = 1; //so you get a bonus immediately upon joining
	this.currentHP = Ally.prototype.getMaxHP.call(this);
	
	this.div.addClass('ally');
	this.div.click(function(){
		//unfortunately we have to indirectly find out whose div was clicked
		var x = parseInt($(this).css('left')) / TILE_SIZE;
		var y = parseInt($(this).css('top')) / TILE_SIZE;
		setActiveAlly(getAnimalAt(x,y));
	});
	this.div.qtip({
		content: {
			// text filled in with updateQtip()
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
				for(var i=0; i<allies.length; i++){ allies[i].updateQtip(); }
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
			classes: 'ui-tooltip-blue ui-tooltip-hoverstats ui-tooltip-shadow ui-tooltip-rounded',
		}
	});
}

//Ally.prototype.experience = 0;

Ally.prototype = new Animal;

/**
	The animal gains experience after killing an enemy.
	@param enemy [Animal] the animal who was killed
*/
Ally.prototype.defeatEnemy = function(enemy){
	var experience = 0;
	if(enemy instanceof Boss){
		//gain flat amount of exp
		experience = EXPERIENCE_FOR_BOSS;
	}
	else{
		var levelDiff = this.level - enemy.level;
		var base = EXPERIENCE_FOR_DEFEAT;

		if(levelDiff < 0){
			experience = base + levelDiff * -50; //levelDiff is negative
		}
		else if(levelDiff == 0){
			experience = base;
		}
		else if(levelDiff > 0){
			experience = base - levelDiff * 50;
			if(experience < 0) experience = 0;
		}
	}
	experience = Math.round(experience);
	this.gainExperience(experience);
}

Ally.prototype.attack = function(defender, multiplier){
	var returnValue = Animal.prototype.attack.call(this,defender,multiplier);
	this.gainExperience(EXPERIENCE_FOR_ATTACK); //gain set amount of experience for just doing an attack
	return returnValue;
}
	
/**
	The user gains a set amount of experience.
	@param amount [int] how much experience to gain
*/
Ally.prototype.gainExperience = function(amount){
	amount = Math.round(amount);
	if(this.level < MAX_LEVEL){
		this.experience += amount;
	}
	else return;
	
	while(this.experience >= EXPERIENCE_PER_LEVEL){
		this.experience -= EXPERIENCE_PER_LEVEL;
		this.levelUp();
	}	
	
	this.updateQtip();
}
	
/**
	The user gains a level.
*/
Ally.prototype.levelUp = function(){
	//determine pre-levelup stats
	var oldAttack = this.getAttack();
	var oldDefense = this.getDefense();
	var oldHP = this.getMaxHP();
	
	if(this.level < MAX_LEVEL){
		//level up
		this.level++;
		this.levelsWithTeam++; //each level you gain as an ally gives a stat bonus
		
		//animate
		this.div.effect("highlight");
		this.div.effect("pulsate");
	}
	else{
		//no stat gain, but a free full heal
		this.fullHeal();
		this.experience = 0;
		return;
	}
	
	this.fullHeal();

	//show stat gains
	Logger.log(this.name + " grew to level <strong>" + this.level + "</strong>!"
				+ "<br />Attack +" + (this.getAttack() - oldAttack)
				+ ", Defense +" + (this.getDefense() - oldDefense)
				+ ", HP +" + (this.getMaxHP() - oldHP)
				,'levelup');
}

/**
	Returns the amount of experience needed until this animal gains a level.
	@return [int]
*/
Ally.prototype.experienceLeft = function(){
	return EXPERIENCE_PER_LEVEL - this.experience;
}
	
/**
	Calculates the value of a stat based on the raw values. This is overridden to incorporate levelsWithTeam bonus.
	@param base [int] the value at level 0
	@param raise [int] how much the base increases each level
	@param iv [float] the IV, or how much to multiply bu
	@return [int] the final stat
*/
Ally.prototype.calculateStat = function(base, raise, iv){
	//Animal.calculateStat()'s default behavior is to round the raw stat. We only want to round once so we'll use the raw stat instead of the normal calculateStat().
	return Math.round(Animal.prototype.calculateRawStat.call(this, base, raise, iv) + this.levelsWithTeam * TEAM_LEVEL_BONUS);
}

/**
	The animal died.
*/
Ally.prototype.die = function(){
	Animal.prototype.die.call(this);
	Logger.log(this.name + ' died!','die');
	
	if(activeAlly == this) deselectActiveAlly();
	removeAlly(this);
	if(this.name == MAIN_CHAR_NAME){
		//leader died, game over
		gameOver();
	}	
}

/**
	Updates the text in the Qtip. Call this after changing any stat.
*/
Ally.prototype.updateQtip = function(){
	var abilityButton = (this.ability.isInvokable && this.canUseAbility()) ? '<button onclick="getObjectById(\'' + this.id + '\').useAbility();">Use ability</button>' : '';
	
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
				'<tr><td>Experience</td><td><strong>' + this.experience + '</strong>/' + EXPERIENCE_PER_LEVEL + '</td></tr></table><br />' +
				'Ability: <strong>' + this.ability.name + '</strong> - <em>' + description + '</em>' +
				abilityButton
	});
	
	$('.ui-tooltip-content button').button();
}

/** Move/attack are not overridden because Animal already has the best functionality */