
//variables
var currentLevel; //the Level object that contains the level you're currently on

//getting started
window.onload = function(){
	Logger.log("Welcome to Sprinkle Safari! All messages will be logged here.");

	addTeammate(new Animal('Elephant',true,new Div(),0,0,1,0,MAIN_CHAR_NAME));
	loadLevel('1-1');
}

window.onkeyup = function(event){
	//move based on the key press
	moveOnKeyPress(event); //see move.js
}

/* Tell the player to move. When this happens, one enemy will move.

*/
function takeTurn(direction){
	if(selectedAnimal){
		selectedAnimal.move(direction);
	
		enemyTurn();
	}
}

/**
	Tells the player to use their turn attacking. The enemies will then take their turn.
	@param direction [int[]] where to attack (MOVE_UP,MOVE_DOWN,MOVE_LEFT,MOVE_RIGHT)
*/
function attack(direction){
	if(selectedAnimal){
		selectedAnimal.tryToAttack(direction);
		
		enemyTurn();
	}
}
