/**
 * In charge of saving and loading the game state.
 */

/**
 * Keys used to access saved state.
 */
var SL_KEYS = {
	//saved game
	savedGameTag: 'ss-game-saved',
	currentLevel: 'ss-current-level',
	allies: 'ss-allies',
	difficultyLevel: 'ss-difficulty-level',
	
	//hall of fame
	hallOfFame: 'ss-hall-of-fame',
	
	//minigame
	minigamesWon: 'ss-minigames-won',
	
	//upload key (passcode for the cloud)
	passcode: 'ss-passcode'
}

/**
 * Sends JSON data to the server.
 * @param object the object to encode. Make sure it's JSON-able (just #s and strings)
 * @param filename the file to write to on the server (ends with .json)
 * @return false if tracking is off, true if it's on (default on)
 */
function sendJSONData(object, filename, removeDuplicates){
    if(TRACKING_ON == false) return false;
    $.post("writejson.php", {
        json : JSON.stringify(object),
        file: filename,
        remove_duplicates: removeDuplicates ? 'yes' : 'no'
    });
    
    return true;
}

/**
 * Retrieves a JSON object from the server and passes it to the callback.
 * @param {string}  filename  the file to read from the server (ends with .json)
 * @param {function(data)}  callback  a function that accepts a param data - this contains the object contained in the JSON.
 *  The callback will be called once the data is loaded, and passed the data object.
 *  The data will most likely be an array of objects.  
 */
function getJSONData(filename, callback){
    $.getJSON(filename, function(data){
       callback(data); 
    });
}

/**
 * Uploads your data to the server.
 * @param   {string}    passcode    a string identifying the user - used as the lookup key.
 */
function uploadData(passcode){
    if(!passcode) return; //no passcode -> sync not set up
    
    var data = {}; //just your data
    //write each save item to the object
    for(var i in SL_KEYS){
        data[SL_KEYS[i]] = JSON.stringify($.store.get(SL_KEYS[i]));
    }
    
    //overall object: passcode -> data
    var overallObject = {
        passcode: passcode,
        data: data
    };
    sendJSONData(overallObject, 'sprinklecloud.json', true); //do remove duplicates (anything else that has this passcode; should overwrite with new info)
    
    return overallObject; //debug
}

function downloadData(passcode){
    getJSONData('sprinklecloud.json', function(json){
        //loop through each object in the json
        for(var i=0; i<json.length; i++){
            var object = json[i];
            //this has passcode -> data
            //unpack into local info
            if(object.passcode == passcode){
                //right one
                var data = object.data; //contains various SL_KEYS -> data
                for(var key in data){
                    var datum = data[key];
                    
                    $.store.set(key, JSON.parse(datum));
                }
                return;
            }
        }
        
        //nothing found!
        alert("Your data could not be found. :(");
    });
}

function saveGame(){
	//store tag showing that there is indeed a saved game
	$.store.set(SL_KEYS.savedGameTag, 'true');
	
	//store primitive level (just act and stage num)
	$.store.set(SL_KEYS.currentLevel, { act: currentLevel.actNum, stage: currentLevel.stageNum });
	
	//make all allies primitive (just basic info) and store them
	var primAllies = getPrimitiveAllies();
	$.store.set(SL_KEYS.allies, primAllies);
	
	//store difficulty leveel
	$.store.set(SL_KEYS.difficultyLevel, difficultyLevel);
	
	//upload data to server
	uploadData(getPasscode());
}

function loadGame(){
	//load primitive allies
	var primAllies = $.store.get(SL_KEYS.allies);
	for(var i=0; i<primAllies.length; i++){
		//build real ally from primitive ally
		var primAlly = primAllies[i];
		var ally = getAllyFromPrimitive(primAlly);
		
		ally.putOnBoard();
		allies.push(ally);
		allObjects.push(ally);
	}
	
	//stop bugs where there are too many allies; cut down to size
	while(allies.length > MAX_ALLIES){
	    allies[MAX_ALLIES].div.remove();
		removeAllyNoCheck(allies[MAX_ALLIES]);
	}
	
	//load difficulty level
	setDifficultyLevel($.store.get(SL_KEYS.difficultyLevel));
	
	//load primitive level
	var primLevel = $.store.get(SL_KEYS.currentLevel);
	loadLevel(primLevel.act, primLevel.stage);
}

/**
 * Returns whether or not a saved game exists.
 * @return	{boolean}	true if there is a saved game (evidenced by the saved game tag), false otherwise
 */
function isSavedGame(){
	return $.store.get(SL_KEYS.savedGameTag) != undefined;
}

/**
 * Returns whether or not the user has set up sync (they have a passcode).
 * @return {boolean}    true if there is sync on the server, false otherwise. 
 */
function hasSync(){
    return $.store.get(SL_KEYS.passcode) != undefined;
}

/**
 * Returns the user's passcode (saved locally), or undefined if it doesn't exit. 
 */
function getPasscode(){
    return $.store.get(SL_KEYS.passcode);
}

/**
 * Clears sync - removes the sync key so the user can reset it. 
 */
function clearSync(){
    $.store.remove(SL_KEYS.passcode);
}

/**
 * Clears all stored data for the adventure.
 */
function clearSavedData(){
	//by removing the saved game tag, SS will think there's no saved game. The new game will just override the old data.
	$.store.remove(SL_KEYS.savedGameTag);
}

/**
 * Creates a primitive ally, which is a normal ally stripped down to the bare minimum
 * @param	{Ally}	realAlly	an actual ally object.
 */
function PrimitiveAlly(realAlly){
	this.name = realAlly.name;
	this.type = realAlly.type;
	this.level = realAlly.level;
	this.experience = realAlly.experience;
	this.levelsWithTeam = realAlly.levelsWithTeam;
	this.ivs = realAlly.ivs;
}

/**
 * Returns the real ally that the given PrimitiveAlly represents.
 * @param	{PrimitiveAlly}	prim	a primitive ally that was loaded.
 * @return	{Ally}	an honest-to-goodness real Ally.
 */
function getAllyFromPrimitive(prim){
	var ally = new Ally(prim.type, 0, 0, prim.level, prim.name);
		ally.experience = prim.experience;
		ally.levelsWithTeam = prim.levelsWithTeam;
		ally.ivs = prim.ivs;	
	
	return ally;
}

/**
 * Returns an array of all allies primitivized 
 */
function getPrimitiveAllies(){
	var primAllies = [];
	for(var i=0; i<allies.length; i++){
		primAllies.push(new PrimitiveAlly(allies[i]));
	}
	return primAllies;
}

/* HALL OF FAME */

/**
 * Creates an entry for when you defeated the final boss in adventure mode. Most info is gleaned automatically.
 * @param {boolean} beatSecret true if they beat the secret final boss, false otherwise
 */
function HallOfFame(beatSecret){
	this.team = getPrimitiveAllies(); //using global var
	this.date = new Date(); //stores all info about right now
	this.difficultyLevel = difficultyLevel; //global var
	this.beatSecret = beatSecret;
}

/**
 * Adds a hall of fame entry for when you beat adventure mode.
 * @param {HallOfFame} hof the hall of fame entry you created. 
 */
function addHallOfFameEntry(hof){
	//append given hof to the current list
	var hallOfFame = orDefault($.store.get(SL_KEYS.hallOfFame), []); //empty array if there's no hof
	hallOfFame.push(hof);
	$.store.set(SL_KEYS.hallOfFame, hallOfFame);
}

/* MINIGAME */

/**
 * Returns the number of minigames ever won.
 */
function getMinigamesWon(){
	if($.store.get(SL_KEYS.minigamesWon) == undefined){
		//first time using it
		return 0;
	}
	return $.store.get(SL_KEYS.minigamesWon);
}

/**
 * Increases the number of minigames ever won by 1 and saves it.
 */
function increaseMinigamesWon(){
	$.store.set(SL_KEYS.minigamesWon, getMinigamesWon() + 1);
	uploadData();
}
