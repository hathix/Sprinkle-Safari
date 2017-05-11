/**
	Act 1, Bagel Borough
*/

acts.push(new Act(1,function(levelNum){
	var grid;
	var background = 'grass';
	var obstacles;
	var enemies;
	var allyPositions;
	var startDialogues;
	var endDialogues;
	var newAlly;
	
	switch(levelNum){
	case 1:
		grid = 'gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg gggggggpggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ';
		obstacles = [
			new Obstacle('tree',6,10),
			new Obstacle('tree',6,9),
			new Obstacle('tree',6,8),
			new Obstacle('tree',6,7),
			new Obstacle('tree',6,6),
			new Obstacle('tree',8,10),
			new Obstacle('tree',8,9),
			new Obstacle('tree',8,8),
			new Obstacle('tree',8,7),
			new Obstacle('tree',8,6),			
			new Obstacle('house1',7,11),
			new Steppable('flag',7,0),
			];
		enemies = [
			new Enemy('Squirrel',7,7,1,0)
			];
		allyPositions = [ 
			[7,8]
			];
		startDialogues = [
			dEnemy("Squirrel","HOLD IT RIGHT THERE!"),
			dCharacter("What, is it a crime to get the newspaper anymore?"),
			dEnemy("Squirrel","I dunno about that. But it's now officially a crime to not hand over your donuts to an Authorized Goon™."),
			dCharacter("Er, what? I just wanted the paper. Why do you want my donuts? There's a store across the street!"),
			dEnemy("Squirrel","<em>Was</em> a store. See, there's a reason why we Goons™ are spread across the borough. We want your donuts. And don't bother asking why."),
			dCharacter("OK, no one stands in the way of me and my newspaper. EN GARDE!")
			];
		endDialogues = [
			dCharacter("Geez, wonder why that guy wanted my donuts... wait a second, he said the goons were all over the borough."),
			dCharacter("And that means they're in the capital, Bagelsburg... and that's where my dear old Grandma lives! I have to get over there now to make sure she's OK!")
		];
		
		//elephant is your starter
		var elephant = new Ally('Elephant',0,0,1,MAIN_CHAR_NAME);
		//make it shiny if secret elephant was clicked
		if(secretElephantClicked)
			elephant.ivs = {
				atk: SHINY_IV_THRESHOLD,
				def: SHINY_IV_THRESHOLD,
				hp:  SHINY_IV_THRESHOLD
			};
		newAlly = elephant;
		
		break;
	case 2:
		grid = 'ggggggggggggggg ggggggggggggggg gggppppppgggggg gddpggggppppddg gggppggggggpggg ggggpggggggpppg ggggpggggggggpp ggggpgggggggggp ggggppggggggggg gggggppgggggggg ggggggppggggggg gggggggpggggggg gggggggpddggggg gggggggpggggggg gggggggpggggggg ';
		obstacles = [new Obstacle('tree',12,10),new Obstacle('tree',12,14),new Steppable('quarter-heart',11,12),new Steppable('half-heart',1,2),new Steppable('full-heart',13,3),new Obstacle("house1",10,12),new Obstacle("house3",0,3),new Obstacle("house2",14,3),new Steppable("flag",14,7),new Obstacle("tree",0,2),new Obstacle("tree",0,4),new Obstacle("tree",1,4),new Obstacle("tree",2,2),new Obstacle("tree",2,4),new Obstacle("tree",14,2),new Obstacle("tree",13,2),new Obstacle("tree",12,2),new Obstacle("tree",13,4),new Obstacle("tree",14,4),new Obstacle("tree",9,11),new Obstacle("tree",10,11),new Obstacle("tree",11,11),new Obstacle("tree",12,11),new Obstacle("tree",12,13),new Obstacle("tree",12,12),new Obstacle("water",6,4),new Obstacle("water",6,5),new Obstacle("water",6,6),new Obstacle("water",7,6),new Obstacle("water",7,7),new Obstacle("water",8,7),new Obstacle("water",7,5),new Obstacle("water",8,5),new Obstacle("water",9,5),new Obstacle("water",9,6),new Obstacle("water",8,6),new Obstacle("water",9,7),new Obstacle("water",10,7),new Obstacle("water",11,7),new Obstacle("water",11,9),new Obstacle("water",8,8),new Obstacle("water",9,8),new Obstacle("water",10,8),new Obstacle("water",9,9),new Obstacle("water",10,9),new Obstacle("water",11,8),];
		enemies = [new Enemy("Squirrel",2,3,1,0),new Enemy("Squirrel",11,3,1,0),new Enemy("Squirrel",7,11,1,0),new Enemy("Sheep",6,2,1,0),];	
		allyPositions = [
			[7,14],
			[6,14]
		];
		newAlly = new Ally('Dog',0,0,1,'Chase');
		startDialogues = [
			dCharacter('Hey, Chase! What\'s up?'),
			dNeutral('Chase','Dog','Well, not much, if you consider being mobbed, beaten, and robbed of all my donuts "not much."'),
			dCharacter('Glad you\'re... OK. Say, I\'m heading for Bagelsburg, and I guess I\'ll have to fight some of these goons on the way. Want to come along?'),
			dAlly('Chase','Dog','And get sweet, sweet revenge? And sweet, sweet donuts? Count me in!')
		];
		endDialogues = [
			dCharacter("Well, that was some good aerobic exercise. Bagelsburg, here we come!")
		];
		break;
	case 3:
		grid = 'ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg gggggggpppppggg gggggggpgggppgg gggggpppggggppp gggpppggggggggg ppppgggggddddgg gggggggdddggdgg gggggggdggggdgg gggggggdgggddgg gggggggdddddggg ggggggggggggggg ggggggggggggggg ';
		obstacles = [new Obstacle("water",10,9),new Obstacle("water",11,9),new Obstacle("water",11,10),new Obstacle("water",10,10),new Obstacle("water",9,10),new Obstacle("water",8,10),new Obstacle("water",8,11),new Obstacle("water",9,11),new Obstacle("water",10,11),new Steppable("flag",14,6),new Obstacle("house1",9,3),new Obstacle("house2",8,5),new Obstacle("house3",4,6),new Obstacle("hydrant",4,8),new Obstacle("hydrant",6,4),new Obstacle("hydrant",13,5),new Obstacle("tree",10,3),new Obstacle("tree",6,11),new Obstacle("tree",9,13),new Obstacle("tree",13,8),new Obstacle("tree",3,6),new Steppable("half-heart",11,11),new Steppable("full-heart",4,2),];
		enemies = [new Enemy("Squirrel",3,2,1),new Enemy("Squirrel",4,1,1,0.5),new Enemy("Squirrel",5,2,1,0.5),new Enemy("Squirrel",4,3,1),new Enemy("Sheep",3,8,1,1),new Enemy("Pig",12,11,1),new Enemy("Cow",11,2,1),];
		allyPositions = [ 
			[0,8],
			[0,9],
			];
		startDialogues = [
				dCharacter("Er, uh, hi, don't I know you?"),
				dEnemy("Sheep","I think so."),
				dCharacter("Then why are you fighting for those goons?"),
				dEnemy("Sheep","Well, some of these thugs - those Squirrels there - threatened they'd attack me if I didn't join them. So I did."),
				dCharacter("Huh, that sucks... say, listen, I'm trying to save my grandma from these goons and could use some help. Could you join me?"),
				dEnemy("Sheep","I don't think so, let me see my contract... yeah, I can't join you unless you beat me."),
				dEnemy("Sheep","If you beat me, I'd be happy to join you. I don't like these thugs any more than you do."),
				dEnemy("Sheep","In fact, I'd be willing to bet a bunch of the goons you run into would want to join you. All you have to do is beat them and ask...")
			];
			endDialogues = [

			];
		break;
	case 4:
		grid = 'ggggggggggggggg gggddgggggddggg gggdddgggddddgg ggggggggggddggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ppppppggggggggg ggggggggggggggg ggggggggggggggg gggggggggdggggg ggggggggddddggg ggggggggdgddggg ggggggggggggggg ggggggggggggggg ';
		obstacles = [new Obstacle("house1",3,8),new Obstacle("tree",6,7),new Obstacle("tree",4,2),new Obstacle("tree",5,2),new Obstacle("tree",10,1),new Obstacle("tree",10,2),new Obstacle("tree",11,2),new Obstacle("tree",9,11),new Obstacle("tree",10,11),new Obstacle("tree",11,11),new Obstacle("tree",4,11),new Obstacle("tree",13,6),new Obstacle("tree",12,6),new Obstacle("tree",11,7),new Obstacle("tree",8,5),new Obstacle("tree",0,2),new Obstacle("tree",1,5),new Obstacle("tree",0,12),new Obstacle("tree",2,13),new Obstacle("tree",6,14),new Obstacle("tree",9,14),new Obstacle("tree",14,12),new Obstacle("tree",12,12),new Obstacle("tree",13,9),new Obstacle("tree",9,9),new Obstacle("tree",9,4),new Obstacle("tree",7,4),new Obstacle("tree",5,5),new Obstacle("tree",4,5),new Obstacle("tree",8,0),new Obstacle("tree",7,1),new Obstacle("tree",14,2),new Obstacle("tree",13,3),new Obstacle("tree",13,4),new Obstacle("tree",14,4),new Steppable("flag",14,7),new Steppable("half-heart",9,12),new Steppable("half-heart",11,1)];
		enemies = [new Enemy("Dog",12,7,1),new Enemy("Pig",11,12,1),new Enemy("Cow",5,1,1),new Enemy("Squirrel",7,6,2),];		
		allyPositions = [
			[2,7],
			[1,7],
			[3,7],
			[4,7],
			[5,7]
		];
		startDialogues = [
			dEnemy("Pig","Yo, Ted! Got any 5s?","Pete"),
			dEnemy("Dog","Nah, go fish yaself, Pete!","Ted"),
			dEnemy("Squirrel","Shut up, ya bumblin' idiots! I think I 'eard someone comin!","Mark"),
			dEnemy("Pig","Pfft. Cancha see we're busy here, Mark? I SAID, GOT ANY JACKS?!?","Pete"),
			dEnemy("Dog","Once again, Petey ol' boy, go fish.","Ted"),
			dEnemy("Squirrel","Ah ferget you. We don't need 'em to pull off dis ambush.","Mark")
		];
		endDialogues = [
			
		];
		break;
	case 5:
		grid = 'ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg gggggggggggggpp ggggggppbpppppg gggggppgggggggg gggpppggggggggg ppppggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ';
		obstacles = [new Obstacle('house1',1,12),new Obstacle("water",8,9),new Obstacle("water",8,10),new Obstacle("water",9,10),new Obstacle("water",9,11),new Obstacle("water",10,11),new Obstacle("water",10,12),new Obstacle("water",10,13),new Obstacle("water",10,14),new Obstacle("water",11,14),new Obstacle("water",8,7),new Obstacle("water",8,6),new Obstacle("water",7,6),new Obstacle("water",7,5),new Obstacle("water",6,5),new Obstacle("water",6,4),new Obstacle("water",5,4),new Obstacle("water",5,3),new Obstacle("water",5,2),new Obstacle("water",5,1),new Obstacle("water",4,1),new Obstacle("water",4,0),new Obstacle("water",5,0),new Obstacle("water",6,0),new Obstacle("water",6,1),new Obstacle("water",6,2),new Obstacle("water",6,3),new Obstacle("water",7,3),new Obstacle("water",7,4),new Obstacle("water",8,4),new Obstacle("water",8,5),
			new Obstacle("water",9,5),new Obstacle("water",9,6),new Obstacle("water",9,9),new Obstacle("water",10,10),new Obstacle("water",11,12),new Obstacle("water",11,11),new Obstacle("water",11,13),new Obstacle("water",12,13),new Obstacle("water",12,14),new Obstacle("house2",9,7),new Obstacle("house3",7,9),new Obstacle("building",7,7),new Obstacle("house1",10,9),new Obstacle("shop",10,7),new Steppable("flag",14,7),new Obstacle("tree",7,1),new Obstacle("tree",8,2),new Obstacle("tree",9,2),new Obstacle("tree",10,1),new Obstacle("tree",3,14),new Obstacle("tree",4,13),new Obstacle("tree",5,13),new Obstacle("tree",6,13),new Obstacle("tree",14,11),new Obstacle("tree",13,11),new Obstacle("tree",2,4),new Obstacle("tree",3,6),new Obstacle("tree",1,7),new Obstacle("tree",13,3),new Obstacle("tree",11,5),
			new Steppable("half-heart",4,14),new Steppable("quarter-heart",14,14),new Steppable("half-heart",4,2),new Steppable("quarter-heart",8,1),];
		enemies = [new Enemy("Chicken",13,8,1,0.25),new Enemy("Sheep",9,1,2),new Enemy("Pig",14,12,2),new Enemy("Squirrel",9,8,2),new Enemy("Cat",9,4,1),];	
		allyPositions = [
			[1,11],
			[0,11],
			[2,10],
			[3,12],
			[0,9]
		];
		startDialogues = [
			dNeutral("Cap'n Squeak","Mouse","Avast! Landlubber! What do you want, you lily-livered fiends?"),
			dCharacter("Actually, we're fighting against those, uh, \"lily-livered fiends.\", captain."),
			dNeutral("Cap'n Squeak","Mouse","Now you are, aren't ya? Good on ya, matey. Anyway what can this old dog do for ya?"),
			dCharacter("Thanks, captain... I was wondering if this is the right way to Bagelsburg."),
			dNeutral("Cap'n Squeak","Mouse","Actually, it is. But you'll have to get through those scurvy fiends 'cross the river."),
			dNeutral("Cap'n Squeak","Mouse","Earlier today I went out to show 'em some manners, but they were too much. That chicken feller attacked me from two spaces away! " +
				"Had me down before I could even touch 'im. Watch out, mateys. Arr."),
			dCharacter("Thanks, captain. And, uh, arr to you too.")
		];
		endDialogues = [
			dNeutral("Cap'n Squeak","Mouse","That was brilliant, matey! Gave 'em the ol' one-two, huh? If I were a youngin' again I'd join ya, but all I can do now is " + 
				"wish ya the best o' luck. Arr!")
		];
		break;
	case 6:
		grid = 'ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggdgggggggccc gggpppgggdggcpc ggppgpppgdggppc ggpggggppppgpgc pppgggggggpppgg gdgggggggggdggg gggggggggggdggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ggggggggggggggg ';
		obstacles = [new Obstacle("house1",13,2),new Obstacle("house2",4,2),new Obstacle("house3",9,3),new Obstacle("house1",11,10),new Obstacle("hotel",1,9),new Obstacle("hydrant",5,3),new Obstacle("hydrant",7,7),new Obstacle("hydrant",11,6),new Obstacle("sign",14,3),new Obstacle("tree",4,7),new Obstacle("tree",4,6),new Obstacle("tree",5,6),new Obstacle("tree",5,7),new Obstacle("tree",11,4),new Obstacle("tree",10,4),new Obstacle("tree",10,5),new Obstacle("tree",11,5),new Obstacle("tree",0,9),new Obstacle("tree",1,10),new Obstacle("tree",2,9),new Steppable("flag",14,4),new Obstacle("tree",0,11),new Obstacle("tree",0,10),new Obstacle("tree",3,10),new Obstacle("tree",3,11),new Obstacle("tree",3,12),new Obstacle("tree",3,13),new Obstacle("tree",2,13),new Steppable("full-heart",1,11),new Steppable("half-heart",6,5),];
		enemies = [new Enemy("Pig",14,5,2),new Enemy("Cow",14,6,2),new Enemy("Dog",13,4,1),new Enemy("Squirrel",2,10,2),new Enemy("Cat",13,3,1),];	
		allyPositions = [
			[0,7],
			[1,7],
			[0,8],
			[1,8],
			[0,6]
		];
		startDialogues = [ 
			dEnemy("Dog","OK, old man, give us all your donuts."),
			dNeutral("Old Man","Panda","Eh? What? Speak up, young whippersnapper, and get off my lawn!"),
			dEnemy("Cat","That's not how you do it, you idiot. This is. Hey, oldie! We want your donuts! All of 'em! Put 'em right here and no one gets hurt!"),
			dCharacter("Hey! Why are you harassing him?"),
			dEnemy("Cat","Because, dunderhead, the Colonel wants us to steal everyone's donuts and beat up some people while we're at it."),
			dCharacter("Why would you do that?"),
			dEnemy("Cat","Beats me, we just do as the Colonel says. He's gives the paychecks, he gives the orders. Now where was I? Oh yeah, HAND 'EM OVER!"),
			dCharacter("Guess I'll have to be the hero...")
		];
		endDialogues = [
			dNeutral("Old Man","Panda","Many thanks, young whatshisface. I was about to use my ability on those hoodlums - you know, hover over your picture, " +
				"some abilities can be, ehhh... what's the word?"),
			dCharacter("Er... Used? Performed? Invoked?"),
			dNeutral("Old Man","Panda","Yes, invoked, that's it, very bright, you are... yes, some abilities can be invoked... you should try it some time... "),
			dNeutral("Old Man","Panda","Anyway, get off my lawn, I'm going for a nap... and tell the meatloaf delivery boy he's late.... Zzzzz...")
		];
		break;
	case 7:
		grid = 'cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc rrrrrrrrrrrrrrr cccccrgggggrccc cccccrgggggrccc cccccrgggggrccc cccccrgggggrccc cccccrgggggrccc rrrrrrrrrrrrrrr cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc ';
		obstacles = [new Steppable("flag",5,14),new Obstacle("sign",6,0),new Obstacle("water",7,7),new Obstacle("water",8,6),new Obstacle("water",8,7),new Obstacle("water",9,7),new Obstacle("water",10,7),new Obstacle("water",10,8),new Obstacle("water",9,8),new Obstacle("water",9,9),new Obstacle("water",7,9),new Obstacle("water",8,9),new Obstacle("water",7,8),new Obstacle("water",8,8),new Obstacle("water",7,10),new Obstacle("water",6,10),new Obstacle("water",6,9),new Obstacle("tree",10,10),new Obstacle("tree",9,10),new Obstacle("tree",10,9),new Obstacle("tree",6,7),new Obstacle("tree",6,6),new Obstacle("tree",7,6),new Obstacle("building",3,4),new Obstacle("building",10,2),new Obstacle("building",13,6),new Obstacle("building",12,12),new Obstacle("building",8,12),new Obstacle("building",1,10),new Obstacle("hydrant",6,4),new Obstacle("hydrant",4,12),new Obstacle("hydrant",12,10),new Obstacle("hydrant",12,4),new Obstacle("hotel",10,0),new Obstacle("hotel",1,4),new Obstacle("hotel",1,12),new Obstacle("hotel",10,14),new Obstacle("shop",14,6),new Obstacle("shop",13,4),new Obstacle("shop",12,6),new Obstacle("shop",12,6),new Obstacle("shop",6,2),new Obstacle("bank",8,4),new Obstacle("bank",4,8),new Steppable("half-heart",8,3),new Steppable("quarter-heart",5,7),];
		enemies = [new Enemy("Cat",8,10,1,0.5),new Enemy("Sheep",13,7,2),new Enemy("Dog",0,11,2),new Enemy("Cow",8,5,2),new Enemy("Squirrel",2,2,2),];	
		allyPositions = [
			[8,1],
			[8,2],
			[7,2],
			[9,2],
			[8,0]
		];
		startDialogues = [
			dSign("Welcome to Bagelsburg, home of the Bagelsburg Pastries baseball club!"),
			dCharacter("OK, I know my grandma lives on the far side of town. But which way should I go?"),
			dEnemy("Cat","Someone's here! Get ready, everyone!"),
			dEnemy("Sheep","Huh? What? Is it lunch time already?")
		];
		endDialogues = [
			dCharacter("Is that... it is! There's my grandma's house over there! It's still standing, which is a good sign.")
		];
		background = 'concrete';
		break;
	case 8:
		grid = 'cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc rrrrrrrrrrrrrrr cccccrcccccrccc cccccrcccccrccc cccccrcccccrccc cccccrcccccrddd gccccrcccccddgg gccccrcccccdggg ggcccrccccddggg gggccpccccdgggg gggggpggggdgggg ';
		obstacles = [new Steppable("flag",5,14),new Obstacle("water",14,10),new Obstacle("water",13,10),new Obstacle("water",13,11),new Obstacle("water",14,11),new Obstacle("water",12,11),new Obstacle("water",12,12),new Obstacle("water",12,14),new Obstacle("water",11,13),new Obstacle("water",11,14),new Obstacle("water",12,13),new Obstacle("water",14,12),new Obstacle("water",13,12),new Obstacle("water",13,13),new Obstacle("water",14,13),new Obstacle("water",14,14),new Obstacle("water",13,14),new Obstacle("house1",6,13),new Obstacle("house1",4,8),new Obstacle("house1",10,3),new Obstacle("house2",12,4),new Obstacle("house2",4,2),new Obstacle("house2",1,6),new Obstacle("house2",10,8),new Obstacle("house2",12,1),new Obstacle("building",6,0),new Obstacle("building",0,0),new Obstacle("hotel",0,3),new Obstacle("hotel",13,0),new Obstacle("shop",6,7),new Obstacle("shop",8,6),new Obstacle("shop",12,7),new Steppable("full-heart",0,1),new Steppable("half-heart",12,10),new Steppable("full-heart",14,0),];
		enemies = [new Enemy("Chicken",11,5,2,0.5),new Enemy("Chicken",5,5,2,0.2),new Enemy("Cat",5,9,2,0.2),new Enemy("Chicken",11,9,2),new Enemy("Dog",10,9,2,0.25),];	
		allyPositions = [
			[5,0],
			[11,0],
			[0,5],
			[14,5],
			[8,2],
		];
		startDialogues = [
			dCharacter("Grandma! There you are! Are you OK?"),
			dNeutral("Grandma","Elephant","How nice to see my favorite grandson! My, you've grown! Come inside and have some fresh-baked peanut butter cookies!"),
			dCharacter("You know I'm allergic to peanuts, grandma. But anyway, did any thugs bother you today?"),
			dNeutral("Grandma","Elephant","Why, no, I haven't had a visitor all day. Actually, one young man - I think he was a chicken - showed up. I offered him some of my " +
				"homestyle chicken wings - you know how popular those are - and he screamed and ran away! How very impolite!"),
			dCharacter("Well, as long as you're OK. Do you know where the guy who's in charge is?"),
			dEnemy("Chicken","Quick! Someone's here! And he's talking to that crazy old lady! Someone call the Colonel! He's on the pier!"),
			dNeutral("Grandma","Elephant","I think the pier's to the south. But why is it bothering you? Come in and have a cookie!"),
			dCharacter("Sorry, Grandma, I can't. I've got to have a word with this Colonel guy.")
		];
		endDialogues = [
			dNeutral("Grandma","Elephant","Nice job! Are you sure you don't want a cookie?"),
			dCharacter("Maybe later, grandma. At least, after I go talk to the Colonel guy on the pier."),
			dNeutral("Grandma","Elephant","Don't get yourself hurt!")
		];
		background = 'concrete';
		break;
	 case 9:
		grid = 'gggggpggddggggg gggggpgggddgggg gggggpggggddggg gggggpgggggdggg gggggpgggggddgg gggggpggggggddg gpppppppppppppg gpgggpgggpgggpg gpgggpgggpgggpg gBgggBgggBgggBg gBgggBgggBgggBg gBgggBgggBgggBg gggggggggBggggg ggggggggdddgggg ggggggggdddgggg ';
		obstacles = [new Obstacle("water",10,0),new Obstacle("water",12,0),new Obstacle("water",11,0),new Obstacle("water",11,1),new Obstacle("water",12,1),new Obstacle("water",13,1),new Obstacle("water",13,0),new Obstacle("water",14,0),new Obstacle("water",14,1),new Obstacle("water",14,2),new Obstacle("water",13,2),new Obstacle("water",12,2),new Obstacle("water",12,3),new Obstacle("water",13,3),new Obstacle("water",14,3),new Obstacle("water",13,4),new Obstacle("water",14,4),new Obstacle("water",14,5),new Obstacle("water",14,6),new Obstacle("water",14,7),new Obstacle("water",14,8),new Obstacle("water",14,9),new Obstacle("water",14,10),new Obstacle("water",14,11),new Obstacle("water",14,12),new Obstacle("water",14,14),new Obstacle("water",14,13),new Obstacle("water",13,12),new Obstacle("water",13,13),new Obstacle("water",13,14),new Obstacle("water",12,14),new Obstacle("water",11,14),new Obstacle("water",11,13),new Obstacle("water",11,12),new Obstacle("water",12,12),new Obstacle("water",12,13),new Obstacle("water",10,9),new Obstacle("water",11,9),new Obstacle("water",12,9),new Obstacle("water",12,11),new Obstacle("water",12,10),new Obstacle("water",11,10),new Obstacle("water",10,10),new Obstacle("water",10,11),new Obstacle("water",11,11),new Obstacle("water",10,12),
			new Obstacle("water",0,9),new Obstacle("water",0,10),new Obstacle("water",0,12),new Obstacle("water",0,11),new Obstacle("water",0,13),new Obstacle("water",0,14),new Obstacle("water",1,14),new Obstacle("water",1,13),new Obstacle("water",1,12),new Obstacle("water",2,12),new Obstacle("water",2,11),new Obstacle("water",2,10),new Obstacle("water",2,9),new Obstacle("water",3,9),new Obstacle("water",4,9),new Obstacle("water",4,10),new Obstacle("water",3,10),new Obstacle("water",3,11),new Obstacle("water",3,12),new Obstacle("water",3,13),new Obstacle("water",2,13),new Obstacle("water",2,14),new Obstacle("water",3,14),new Obstacle("water",4,14),new Obstacle("water",4,13),new Obstacle("water",4,12),new Obstacle("water",4,11),new Obstacle("water",5,12),new Obstacle("water",6,9),new Obstacle("water",6,10),new Obstacle("water",6,11),new Obstacle("water",6,12),new Obstacle("water",5,13),new Obstacle("water",6,13),new Obstacle("water",6,14),new Obstacle("water",5,14),new Obstacle("water",7,9),new Obstacle("water",8,9),new Obstacle("water",8,10),new Obstacle("water",7,10),new Obstacle("water",7,11),new Obstacle("water",8,11),new Obstacle("water",8,12),new
			Obstacle("water",7,12),new Obstacle("water",7,13),new Obstacle("water",7,14),new Steppable("flag",9,14),new Steppable("half-heart",1,11),new Steppable("half-heart",5,11),new Steppable("half-heart",13,11),new Steppable("full-heart",5,0),new Steppable("secret-entrance",5,6)];
		enemies = [
			new Boss("Chicken","Colonel Fried Chicken",9,13,3)
		];
		allyPositions = [
			[5,1],
			[6,1],
			[4,1],
			[6,0],
			[4,0]
		];
		startDialogues = [
			dCharacter("Hey! Mr. Colonel! What's the reason for all these goons? And why are they stealing all the donuts, anyway?"),
			dEnemy("Chicken","Whoa whoa whoa, watch who you're accusing. I'm just doing as Dr. Llama said.","Colonel Fried Chicken"),
			dCharacter("Who's that?"),
			dEnemy("Chicken","Why, he's the evil mastermind who's trying to steal all the world's donuts, of course! Don't tell me you don't know him!","Colonel Fried Chicken"),
			dCharacter("Well, uh, I don't, sorry."),
			dEnemy("Chicken","Oh. Uh, let me look at my script... doesn't say anything for this situation... guess I gotta ad lib.","Colonel Fried Chicken"),
			dEnemy("Chicken","Um, yeah! Why have you been attacking all my goons? They're very expensive, you know. And, uh, I think this means I get to fight you! Awesome!","Colonel Fried Chicken")
		];
		endDialogues = [
			dNeutral("Jamie","Triceratops","Beat reporter Jamie of WXIP-940 here with the hero of the day, mister, uh, Haddix? Hateex? Atiks?"),
			dCharacter("Er, no, it's just hathix..."),
			dNeutral("Jamie","Triceratops","Right, so, Mr. Haddix, is it true you are now going to the evil Dr. Llama's lair in East Sprinklestan to face him yourself?"),
			dNeutral("The Mayor","Rhino","Of course it is, isn't it, Mr. Atiks? And that's why I've booked you an all-expenses-paid trip to and from East Sprinklestan!"),
			dNeutral("Jamie","Triceratops","Mr. Mayor! How nice to see you! This will make an excellent photo-op! AND tweet!"),
			dNeutral("Jamie","Triceratops","<i>Currently with town hero Haddix and the Mayor! #mustfakesmile #15minutesalmostover</i>"),
			dNeutral("The Mayor","Rhino","As I was saying, Mr. Atiks, you'll be going to East Sprinklestan in style... on a luxury YACHT, " +
				"headed by the lovely Captain May! And there she is now!"),
			dNeutral("Captain May","Hippo","I'll take it from here, Mayor. You and your friends can come with me, Mr. Hathix. I'm sure you want to leave as much as I do."),
			dCharacter("Thanks... I'm not a big fan of the media either."),
			dNeutral("Captain May","Hippo","I figured. Come on, let's get going. We'll stop briefly in North Icington, but we should be there in a day or so."),
			dCharacter("Actually, I-"),
			dNeutral("Captain May","Hippo","If you don't want to do this - and I don't blame you - I can take you home."),
			dCharacter("Well, after seeing all the damage and terror Llama's goons have created, I'd like to go visit him and get him to call them off."),
			dNeutral("Captain May","Hippo","Righto. Full speed ahead!")
		];
		break;
	case SECRET_STAGE:
		grid = 'ddddddddddddddd ddddddddgdddddd dddWdddgggddddd ddddddddgdddWdd ddddddddddddddd ddddddddddddddd ddddddWdddddddd ddddddddddddddd dddWddddddWdddd dddddWddddddWdd WddddddWdWddddW WdWdddWWWWWdWdW WWddWdWWWdWddWW WWWddddgWdddWWW WWWWWddWWWWWWWW ';
		obstacles = [new Obstacle("cave-wall",0,4),new Obstacle("cave-wall",1,4),new Obstacle("cave-wall",2,4),new Obstacle("cave-wall",12,6),new Obstacle("cave-wall",12,7),new Obstacle("cave-wall",13,7),new Obstacle("cave-wall",14,7),new Obstacle("cave-wall",5,6),new Obstacle("cave-wall",5,7),new Obstacle("cave-wall",5,8),new Obstacle("cave-wall",6,8),new Obstacle("cave-wall",11,0),new Obstacle("cave-wall",11,1),new Obstacle("cave-wall",11,2),new Obstacle("barrel",2,9),new Obstacle("barrel",8,5),new Obstacle("barrel",8,9),new Steppable("flag",7,13),new Steppable("half-heart",1,7),new Steppable("half-heart",10,7),];
		enemies = [new Enemy("Kangaroo",4,9,2,0.5),new Enemy("Kangaroo",9,12,2,0.5),new Enemy("Monkey",5,4,2,0.2),new Enemy("Dog",8,6,2,0.2),new Enemy("Bunny",13,1,2,0.2),];
		allyPositions = [[8,3],[7,2],[9,2],[8,1],[8,2]];
		startDialogues = [
			dCharacter("Oof. Wh- what just happened? How'd I get down here?"),
			dNeutral("Serendiputously Placed Bystander","Ostrich","Good question. More importantly, how'd <em>I</em> get down here?'"),
			dEnemy("Monkey","Yeah, man! I'm supposed to be found in level, er, 4-2, yet I'm in this dump... what gives?"),
			dCharacter("I think we can all agree that the guy who coded this game was probably in the midst of a caffeine-induced fervor when he threw this piece of junk level together."),
			dNeutral("Extremely Innocent Bystander","TRex","I concur. Listen, instead of complaining, how about you just, you know, fight? Cause that's the reason I came down here in the first place. I think.")
		];
		endDialogues = [
			dCharacter("Well, there's the surface again. Strange place, this."),
			dNeutral("Extremely Innocent Bystander","Trex","Once again, I concur. Now get back to what you were doing before. Also, what happens in secret levels stays in secret levels. Remember that.")
		];
		break;
	}
	
	return new Level(1,levelNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly);
}));

/** CUTSCENE 

grid = 'ppgggggggggWWWW gppWWgggWWWgWWW ggpWgggggWWggWW ggppppggggggWgW gggggpgggggWggW gggWgpggWWWggWW gggggpgWWggggWW WWgggppbppgggWW gWggggWWgppggWW ggWWWWWgggpgggW gggWWgggggppccW gggggggggggcccc gWWggggWgggcccc ggggggWggWWWccc ggggggggWWWWWBW ';
obstacles = [new Obstacle("tree",4,5),new Obstacle("tree",4,4),new Obstacle("tree",6,4),new Obstacle("tree",7,4),new Obstacle("tree",7,5),new Obstacle("tree",6,5),new Obstacle("tree",6,6),new Obstacle("tree",3,6),new Obstacle("tree",4,6),new Obstacle("tree",4,7),new Obstacle("tree",6,3),new Obstacle("tree",4,2),new Obstacle("tree",5,2),new Obstacle("tree",3,4),new Obstacle("tree",7,3),new Obstacle("tree",6,2),new Obstacle("tree",7,2),new Obstacle("tree",8,3),new Obstacle("tree",8,4),new Obstacle("tree",3,7),new Obstacle("tree",3,14),new Obstacle("tree",3,13),new Obstacle("tree",5,12),new Obstacle("tree",0,14),new Obstacle("tree",0,10),new Obstacle("tree",12,6),new Obstacle("tree",12,5),new Obstacle("tree",0,1),new Obstacle("tree",6,0),new Obstacle("tree",8,10),new Obstacle("tree",12,8),new Obstacle("house1",0,0),new Obstacle("house2",1,2),new Obstacle("house3",2,4),new Obstacle("house2",9,9),new Obstacle("building",12,11),new Obstacle("building",14,12),new Obstacle("hotel",12,13),new Obstacle("bank",11,12),new Obstacle("shop",14,13),];

*/