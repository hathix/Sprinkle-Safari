/**
	Assorted classes of small objects.
*/

/**
	A simple direction.
	@param x [int]
	@param y [int]
*/
function Direction(x,y){
	this.x = x;
	this.y = y;
}

/**
	Returns the direction in array form: [x,y].
	@return [int[]]
*/
Direction.prototype.array = function(){
	return [this.x, this.y];
}


/**
	There are several difficulty levels. Harder levels mean more HP for enemies; easier levels mean less HP for enemies. The rest stays the same.
	@param name [string] the name for the difficulty level
	@param HPMultiplier [float] how much to multiply enemies' HP by. Usually 0.75-1.25.
*/
function DifficultyLevel(name,HPMultiplier){
	this.name = name;
	this.HPMultiplier = HPMultiplier;
}


/**
	An information holder about one character's speech in a level. (There can be many of these per level.)
	@param speaker [string] the speaker's name
	@param type [string] the type of the speaker (what kind of animal it is)
	@param side [string] what side the speaker is on (ALLY, ENEMY, NEUTRAL, SIGN)
	@param text [string] what the speaker says
*/
function Dialogue(speaker,type,side,text){
	this.speaker = speaker;
	this.image = "images/animals/" + type.toLowerCase() + ".png";
	this.side = side;
	this.text = text;
}

var CURRENT_DIALOGUE = 0;
/**
	Starts showing the startDialogues for the currentLevel.
*/
function startActiveLevelStartDialogues(){
	if(currentLevel.startDialogues && currentLevel.startDialogues.length > 0){
		CURRENT_DIALOGUE = 0;
		loadDialogue(currentLevel.startDialogues[CURRENT_DIALOGUE]);
		
		$('#dialogue_next_button').unbind('click');
		//Dialogue dialog's next button
		$('#dialogue_next_button').click(function(){
			CURRENT_DIALOGUE++;
			if(CURRENT_DIALOGUE >= currentLevel.startDialogues.length){
				hideDialogue();
			}
			else{
				//load next dialogue
				loadDialogue(currentLevel.startDialogues[CURRENT_DIALOGUE]);
			}
		});		

		$('#dialogue_close_button').unbind('click');
		//Dialogue dialog's close button
		$('#dialogue_close_button').click(function(){
			CURRENT_DIALOGUE = currentLevel.startDialogues.length; //so that a new dialogue is never loaded
			hideDialogue();
		});		
	}
}

/**
	Starts showing the endDialogues for the currentLevel.
*/
function startActiveLevelEndDialogues(){
	if(currentLevel.endDialogues && currentLevel.endDialogues.length > 0){
		CURRENT_DIALOGUE = 0;
		loadDialogue(currentLevel.endDialogues[CURRENT_DIALOGUE]);
		
		$('#dialogue_next_button').unbind('click');
		//Dialogue dialog's next button
		$('#dialogue_next_button').click(function(){
			CURRENT_DIALOGUE++;
			if(CURRENT_DIALOGUE >= currentLevel.endDialogues.length){
				hideDialogue();
				currentLevel.end();
			}
			else{
				//load next dialogue
				loadDialogue(currentLevel.endDialogues[CURRENT_DIALOGUE]);
			}
		});				
		
		$('#dialogue_close_button').unbind('click');
		//Dialogue dialog's close button
		$('#dialogue_close_button').click(function(){
			hideDialogue();
			currentLevel.end();
		});				
	}
	else{
		//no dialogues to show, so just end the level now
		currentLevel.end();
	}
}

/**
	Loads and shows the given dialogue.
	@param dialogue [Dialogue] the dialogue to show.
*/
function loadDialogue(dialogue){
	if(dialogue){
		$('#dialogue_name').html(dialogue.speaker);	
		$('#dialogue_image').attr('src',dialogue.image);
		$('#dialogue_text').html(dialogue.text);
		
		var Class;
		switch(dialogue.side){
		case ALLY:
			Class = 'dialogue-ally';
			break;
		case ENEMY:
			Class = 'dialogue-enemy';
			break;
		case NEUTRAL:
			Class = 'dialogue-neutral';
			break;
		case SIGN:
			Class = 'dialogue-sign';
			break;
		}
		$('#dialogue').removeClass().addClass(Class);
		$('#dialogue').css('display','block');
	}
}

/**
	Hides the active dialogue.
*/
function hideDialogue(){
	$('#dialogue').css('display','none');
}

/**
	Creates an enemy's dialogue.
	@param type [string] the type of enemy. Make this Capitalized.
	@param text [string] what to say.
	@param name [string] {optional} the speaker's name (for a boss)
	@return [Dialogue]
*/
function dEnemy(type,text,name){
	name = name || type;
	return new Dialogue(name,type.toLowerCase(),ENEMY,text);
}

/**
	Creates a dialogue by the main character.
	@param text [string] what to say
	@return [Dialogue]
*/
function dCharacter(text){
	return dAlly(MAIN_CHAR_NAME,"elephant",text);
}

/**
	Creates a generic ally's dialogue. Use dCharacter for the main character's dialogue.
	@param name [string] the ally's name
	@param type [string] what kind of animal it is
	@param text [string] what to say
	@return [Dialogue]
*/
function dAlly(name,type,text){
	return new Dialogue(name,type,ALLY,text);
}

/**
	Creates a generic bystander's dialogue.
	@param name [string] the animal's name
	@param type [string] what kind of animal it is
	@param text [string] what to say
	@return [Dialogue]
*/
function dNeutral(name,type,text){
	return new Dialogue(name,type,NEUTRAL,text);
}

/**
	Creates a sign's dialogue.
	@param text [string] what to say
*/
function dSign(text){
	return new Dialogue("Sign","Sign",SIGN,text);
}

/**
	An act, or group of related levels.
	@param number [int] the act number (1-based).
	@param getStage[function]
		* accepts 1 parameter, stageNum (0-based).
		* returns a Level based on stageNum
*/
function Act(number,getStage){
	this.number = number;
	this.getStage = getStage;
}


var Logger = {
	logDiv: null,
	
	/**
		Logs a standard piece of text.
		@param text [string] text to add to the battle log
		@parm style [string] {optional} a class to apply to the log entry. Options
			info
			urgent
			heal
			attack-ally (ally did the attack; enemy hurt)
			attack-enemy (enemy did the atack; ally hurt)
			die (for allies' death)
			defeat (for enemies' death)
			recruit
			levelup
			ability (ability used)
			ability-error (some error using ability, maybe it's been used too much)
	*/
	log: function(text,style){
		if(!this.logDiv)
			this.logDiv = $('#log');
			
		//edit style
		//if(style == 'urgent') style = 'ui-state-highlight';	
			
		var div = $('<div></div>');
		div.addClass('log_entry');
		div.addClass(style || ''); //add no class if none is specified
		div.html(text);
		
		//add to front
		this.logDiv.prepend(div);
	},
};