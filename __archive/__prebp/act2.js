 /**
	Act 2, Icing Over
*/

acts.push(new Act(2,function(levelNum){
	var grid;
	var background = 'snow';
	var obstacles;
	var enemies;
	var allyPositions;
	var startDialogues;
	var endDialogues;
	var newAlly;
	
	switch(levelNum){
	case 1:
	grid = 'sssssssssspssss sssssssssspssss sssspppppppssss sssssssssspssps sssssssssspssps sssssssspppppps sssssppppssssps ssssspsssssssps ssssspppsssssps spppppsssssssss ssssspsssssssss sssssBsssssssss sssssBsssssssss sssssBsssssssss sssssssssssssss ';
	obstacles = [new Obstacle("water",0,10),new Obstacle("water",1,10),new Obstacle("water",1,11),
		new Obstacle("water",2,11),new Obstacle("water",3,11),new Obstacle("water",4,11),new Obstacle("water",6,11),new Obstacle("water",7,11),new Obstacle("water",7,10),new Obstacle("water",8,10),new Obstacle("water",8,9),new Obstacle("water",9,9),new Obstacle("water",10,9),new Obstacle("water",11,9),new Obstacle("water",11,10),new Obstacle("water",12,10),new Obstacle("water",12,11),new Obstacle("water",13,11),new Obstacle("water",13,12),new Obstacle("water",14,12),new Obstacle("water",14,13),new Obstacle("water",14,14),new Obstacle("water",13,14),new Obstacle("water",13,13),new Obstacle("water",12,13),new Obstacle("water",12,14),
		new Obstacle("water",11,13),new Obstacle("water",11,12),new Obstacle("water",12,12),new Obstacle("water",11,11),new Obstacle("water",10,11),new Obstacle("water",10,10),new Obstacle("water",9,10),new Obstacle("water",9,11),new Obstacle("water",8,11),new Obstacle("water",8,12),new Obstacle("water",9,12),new Obstacle("water",10,12),new Obstacle("water",10,13),new Obstacle("water",10,14),new Obstacle("water",11,14),new Obstacle("water",9,14),new Obstacle("water",8,14),new Obstacle("water",8,13),new Obstacle("water",9,13),new Obstacle("water",7,12),new Obstacle("water",6,12),new Obstacle("water",6,13),new Obstacle("water",7,13),
		new Obstacle("water",7,14),new Obstacle("water",6,14),new Obstacle("water",5,14),new Obstacle("water",4,14),new Obstacle("water",4,13),new Obstacle("water",4,12),new Obstacle("water",3,12),new Obstacle("water",2,12),new Obstacle("water",1,12),new Obstacle("water",0,12),new Obstacle("water",0,13),new Obstacle("water",0,14),new Obstacle("water",1,14),new Obstacle("water",1,13),new Obstacle("water",2,13),new Obstacle("water",2,14),new Obstacle("water",3,14),new Obstacle("water",3,13),new Obstacle("water",0,11),new Obstacle("house2",3,2),new Obstacle("house2",13,9),new Obstacle("house3",8,8),new Obstacle("house3",13,2),
		new Obstacle("house1",8,4),new Obstacle("hydrant",11,6),new Obstacle("hydrant",4,6),new Obstacle("hydrant",5,5),new Obstacle("shop",1,8),new Obstacle("shop",2,8),new Obstacle("shop",3,10),new Obstacle("hotel",7,1),new Obstacle("building",14,4),new Obstacle("house2",6,1),new Obstacle("tree",2,5),new Obstacle("tree",1,3),new Obstacle("tree",4,0),new Obstacle("tree",13,1),new Obstacle("tree",11,4),new Obstacle("tree",9,7),new Obstacle("tree",14,10),new Obstacle("tree",6,9),new Obstacle("tree",6,10),new Obstacle("tree",7,9),
		new Steppable("flag",10,0),new Steppable("full-heart",11,3),new Steppable("half-heart",3,4), new Steppable("quarter-heart",12,9)];
		enemies = [new Enemy("Bear",5,6,2,1),new Enemy("Bear",5,13,2),new Enemy("Elk",5,11,3),new Enemy("Elk",5,12,3),new Enemy("Duck",14,9,3),new Enemy("Duck",14,3,3)];
		allyPositions = [ 
			[7,2],
			[6,2],
			[4,2],
			[8,3],
			[3,3],
			];
		startDialogues = [
			dNeutral("Captain May","Hippo","OK guys, we're here in North Icington! Get off and stretch your legs while the ship gets fueled up."),
			dEnemy("Bear","Ahem. Good evening madam, we are the Fuel Men-"),
			dEnemy("Elk","I thought we were the Destruction Men-","Elk #1"),
			dEnemy("Bear","-and we are here to, ahem, fuel up your ship. If you would so kindly step off the boat."),
			dNeutral("Captain May","Hippo","Sure. I'll be at the coffee shop over there. Let me know when you're done."),
			dEnemy("Bear","OK, quick, guys! Take all the donuts from the ship! Scan every corner! GET A MOVE ON!"),
			dEnemy("Elk","Duh... boss... can we's destroy dem boat when we's done?","Elk #2"),
			dEnemy("Bear","Yeah, sure, whatever, just get all the donuts!"),
			dNeutral("Captain May","Hippo","Hey! What do you think you're doing?!?"),
			dEnemy("Elk","All done, boss, but we didn't find any donuts.","Elk #1"),
			dEnemy("Elk","And I's destroyed de boat, boss... just like you said, boss...","Elk #2"),
			dEnemy("Bear","No donuts? Grr. But let's get out of here before that fat rhino and her pachyderm friend find out."),
			dNeutral("Captain May","Hippo","Hey! I am NOT a rhino! I'll show you!"),
			dEnemy("Duck","Duckworth to Bearforth, do you read? The rhinoceros has been restrained. Over."),
			dCharacter("Hey! Quick, guys! Get them before they get away!")
			];
		endDialogues = [
			dCharacter("Well, the boat's gone, so how are we supposed to get to East Sprinklestan now?"),
			dNeutral("Captain May","Hippo","The next boat is supposed to arrive here in a few weeks. You can wait here until then."),
			dCharacter("We can't waste any time! We have to get to East Sprinklestan as soon as possible."),
			dNeutral("Waitress","Squirrel","I think some kids at Frosting University - that's just north of here - were building a teleporter. You can try that."),
			dCharacter("Well, it sure beats waiting around here. Do you want to come along, May?"),
			dNeutral("Captain May","Hippo","Sorry, I've got to wait here until the next boat comes, boss's orders. Good luck!")
		];
		break;
	case 2:
		grid = 'sssssssssspssss sssssssssspssss sssssssssppssss ssssssppppsssss sssssspssssssss sssssspssssssss sssssspssssssss ssssssppsssssss ssssssspsssssss sssssssppssssss sssssssspssssss sssssssspssssss sssssssspssssss sssssssspssssss sssssssspssssss ';
		obstacles = [new Obstacle("sign",7,12),new Obstacle("house1",9,12),new Obstacle("water",9,0),new Obstacle("water",9,1),new Obstacle("water",11,1),new Obstacle("water",11,0),new Obstacle("water",8,0),new Obstacle("water",12,0),new Obstacle("house3",5,5),new Obstacle("house2",8,8),new Obstacle("tree",2,8),new Obstacle("tree",3,8),new Obstacle("tree",4,8),
			new Obstacle("tree",11,5),new Obstacle("tree",12,5),new Obstacle("tree",13,5),new Steppable("flag",10,0),new Steppable("full-heart",3,6),new Steppable("full-heart",12,3),new Steppable("half-heart",10,12),];
		enemies = [new Enemy("Beaver",3,7,2),new Enemy("Penguin",12,4,3),new Enemy("Penguin",8,7,3),new Enemy("Duck",6,3,3),new Enemy("Bear",10,1,3),];	
		allyPositions = [
			[8,12],
			[7,13],
			[9,13],
			[1,14],
			[14,14]
		];
		startDialogues = [
			dSign("Bridge to Frosting University, that way."),
			dEnemy("Penguin","*snicker* wait till he sees what we've done with it..."),
			dCharacter("This looks like the right way... but again, what are these goons doing here? It's like that Llama guy has sent them all over the world...")
		];
		endDialogues = [

		];
		break;
	case 3:
		grid = 'ssssssBBsssssss ssssssBBsssssss sssssssssssssss ssssssBssssssss ssssssBBsssssss ssssssBBsssssss ssssssBBsssssss ssssssBBsssssss ssssssBBsssssss ssssssBBsssssss ssssssspsssssss ssssssspsssssss ssssssspsssssss ssssssspsssssss ssssssspsssssss ';
		obstacles = [new Obstacle("water",6,14),new Obstacle("water",5,14),new Obstacle("water",6,13),new Obstacle("water",8,13),new Obstacle("water",8,14),new Obstacle("water",9,14),new Obstacle("water",6,2),new Obstacle("water",7,2),new Obstacle("water",7,3),new Obstacle("water",8,2),new Obstacle("water",9,2),new Obstacle("water",10,2),new Obstacle("water",11,2),
			new Obstacle("water",12,2),new Obstacle("water",8,3),new Obstacle("water",9,3),new Obstacle("water",10,3),new Obstacle("water",10,1),new Obstacle("water",11,1),new Obstacle("water",12,1),new Obstacle("water",12,0),new Obstacle("water",13,0),new Obstacle("water",13,1),new Obstacle("water",5,2),new Obstacle("water",5,3),new Obstacle("water",4,3),new Obstacle("water",4,4),new Obstacle("water",3,4),
			new Obstacle("water",3,5),new Obstacle("water",2,5),new Obstacle("water",2,6),new Obstacle("water",1,6),new Obstacle("water",1,5),new Obstacle("water",0,5),new Obstacle("water",0,6),new Obstacle("water",5,4),new Obstacle("water",4,5),new Obstacle("water",3,6),new Obstacle("water",11,3),new Obstacle("water",11,0),new Obstacle("water",0,7),new Obstacle("water",1,7),new Obstacle("sign",6,11),
			new Obstacle("house2",8,10),new Obstacle("water",5,5),new Obstacle("water",5,6),new Obstacle("water",4,6),new Obstacle("water",4,7),new Obstacle("water",5,7),new Obstacle("water",5,8),new Obstacle("water",5,9),new Obstacle("water",4,9),new Obstacle("water",4,8),new Obstacle("water",2,8),new Obstacle("water",3,8),new Obstacle("water",3,7),new Obstacle("water",2,7),new Obstacle("water",1,8),
			new Obstacle("water",0,8),new Obstacle("water",0,9),new Obstacle("water",1,9),new Obstacle("water",2,9),new Obstacle("water",3,9),new Obstacle("water",1,10),new Obstacle("water",2,10),new Obstacle("water",3,10),new Obstacle("water",8,4),new Obstacle("water",8,5),new Obstacle("water",8,6),new Obstacle("water",8,7),new Obstacle("water",8,8),new Obstacle("water",8,9),new Obstacle("water",9,8),
			new Obstacle("water",9,7),new Obstacle("water",9,6),new Obstacle("water",9,5),new Obstacle("water",9,4),new Obstacle("water",10,4),new Obstacle("water",10,5),new Obstacle("water",11,5),new Obstacle("water",11,4),new Obstacle("water",10,6),new Obstacle("water",12,3),new Obstacle("water",12,4),new Obstacle("water",13,3),new Obstacle("water",13,2),new Obstacle("water",14,2),new Obstacle("water",14,1),
			new Obstacle("water",14,0),new Obstacle("tree",14,9),new Obstacle("tree",13,9),new Obstacle("tree",13,11),new Obstacle("tree",14,11),new Obstacle("tree",14,12),new Obstacle("tree",13,10),new Obstacle("tree",14,10),new Obstacle("tree",14,3),new Obstacle("tree",13,4),new Obstacle("tree",14,5),new Obstacle("tree",13,6),new Obstacle("tree",12,5),new Obstacle("tree",11,6),new Obstacle("tree",11,7),
			new Obstacle("tree",13,7),new Obstacle("tree",13,5),new Obstacle("tree",14,4),new Obstacle("tree",12,6),new Obstacle("tree",12,7),new Obstacle("tree",14,7),new Obstacle("tree",14,6),new Obstacle("tree",12,9),new Obstacle("tree",11,9),new Obstacle("tree",10,7),new Obstacle("tree",9,9),new Obstacle("tree",9,10),new Obstacle("tree",12,10),new Obstacle("tree",12,11),new Obstacle("tree",11,11),new Obstacle("tree",11,10),new Steppable("flag",14,8),new Steppable("half-heart",6,3),new Steppable("half-heart",0,10),new Steppable("quarter-heart",6,10),];
		enemies = [new Enemy("Penguin",6,4,3),new Enemy("Penguin",7,4,3),new Enemy("Penguin",6,1,3,0.5),new Enemy("Penguin",7,1,3,0.5),new Enemy("Beaver",7,9,3),];	
		allyPositions = [
			[7,11],
			[6,12],
			[5,13],
			[8,12],
			[9,13]
		];
		startDialogues = [
			dSign("SMELLY WUZ HERE"),
			dCharacter("SMELLY? What's that?"),
			dNeutral("Madison","Sheep","Not SMELLY, S.M.E.L.L.Y! As in, the Society for Meaningless Evil, Larceny, Lying, and Yelling! Don't you know who they are?"),
			dCharacter("Not really, sorry."),
			dNeutral("Madison","Sheep","They're a bunch of young good-for-nothings who go around and vandalize stuff. Like this bridge."),
			dCharacter("That's just great. How am I supposed to get to Frosting University now?"),
			dNeutral("Madison","Sheep","You want to go to Frosting U? I think there's a side path through the forest over there. I hear it takes you through a cave, though, " +
				"so go at your own risk."),
			dEnemy("Beaver","Hey! I've spotted someone coming! Get over here! And you lot across the river, don't pretend you don't know how to swim!"),
			dEnemy("Penguin","Yeah, yeah, OK. I only joined S.M.E.L.L.Y for the free food, anyway.")
		];
		endDialogues = [
		
		];
		break;
	case 4:
		grid = 'ssssssssssssddd ssssssssssssddd sssssssssssssdd sssssssssssssss sssssssssssssss sssssssssssssss sssssssssssssss ssssssspsssssss ssssspsssssssss sssssssssssssss sssspssssssssss sspssssssssssss spsssssssssssss ppsssssssssssss sssssssssssssss ';
		obstacles = [new Steppable("flag",14,0),new Obstacle("tree",2,2),new Obstacle("tree",3,3),new Obstacle("tree",12,8),new Obstacle("tree",8,11),new Obstacle("tree",8,13),new Obstacle("tree",5,13),new Obstacle("tree",5,12),new Obstacle("tree",11,12),new Obstacle("tree",11,10),new Obstacle("tree",13,11),new Obstacle("tree",12,13),new Obstacle("tree",11,14),new Obstacle("tree",9,1),new Obstacle("tree",7,3),new Obstacle("tree",10,4),new Obstacle("tree",13,5),new Obstacle("tree",8,6),new Obstacle("tree",2,7),new Obstacle("tree",0,4),
			new Obstacle("tree",2,10),new Obstacle("tree",0,10),new Obstacle("tree",3,14),new Obstacle("tree",3,12),new Obstacle("tree",5,0),new Obstacle("tree",5,5),new Obstacle("tree",5,6),new Obstacle("tree",7,6),new Obstacle("tree",7,5),new Steppable("half-heart",7,7),new Steppable("half-heart",0,11),new Steppable("half-heart",13,0),];
		enemies = [new Enemy("Goat",3,2,3),new Enemy("Duck",12,11,4),new Enemy("Bear",13,1,3),new Enemy("Elk",7,9,3),new Enemy("Elk",5,8,3),];
		allyPositions = [
			[2,11],
			[4,13],
			[1,10],
			[0,14],
			[4,10]
		];
		startDialogues = [
			dEnemy("Duck","QUACK! QUACK! QUACK! Phew, that's tiring..."),
			dEnemy("Goat","You idiot, don't you know you can only use your ability so many times per level? Quit wasting it!"),
			dEnemy("Duck","Yeah, yeah, OK... now stop trying to impress the Elks with your Spin Attack. Didn't you say something about not wasting your ability?"),
			dEnemy("Bear","*snicker*")
		];
		endDialogues = [
		
		];
		break;
	case 5:
		grid = 'ddddddsssdddddd dddddddsddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd dddddddsddddddd ddddddsssdddddd ';
		obstacles = [new Obstacle("cave-wall",6,9),new Obstacle("cave-wall",6,10),new Obstacle("cave-wall",6,11),new Obstacle("cave-wall",6,12),new Obstacle("cave-wall",6,13),new Obstacle("cave-wall",8,13),new Obstacle("cave-wall",8,12),new Obstacle("cave-wall",8,11),new Obstacle("cave-wall",8,9),new Obstacle("cave-wall",8,8),new Obstacle("cave-wall",6,8),new Obstacle("cave-wall",6,7),new Obstacle("cave-wall",8,6),new Obstacle("cave-wall",8,7),new Obstacle("cave-wall",8,5),new Obstacle("cave-wall",6,5),new Obstacle("cave-wall",9,9),
			new Obstacle("cave-wall",10,9),new Obstacle("cave-wall",9,11),new Obstacle("cave-wall",10,11),new Obstacle("cave-wall",11,9),new Obstacle("cave-wall",12,9),new Obstacle("cave-wall",14,9),new Obstacle("cave-wall",14,11),new Obstacle("cave-wall",13,11),new Obstacle("cave-wall",12,11),new Obstacle("cave-wall",12,8),new Obstacle("cave-wall",14,8),new Obstacle("cave-wall",14,7),new Obstacle("cave-wall",14,6),new Obstacle("cave-wall",12,6),new Obstacle("cave-wall",12,5),new Obstacle("cave-wall",11,6),new Obstacle("cave-wall",9,6),
			new Obstacle("cave-wall",9,5),new Obstacle("cave-wall",11,5),new Obstacle("cave-wall",11,4),new Obstacle("cave-wall",9,4),new Obstacle("cave-wall",9,3),new Obstacle("cave-wall",9,2),new Obstacle("cave-wall",11,2),new Obstacle("cave-wall",9,1),new Obstacle("cave-wall",10,1),new Obstacle("cave-wall",11,1),new Obstacle("cave-wall",12,2),new Obstacle("cave-wall",12,4),new Obstacle("cave-wall",13,4),new Obstacle("cave-wall",14,4),new Obstacle("cave-wall",14,3),new Obstacle("cave-wall",14,2),new Obstacle("cave-wall",14,1),
			new Obstacle("cave-wall",14,0),new Obstacle("cave-wall",13,0),new Obstacle("cave-wall",10,12),new Obstacle("cave-wall",10,13),new Obstacle("cave-wall",10,14),new Obstacle("cave-wall",11,14),new Obstacle("cave-wall",12,14),new Obstacle("cave-wall",13,14),new Obstacle("cave-wall",14,14),new Obstacle("cave-wall",14,13),new Obstacle("cave-wall",14,12),new Obstacle("cave-wall",6,2),new Obstacle("cave-wall",7,2),new Obstacle("cave-wall",8,2),new Obstacle("cave-wall",6,3),new Obstacle("cave-wall",5,3),new Obstacle("cave-wall",4,3),
			new Obstacle("cave-wall",4,5),new Obstacle("cave-wall",5,5),new Obstacle("cave-wall",5,7),new Obstacle("cave-wall",4,7),new Obstacle("cave-wall",3,5),new Obstacle("cave-wall",3,3),new Obstacle("cave-wall",2,5),new Obstacle("cave-wall",1,3),new Obstacle("cave-wall",1,5),new Obstacle("cave-wall",0,3),new Obstacle("cave-wall",0,4),new Obstacle("cave-wall",0,5),new Obstacle("cave-wall",1,2),new Obstacle("cave-wall",1,1),new Obstacle("cave-wall",1,0),new Obstacle("cave-wall",2,0),new Obstacle("cave-wall",3,0),new Obstacle("cave-wall",3,1),
			new Obstacle("cave-wall",3,2),new Obstacle("cave-wall",3,7),new Obstacle("cave-wall",0,7),new Obstacle("cave-wall",0,8),new Obstacle("cave-wall",2,7),new Obstacle("cave-wall",2,8),new Obstacle("cave-wall",2,9),new Obstacle("cave-wall",3,9),new Obstacle("cave-wall",0,9),new Obstacle("cave-wall",0,10),new Obstacle("cave-wall",0,11),new Obstacle("cave-wall",5,9),new Obstacle("cave-wall",1,11),new Obstacle("cave-wall",2,11),new Obstacle("cave-wall",4,11),new Obstacle("cave-wall",5,11),new Obstacle("cave-wall",2,12),new Obstacle("cave-wall",2,14),
			new Obstacle("cave-wall",4,12),new Obstacle("cave-wall",4,13),new Obstacle("cave-wall",4,14),new Steppable("flag",7,0),new Obstacle("water",0,12),new Obstacle("water",1,14),new Obstacle("water",0,14),new Obstacle("water",1,12),new Steppable("full-heart",0,13),new Steppable("full-heart",4,8),new Steppable("half-heart",8,3),new Steppable("half-heart",13,13),];
		enemies = [new Enemy("Bear",1,13,3),new Enemy("Elk",13,8,4),new Enemy("Goat",5,4,3),new Enemy("Duck",7,10,4),new Enemy("Owl",10,5,3),new Enemy("Goat",13,2,3),];
		background = 'dirt';
		allyPositions = [
			[7,12],
			[7,13],
			[7,14],
			[6,14],
			[8,14]
		];
		startDialogues = [
			dEnemy("Duck","HEY! Watch where you're going!"),
			dCharacter("Oh, er, sorry about that. And, uh, what are you doing in here?"),
			dEnemy("Duck","Why, I just so happen to be delivering a very important shipment of donuts - which I stole myself - to STINKY. So please, get out of my way, elephant."),
			dCharacter("STINKY? Who's that?"),
			dEnemy("Duck","Not STINKY, S.T.I.N.K.Y! As in, the Supremely Talented and Incredibly Natty King of the Yellers? Don't you know who he is?"),
			dCharacter("Not really, sorry."),
			dEnemy("Duck","Well, he just so happens to be the guy in charge of S.M.E.L.L.Y. In fact, he is currently working with Dr. Llama. So, please, " + 
				"get out of my way, peasant. You don't realize how important me - and my mission - are."),
			dCharacter("If you don't mind me asking, why is he working with Llama?"),
			dEnemy("Duck","That's DOCTOR Llama to you. And it's none of your business. They just so happen to share one goal - and I quote - " +
				"\"Destroying whatever the heck you feel like.\" And Dr. Llama's going to pay us a lot of money for giving him all these donuts.")
		];
		endDialogues = [
		
		];
		break;
	case 6:
		grid = 'ssssssssssspsss ssssssssspppsss ssssssssspsssss ssssssssspsssss sssssssssppssss sssssssssspssss ssssssssssBssss sssssssssspssss sssssssssppssss ssssssssspsssss ssssssssppsssss sssssssppssssss ssssspppsssssss ssssspsssssssss ssssspsssssssss ';
		obstacles = [new Obstacle("water",9,6),new Obstacle("water",9,5),new Obstacle("water",7,6),new Obstacle("water",8,6),new Obstacle("water",8,7),new Obstacle("water",9,7),new Obstacle("water",11,6),new Obstacle("water",12,6),new Obstacle("water",13,6),new Obstacle("water",13,5),new Obstacle("water",14,5),new Obstacle("water",12,5),new Obstacle("water",11,5),new Obstacle("tree",0,3),new Obstacle("tree",1,2),new Obstacle("tree",2,2),new Obstacle("tree",3,2),new Obstacle("tree",4,3),new Obstacle("tree",4,4),new Obstacle("tree",4,5),
			new Obstacle("tree",5,6),new Obstacle("tree",4,7),new Obstacle("tree",3,8),new Obstacle("tree",2,8),new Obstacle("tree",1,7),new Obstacle("tree",0,7),new Obstacle("tree",1,8),new Obstacle("tree",5,7),new Obstacle("tree",5,4),new Obstacle("tree",3,1),new Obstacle("house1",11,11),new Obstacle("house1",13,12),new Obstacle("house3",11,12),new Obstacle("house3",13,11),new Obstacle("house2",12,10),new Obstacle("house2",12,13),new Obstacle("tree",6,6),new Obstacle("tree",13,7),new Obstacle("tree",14,8),new Obstacle("tree",13,8),new Obstacle("tree",12,8),
			new Obstacle("tree",13,2),new Obstacle("tree",14,2),new Steppable("flag",11,0),new Steppable("full-heart",3,6),new Steppable("half-heart",12,7),new Steppable("half-heart",7,11),new Steppable("quarter-heart",0,9),new Steppable("quarter-heart",11,3),];
		enemies = [new Enemy("Owl",12,11,4),new Enemy("Owl",12,12,4),new Enemy("Owl",1,5,3),new Enemy("Owl",2,4,3),new Enemy("Owl",3,5,3),new Enemy("Owl",2,6,3),new Enemy("Owl",14,7,4),new Enemy("Owl",9,4,4),new Enemy("Owl",14,1,4),];	
		allyPositions = [
			[5,12],
			[5,13],
			[5,14],
			[6,12],
			[4,14]
		];
		startDialogues = [
			dNeutral("Trent","Goat","Hey! Get your hands off me, you pom-poms with wings!"),
			dEnemy("Owl","Shut up, goat, and come with us! S.T.I.N.K.Y would love to have someone like you with S.M.E.L.L.Y!"),
			dNeutral("Trent","Goat","Ha! I'd rather eat a hundred and one black licorice jelly beans THROUGH A STRAW! Do your worst!"),
			dEnemy("Owl","All right, that's it. We're going to take you down now so that S.T.I.N.K.Y doesn't have to bother with you back at HQ."),
			dCharacter("Hey, what's going on?"),
			dNeutral("Trent","Goat","Hey you, elephant! Are you part of S.M.E.L.L.Y too?"),
			dCharacter("No, I'm not. I'm-"),
			dAlly("Trent","Goat","OK then, I'm now on your side! Hee hee... prepare to be smooshed by the awesomeness of my Spin Attack, owls!"),
			dCharacter("Er, OK then... welcome to the team."),
			dAlly("Trent","Goat","I can attack everyone around me at once if you activate my ability! Do it quick!")
		];
		endDialogues = [
		
		];
		
		//this lets the newest ally (the goat) be in a given spot
		if(allies.length < MAX_ALLIES){
			allyPositions[allies.length] = [2,5];
		}
		newAlly = new Ally("Goat",0,0,3,"Trent");
		break;
	case 7:
		grid = 'sssssscccssssss sssssscccssssss ssscccccccccsss sssssscccssssss sssssscccssssss sssssscccssssss ssscccccccccsss sssssscccssssss sssssscccssssss sssssscccssssss ssscccccccccsss sssssscccssssss sssssscccssssss sssssscccssssss sssssscccssssss ';
		obstacles = [new Obstacle("sign",6,12),new Obstacle("tree",6,3),new Obstacle("tree",8,3),new Obstacle("tree",6,7),new Obstacle("tree",8,7),new Obstacle("tree",6,11),new Obstacle("tree",8,11),new Obstacle("tree",6,5),new Obstacle("tree",8,5),new Obstacle("tree",6,1),new Obstacle("tree",8,1),new Obstacle("tree",6,9),new Obstacle("tree",8,9),new Obstacle("building",12,2),new Obstacle("building",2,2),new Obstacle("building",2,6),new Obstacle("building",12,6),new Obstacle("building",12,10),new Obstacle("building",2,10),new Obstacle("hotel",2,1),new Obstacle("hotel",3,1),
			new Obstacle("hotel",3,3),new Obstacle("hotel",2,3),new Steppable("flag",3,2),new Obstacle("tree",3,9),new Obstacle("tree",3,11),new Obstacle("tree",3,7),new Obstacle("tree",3,5),new Obstacle("tree",11,1),new Obstacle("tree",11,3),new Obstacle("tree",11,5),new Obstacle("tree",11,7),new Obstacle("tree",11,9),new Obstacle("tree",11,11),new Steppable("half-heart",3,6),new Steppable("half-heart",11,6),new Steppable("quarter-heart",3,10),new Steppable("quarter-heart",11,10),];
		enemies = [new Enemy("Beaver",10,2,4),new Enemy("Beaver",4,2,4),new Enemy("Elk",4,6,4),new Enemy("Elk",10,6,4),new Enemy("Goat",4,10,4),new Enemy("Goat",10,10,4),];	
		allyPositions = [
			[7,12],
			[6,13],
			[8,13],
			[7,14],
			[7,13]
		];
		startDialogues = [
			dSign("<div style='text-align: center;'><h3>Welcome to Frosting University</h3><b>Home of the Wildbears</b><br />"
				+"(and the teleportation thingy in the science center)</div>"),
			dEnemy("Beaver","What are you guys waiting out here for? There's a S.M.E.L.L.Y meeting in the science center in 5 minutes!"),
			dEnemy("Goat","Yeah, yeah, we're coming..."),
			dCharacter("S.M.E.L.L.Y's in the science center, and that's where the teleporter is... guess I'll have to get through them.")
		];
		endDialogues = [
		
		];
		break;
	case 8:
		grid = 'wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww ';
		obstacles = [new Obstacle("barrel",14,13),new Obstacle("barrel",13,13),new Obstacle("barrel",12,13),new Obstacle("barrel",11,13),new Obstacle("barrel",10,13),new Obstacle("barrel",10,12),new Obstacle("barrel",11,11),new Obstacle("barrel",12,10),new Obstacle("barrel",14,9),new Obstacle("barrel",12,11),new Obstacle("barrel",11,12),new Obstacle("barrel",14,11),new Obstacle("barrel",14,10),new Obstacle("barrel",13,12),new Obstacle("barrel",14,12),new Obstacle("barrel",11,9),new Obstacle("barrel",13,8),new Obstacle("barrel",10,10),
			new Obstacle("barrel",9,12),new Obstacle("chair",4,4),new Obstacle("chair",2,5),new Obstacle("chair",2,6),new Obstacle("chair",2,7),new Obstacle("chair",2,8),new Obstacle("chair",2,9),new Obstacle("chair",4,10),new Obstacle("chair",6,9),new Obstacle("chair",6,8),new Obstacle("chair",6,7),new Obstacle("chair",6,6),new Obstacle("chair",6,5),new Obstacle("chair",11,2),new Obstacle("chair",11,3),new Obstacle("chair",12,1),new Obstacle("chair",12,4),new Obstacle("chair",2,13),new Obstacle("chair",3,12),new Obstacle("chair",4,13),new Steppable("flag",1,1),
			new Obstacle("barrel",0,1),new Obstacle("barrel",1,0),new Obstacle("barrel",3,1),new Obstacle("barrel",1,2),new Obstacle("barrel",2,2),new Obstacle("barrel",5,0),new Obstacle("barrel",4,2),new Obstacle("barrel",5,2),new Obstacle("barrel",7,1),new Obstacle("barrel",7,0),new Steppable("full-heart",4,7),new Steppable("half-heart",13,11),new Steppable("half-heart",12,2),new Steppable("quarter-heart",3,13),];
		enemies = [new Enemy("Beaver",4,0,4),new Enemy("Goat",13,9,4),new Enemy("Bear",13,3,4),new Enemy("Owl",4,5,4),new Enemy("Owl",4,9,4),];
		background = 'wood';
		allyPositions = [
			[10,14],
			[11,14],
			[12,14],
			[13,14],
			[14,14]
		];
		startDialogues = [
			dNeutral("Doorman","Mouse","Password?"),
			dEnemy("Beaver","Uh... um... oh yeah! Quark! Blither blather! Ice cream! STAT!"),
			dNeutral("Doorman","Mouse","Welcome to S.M.E.L.L.Y's super-secret headquarters."),
			dNeutral("Doorman","Mouse","Password?"),
			dCharacter("Uh... Quark! Blither Blather! Ice cream! Stat!"),
			dNeutral("Doorman","Mouse","You forgot to capitalize the last word. Guys! IMPOSTOR! GET THEM!"),
			dCharacter("Uh oh. Better get to the other exit, and quick...")
		];
		endDialogues = [
			dNeutral("Doorman","Mouse","Yikes! Don't hurt me! I'll tell you anything, just don't hurt me!"),
			dCharacter("Uh, OK... where's the teleporter?"),
			dNeutral("Doorman","Mouse","It's out back. I think the boss is working on it."),
		];
		break;
	case 9:
		grid = 'sgssssssssssccc ssssssssspppccc sppppsssppssccc ssssppsppsssccc ssssspspsssssss ssssspppsssssss sssssspssssssss sssssspssssssss ssssssppsssssss ssssssspsssssss sssssssppssssss sssssssspssssss sssssssspssssss sssssssspppssss sssssssssspssss ';
		obstacles = [new Obstacle("tree",11,0),new Obstacle("tree",11,2),new Obstacle("tree",11,3),new Obstacle("tree",12,4),new Obstacle("tree",13,4),new Obstacle("tree",14,4),new Obstacle("barrel",7,12),new Obstacle("barrel",6,12),new Obstacle("barrel",6,13),new Obstacle("barrel",7,14),new Obstacle("barrel",10,12),new Obstacle("barrel",9,11),new Obstacle("barrel",9,13),new Obstacle("barrel",10,14),new Obstacle("barrel",7,8),new Obstacle("barrel",7,4),new Obstacle("barrel",4,3),new Obstacle("hydrant",13,1),new Obstacle("hydrant",5,6),new Obstacle("hydrant",8,9),
			new Obstacle("hydrant",2,1),new Obstacle("water",2,7),new Obstacle("water",1,8),new Obstacle("water",2,8),new Obstacle("water",2,9),new Obstacle("water",3,8),new Obstacle("water",1,9),new Obstacle("water",2,10),new Obstacle("water",3,9),new Obstacle("water",3,10),new Obstacle("tree",12,7),new Obstacle("tree",12,8),new Obstacle("tree",13,8),new Obstacle("tree",13,7),new Obstacle("tree",12,9),new Obstacle("tree",13,9),new Obstacle("tree",11,9),new Obstacle("tree",11,8),new Obstacle("tree",11,7),new Steppable("flag",1,0),new Steppable("full-heart",14,1),new Steppable("half-heart",10,13),new Steppable("half-heart",6,14),new Steppable("half-heart",6,5),new Steppable("full-heart",5,10),];
		enemies = [
			new Boss("Duck","S.T.I.N.K.Y",1,1,5)
		];	
		allyPositions = [
			[8,12],
			[8,13],
			[7,13],
			[8,14],
			[9,14]
		];
		startDialogues = [
			dNeutral("Mailman","Chicken","Mail for S.T.I.N.K.Y!"),
			dEnemy("Duck","Thanks. Huh, it's something from Llama.","S.T.I.N.K.Y"),
			dNeutral("Dr. Llama","Llama","<i>S.T.I.N.K.Y - meet me in my castle ASAP. And bring all the donuts you've, uh, collected with you. " + 
				"We'll talk about your payment then.</i>"),
			dEnemy("Duck","Geez, sometimes I wonder why I had S.M.E.L.L.Y team up with that guy. He better pay well.","S.T.I.N.K.Y"),
			dEnemy("Duck","OK, so teleporter thingy, take me to East Sprinklestan! Er... I don't see a switch here...","S.T.I.N.K.Y"),
			dEnemy("Duck","*kick* Ouch, that hurt... but hey, I think the teleporter's doing something... it's showing West Sprinklestan on the monitor. Close enough.","S.T.I.N.K.Y"),
			dEnemy("Duck","Hey, you! Over there! Bring the donuts over here! They're in those barrels!","S.T.I.N.K.Y"),
			dCharacter("Actually, I'm not part of S.M.E.L.L.Y, I was just hoping to use that teleporter. I have a, uh, doctor's appointment there."),
			dEnemy("Duck","Oh OK, sure... wait a second, you aren't part of S.M.E.L.L.Y! How'd you get in here?!?","S.T.I.N.K.Y"),
			dEnemy("Duck","Say, wait, aren't you that kid who's been beating up all my thugs? You're gonna pay for that!","S.T.I.N.K.Y")
		];
		endDialogues = [
			dCharacter("OK, teleporter, I hope you work... East Sprinklestan it is...")
		];
		break;
	}
	
	return new Level(2,levelNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly);
}));