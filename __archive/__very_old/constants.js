 //any constants at all go here
 
 //general
 const MAIN_CHAR_NAME = 'hathix';
 const MAX_TEAMMATES = 5;
 
 //for animals
 const MAX_LEVEL = 10;
 const EXPERIENCE_PER_LEVEL = 1000;
 
 //for fighting
 const MULTIPLIER = 10;
 const MIN_MULTIPLIER = 6;
 const MAX_MULTIPLIER = 14;
 const CHANCE_OF_MISS = 0.2;
 const CHANCE_OF_RECRUITMENT = 0.1;
 const RECRUITMENT_BONUS = 500; //experience points
 
 //dialogues
 const ALLY = 1;
 const ENEMY = 2;
 const NEUTRAL = 3;
 
 //for pictures
 const TILE_SIZE = 40; //pixels
 const NUM_TILES_SIDE = 15; //how many tiles there are on one side of the square
 
 //folders
 const IMAGE_FOLDER = "images/";
 const ANIMAL_FOLDER = "images/animals/";
 const TILE_FOLDER = "images/tiles/";
 const OBSTACLE_FOLDER = "images/obstacles/";
 const STEPPABLE_FOLDER = "images/tiles/";
 const COIN_FOLDER = "images/coins/";
 const POWERUP_FOLDER = "images/powerups/";
 const OTHER_FOLDER = "images/other/";
 
 //for levels
 const NUM_ACTS = 5;
 const STAGES_PER_ACT = 8;
 
 //for hearts; how much percent you are healed by each
 const FULL_HEART = 100;
 const HALF_HEART = 50;
 const QUARTER_HEART = 25;
 
 //for shields
  //how many seconds each shield protects you for
 const WOODEN_PROTECTION_SPAN = 3;
 const METAL_PROTECTION_SPAN = 4;
 const ULTIMATE_PROTECTION_SPAN = 5;
 
 //for death
 const HIT_ENEMY_MESSAGE = "You died!"; //the message given to the player when they run into an enemy
 const BOMB_MESSAGE = "You hit a bomb!"; //given to you when you step on a bomb
 const OUT_OF_TIME_MESSAGE = "You ran out of time!"; //the message given when the player runs out of time
 
 //for cheese
 const CHANCE_OF_CHEESE = 10; //the percent chance that cheese will appear on any given level
 const CHEESE_POINTS = 200; //how many points you earn for stepping on cheese
 const CHEESE_TIME = 20; //how many seconds you get added on to the clock by stepping on cheese
 
 //for timing
 const CLOCK_BONUS_SECONDS = 15; //how many seconds are added to your time when you pick up a clock
 const PANIC_THRESHOLD = 15; //when you have this many or fewer seconds left, the time text turns red/whatever
 
 //for the UI
 const NUM_DIGITS_FOR_POINTS = 4; //this makes 42 become 0042, etc.
 
 //for moving
	const TIME_BETWEEN_MOVES = 400; //how many milliseconds are between enemy moves
		
	//like an enum almost; (x,y)
	const MOVE_UP = [0,-1];
	const MOVE_LEFT = [-1,0];
	const MOVE_DOWN = [0,1];
	const MOVE_RIGHT = [1,0];
 
 //constants for stepping on are in stepon.js
 //constants for movements are in movementconstants.js