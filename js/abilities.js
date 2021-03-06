
/**
	An ability, or special power of an animal. It can be invoked or is automatic.
	@param name [string] the ability's name.
	@param description [string] a description of the ability.
	@param code [object] a singleton object that contains either:
			* the function invokeAbility(), for functions that can be invoked.
			* variables that overwrite the defaults
			* or other code.
			This object will be merged with the animal using jQuery.extend.
*/
function Ability(name,description,code){
	this.name = name;
	this.description = description;
	this.code = code;
	
	this.isInvokable = code.invokeAbility ? true : false;
	if(this.isInvokable){
		this.chanceOfUse = code.chanceOfUse != undefined ? code.chanceOfUse : CHANCE_OF_ABILITY_USE; //enemy's chance of randomly using this
	}
	
	//returns true if it's crossover, which is to say it has a c_uses field
	this.isCrossover = code.c_uses != undefined ? true : false;
}


/**
	All abilities:
	
	Friendly
	Lucky
	GoodEye
	Careless
	Stealthy
	Camouflage
	Showy
	Menacing
	Sniper
	Clutch
	Gambler
	Reflex
	Immobilize
	Ethereal
	Flight
	Swimmer
	Apprentice
	Calm
	NineLives
	Steadfast
	Protective
	Herd
	Pride
	Bamboomerang
	
	Refresh
	Medic
	Lockdown
	Flee
	Sting
	SpinAttack
	Quack
	Vampire
	EasterEgg
	Kamikaze
	Bananarama
*/
var Abilities = {
	Friendly: new Ability(
			'Friendly',
			'Defeated enemies more likely to join your team',
			{
				FRIENDLY_RECRUITMENT_MULTIPLIER: 1.2 //enemy.defeated() checks for this when seeing whether to recruit	
			}
	),
	Lucky: new Ability(
			'Lucky',
			'Increased chance of critical hit',
			{
				chanceOfCritical: CHANCE_OF_CRITICAL * 2.5
			}
		),
	GoodEye: new Ability(
			'Good Eye',
			'Never misses',
			{
				chanceOfMiss: 0
			}
		),
	Careless: new Ability(
			'Careless',
			'Misses often',
			{
				chanceOfMiss: 0.25 //added to the evasion decimal
			}
		),		
	Stealthy: new Ability(
			'Stealthy',
			'Better chance of evading attacks',
			{
				evasion: 0.20
			}
		),
	Camouflage: new Ability(
			'Camouflage',
			'Better chance of evading attacks',
			{
				//clone of Stealthy
				evasion: 0.25
			}
		),
	Showy: new Ability(
			'Showy',
			'Foes prefer to target this animal',
			{
				//given special preference in getObject, ability, attack methods
				evasion: 0
			}
		),	
	Menacing: new Ability(
			'Menacing',
			'Attacks sometimes stun foes, leaving them immobile for a turn',
			{
				//Animal.attack() checks for this
				CHANCE_OF_STUN: 0.15 //this much chance (percent) any attack that lands will stun
			}
		),				
	Clutch: new Ability(
			'Clutch',
			'Does extra damage when low on health',
			{
				attack: function(defender, multiplier){
					//multiply the multiplier so that the original multiplier's effect is preserved
					var HPThreshold = 0.34; //if HP is below this percentage, the effects will kick in; it's 34% so 1/3rd HP will work
					if(this.getHPPercent() < HPThreshold){
						//ability activated
						multiplier = multiplier != undefined ? multiplier : 1;
						multiplier *= 1.25;
						Logger.log(this.name + ' is being Clutch!','ability');
					}
					
					if(this instanceof Ally)
						Ally.prototype.attack.call(this, defender, multiplier);
					else
						Enemy.prototype.attack.call(this, defender, multiplier);
				}
			}
		),	
	Gambler: new Ability(
			'Gambler',
			'Attacks do wildly varying amounts of damage',
			{
				//Animal.attack() checks for this and uses the power specified
				GAMBLER_EXAGGERATION: 2 //powers the effect of randomness by this much
			}
		),		
	Reflex: new Ability(
			'Reflex',
			'Opponents\' attacks sometimes rebound',
			{
				//Animal.attack() checks for this
				CHANCE_OF_REFLEX: 0.15, //chance that an opponent's attack will rebound on them when they attack this animal
				
				/**
					Called by Animal.attack() when the reflex is successful. The damage will rebound onto the attacker.
					@param attacker [Animal] the animal who tried to attack this
					@param damage [int] how much damage the attacker was supposed to do
				*/
				reflex: function(attacker,damage){
					//Animal.attack() will call this
				
					Logger.log(attacker.name + ' attacked ' + this.name +', but ' + this.name + ' Reflexed the attack! ' + attacker.name + ' did <b>' + damage + '</b> damage to itself!','ability');
							
					//borrowed from Animal.attack().
					var defender = attacker;
					if(defender.loseHP(damage)){
						if(defender instanceof Ally){
							defender.die();
							this.earnWin();
						}
						else{
							//was an enemy that died
							this.defeatEnemy(defender); //only allies can get to this point (by killing an enemy)
							defender.defeated(this);
							this.earnWin();
						}
					}
				}
			}
		),	
	Immobilize: new Ability(
			'Immobilize',
			'Prevents adjacent foes from moving',
			{
				//checked for by Animal.canMove()
			}
		),		
	Ethereal: new Ability(
			'Ethereal',
			'Not hurt by physical attacks',
			{
				//Animal.attack() checks for this and does no damage 
				recruitmentChance: 0, //to prevent you from ever having a ghost on your team (would be unkillable)
				move: function(direction){} //can't move (prevents a ghost from killing your whole team if you don't have something to kill it)
			}
		),			
	Flight: new Ability(
			'Flight',
			'Can travel on top of any obstacle',
			{
				canStepOn: function(object){
					//only animals and obstacles will be passed to this function
					if(object instanceof Obstacle)
						return true;
					return false;
				}
			}
		),
	Swimmer: new Ability(
			'Swimmer',
			'Can travel on water',
			{
				canStepOn: function(object){
					//only animals and obstacles will be passed to this function
					if(object instanceof Obstacle && object.type == 'water')
						return true;
					return false;
				}
				//Animal.move() checks for the tile water when moving
			}
		),
	Apprentice: new Ability(
			'Apprentice',
			'Gains more experience than normal',
			{
				gainExperience: function(amount){
					//only occurs for allies (enemies don't have exp)
					Ally.prototype.gainExperience.call(this, amount * this.APPRENTICE_EXP_MULTIPLIER);
				},
				APPRENTICE_EXP_MULTIPLIER: 1.20 //user gains this many times more experience than usual
			}
		),
	NineLives: new Ability(
			'Nine Lives',
			'Sometimes survives fatal attacks',
			{
				CHANCE_OF_SURVIVAL: 0.20,
				die: function(){
					//small chance of surviving
					if(pushLuck(this.CHANCE_OF_SURVIVAL)){
						this.currentHP = 1; //hang on with 1HP
						Logger.log(this.name + ' hung on!','ability');
						this.updateQtip();
					}
					else{
						//the animal really did die; which method is called depends on what this animal is
						if(this instanceof Ally)
							Ally.prototype.die.call(this);
						else
							Enemy.prototype.die.call(this);
					}
				 }
			}
		),
	Steadfast: new Ability(
			'Steadfast',
			'Unaffected by damage multipliers',
			{
				//Animal.attack() checks for this
			}
		),	
	Protective: new Ability(
			'Protective',
			'Adjacent teammates\' defense increases slightly',
			{
				//Animal.getDefense() factors this in
				
				/**
				 * Returns the percent boost an animal should get for having a certain number of
				 * Protective friends around it.
				 * @param	{int}	numProtectives	how many friends are adjacent that have the Protective ability
				 * @return	{double}	the percent boost (0.03 -> 3%)
				 */
				getDefenseBoost: function(numProtectives){
					switch(numProtectives){
						case 0: return 0;
						case 1: return 0.10;
						case 2: return 0.16;
						case 3: return 0.23;
						case 4: return 0.31; //shouldn't be called, but whatever
						default: return 0; //just in case
					}
				}
			}
		),		
	Herd: new Ability(
			'Herd',
			'Does more damage when teammates are nearby',
			{
				attack: function(defender, multiplier){
					//you get a bonus for each teammate, so search in each direction
					var numTeammatesAround = getAdjacentFriends(this).length;
					
					//ensure multiplier at least
					multiplier = orDefault(multiplier, 1);
					//determine multiplier based on how many are around
					switch(numTeammatesAround){
					case 0:
						multiplier *= 1;
						break;
					case 1:
						multiplier *= 1.5;
						break;
					case 2:
						multiplier *= 2;
						break;
					case 3:
						multiplier *= 2.5;
						break;
					}
					
					if(numTeammatesAround > 0){
						//tell user that the ability was activated
						Logger.log(this.name + ' did extra damage with Herd!','ability');
					}
					
					if(this instanceof Ally)
						Ally.prototype.attack.call(this, defender, multiplier);
					else
						Enemy.prototype.attack.call(this, defender, multiplier);					
				}
			}
		),
	Pride: new Ability(
			'Pride',
			'Attack power increases when a foe is defeated',
			{				
				//Animal.getAttack() factors this in
				
				earnWin: function(){
					//show your pride is building
					//default animal's earnWin adds to foesKilled
					Logger.log(this.name + "'s pride is building!", "ability");
					Animal.prototype.earnWin.call(this);
				},
				/**
				 * Returns the percent boost the user's attack should get. Bonus is based on how many foes this animal has killed this level.
				 * @return	{double}	the percent boost (0.03 -> 3%)
				 */
				getAttackBoost: function(){
					var foesKilled = this.flags.getFlag(FLAG_FOES_KILLED);
					//it's a certain amount per kill
					return this.PRIDE_ATTACK_BOOST * foesKilled;
				},
				PRIDE_ATTACK_BOOST: 0.12 //this much boost (it's a percent) per kill
			}
		),				
	Bamboomerang: new Ability(
			'Bamboomerang',
			'Attacks strike twice',
			{
				attack: function(defender, multiplier){
					//call attack() twice; before attacking again make sure they weren't killed the first time
					if(this instanceof Ally){
						Ally.prototype.attack.call(this, defender, multiplier);
						if(defender && defender.isAlive()) Ally.prototype.attack.call(this, defender, multiplier);
					}
					else{
						Enemy.prototype.attack.call(this, defender, multiplier);
						if(defender && defender.isAlive()) Enemy.prototype.attack.call(this, defender, multiplier);
					}					
				}
			}
		),	
	Shockwave: new Ability(
			'Shockwave',
			'Attacks can sometimes hurt all enemies',
			{
				SHOCKWAVE_CHANCE: 0.1, //chance of creating shockwave
				SHOCKWAVE_DAMAGE: 0.05, //fraction of foe's health done by shockwave
				
				attack: function(foe, multiplier){
					
					var shockwave = pushLuck(this.SHOCKWAVE_CHANCE);
					
					if(shockwave){
						//set off a shockwave, hurting all enemies
						Logger.log(this.name + " set off a shockwave, hurting all foes!", "ability");
						
						var foes = getFoes(this);
						for(var i=0; i<foes.length; i++){
							var defender = foes[i];
							var damage = Math.round(defender.getMaxHP() * this.SHOCKWAVE_DAMAGE);
							
							//check if you killed them; borrowed from Animal.attack()..
							if(defender.loseHP(damage)){
								if(defender instanceof Ally){
									defender.die();
									this.earnWin();
								}
								else{
									//was an enemy that died
									this.defeatEnemy(defender); //only allies can get to this point (by killing an enemy)
									defender.defeated(this);
									this.earnWin();
								}
							}							
						}
					}
					
					if(this instanceof Ally){
						Ally.prototype.attack.call(this, foe, multiplier);
					}
					else{
						Enemy.prototype.attack.call(this, foe, multiplier);
					}
				}
			}
		),
		
	/* Crossover */
	Calm: new Ability(
			'Calm',
			'Gains 1HP after every turn (Max. 25 times per level)',
			{
				onTurnEnd: function(){
					if(this.c_uses >= this.C_MAX_USES){
						//out of uses, do nothing
					}
					else if(this.getHPPercent() < 1){
						//can use it, and we're down
						this.gainHPAmount(1,false); //don't show badge
						this.c_uses++;
					}
					
					Animal.prototype.onTurnEnd.call(this);
				},
				c_uses: 0,
				C_MAX_USES: 25
			}
		),			
	Sniper: new Ability(
			'Sniper',
			'Can attack from 2 spaces away (Max uses: 10 per level)',
			{
				tryToAttack: function(direction){
					//try 2
					var defender = getAnimal(this,direction,2);
					if(defender && defender.isFriendOf(this) == false){
						if(this.c_uses >= this.C_MAX_USES){
							//out of uses
							Logger.log(this.name + ' cannot snipe any more this level! It attacked normally.', 'ability-error');
							//attack normally
							if(this instanceof Ally){
								return Ally.prototype.tryToAttack.call(this, direction);
							}
							else{
								return Enemy.prototype.tryToAttack.call(this, direction);
							}							
						}		
						else{			
							//can use Sniper	
							Logger.log(this.name + ' sniped ' + defender.name + '!','ability');
							this.attack(defender);
							this.c_uses++;
							return true;
						}
					}
					
					//try 1
					defender = getAnimal(this,direction,1);
					if(defender && defender.isFriendOf(this) == false){	
						this.attack(defender);	
						return true;
					}

					//no one at all
					return false;
				},
				range: 2,
				c_uses: 0,
				C_MAX_USES: 10
			}
		),					

	/* Invokable */
	Refresh: new Ability(
			'Refresh',
			'Heals 25% of max health',
			{
				invokeAbility: function(){
					if(this.getHPPercent() == 1){
						//you have full heal, don't waste a turn
						if(this instanceof Ally) //would be annoying if enemy always did this
							Logger.log(this.name + ' tried to heal itself with Refresh, but it is already at full health!','ability-error');
						return false;
					}
					else{
						//you are down on health; heal
						Logger.log(this.name + ' healed itself with Refresh!','ability');
						this.gainHPPercent(randomVariation(this.REFRESH_HEAL_PERCENT));
						return true; //always end with this
					}
				},
				REFRESH_HEAL_PERCENT: 25, //heal about this many percent
				maxUses: 5, //how many times this can be used per level
				chanceOfUse: 0.4
			}
		),
	Medic: new Ability(
			'Medic',
			'Heals the currently selected ally',
			{
				invokeAbility: function(){
					var toHeal = activeAlly; //if you're an ally
					if(this instanceof Enemy){
						//enemies will heal their most hurt teammate
						var mostHurt = this; //by default
						for(var i=0; i<enemies.length; i++){
							var teammate = enemies[i];
							if(teammate.getHPPercent() < mostHurt.getHPPercent())
								mostHurt = teammate;
						}
						
						//is no one hurt?
						if(mostHurt.getHPPercent() == 1)
							return false;
						//ok so heal the most hurt
						toHeal = mostHurt;
					}
					
					if(toHeal){
						if(toHeal == this){
							//it works, but doesn't heal as much
							Logger.log(this.name + ' healed itself using Medic!','ability');
							toHeal.gainHPPercent(randomVariation(15));
						}
						else{
							Logger.log(this.name + ' healed ' + toHeal.name + ' using Medic!','ability')
							toHeal.gainHPPercent(randomVariation(20));
							
							//gain experience for healing them, not yourself
							if(this instanceof Ally)
								this.gainExperience(20);
						}
						return true; //always end with this
					}
					else{
						//no one selected
						Logger.log('Please select an animal to heal by clicking on it!','ability-error');
						//don't waste turn
						return false;
					}
				},
				maxUses: 5, //how many times this can be used per level
				chanceOfUse: 0.3
			}
		),
	Soothe: new Ability(
			'Soothe',
			'Slightly heals all teammates',
			{
				invokeAbility: function(){
					Logger.log(this.name + " healed all of its teammates with Soothe!", "ability");
					//choose each teammate and heal them
					var friends = getFriends(this);
					//calculate how many need to be healed
					var numHurt = 0;
					for(var i=0; i<friends.length; i++){
						if(friends[i].getHPPercent() < 1)
							numHurt++;
					}
					
					//translate to percent
					var percent = 0;
					switch(numHurt){
						case 1: percent = 6;  break;
						case 2: percent = 10; break;
						case 3: percent = 16; break;
						case 4: percent = 23; break;
						case 5: percent = 30; break;
					}
					
					for(var i=0; i<friends.length; i++){
						//heal them slightly
						friends[i].gainHPPercent(randomVariation(percent));
					}
					
					//gain exp
					if(this instanceof Ally)
						this.gainExperience(percent * 2); //heal more based on how many people you healed
					
					return true; //always end with this if the ability was used; return false if it failed
				},
				maxUses: 5, //how  many times this can be used per level,
				chanceOfUse: 0.2 //or omit to use default
			}
		),
	Lockdown: new Ability(
			'Lockdown',
			'Becomes immovable for 5 turns, but boosts defense',
			{
				invokeAbility: function(){
					var LOCKDOWN_TURNS = 5; //turns to go into lockdown for
					
					Logger.log(this.name + " went in Lockdown mode! It can't move for " + LOCKDOWN_TURNS + " turns!", "ability");
					this.div.addClass('lockdown');
					//turn on the lockdown flag
					this.flags.setFlag(FLAG_LOCKDOWN_TURNS_LEFT, LOCKDOWN_TURNS + 1); //1 turn wasted on this
					return true; //always end with this if the ability was used; return false if it failed
				},
				onTurnEnd: function(){
					//reduce the lockdown flag
					this.flags.increaseFlag(FLAG_LOCKDOWN_TURNS_LEFT, -1);
					if(this.flags.getFlag(FLAG_LOCKDOWN_TURNS_LEFT) == 0){
						//lockdown just ended
						Logger.log(this.name + " ended Lockdown mode! It can now move again!", "ability");
						this.div.removeClass('lockdown');
					}
					Animal.prototype.onTurnEnd.call(this);
				},
				LOCKDOWN_DEFENSE_MULTIPLIER: 0.25,
				maxUses: 5, //how many times this can be used per level,
				chanceOfUse: 0.25 //or omit to use default
			}
		),			
	Flee: new Ability(
			'Flee',
			'Teleports to a random square on the board',
			{
				invokeAbility: function(){
					//find a random location that's legal and move to it
					var newLocation = {x: 0, y: 0}; //object with x and y
					do{
						newLocation.x = Math.floor(Math.random() * NUM_TILES_SIDE);
						newLocation.y = Math.floor(Math.random() * NUM_TILES_SIDE);
					} while(this.canMoveTo(newLocation.x, newLocation.y) == false
						|| getPointDistance(this.x, this.y, newLocation.x, newLocation.y) <= 2);
					//legality means there's no obstacle there and it's a decent distance away
					
					//finally cleared to move
					this.moveTo(newLocation.x, newLocation.y);
					Logger.log(this.name + ' flew the coop with Flee!', 'ability');
					
					return true; //always end with this
				},
				maxUses: 10 //how many times this can be used per level
			}
		),
	Sting: new Ability(
			'Sting',
			'Attacks lightly, the teleports away',
			{
				invokeAbility: function(){
					//attack the closest enemy
					if(isAdjacentFoe(this) == false){
						//no one one space away, don't do anything
						if(this instanceof Ally) //would be annoying if enemy always did this
							Logger.log(this.name + " needs to be next to an enemy to use Sting!",'ability-error');
							
						return false;
					}
					
					//someone's adjacent, attack them
					var closestEnemy = getClosestFoe(this);
					Logger.log(this.name + ' stung ' + closestEnemy.name + '!', 'ability');
					this.attack(closestEnemy, this.STING_MULTIPLIER);
					
					//move somewhere random
					
					//wait! if someone's trapping you, you can't move
					var enemies = getAdjacentEnemies(this);
					if(enemies.length > 0){
						for(var i=0; i<enemies.length; i++){
							if(enemies[i].ability == Abilities.Immobilize){
								//you can't move; only show if you're an ally (would get annoying otherwise)
								if(this instanceof Ally)
									Logger.log(this.name + ' was Immobilized by ' + enemies[i].name + '! It can\'t move!', 'ability');
								return true; //still used
							}
						}
					}					
					
					//find a random location that's legal and move to it
					var newLocation = {x: 0, y: 0}; //object with x and y
					do{
						newLocation.x = Math.floor(Math.random() * NUM_TILES_SIDE);
						newLocation.y = Math.floor(Math.random() * NUM_TILES_SIDE);
					} while(this.canMoveTo(newLocation.x, newLocation.y) == false
						|| getPointDistance(this.x, this.y, newLocation.x, newLocation.y) <= 2);
					//legality means there's no obstacle there and it's a decent distance away
					
					//finally cleared to move
					this.moveTo(newLocation.x, newLocation.y);
					Logger.log(this.name + ' buzzed off!', 'ability');
					
					return true; //always end with this
				},
				STING_MULTIPLIER: 0.5, //attacks with sting do this many times as many damage as usual
				maxUses: 5, //how many times this can be used per level,
				chanceOfUse: 0.5 //or omit to use default
			}
		),	
	SpinAttack: new Ability(
			'Spin Attack',
			'Attacks in all 4 directions at once',
			{
				invokeAbility: function(){
					if(isAdjacentFoe(this) == false){
						//no one nearby
						if(this instanceof Ally) //would be annoying if enemy always did this
							Logger.log(this.name + " needs to be next to an enemy to use Spin Attack!",'ability-error');
						return false;
					}	
					//there is a foe nearby
					
					Logger.log('WHEE! ' + this.name + ' used Spin Attack!','ability');
				
					//find foes nearby
					var toAttack = [];
					addTarget(getAnimal(this, UP, 1));
					addTarget(getAnimal(this, RIGHT, 1));
					addTarget(getAnimal(this, DOWN, 1));
					addTarget(getAnimal(this, LEFT, 1));
					
					/**
						Helper function. Adds an animal to the targets list if it exists and if it is a foe.
					*/
					function addTarget(animal){
						if(animal && animal.isFriendOf(this) == false){
							toAttack.push(animal);
						}
					};
					
					//by itself, the attack is slightly more powerful than normal
					var multiplier = 1.1;
					//attack gets more powerful when there are more enemies around					
					switch(toAttack.length){
					case 1:
						multiplier *= 1;
						break;
					case 2:
						multiplier *= 2;
						break;
					case 3:
						multiplier *= 3;
						break;
					case 4:
						multiplier *= 4;
						break;
					}
					
					//attack all targets
					for(var i=0; i<toAttack.length; i++){
						this.attack(toAttack[i],multiplier);
					}
	
					return true; //always end with this
				},
				maxUses: 5, //how many times this can be used per level
				chanceOfUse: 0.5
			}
		),
	Quack: new Ability(
			'Quack',
			'Damages all enemies',
			{
				invokeAbility: function(){
					Logger.log(this.name + ' used Quack!','ability');
					var foes = getFoes(this);
					for(var i=0; i<foes.length; i++){
						//instead of attacking, just do flat damage (percent wise)
						var defender = foes[i];
						//var damage = 1;
						var damage = randomVariation(defender.getMaxHP() * this.QUACK_PERCENT_DAMAGE); //a certain percent of their HP
						if(damage == 0) damage = 1; //minimum
						
						//log it
						var logClass = this instanceof Ally ? 'attack-ally' : 'attack-enemy';
						Logger.log('Quack! ' + defender.name + ' lost <b>' + damage + '</b> HP!',logClass);
						
						//get exp for attacking
						if(this instanceof Ally){
							this.gainExperience(EXPERIENCE_FOR_ATTACK / 2);
						}
						
						//check if you killed them; borrowed from Animal.attack().
						if(defender.loseHP(damage)){
							if(defender instanceof Ally){
								defender.die();
								this.earnWin();
							}
							else{
								//was an enemy that died; this is an ally
								this.defeatEnemy(defender); //only allies can get to this point (by killing an enemy)
								defender.defeated(this);
								this.earnWin();
							}
							i--; //otherwise we'd skip the next one
						}
					}
					return true; //always end with this
				},
				QUACK_PERCENT_DAMAGE: 0.05, //does this much of the defender's health in damage
				maxUses: 5, //how many times this can be used per level
				chanceOfUse: 1
			}
		),	
	Vampire: new Ability(
			'Vampire',
			'Drains health from an adjacent enemy',
			{
				invokeAbility: function(){
					//instead of attacking, drain a certain percent of the enemy's HP
					var defender = getClosestFoe(this);
					if(!defender){}
					else if(defender && getDistance(this, defender) > 1){
						//there IS someone there, just too far... don't do anything
						if(this instanceof Ally) //would be annoying if enemy always did this
							Logger.log(this.name + ' needs to be 1 space away from a foe to drain its HP!', 'ability-error');
						//don't waste their turn
						return false;
					}
					else if(defender){
						//someone's just 1 space away
						var damage = randomVariation(defender.getMaxHP() * 0.25); //a certain percent of their HP
						var amountToHeal = damage; //healing is done at end of function
						/*var amountToHeal = Math.round(damage * 0.3);
						if(amountToHeal <= 0) amountToHeal = 1;*/
						Logger.log(this.name + ' stole <strong>' + damage + '</strong> health from ' + defender. name + '!','ability');
						
						//gain a little experience for using it
						if(this instanceof Ally){
							this.gainExperience(EXPERIENCE_FOR_ATTACK);
						}
											
						//check if you killed them; borrowed from Animal.attack()..
						if(defender.loseHP(damage)){
							if(defender instanceof Ally){
								defender.die();
								this.earnWin();
							}
							else{
								//was an enemy that died
								this.defeatEnemy(defender); //only allies can get to this point (by killing an enemy)
								defender.defeated(this);
								this.earnWin();
							}
						}
						this.gainHPAmount(amountToHeal);
						
						return true; //always end with this
					}
				},
				maxUses: 50, //how many times this can be used per level,
				chanceOfUse: 1
			}
		),			
	EasterEgg: new Ability(
			'Easter Egg',
			'Does a random amount of damage to a random enemy',
			{
				invokeAbility: function(){
					//find a random enemy to attack
					var foes = getFoes(this);
					var numEnemies = foes.length;
					var randomEnemyIndex = Math.floor(Math.random() * numEnemies);
					var defender = foes[randomEnemyIndex];
					
					//wait! if any foe is Showy, target them instead
					for(var i=0; i<foes.length; i++){
						if(foes[i].ability == Abilities.Showy)
							defender = foes[i];
					}
					
					//do a random amount of percent damage (to an extent); yes, even on top of random variation
					//fewer foes -> less damage to each since there's a greater chance they'll be targeted
					var numFoes = getFoes(this).length;
					var MAX_DAMAGE_PERCENT = 5 + 4 * numFoes; //the attack can do this much damage percent max
					var damage = randomVariation(Math.random() * (MAX_DAMAGE_PERCENT / 100) * defender.getMaxHP());
					
					Logger.log(this.name + ' unleashed an Easter Egg on ' + defender.name + '! It did <b>' + damage + '</b> damage!','ability');			
					
					//defender.div.effect('pulsate','fast');
										
					//check if you killed them; borrowed from Animal.attack().
					if(defender.loseHP(damage)){
						if(defender instanceof Ally){
							defender.die();
							this.earnWin();
						}
						else{
							//was an enemy that died
							this.defeatEnemy(defender); //only allies can get to this point (by killing an enemy)
							defender.defeated(this);
							this.earnWin();
						}
					}
					
					return true; //always end with this
				},
				
				maxUses: 7, //how many times this can be used per level
				chanceOfUse: 1 //always use this if possible
			}
		),			
	Kamikaze: new Ability(
			'Kamikaze',
			'Does loads of damage to an adjacent enemy, but kills the user',
			{
				invokeAbility: function(){
					//attack closest enemy
					var target = getClosestFoe(this);
					if(target && getDistance(this,target) == 1){
						Logger.log('<b>BANZAI!!</b> ' + this.name + ' used Kamikaze!','ability');
						this.attack(target,4); //the number is a damage multiplier
						this.die();
					}
					else if(target){
						if(this instanceof Ally) //would be annoying if enemy always did this
							Logger.log(this.name + ' needs to be next to a foe use Kamikaze!','ability-error');
						return false;
					}
					
					return true; //always end with this
				},
				maxUses: 1 //how many times this can be used per level
			}
		),		
	Bananarama: new Ability(
			'Bananarama',
			'Does lots of damage to an adjacent enemy, but hurts the user',
			{
				invokeAbility: function(){
					//attack closest enemy
					var target = getClosestFoe(this);
					if(target && getDistance(this,target) == 1){					
						Logger.log(this.name + ' went bananas with Bananarama!','ability');		
						//track how much damage you did
						var previousHP = target.currentHP;					
						this.attack(target,1.5); //the number is a damage multiplier
						var nowHP = target.currentHP;
						var enemyLost = previousHP - nowHP;
						
						//lose a certain percent of how much damage you did, assuming you hit
						if(enemyLost > 0){	
							var HPlost = randomVariation(enemyLost * this.BANANARAMA_RECOIL);
							Logger.log(this.name + ' was hit by recoil! ' + this.name + ' lost <b>' + HPlost + '</b> HP.','ability');
							if(this.loseHP(HPlost))
								this.die(); //it must be an ally that uses this ability
						}
					}
					else{
						//too far away
						if(this instanceof Ally) //would be annoying if enemy always did this
							Logger.log(this.name + ' is too far away to use Bananarama!','ability-error');
						return false;
					}
					
					return true; //always end with this
				},
				BANANARAMA_RECOIL: 0.33, //this many times the damage done. 0.5 -> 50%
				maxUses: 10, //how many times this can be used per level
				chanceOfUse: 1 //always use this if possible
			}
		),				
		
	Ability: new Ability(
			'Placeholder',
			'Don\'t mind me',
			{
				//This is a placeholder so that the stat_db doesn't throw an error (it uses this as its default ability.)
			}
		),		
		
	Template: new Ability(
			'Name',
			'Description',
			{
				//code
			}
		),		
	TInvokable: new Ability(
			'Name',
			'Description',
			{
				invokeAbility: function(){
					//code
					return true; //always end with this if the ability was used; return false if it failed
				},
				maxUses: 0, //how many times this can be used per level,
				chanceOfUse: 0.1 //or omit to use default
			}
		),		
}