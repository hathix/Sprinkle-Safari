/**
	Puts 2 opposing forces against each other.
	@param attacker [Animal] the animal whose turn it is
	@param defender [Animal] the animal who was attacked by the attacker
*/
function fight(attacker,defender){
	var damage = attacker.attack() - defender.defense();
	var multiplier = (Math.random() * (MAX_MULTIPLIER - MIN_MULTIPLIER) + MIN_MULTIPLIER) / MULTIPLIER;
	damage = Math.round(damage * multiplier);
	
	if(damage <= 0){
		//let them at least do some damage
		damage = 1;
	}
	
	if(pushLuck(CHANCE_OF_MISS)){
		damage = 0;
	}
	
	//text for the log
	if(damage == 0)
		Logger.log(attacker.name + " attacks " + defender.name + ", but misses.");
	else
		Logger.log(attacker.name + " attacks " + defender.name + " for <strong>" + damage + "</strong> damage.");
	
	if(damage > 0){
		if(defender.loseHP(damage)){
			//they died
			if(defender.isAlly){
				defender.die();
			}
			else{
				//you killed an enemy
				attacker.gainExperience(defender);
				//you might be able to convert it
				if(pushLuck(defender.recruitmentChance)){
					defender.recruit();
				}
				else{
					defender.die();
				}
			}
		}
	}//end if
}

/**
	Tells the opponents to take their turn.
*/
function enemyTurn(){
	if(getEnemies().length == 0){
		//next level
		//<TODO>: code for next level
		return;
	}

	var selectedEnemy = getEnemyClosestToAlly();
	var distance = distanceBetween(selectedEnemy,getClosestTeammate(selectedEnemy));
	
	//let them attack if they're close enough
	if(distance <= 1){
		selectedEnemy.enemyAttack();
	}
	else{
		selectedEnemy.enemyMove();
	}
}

/**
	Finds the enemy who is closest to one of the user's teammates.
	@return [Animal] the enemy
*/
function getEnemyClosestToAlly(){
	//load values
	var distances = [];
	var dictionary = [];
	var enemies = getEnemies();
	for(var i=0;i<enemies.length;i++){
		var enemy = enemies[i];
		var dist = distanceBetween(enemy,getClosestTeammate(enemy));
		distances.push(dist);
		var item = {
			distance: dist,
			enemy: enemy,
		}
		dictionary.push(item);
	}
	
	//find closest value
	var closest = distances.sort()[0];
	//find teammate with that value
	for(var i=0;i<enemies.length;i++){
		if(dictionary[i].distance == closest){
			return dictionary[i].enemy
		}
	}
	
	//some sort of error...
	return enemies[0];
}