/**
	Creates an animal - either allied or foe. Much of the stats can be gotten from lookup tables.
	
	@param type [string] the animal (Elephant, Penguin, Trex)
	@param isAlly [boolean] true if it's on your side, false otherwise
	@param elem [div] the HTML div that represents this on the map. Dynamically given at runtime.
	@param x [int] the row that the animal is in
	@param y [int] the column that the animal is in
	@param level [int]
	@param currentHP [int] {optional} - defaults to maxHP. Pass 0 if you want to specify name but not currentHP.
	@param name [string] {optional} - defaults to type. Pass 0 if you want to specify something later but not this.
	@param recruitmentChance [float] {optional} - defaults to CHANCE_OF_CONVERSION. Pass undefined if you want to skip.
*/
function Animal(type,isAlly,elem,x,y,level,currentHP,name,recruitmentChance){
	this.type = type;
	this.isAlly = isAlly;
	this.x = x; //the row you're in
	this.y = y; //the column you're in
	
	this.isAnimal = true; //a flag to mark it's an animal
	this.hash = type + Math.floor(Math.random() * 1000);
	
	if(name)
		this.name = name;
	else
		this.name = type;
		
	if(recruitmentChance === undefined)
		this.recruitmentChance = CHANCE_OF_RECRUITMENT;	
	else
		this.recruitmentChance = recruitmentChance;	
	
	//for our element
	this.elem = elem;
	var self = this;	
	this.elem.onmouseover = function(event){setHoverInfo(self,event)};
	this.elem.onmouseout = function(){hideHoverInfo()};
	
	if(this.isAlly){
		this.elem.className = "ally";
		this.elem.onclick = function(){selectAnimal(self);}
	}
	else{
		this.elem.className = "enemy";
	}
	
	//stats
	this.level = level;
	this.experience = 0;
	this.statDB = ANIMAL_DB[this.type]; //raw stat info
	
	//look after these 4 methods for HP initialization (we need some methods to be defined for use there)
	
	/**
		Finds this animal's attack.
		@return [int] the attack value
	*/
	this.attack = function(){ 
		return this.calculateStat(this.statDB.baseAtk,this.statDB.atkRaise);
	}
	
	/**
		Finds this animal's defense.
		@return [int] the defense value
	*/
	this.defense = function(){ 
		return this.calculateStat(this.statDB.baseDef,this.statDB.defRaise);
	}
	
	/**
		Finds this animal's maximum HP.
		@return [int] the HP value
	*/
	this.maxHP = function(){ 
		return this.calculateStat(this.statDB.baseHP,this.statDB.HPRaise);
	}
	
	/**
		Calculates the value of a stat based on the raw values.
		@param base [int] the value at level 0
		@param raise [int] how much the base increases each level
		@return the final stat
	*/
	this.calculateStat = function(base,raise){
		return base + raise * this.level;
	}
	
	//finish constructor with HP initialization
	if(currentHP)
		this.currentHP = currentHP;
	else
		this.currentHP = this.maxHP(); //let it default to max	
	
	//RUNTIME METHODS
	
	/**
		Finds the percentage of HP that this animal has left.
		@return [float] the percent expressed as a decimal (42% = 0.42)
	*/
	this.HPPercent = function(){
		return this.currentHP / this.maxHP();
	}
	
	/**
		Returns the amount of experience needed until this animal gains a level.
		@return [int]
	*/
	this.experienceLeft = function(){
		return EXPERIENCE_PER_LEVEL - this.experience;
	}
	
	/**
		Determines if the given animal is on the same side as this.
		@param other [Animal] another animal.
		@return [boolean]
	*/
	this.isFriendOf = function(other){
		return other.isAlly == this.isAlly;
	}
	
	/**
		Gain HP through a potion or something.
		@param amount [int] how much you gain
	*/
	this.gainHP = function(amount){
		this.currentHP += amount;
		//check for overflow
		var max = this.maxHP();
		if(this.currentHP > max){
			this.currentHP = max;
		}
	}
	
	/**
		Gain HP as a percent of max.
		@param percent [float] the percent encoded as a decimal (0.5 for 50%)
	*/
	this.gainHPPercent = function(percent){
		this.gainHP(Math.round(this.maxHP() * percent));
	}
	
	/**
		Lose HP through being attacked. This doesn't cause the animal to die, you have to call that yourself.
		@param amount [int] how much you lose
		@return [boolean] true if this animal died, false otherwise
	*/
	this.loseHP = function(amount){
		this.currentHP -= amount;
		//check for death
		if(this.currentHP <= 0){
			this.currentHP = 0;
			return true;
		}
		else{
			//did not die
			return false;
		}
	}
	
	/**
		Heals the user fully.
	*/
	this.fullHeal = function(){
		this.gainHP(this.maxHP());
	}
	
	/**
		Causes the user to die.
		//@param whatToSay the message given to the user upon their death, i.e. "You ran out of time!"
	*/
	this.die = function(){
		this.elem.style.display = "none";
		currentLevel.removeObjectFromGrid(this);
		Logger.log(this.name + " died!");		
		
		if(this.isAlly){
			deselectAnimal(this);
			removeTeammate(this);
			if(this.name == MAIN_CHAR_NAME){
				//leader died, game over
				Logger.log("<strong>GAME OVER!</strong>");
			}
		}
		else{
			tryToEndLevel();
		}
	}
	
	/**
		Converts this animal (must be an enemy) into an ally.
	*/
	this.recruit = function(){
		if(isAlly) return;
		this.name = getInput(this.name + " wants to join your team! Give it a new name?",this.name);
		Logger.log(this.name + " joined the team!");		
		addTeammate(this);
		//this.levelUp(); //bonus for recruiting
		this.gainExperienceNum(RECRUITMENT_BONUS);
		this.fullHeal();
		
		this.elem.className = "ally";
		this.elem.style.cursor = "pointer";
		this.elem.onclick = function(){selectAnimal(self);}	
		
		selectAnimal(this);
		
		tryToEndLevel();
	}
	
	/**
		The animal gains experience after killing an enemy.
		@param enemy [Animal] the animal who was killed
	*/
	this.gainExperience = function(enemy){
		var levelDiff = this.level - enemy.level;
		var experience = 0;
		
		if(levelDiff > 0){
			experience = 120 / levelDiff;
		}
		else if(levelDiff == 0){
			experience = 100;
		}
		else if(levelDiff < 0){
			experience = -120 * levelDiff;
		}

		experience = Math.round(experience);
		this.gainExperienceNum(experience);
	}
	
	/**
		The user gains a set amount of experience.
		@param amount [int] how much experience to gain;
	*/
	this.gainExperienceNum = function(amount){
		this.experience += amount;
		
		while(this.experience >= EXPERIENCE_PER_LEVEL){
			this.experience -= EXPERIENCE_PER_LEVEL;
			this.levelUp();
		}	
	}
	
	/**
		The user gains a level.
	*/
	this.levelUp = function(){
		if(this.level < MAX_LEVEL)
			this.level++;
		this.fullHeal();
		
		Logger.log(this.name + " grew to level <strong>" + this.level + "</strong>!"
					+ "<br />Attack +" + this.statDB.atkRaise + ", Defense +" + this.statDB.defRaise + ", HP +" + this.statDB.HPRaise);
	}
	
	/**
		Moves this animal to the specified grid location.
		@param x [int]
		@param y [int]
	*/
	this.setLocation = function(x,y){
		this.x = x;
		this.y = y;
	}	
	
	/**
		Tries to use the melee attack.
		@param direction [int[]] how to move. See MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT.
	*/
	this.tryToAttack = function(direction){
		if(!direction) return;
		//proposed attack locations
		var x = this.x + direction[0];
		var y = this.y + direction[1];
		
		var attackThis = getAnimalAt(x,y);
		if(attackThis && attackThis.isFriendOf(this) == false){
			//we can attack it
			fight(this,attackThis);
		}
	}
	
	/**
		Make a move.
		@param direction the array of how to move: [xchange,ychange]
	*/
	this.move = function(direction){
		if(canMove(this,direction)){
			//see move.js for the function canMove
			//set the new locations
			this.x += direction[0]; //see constants.js
			this.y += direction[1];
			this.refreshLocation();
			
			//check if you're on anything
			for(var i=0;i<currentLevel.stuffOnGrid.length;i++){
				//loop through all the stuff on the map
				var object = currentLevel.stuffOnGrid[i]; //what we're checking now
				if(object.x == this.x && object.y == this.y && object.hash != this.hash){
					//you stepped on it
					object.stepOn(this); //all grid objects have this method; let it know who is stepping
				}
			}
		}
	}
	
	/**
		Make a move. Only use if you're an enemy.
	*/
	this.enemyMove = function(){
		//enemy moves toward nearest player
		var moveToward = getClosestTeammate(this);
		this.move(getDirectionTo(this,moveToward));
	}
	
	/**
		Tries to attack the closest teammate (user-controlled.) Only use if you're an enemy.
	*/
	this.enemyAttack = function(){
		var attackThis = getClosestTeammate(this);
		this.tryToAttack(getDirectionTo(this,attackThis));
	}
}