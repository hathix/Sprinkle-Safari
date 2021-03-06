/**
	A bunch of utilities that aren't related to this game.
*/

/**
	Creates a <div> jQuery object.
*/
function makeDiv(){
	return $('<div></div>');
}

function verticalAlign(elem){
	//var elemWidth = parseInt(elem.width()) + parseInt(elem.css('paddingLeft')) + parseInt(elem.css('paddingRight'));
	var elemHeight = parseInt(elem.height()) + parseInt(elem.css('paddingTop')) + parseInt(elem.css('paddingBottom'));
	//elem.css('left', ($(window).width() - elemWidth) / 2);
	elem.css('top', ($(window).height() - elemHeight) / 2);	
}

/**
	Centers the given element on the page.
	@param elem [jQuery object] its position should be 'absolute'.
*/
function centerOnPage(elem){
	var elemWidth = parseInt(elem.width()) + parseInt(elem.css('paddingLeft')) + parseInt(elem.css('paddingRight'));
	var elemHeight = parseInt(elem.height()) + parseInt(elem.css('paddingTop')) + parseInt(elem.css('paddingBottom'));
	elem.css('left', ($(window).width() - elemWidth) / 2);
	elem.css('top', ($(window).height() - elemHeight) / 2);
}

/**
	Removes an object from an array, shrinking the array to fit.
	@param object [anything]
	@param array [array]
*/
function removeFromArray(object, array){
	var index = array.indexOf(object);
	if(index != -1)
		array.splice(index,1);
}

/**
 * Returns a random element from the array.
 * @param {Object[]}	array	an array of anything
 * @return {Object}	one of the objects from that array.
 */
function randomFromArray(array){
	var rand = Math.floor(Math.random() * array.length);
	return array[rand];
}

/**
	Runs a trial.
	@param chance [float] the decimal chance that this method will return true.
	@return [boolean] true if the trial succeeded, false otherwise
*/
function pushLuck(chance){
	return Math.random() < chance;
}

/**
 * Applies random variation to a certain value (which is rounded to an int.) 10 might become 8 or 11, for example.
 * @param	{int}	original	the original value
 * @param	{number}	exaggeration	[optional] if you supply this, the multipliers will be powered by exaggeration, so the results are more extreme. A low multiplier is really low, a high one is really high. Default 1.
 * @param	{number}	minMultiplier	[optional] pass a custom value here if you like. original will be multiplied by this at worst.
 * @param	{number}	maxMultiplier	[optional] pass a custom value here if you like. original will be multiplied by this at best.
 * @return	{int}	the original number with random variation added, then rounded to the nearest int.
 */
function randomVariation(original, exaggeration, minMultiplier, maxMultiplier){
	//set default
	var min = minMultiplier != undefined ? minMultiplier : MIN_MULTIPLIER;
	var max = maxMultiplier != undefined ? maxMultiplier : MAX_MULTIPLIER;
	
	var randomMultiplier = Math.random() * (max - min) + min;
	if(exaggeration != undefined)
		randomMultiplier = Math.pow(randomMultiplier, exaggeration);
	
	var applied = Math.round(original * randomMultiplier);
	if(applied <= 1)
		applied = 1;
	return applied;
}

/**
 * Returns a random IV, or individual value for stats, which the stat is multiplied by.
 * @return	{float}	a float from about 0.9 to 1.1 (subject to change)
 */
function calculateIV(){
	//TODO: make normal distribution somehow
	return Math.random() * (IV_MAX - IV_MIN) + IV_MIN;
}

/**
 * Returnsthe given value if it's defined, or default if it isn't. For example, call this:
 * orDefault(x, 0)
 * To get x, or 0 if it isn't defined.
 */
function orDefault(supposed, def){
	if(typeof supposed == undefined || supposed == undefined) return def;
	return supposed;
}


/**
	Determines if the given coordinates lie outside the board.
	@param x [int] the column
	@param y [int] the row
	@return [boolean] true if it is outside, false if it is inside (fair territory)
*/
function isOutsideBoard(x,y){
	return x < 0 || y < 0 || x >= NUM_TILES_SIDE || y >= NUM_TILES_SIDE;
}

/**
	Determines if the given character is uppercase.
	@param a [char] a single character.
	@return [true] if a is uppercase.
*/
function isUpperCase(a){
	return a.toUpperCase === a;
}

/**
	Determines if the given character is lowercase.
	@param a [char] a single character.
	@return [true] if a is lowercase.
*/
function isLowerCase(a){
	return !isUpperCase(a);
}

function isInt(a){
	if(isNaN(a)) return false;
	
	return Math.round(a) == a;
}

function show_props(obj, obj_name) {
  var result = "";
  for (var i in obj)
    result += obj_name + "." + i + " = " + obj[i] + "\n";
  return result;
}