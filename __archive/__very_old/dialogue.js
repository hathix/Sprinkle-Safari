
/**
	Convenience method for making the main character's dialogues.
	@param text [string] what the main character should say.
	@return [Dialogue]
*/
function makeHathixDialogue(text){
	return new Dialogue('hathix',ALLY,'elephant',text);
}

/**
	Makes a dialogue with some text read by a sign.
	@param text [string] what the sign reads.
	@param [Dialogue]
*/
function makeSignDialogue(text){
	return new Dialogue('Sign',NEUTRAL,'sign',text);
}

/**
	Makes a dialogue with the text of some bystander.
	@param type [string] the type of animal the bystander is
	@param text [string] what they should say
	@param name [string] {optional}
	@return [Dialogue]
*/
function makeBystanderDialogue(type,text,name){
	if(!name)
		name = 'A random ' + type;
	return new Dialogue(name,NEUTRAL,type,text);
}

/**
	Makes a generic enemy dialogue.
	@param type [string] the type of animal the enemy is
	@param text [string] what the enemy should say
	@return [Dialogue]
*/
function makeEnemyDialogue(type,text){
	return new Dialogue(type,ENEMY,type,text);
}

/**
	Makes a boss's dialogue.
	@param name [string] the boss's name
	@param type [string] the type of animal the boss is
	@param text [string] what the boss should say
*/
function makeBossDialogue(name,type,text){
	return new Dialogue(name,ENEMY,type,text);
}

/**
	Makes one screen of dialogue.
	@param speaker [string] - name of speaker	
	@param alignment [int] - either ALLY, ENEMY, or NEUTRAL
	@param image [string] - URL of speaker's image. It'll be in ANIMAL_FOLDER.
	@param text [string] - what the speaker says
*/
function Dialogue(speaker,alignment,image,text){
	this.speaker = speaker;
	this.alignment = alignment;
	if(!image)
		image = speaker;
	image = image.toLowerCase();
	this.image = ANIMAL_FOLDER + image + ".png";	
	this.text = text;
}