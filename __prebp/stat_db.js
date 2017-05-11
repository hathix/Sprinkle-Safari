//basic stat tables for each animal

/**
	Database of animal stats. User ANIMAL_DB[type] to access the AnimalStats for an animal of type [type].
	baseAtk / atkRaise / baseDef / defRaise / baseHP / hpRaise
*/
var STAT_DB = {
	/*
		Elephant*

		1. BAGEL BOROUGH
		Squirrel*
		Cow*
		Pig*
		Sheep*	
		Chicken*			
		Cat
		Dog			
		
		2. ICING OVER
		Penguin*
		Bear*	
		Elk*		
		Owl*		
		Goat	
		Duck
		Beaver		
		
		3. BEFORE CREME
		TRex*
		Triceratops*
		Plesiosaur*
		Pterodactyl*
		Brontosaurus*
		Bat		
		Ghost
		
		4. SPRINKLE SAVANNAH
		Giraffe*
		Hippo*
		Rhino*
		Zebra*
		Leopard*		
		Gnu		
		Monkey		
		
		5. LLAMA LAIR
		Llama*
		Peacock*
		Panda*
		Ostrich	
		Bunny		
		Turkey
		Mouse		
		
		SECRET
		Bee
		Alligator
		Lion
		Tiger
		Kangaroo
	*/
		/**
			Average finishing stats (level 10) - Bad / Average / Good:
			Atk - 40 / 50 / 60
			Def - 20 / 30 / 40
			HP  - 50 / 60 / 70	
			
			Average raises:
			Atk - 2.7
			Def - 1.5
			HP  - 3.5	
			
			Average starts (level 0, 10 compilations left):
			Atk - 23
			Def - 15
			HP  - 25	
		*/	
		
		//			new AnimalStats(BA,AGN,BD,DGN,BH,HGN,Abilities.Ability),	//AT-DE-HP
		
		Elephant:	new AnimalStats(24,2.9,17,1.7,32,3.3,Abilities.Clutch),		//53-34-65
		
		//1.
		Squirrel:	new AnimalStats(22,2.4,12,1.3,19,3.1,Abilities.Lucky),		//46-25-50
		Cow:		new AnimalStats(20,2.5,17,1.6,24,4.0,Abilities.Medic),		//45-33-64
		Pig:		new AnimalStats(18,2.4,16,1.8,34,3.6,Abilities.Refresh),	//42-34-70
		Chicken:	new AnimalStats(22,2.9,12,1.4,21,3.2,Abilities.Sniper),		//51-26-53		
		Sheep:		new AnimalStats(22,3.5,13,2.2,26,3.7,Abilities.Apprentice),	//57-35-63
		Dog: 		new AnimalStats(28,3.2,10,1.1,17,3.3,Abilities.GoodEye),	//60-21-50
		Cat:		new AnimalStats(27,2.2,17,1.3,29,2.9,Abilities.NineLives),	//49-30-58
		
		//2.
		Penguin:	new AnimalStats(27,2.0,18,0.8,31,2.9,Abilities.Swimmer),	//47-26-60
		Bear:		new AnimalStats(25,3.1,16,1.8,19,3.2,Abilities.Menacing),	//56-34-51
		Elk:		new AnimalStats(16,2.0,20,2.2,28,3.3,Abilities.Steadfast),	//36-42-61
		Owl:		new AnimalStats(23,2.7,15,1.5,25,3.5,Abilities.Flight),		//50-30-60
		Goat:		new AnimalStats(26,3.0,13,1.5,23,3.3,Abilities.SpinAttack),	//56-28-56
		Duck:		new AnimalStats(14,2.0,11,1.2,21,2.8,Abilities.Quack),		//34-23-49
		Beaver:		new AnimalStats(24,3.2,17,1.4,29,3.3,Abilities.Clutch),		//56-31-61
		
		//3.
		TRex:		new AnimalStats(28,2.9,12,1.1,21,3.1,Abilities.Kamikaze),	//57-23-52
		Triceratops:new AnimalStats(26,2.7,13,1.4,26,2.8,Abilities.Refresh),	//54-27-54
		Plesiosaur:	new AnimalStats(20,2.6,13,1.4,34,4.0,Abilities.Calm),		//46-27-74
		Pterodactyl:new AnimalStats(23,3.2,13,1.5,18,3.7,Abilities.Flight),		//55-28-55
	   Brontosaurus:new AnimalStats(21,2.3,17,1.4,28,3.1,Abilities.Sniper),		//44-31-59
		Bat:		new AnimalStats(14,1.9,11,1.3,31,3.0,Abilities.Vampire),	//33-24-61
		Ghost:		new AnimalStats(20,2.5,00,0.0,01,0.0,Abilities.Ethereal),	//45-00-01
		
		//4.
		Giraffe:	new AnimalStats(15,3.9,11,1.8,21,4.2,Abilities.Lucky),		//54-29-63
		Hippo:		new AnimalStats(25,2.9,16,1.6,25,3.2,Abilities.Medic),		//53-32-57
		Rhino:		new AnimalStats(30,3.6,11,1.1,17,3.2,Abilities.Careless),	//66-22-49
		Zebra:		new AnimalStats(22,2.9,12,1.3,23,3.1,Abilities.Camouflage),	//51-25-54
		Leopard:	new AnimalStats(25,2.9,11,1.1,23,3.4,Abilities.Reflex),		//54-22-57			
		Gnu:		new AnimalStats(21,2.4,17,1.4,24,4.0,Abilities.Herd),		//45-31-64
		Monkey:		new AnimalStats(27,2.8,14,1.5,21,3.2,Abilities.Bananarama),	//55-27-53
		
		//5.
		Llama:		new AnimalStats(29,2.0,20,1.0,34,3.0,Abilities.Gambler),	//49-30-64
		Peacock:	new AnimalStats(21,3.2,12,1.9,29,1.9,Abilities.Showy),		//53-31-58
		Panda:		new AnimalStats(22,2.1,13,1.4,26,2.9,Abilities.Bamboomerang)//43-27-55
	   ,Ostrich:	new AnimalStats(19,2.2,24,1.5,27,3.0,Abilities.Kamikaze),	//41-39-57	
		Bunny:		new AnimalStats(12,1.9,13,1.3,21,3.1,Abilities.EasterEgg),	//31-26-52
		Turkey:		new AnimalStats(25,2.9,18,1.7,15,3.2,Abilities.Flee),		//54-35-47
		Mouse:		new AnimalStats(32,3.7, 8,0.9,17,2.9,Abilities.Stealthy),	//69-17-46
		
		//Secret: they're available in the minigames, but in adventure mode only in Secret levels
		Bee:		new AnimalStats(20,2.9,13,1.6,16,3.5,Abilities.Sting),		//49-29-51
		//Alligator:	new AnimalStats(00,0.0,00,0.0,00,0.0,Abilities.Ability),	//00-00-00
		//Lion:		new AnimalStats(00,0.0,00,0.0,00,0.0,Abilities.Ability),	//00-00-00
		//Tiger:		new AnimalStats(00,0.0,00,0.0,00,0.0,Abilities.Ability),	//00-00-00
		Kangaroo:	new AnimalStats(20,2.5,17,1.9,24,3.4,Abilities.Protective),	//45-36-58
		
		//Bosses; they have 0 growths so their levels don't matter
		//					new AnimalStats(BA,0,BD,0,BH,0,Abilities.Ability),	//AT-DE-HP
		Chicken_Boss: 		new AnimalStats(35,0,15,0,50,0,Abilities.Gambler),	//35-15-50
		Duck_Boss:			new AnimalStats(40,0,30,0,50,0,Abilities.Reflex),	//40-30-50
		Brontosaurus_Boss:	new AnimalStats(40,0,35,0,60,0,Abilities.Calm),		//45-35-60
		
		/** This is just so Animal() will have a temporary statDB */
		Placeholder:new AnimalStats(00,0.0,00,0.0,00,0.0,Abilities.Ability),	//00-00-00
	/*
	Elephant: 	new AnimalStats(26,3,15,2,36,3,Abilities.SpinAttack), //final 56 - 35 - 66
	
	//Bagel Borough
	Squirrel:	new AnimalStats(16,4,11,3,20,4,Abilities.GoodEye), //final 56 - 41 - 60	
	Cow:		new AnimalStats(22,3,19,1,21,4), //final 52 - 29 - 61	
	Pig:		new AnimalStats(21,2,18,1,35,4), //final 41 - 28 - 75
	Sheep:  	new AnimalStats(26,4,13,1,21,2), //final 66 - 23 - 41		
	//BOSS
	Chicken: 	new AnimalStats(35,0,20,0,45,0),

	//Icing Over
	Penguin:	new AnimalStats(17,3,26,1,35,3), //final 47 - 36 - 65
	Bear:		new AnimalStats(25,3,17,2,20,2), //final 55 - 37 - 40
	Goat:		new AnimalStats(31,3,10,2,21,2), //final 61 - 30 - 41
	Owl:		new AnimalStats(20,3,10,2,30,3), //final 50 - 30 - 60
	// BOSS: Elk
	
	//Before Creme
	TRex:		new AnimalStats(28,3,13,2,27,2), //final 58 - 33 - 47
	Triceratops:new AnimalStats(21,2,24,2,26,2), //final 41 - 44 - 46
	Plesiosaur:	new AnimalStats(30,3,21,2,22,1), //final 60 - 41 - 32
	Pterodactyl:new AnimalStats(15,4,12,3,20,3), //final 55 - 42 - 50
	// Bunny
	
	//Sprinkle Savannah
	Giraffe: 	new AnimalStats(16,2,10,3,20,3), //final 36 - 40 - 50
	Hippo:		new AnimalStats(21,3,14,1,44,3), //final 51 - 24 - 74
	Rhino:		new AnimalStats(30,3,15,1,22,3), //final 60 - 25 - 52
	Zebra:		new AnimalStats(44,2,12,1,27,1), //final 64 - 22 - 37
	//BOSS
	
	//Llama Llodge
	Beaver:	 	new AnimalStats(30,4,6,1,30,1),  //final 70 - 16 - 40
	Ostrich:	new AnimalStats(26,1,25,2,28,3), //final 36 - 45 - 58
	Peacock:	new AnimalStats(19,3,21,2,31,3), //final 49 - 41 - 61
	Panda:		new AnimalStats(33,3,21,1,26,2), //final 61 - 41 - 49
	//BOSS
	*/
};

/**
	Average finishing stats (level 10) - Bad / Average / Good:
	Atk - 40 / 50 / 60
	Def - 20 / 30 / 40
	HP  - 50 / 60 / 70	
	
	Average raises:
	Atk - 3.0
	Def - 1.5
	HP  - 3.5	
	
	Average starts (level 0, 10 compilations):
	Atk - 20
	Def - 15
	HP  - 25	
*/

/**
	Just a data holder.
	@param baseAtk [int] the attack at level 0
	@param atkRaise [int] how much the attack goes up each level
	@param baseDef [int] the defense at level 0
	@param defRaise [int] how much the defense goes up each level
	@param baseHP [int] the max HP at level 0
	@param HPRaise [int] how much the max HP goes up each level	
	@param ability [ability] the animal's ability. 
*/
function AnimalStats(baseAtk,atkRaise,baseDef,defRaise,baseHP,HPRaise,ability){
	this.baseAtk = baseAtk;
	this.atkRaise = atkRaise;
	this.baseDef = baseDef;
	this.defRaise = defRaise;
	this.baseHP = baseHP;
	this.HPRaise = HPRaise;
	this.ability = ability;
}