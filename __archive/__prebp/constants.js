/**
	Constants. They're vars since IE doesn't support const.
*/

var UP = new Direction(0,-1);
var LEFT = new Direction(-1,0);
var DOWN = new Direction(0,1);
var RIGHT = new Direction(1,0);
 
 //general
 var MAIN_CHAR_NAME = 'hathix';
 var MAX_ALLIES = 5;
 var MAX_ALLIES_FOR_BONUS = 4; //if you have this many or fewer allies, you are eligible to get a free ally in some levels.
 
 //for animals
 var MAX_LEVEL = 10;
 var EXPERIENCE_PER_LEVEL = 1000;
 var EXPERIENCE_FOR_DEFEAT = 150; //how much exp is earned for defeating an enemy
 var EXPERIENCE_FOR_ATTACK = 10; //how much exp is earned for attacking an enemy
 var EXPERIENCE_FOR_BOSS = 500; //how much exp is gained for defeating a boss
 var TEAM_LEVEL_BONUS = 0.5; //how many points bonus are given to allies when they level up
 var HEALTH_RED_THRESHOLD = 1 / 3; //if health % is less than this, make the bar red
 
 //individual values
 var IV_VARIATION = 0.05; //1 +- this
 var IV_MAX = 1 - IV_VARIATION; //worst multilplier
 var IV_MIN = 1 + IV_VARIATION; //best multiplier
 
 //for fighting
 var MULTIPLIER_VARIATION = 0.3; //1 +- this
 var MIN_MULTIPLIER = 1 - MULTIPLIER_VARIATION;
 var MAX_MULTIPLIER = 1 + MULTIPLIER_VARIATION
 var CHANCE_OF_MISS = 0.1;
 var CHANCE_OF_CRITICAL = 0.1;
 var CRITICAL_MULTIPLIER = 2;
 var CHANCE_OF_ABILITY_USE = 0.2; //chance of an enemy using ability that's invokable
 var CHANCE_OF_RECRUITMENT = 0.2;
 var ANIMATION_LENGTH = 250; //ms it takes for an attack/move animation to be executed
 
 //dialogues
 var ALLY = "ally";
 var ENEMY = "enemy";
 var SIGN = "sign";
 var NEUTRAL = "neutral";
 
 //for pictures
 var TILE_SIZE = 40; //pixels
 var NUM_TILES_SIDE = 15; //how many tiles there are on one side of the square
 
 //folders
 var IMAGE_FOLDER = "images";
 var ANIMAL_FOLDER = "images/animals";
 var TILE_FOLDER = "images/tiles";
 var OBSTACLE_FOLDER = "images/obstacles";
 var STEPPABLE_FOLDER = "images/steppables";
 //var COIN_FOLDER = "images/coins";
 //var POWERUP_FOLDER = "images/powerups";
 //var OTHER_FOLDER = "images/other";
 
 //for levels
 var NUM_ACTS = 5;
 var STAGES_PER_ACT = 9;
 
 //difficulty levels
 var DIFFICULTY_LEVELS = [
	new DifficultyLevel("Easy",			0.75),
	new DifficultyLevel("Normal",		1.00),
	new DifficultyLevel("Hard",			1.25),
	new DifficultyLevel("Insane",		1.50),
	new DifficultyLevel("Fiendish",		2.00),
	];
 
 //for hearts; how much percent you are healed by each
 var FULL_HEART = 100;
 var HALF_HEART = 50;
 var QUARTER_HEART = 25;
 
 //tile abbreviations
 var GRASS = 'g';
 var PATH = 'p';
 var ROAD = 'r';
 var DIRT = 'd';
 var CONCRETE = 'c';
 var TILE = 't';
 var WOOD = 'w';
 var BRIDGE_NS = 'B';
 var BRIDGE_EW = 'b';
 var SNOW = 's';
 var SAVANNAH = 'v';
 var WATER = 'W';