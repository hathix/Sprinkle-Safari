/**
	General class for an animal. Subclasses: Ally, Enemy.
*/

/**
	Creates an animal - either allied or foe. Much of the stats can be gotten from lookup tables.
	
	Extends GridObject. Subclasses: Ally, Enemy.
	
	@param type [string] the animal (Elephant, Penguin, Trex)
	@param name [string]
	@param div [div] the HTML div that represents this on the map.
	@param x [int] the row that the animal is in
	@param y [int] the column that the animal is in
	@param level [int]
	@param currentHP [int] {optional} - defaults to maxHP. Pass 0 if you want to specify name but not currentHP.
*/
function Animal(type,name,div,x,y,level,currentHP){
	GridObject.call(this,type,ANIMAL_FOLDER,div,x,y);

	this.name = name;
	this.level = level;
	
	//generate random individual values, which are values from ~0.9 to ~1.1 that stats are multiplied by
	this.ivs = {
		atk: calculateIV(),
		def: calculateIV(),
		hp:  calculateIV()
	};
	
	//stats	
	this.statDB = STAT_DB[this.type] || STAT_DB['Placeholder'];	
	this.currentHP = currentHP || Animal.prototype.getMaxHP.call(this);
	this.ability = this.statDB.ability;	 //each subclass's constructor will have to merge in ability later
	
	this.chanceOfMiss = CHANCE_OF_MISS;
	this.chanceOfCritical = CHANCE_OF_CRITICAL;
	this.range = 1;
	this.evasion = 0; //float; added to enemy's chanceOfMiss
	
	//ability
	this.mergeInAbility();
	this.numAbilityUses = 0;	
}

Animal.prototype = new GridObject;

/**
	Determines if this animal can step on the given object. Abilities will override this so that this animal can do something like walking on water.
	@param object [GridObject] the object that this animal is trying to step on. Normally an Obstacle or Animal.
*/
Animal.prototype.canStepOn = function(object){
	return false;
}

/**
	Called when this animal's turn ends; i.e. when it finishes moving or attacking. Abilities can override this.
*/
Animal.prototype.onTurnEnd = function(){}

/**
	Merges this animal's ability in with itself, effectively activating (but not invoking) it. Ally/Enemy's constructors need to call this.
*/
Animal.prototype.mergeInAbility = function(){
	$.extend(this,this.ability.code);
}

/**
	Finds this animal's attack.
	@return [int] the attack value
*/
Animal.prototype.getAttack = function(){
	return this.calculateStat(this.statDB.baseAtk, this.statDB.atkRaise, this.ivs.atk);
}

/**
	Finds this animal's defense.
	@return [int] the defense value
*/	
Animal.prototype.getDefense = function(){
	var rawDefense = this.calculateStat(this.statDB.baseDef, this.statDB.defRaise, this.ivs.def);
	
	//get boosts from anyone with Protective ability
	var numProtective = 0;
	try{
		var adjacentFriends = getAdjacentFriends(this);
	} catch(e){ adjacentFriends = 0; } //when loading, getAdjacentFriends is not defined
	for(var i=0; i<adjacentFriends.length; i++){
		if(adjacentFriends[i].ability == Abilities.Protective){
			numProtective++;
		}
	}
	
	if(numProtective == 0){
		//no one protective around, carry on
		return rawDefense;
	}
	
	var defenseMultiplier = 1 + Abilities.Protective.code.getDefenseBoost(numProtective);
	var finalDefense = Math.round(rawDefense * defenseMultiplier);
	return finalDefense;
}

/**
	Finds this animal's maximum HP.
	@return [int] the HP value
*/
Animal.prototype.getMaxHP = function(){ 
	return this.calculateStat(this.statDB.baseHP, this.statDB.HPRaise, this.ivs.hp);
}
	
/**
	Calculates the rounded value of a stat based on the raw values.
	@param base [int] the value at level 0
	@param raise [int] how much the base increases each level
	@param iv [int] a decimal indicating how much it should be multiplied by	
	@return [int] the final stat
*/
Animal.prototype.calculateStat = function(base, raise, iv){
	return Math.round(this.calculateRawStat(base, raise, iv));
}

/**
	Calculates the raw (unrounded) value of a stat based on the raw values.
	This takes into account the base, the raise, and the IVs (individual values.)
	@param base [int] the value at level 0
	@param raise [int] how much the base increases each level
	@param iv [int] a decimal indicating how much it should be multiplied by
	@return [float] the final stat, except it has to be rounded
*/
Animal.prototype.calculateRawStat = function(base, raise, iv){
	//absolutely raw is base + raise * level, apply variation based on our ivs
	var raw = base + raise * this.level;
	return raw * iv;
}

/**
	Finds the percentage of HP that this animal has left.
	@return [float] the percent expressed as a decimal (0.42 -> 42%)
*/	
Animal.prototype.getHPPercent = function(){
	return this.currentHP / this.getMaxHP();
}
	
/**
	Determines if the given animal is on the same side as this.
	@param other [Animal] another animal.
	@return [boolean]
*/
Animal.prototype.isFriendOf = function(other){
	if(!other) return false;
	return (this instanceof Ally && other instanceof Ally) || (this instanceof Enemy && other instanceof Enemy);
}

/**
 * Returns true if the animal is alive (HP > 0), false otherwise.
 */
Animal.prototype.isAlive = function(){
	return this.currentHP > 0;
}

/**
	Gain HP through a potion or something.
	@param amount [int] how much you gain
	@param showBadge [boolean] {optional} whether or not a badge should be shown. Defaults to true.
*/
Animal.prototype.gainHPAmount = function(amount,showBadge){
	if(showBadge === undefined) showBadge = true;
	//only heal as much as possible
	var max = this.getMaxHP();
	if(this.currentHP + amount > max)
		amount = max - this.currentHP;
	this.currentHP += amount;
	
	if(amount > 0 && showBadge){
		Logger.log(this.name + ' healed <b>' + amount + '</b> health!','heal');
	}
	else{	
		//healed 0
		showBadge = false;
	}
	
	if(showBadge){
		this.showBadge('+' + amount,'green');	
	}
	
	this.updateQtip();
}
	
/**
	Gain HP as a percent of max.
	@param percent [float] the percent, like 50
*/
Animal.prototype.gainHPPercent = function(percent){
	this.gainHPAmount(Math.round(this.getMaxHP() * (percent / 100)));
}
	
/**
	Heals the user fully.
*/
Animal.prototype.fullHeal = function(){
	this.gainHPAmount(this.getMaxHP());
}

/**
	Lose HP through being attacked. This doesn't cause the animal to die, you have to call that yourself.
	@param amount [int] how much you lose
	@param showBadge [boolean] {optional} true if you want to show the damage badge, false otherwise. Defaults to true.
	@param critical [string] {optional} provide this if you want to specify exactly what the badge will say.
	@return [boolean] true if this animal died, false otherwise
*/
Animal.prototype.loseHP = function(amount,showBadge,text){
	//show badge
	if(showBadge == true || showBadge === undefined){
		var badgeText;
		if(text) 
			badgeText = text;
		else{
			//show -damage
			badgeText = "-" + amount;
		}
		
		this.showBadge(badgeText,'red');
	}
	this.currentHP -= amount;
	//check for death
	if(this.currentHP <= 0){
		this.currentHP = 0;
		return true;
	}
	else{
		//did not die
		this.updateQtip();
		return false;
	}
}
	
/**
	The animal died.
*/
Animal.prototype.die = function(){
	this.div.qtip('hide');
	//use jQuery UI's hide
	this.div.hide(
		'explode', {}, 2000, function(){
			$(this).remove();
		}
	);
	//currentLevel.removeObjectFromGrid(this);		
	/* Ally/Enemy extend this with their own */
}

/**
	Tries to use the melee attack.
	@param direction [Direction] the direction to attack.
	@return [boolean] true if you can use the attack, false otherwise.
*/
Animal.prototype.tryToAttack = function(direction){
	var defender = getAnimal(this, direction, 1);
	if(defender && defender.isFriendOf(this) == false){
		this.attack(defender);
		return true;
	}
	return false;
}

/**
	Attacks a certain animal.
	@param defender [Animal] the animal to attack
	@param multiplier [float] {optional} what to multiply the damage done by. Default is 1.
	@return [boolean] true if defender died, false otherwise
*/
Animal.prototype.attack = function(defender,multiplier){
	if(!defender) return false;
	//can't attack animals on your side
	if(defender.isFriendOf(this)) return false;
	
	if(defender.ability == Abilities.Ethereal){
		//can't hurt them with normal attacks
		Logger.log('You can\'t hurt ' + defender.name + ' with normal attacks!','ability');
		return;
	}
	
	var damage = this.getAttack() - defender.getDefense();
	if(this.ability == Abilities.Gambler){
		//exaggerate the multiplier: multiplier < 1 does almost no damage, multiplier > 1 does lots of damage
		damage = randomVariation(damage, this.GAMBLER_EXAGGERATION);
	}
	else{
		damage = randomVariation(damage);
	}
	
	if(multiplier) 
		damage = Math.round(damage * multiplier);
	
	var missChance = this.chanceOfMiss + defender.evasion;
	if(this.ability == Abilities.GoodEye){
		missChance = 0; //can't miss
	}
	if(defender.ability == Abilities.Showy){
		missChance = 0; //defender can't evade
	}
	
	var flag = ""; //alerts as to any special effects
	
	if(damage <= 0){
		//let them at least do some damage
		damage = 1;
	}
	if(pushLuck(missChance)){
		damage = 0;
		flag = 'miss';
	}
	else if(pushLuck(this.chanceOfCritical)){
		var critMultiplier = 2;
		if(this.ability == Abilities.Menacing){
			critMultiplier = this.MENACING_CRITICAL_MULTIPLIER;
		}
		damage *= critMultiplier;
		flag = 'critical';
	}
	
	//check for reflex
	if(defender.ability == Abilities.Reflex && pushLuck(defender.CHANCE_OF_REFLEX)){
		//reflex successful, let the ability know
		defender.reflex(this, randomVariation(damage));
		return;
	}
	
	//log
	var style = this instanceof Ally ? 'attack-ally' : 'attack-enemy';
	switch(flag){
	case 'miss':
		Logger.log(this.name + " attacks " + defender.name + ", but misses.",style);
		break;
	case 'critical':
		Logger.log("<i>Critical hit!</i> " + this.name + " attacks " + defender.name + " for <strong>" + damage + "</strong> damage.",style);
		break;
	default:
		Logger.log(this.name + " attacks " + defender.name + " for <strong>" + damage + "</strong> damage.",style);
		break;
	}
	
	var direction = getShortestDirection(this,defender);
	var distance = getDistance(this,defender);	
	//pixels from original location that the animal should move as part of animation
	var top = direction.y * TILE_SIZE * distance;
	var left = direction.x * TILE_SIZE * distance;	
	
	//animate; disable attack buttons until animation's done
	$('input[type="image"]').attr('disabled','disabled');
	//stall animation for a bit until the defender's is done	
	this.div.animate({
		top: '+=0' //dummy change just so that jQuery will register an animation
		}, ANIMATION_LENGTH * defender.div.queue().length) //let the defender finish all animations
		.animate({ //forward
			top: '+=' + top,
			left: '+=' + left,
		}, ANIMATION_LENGTH)
		.animate({ //back
			top: '-=' + top,
			left: '-=' + left,
		}, ANIMATION_LENGTH, function(){
			//animation done, enable buttons
			$('input[type="image"]').removeAttr('disabled');	
		}
	);		
	
	//show damage count on defender
	var text; //normally it will just default
	/*if(flag == 'miss')
		text = "Miss";
	else */if(flag == 'critical')
		text = '<b><i>-' + damage + '</i></b>'; //must specify manually
	
	if(damage > 0){
		if(defender.loseHP(damage,true,text)){
			//defender died
			if(defender instanceof Ally){
				defender.die();
			}
			else{
				this.defeatEnemy(defender); //this is an ally-only method, but only allies can get to this point (by killing an enemy)
				defender.defeated();
			}
			return true;
		}
	}
	else{
		//miss
		defender.showBadge('Miss','red');
	}
	
	return false;
}
	
/**
	Make a move (or at least try to.)
	@param direction [Direction] the direction to move in.
*/
Animal.prototype.move = function(direction){
	var x = this.x + direction.x;
	var y = this.y + direction.y;
	if(this.canMove(direction)){
		this.moveTo(x, y);
	}
}

/**
 * Move to a given location. Make sure this is legal first.
 * @param {int}	x	the x-coordinate to move to
 * @param {int}	y	the y-coordinate to move to
 */
Animal.prototype.moveTo = function(x, y){
	this.setLocation(x,y);
	this.animateMove(); //not using refreshLocation() because that doesn't animate
	
	//you might have stepped on a steppable
	var objects = getObjectsAt(this.x,this.y);
	for(var i=0; i<objects.length; i++){
		if(objects[i] instanceof Steppable)
			objects[i].onStep(this);
	}	
}

/**
	Determines if this can move in a given direction.
	@param direction [Direction] the direction to move in
	@return [boolean] false if something is in the way, true otherwise
*/
Animal.prototype.canMove = function(direction){
	//get the user's future location
	var x = this.x + direction.x;
	var y = this.y + direction.y;
	if(isOutsideBoard(x,y)) return false;
	
	return this.canMoveTo(x,y);
}

/**
	Determines if the tile (x,y) is open for the animal to move into.
	@param x [int] the column
	@param y [int] the row
	@return [boolean] true if the tile is open, false otherwise
*/
var DUMMY_WATER = new Obstacle('water',0,0); //to check if the user can step on water
Animal.prototype.canMoveTo = function(x,y){
	//check if the tile's water and the user can't step on it (swimmer can step on tile water)
	if((getTile(y,x).attr('alt')) == 'water' 
		&& this.canStepOn(DUMMY_WATER) == false) return false;	
	//check if an object's there
	for(var i=0; i<allObjects.length; i++){
		var object = allObjects[i];
		if(object.x == x && object.y == y && object.id != this.id){
			//something's here
			if(object instanceof Steppable || this.canStepOn(object)) continue;
			return false;
		}
	}
	return true;
}

/**
	Cues the user to invoke its ability. Should only be called if this animal's ability is invokeable.
	@return	{boolean}	true if the ability was successfully used, false otherwise
*/
Animal.prototype.useAbility = function(){
	//check if the user has used its ability too many times this level
	if(this.canUseAbility()){
		//good to go; use it
		var success = this.invokeAbility();
		if(success){
			//successfully used
			this.numAbilityUses++;
			this.updateQtip();
			//opponents' turn
			if(this instanceof Ally){
				endTurn();
			}
			else{
				//this is an enemy; do nothing because it uses ability AS PART of its turn
			}
			return true;
		}
		else{
			return false;
		}
	}
	else{
		//ability has been used too many times this level
		Logger.log(this.name + " has used its ability too many times this level!","ability-error");
		return false;
	}
}

/**
 * Determines if this animal's ability has uses left.
 * @return	{boolean}	true if there are uses left, false if they're all used up
 */
Animal.prototype.canUseAbility = function(){
	return this.numAbilityUses < this.ability.code.maxUses;
}

/**
	Empty function; overridden by Ally and Enemy, who have different Qtips.
*/
Animal.prototype.updateQtip = function(){}

/**
	Shows a qTip badge containing text (usually a damage count) on this animal's div.
	@param text [string] short text to show.
	@param style [string] {optional} the CSS class to use for the badge. Acceptable values:
		plain, light, dark, red, green, blue,
		shadow, rounded, youtube, jtools, cluetip, tipped, tipsy
		Defaults to dark.
*/
Animal.prototype.showBadge = function(text,style){
	style = style || 'dark';

	var img = $('#' + this.id + '>img'); //this animal's picture
	img.qtip({
		content: {
			text: text
		},
		position: {
			my: 'center',
			at: 'center',
			target: img
		},
		show: {
			effect: function(){
				$(this).fadeIn();
			}
		},
		hide: {
			//hide after 0.5s
			inactive: 500,
			effect: function(){
				$(this).fadeOut();
				$(this).qtip('destroy');
			}
		},
		style:{
			classes: 'ui-tooltip-damage ui-tooltip-' + style,
		}
	});
	
	img.qtip('show');
}