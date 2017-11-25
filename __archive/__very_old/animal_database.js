//basic stat tables for each animal

/**
	Database of animal stats. User ANIMAL_DB[type] to access the AnimalStats for an animal of type [type].
	baseAtk / atkRaise / baseDef / defRaise / baseHP / hpRaise
*/
const ANIMAL_DB = {
	Elephant: 	new AnimalStats(26,3,15,2,36,3), //final 56 - 35 - 66
	
	//Bagel Borough
	Squirrel:	new AnimalStats(16,4,11,3,20,4), //final 56 - 41 - 60	
	Cow:		new AnimalStats(22,3,19,1,21,4), //final 52 - 29 - 61	
	Pig:		new AnimalStats(21,2,18,1,35,4), //final 41 - 28 - 75
	Sheep:  	new AnimalStats(26,4,13,1,21,2), //final 66 - 23 - 41		
	/** BOSS */ 
	Chicken: 	new AnimalStats(35,0,20,0,45,0),

	//Icing Over
	Penguin:	new AnimalStats(17,3,26,1,35,3), //final 47 - 36 - 65
	Bear:		new AnimalStats(25,3,17,2,20,2), //final 55 - 37 - 40
	Goat:		new AnimalStats(31,3,10,2,21,2), //final 61 - 30 - 41
	Owl:		new AnimalStats(20,3,10,2,30,3), //final 50 - 30 - 60
	/** BOSS: Elk */	
	
	//Before Creme
	T_Rex:		new AnimalStats(28,3,13,2,27,2), //final 58 - 33 - 47
	Triceratops:new AnimalStats(21,2,24,2,26,2), //final 41 - 44 - 46
	Plesiosaur:	new AnimalStats(30,3,21,2,22,1), //final 60 - 41 - 32
	Pterodactyl:new AnimalStats(15,4,12,3,20,3), //final 55 - 42 - 50
	/** BOSS: Bunny */
	
	//Sprinkle Savannah
	Giraffe: 	new AnimalStats(16,2,10,3,20,3), //final 36 - 40 - 50
	Hippo:		new AnimalStats(21,3,14,1,44,3), //final 51 - 24 - 74
	Rhino:		new AnimalStats(30,3,15,1,22,3), //final 60 - 25 - 52
	Zebra:		new AnimalStats(44,2,12,1,27,1), //final 64 - 22 - 37
	/** BOSS: Leopard */
	
	//Llama Llodge
	Beaver:	 	new AnimalStats(30,4,6,1,30,1),  //final 70 - 16 - 40
	Ostrich:	new AnimalStats(26,1,25,2,28,3), //final 36 - 45 - 58
	Peacock:	new AnimalStats(19,3,21,2,31,3), //final 49 - 41 - 61
	Panda:		new AnimalStats(33,3,21,1,26,2), //final 61 - 41 - 49
	/** BOSS: Llama */
};

/**
	Average finishing stats (level 10) - Bad / Average / Good:
	Atk - 40 / 50 / 60
	Def - 20 / 30 / 40
	HP  - 50 / 60 / 70	
	
	Average raises:
	Atk - 3
	Def - 2
	HP  - 3	
	
	Average starts (level 0, 10 compilations):
	Atk - 20
	Def - 10
	HP  - 30	
*/

/**
	Just a data holder.
	@param baseAtk [int] the attack at level 0
	@param atkRaise [int] how much the attack goes up each level
	@param baseDef [int] the defense at level 0
	@param defRaise [int] how much the defense goes up each level
	@param baseHP [int] the max HP at level 0
	@param HPRaise [int] how much the max HP goes up each level	
*/
function AnimalStats(baseAtk,atkRaise,baseDef,defRaise,baseHP,HPRaise){
	this.baseAtk = baseAtk;
	this.atkRaise = atkRaise;
	this.baseDef = baseDef;
	this.defRaise = defRaise;
	this.baseHP = baseHP;
	this.HPRaise = HPRaise;
}