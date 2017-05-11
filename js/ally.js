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
	this.selecting = false; //whether or not it's selecting a tile
	
	this.div.addClass('ally');
	this.div.click(function(){
	    //<TODO>: testing
       //figure out which ally this is (can't access directly) 
       /*var animal = getObjectById($(this).attr('id')); 
      
       //<TODO>: check for stunned, lockdown
      
        //if the animal is currently trying to choose a tile (had been clicked on to init selection), stop it
        if(animal.selecting){
          currentLevel.unhighlightAll(); 
          animal.selecting = false;
          return;
        }       
       
       animal.selecting = true;
       //clear current highlighting
       currentLevel.unhighlightAll();
       
       //ask for move tile
       //highlight everything around it
       var moveTiles = currentLevel.getTilesInRadius(animal, 1);       
       currentLevel.requestTile(moveTiles, "move-highlight", function(tile){
           //move to the tile's coords 
           animal.moveTo(tile.coords.x, tile.coords.y);
           animal.selecting = false;
           endTurn();
       });
       
       //ask for attack tile
       var attackTiles = currentLevel.getTilesInRadius(animal, animal.range, true);
       //if you can't move to a certain tile, you can attack there
       //so choose anything that's unique to attack tiles (not in move tiles)
       attackTiles = attackTiles.filter(function(tile){
           return moveTiles.indexOf(tile) == -1;
       });
       currentLevel.requestTile(attackTiles, "attack-highlight", function(tile){
           if(tile.getContents()){
               animal.attack(tile.getContents());
               animal.selecting = false;
               endTurn();
           }
       });	*/    
	    
		//unfortunately we have to indirectly find out whose div was clicked
		var animal = getObjectById($(this).attr('id'));
		setActiveAlly(animal);

	});
	this.div.qtip({
		content: {
			// text filled in with updateQtip()
			text: 'hi',
			title: {
				text: this.name,
				button: true
			}
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
			fixed: true,		
		    effect: function(offset) {
				$(this).fadeOut();
			}			
		},
		style: {
			classes: 'ui-tooltip-blue ui-tooltip-hoverstats ui-tooltip-shadow ui-tooltip-rounded'
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
		var levelDiff = enemy.level - this.level;
		var base = EXPERIENCE_FOR_DEFEAT;
		
		//levelDiff: +ve if foe has higher level, -ve if foe has higher level
		//example: enemy lv2, you lv3 -> -1
		switch(levelDiff){
			//foes weaker than you
			case -2: experience = base / 6; break; //25
			case -1: experience = base / 3; break; //50
			//even
			case  0: experience = base; break; //150
			//foes stronger than you
			case  1: experience = base * 4/3; break; //200
			case  2: experience = base * 2; break; //300
			
			//extreme cases
			default:
				if(levelDiff < 0) experience = 0; //you're too powerful
				else experience = base * (1 + -0.5 * levelDiff); //you're really underpowered
				break;
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
	if(isMinigameOn) return; //no hp gained in minigames
	
	amount = Math.round(amount);
	//no level cap
	/*if(this.level < MAX_LEVEL){
		this.experience += amount;
	}
	else return;*/
	
	this.experience += amount;
	
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
	
	//no level cap
	/*if(this.level < MAX_LEVEL){
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
	}*/
	//level up
	this.level++;
	this.levelsWithTeam++; //each level you gain as an ally gives a stat bonus
	
	//animate
	this.div.effect("highlight");
	this.div.effect("pulsate");	
	
	this.fullHeal();

	//show stat gains
	Logger.log(this.name + " grew to level <strong>" + this.level + "</strong>!"
				+ "<br />Attack +" + (this.getAttack() - oldAttack)
				+ "<br />Defense +" + (this.getDefense() - oldDefense)
				+ "<br />HP +" + (this.getMaxHP() - oldHP)
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
	
	//take note of this; a revive crystal can restore this ally
	
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
	
	var abilityButton = ''; 
	if(this.ability.isInvokable && this.canUseAbility()){
		var abilityButtonText = 'Use (' + (this.ability.code.maxUses - this.numAbilityUses) + ' left this level)';
		abilityButton = '<button onclick="getObjectById(\'' + this.id + '\').useAbility();">' + abilityButtonText + '</button>';
	}
	else if(this.ability.isInvokable && this.numAbilityUses == this.ability.code.maxUses){
		//used the ability as many times as possible
		abilityButton = '<button disabled="disabled">Ability used up</button>';
	}
	
	//based on health, add extra class to health bar; green if healthy, red if not
	var healthClass = 'hp-healthy';
	if(this.getHPPercent() <= HEALTH_RED_THRESHOLD){
		healthClass = 'ui-state-error';
	}
	
	//if you're at max level, show diff exp bar
	var expText = this.experience + '/' + EXPERIENCE_PER_LEVEL;
	var expBarWidth = Math.round(this.experience / EXPERIENCE_PER_LEVEL * 100);
	//no level cap
	/*if(this.level >= MAX_LEVEL){
		expText = "-max-";
		expBarWidth = 100;
	}*/
	
	//if it's shiny, add a star next to stats
	var shinyStar = '';
	if(this.isShiny())
		shinyStar = '<img src="images/interface/star.png" alt="Shiny" title="This animal is shiny!" />';
	
	this.div.qtip('option',{
				'content.text': 
				'<table style="width: 100%;">' +
					'<tr style="width: 100%;">' +
						'<td style="width: 15%;" title="Health Points">HP</td>' +
						'<td style="width: 85%;">' + '<div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="width: 100%;height:15px;">' +
				'<span>' + this.currentHP + '/' + this.getMaxHP() /*+ ' (' + Math.round(this.getHPPercent() * 100) + '%)'*/ + '</span>' +
				'<div style="width: ' + Math.round(this.getHPPercent() * 100) + '%;" class="ui-progressbar-value ui-corner-left hp-bar-content ' + healthClass + '"></div></div> ' + '</td>' +
					'</tr>' +
					
					'<tr style="width: 100%;">' +
						'<td style="width: 15%;" title="Experience">Exp</td>' +
						'<td style="width: 85%;">' + '<div class="ui-progressbar ui-widget ui-widget-content ui-corner-all" style="width: 100%;height:15px;float:right;">' +
				'<span>' + expText + '</span>' +
				'<div style="width: ' + expBarWidth + '%;" class="ui-progressbar-value ui-corner-left ui-widget-header"></div></div> ' + '</td>' +
					'</tr>' +
										
				'</table>' +
				
				'<table class="stats-table"><tr>' +
					'<td>' + shinyStar + ' Level <strong>' + this.level + '</strong></td>' +
					'<td><img src="images/interface/sword.png" alt="Attack" title="Attack" /> <strong>' + this.getAttack() + '</strong></td>' +
					'<td><img src="images/interface/shield.png" alt="Defense" title="Defense" /> <strong>' + this.getDefense() + '</strong></td>' +
				'</tr></table>' +
				
				'<br />' +
				'Ability: <strong>' + this.ability.name + '</strong> - <em>' + this.ability.description + '</em>' +
				abilityButton
	});
	
	$('.ui-tooltip-content button').button();
}

/** Move/attack are not overridden because Animal already has the best functionality */