 /**
	Act 3, Before Cream
*/

acts.push(new Act(3,function(levelNum){
	var grid;
	var background = 'water';
	var obstacles;
	var enemies;
	var allyPositions;
	var startDialogues;
	var endDialogues;
	var newAlly;
	
	switch(levelNum){
	case 1:
		grid = 'WWWWWWWWWWWWWWW WWdWWWWWWWWWWWW WdddddWWWWWWWWW WddddddWWWWWddW WddWdddbbbbdddd WWWWWddWWWWWddd WWWWWWBWWWWWWWW WWWWWWBWWWWWWWW WWWWWWBWWWWWWWW WWWWdWBWWWWWWWW WWWWdddWWWWdWWW WWWWWddddWddWWW WWWWWWddddddWWW WWWWWddddddWWWW WWWWWWddWWWWWWW ';
		obstacles = [new Obstacle("house2",10,13),new Obstacle("house3",5,11),new Obstacle("shop",8,11),new Steppable("full-heart",2,1),new Steppable("half-heart",11,10),new Steppable("half-heart",4,9),new Obstacle("house2",2,3),new Obstacle("house1",12,5),new Steppable("flag",14,4),];
		enemies = [new Enemy("Triceratops",12,4,4),new Enemy("Brontosaurus",5,10,4,1),new Enemy("Plesiosaur",4,3,4),new Enemy("Triceratops",6,6,4),new Enemy("Plesiosaur",1,4,4),];	
		allyPositions = [
			[10,12],
			[10,11],
			[9,12],
			[9,13],
			[11,11]
		];
		startDialogues = [
			dCharacter("Whoa... where are we?"),
			dNeutral("Ervin","Pterodactyl","Ahola! Nice entrance! And you're in West Sprinklestan, buddy!"),
			dCharacter("Ahola?"),
			dNeutral("Ervin","Pterodactyl","It means hello. And I take it you're from the future."),
			dCharacter("But- but- how do you know?"),
			dNeutral("Ervin","Pterodactyl","Your accent. What brings you here to 60 million BC?"),
			dCharacter("How do you know it's BC? Are you from the future too?"),
			dNeutral("Ervin","Pterodactyl","I have to go to the future every month or so for a meeting. Not fun. Nope, Before Creme is where it's at."),
			dCharacter("Uh... OK. How do I get back to the future?"),
			dNeutral("Ervin","Pterodactyl","Easy. Just go to the mighty Mauna Churo. There's a bunch of time machines over there."),
			dCharacter("How do I get there?"),
			dNeutral("Ervin","Pterodactyl","Pretty easy. Just head east on these islands, pass through a cave, and climb the mountain."),
			dNeutral("Ervin","Pterodactyl","As long as you can get past the <em>HORDES OF RAVENOUS CARNIVORES</em> you should be OK.")
		];
		break;
	case 2:
		grid = 'dWWWWWWWWWWWWdW ddWWWWWWWWWWWBW WddWWWWWWWWWWBW WWddWWWWWWWWWBW WWWddWWWWWWWWBW WWWWddWWWWWWWBW WWWWWddddWWWWdW WWWWWdddddbbbdW WWWWWdddddWWWWW WWWWWddddWWWWWW WWWWWWddWWWWWWW WWWWWWWBWWWWWWW WWWWWWWBWWWWWWW WWWWWWdddWWWWWW WWWWWWWdWWWWWWW ';
obstacles = [new Steppable("flag",13,0),new Obstacle("house3",6,7),new Obstacle("house2",7,9),new Obstacle("house1",8,7),new Obstacle("shop",5,8),new Obstacle("hotel",6,13),new Steppable("half-heart",8,13),new Steppable("half-heart",13,4),new Steppable("half-heart",5,7),];
enemies = [new Enemy("Triceratops",6,6,4,0.5),new Enemy("Triceratops",5,9,4),new Enemy("Triceratops",8,9,4),new Enemy("Triceratops",8,6,4),new Enemy("Pterodactyl",13,1,5),new Enemy("Pterodactyl",7,14,5),];		
		allyPositions = [[2,2],[1,2],[1,1],[0,1],[0,0]];
		startDialogues = [
			dEnemy("Triceratops","OK, kid, tell us, where's the legendary Treasure of the Croissant?"),
			dNeutral("Kid","TRex","Um, I dunno, mister. Why don't you ask that nice elephant over there?"),
			dEnemy("Triceratops","What the...? What are you doing here?"),
			dCharacter("I'd like to ask you the same thing."),
			dEnemy("Triceratops","If you must know, Llama wants us to find the Treasure of the Croissant."),
			dEnemy("Pterodactyl","You idiot! Why'd you say that? Whatever - kill them!")
		];
		break;
	case 3:
		grid = 'WWWWWWWWWWddddd WWWWWWWWWWWdddd WWWWWWWWWWWdddd WWWWdddWWWWBddd WWWdddddWWWBWWd WWWWdddWWWWBWWW WWWWWWWWWWWBWWW WWWWWWWWWWWBWWW WWWWWWWWWWWBdWW dbbbbbbbbbbdddW BWWWWWWWWWddddW BWWWWWWWWWWddWW BWWWWWWWWWWWWWW BWddddWWWWWWWWW ddddddddddWWWWW ';
obstacles = [new Obstacle("cave-wall",11,1),new Obstacle("cave-wall",12,0),new Obstacle("cave-wall",13,3),new Obstacle("cave-wall",14,2),new Obstacle("cave-wall",11,0),new Obstacle("cave-wall",10,0),new Obstacle("cave-wall",14,3),new Obstacle("cave-wall",14,4),new Steppable("flag",14,0),new Steppable("full-heart",5,4),new Obstacle("sign",14,1),new Obstacle("house1",12,1),new Obstacle("tree",12,11),new Obstacle("tree",13,10),new Obstacle("house3",12,10),new Steppable("half-heart",9,14),new Steppable("quarter-heart",11,9),];
enemies = [new Enemy("Pterodactyl",4,4,5),new Enemy("Pterodactyl",6,4,5),new Enemy("Plesiosaur",6,9,5),new Enemy("Plesiosaur",11,3,5),];	
		allyPositions = [[5,13],[2,13],[8,14],[4,14],[0,14]];
		startDialogues = [
			dCharacter("There should be a ski lift to the top of the mountain here, I think..."),
			dEnemy("Plesiosaur","Guys! Guys! Someone's here! Get 'em!", "Plesiosaur #1"),
			dEnemy("Plesiosaur","Hey, birdbrains! What are you doing on that island?", "Plesiosaur #2"),
			dEnemy("Pterodactyl","What? We can fly, you know.", "Pterodactyl #1"),
			dEnemy("Plesiosaur","Yeah, sure, but you're not going to find the Treasure of the Croissant like that.","Plesiosaur #2"),
			dEnemy("Pterodactyl","Yeah, well you aren't going to either by standing there lecturing us.", "Pterodactyl #1"),
			dEnemy("Pterodactyl","KABOOM! Need some ice with that?","Pterodactyl #2")
		];
		endDialogues = [
			dSign("Lift to top of Mauna Churo this way &rArr;"),
			dCharacter("But where is it?"),
			dNeutral("Operator","Bat","Sawry, kid, but the liff's brawk'n. Ya'll hafta take the cave."),
			dNeutral("Operator","Bat","Aw yeah, kid, watch out in dem cave - lotsa thugs lukin' for sum treshure.")
		];
		break;
	case 4:
		background = 'dirt';
		grid = 'ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ';
obstacles = [new Obstacle("cave-wall",5,14),new Obstacle("cave-wall",5,13),new Obstacle("cave-wall",5,12),new Obstacle("cave-wall",9,14),new Obstacle("cave-wall",9,13),new Obstacle("cave-wall",9,12),new Obstacle("cave-wall",4,7),new Obstacle("cave-wall",10,7),new Obstacle("cave-wall",4,6),new Obstacle("cave-wall",4,5),new Obstacle("cave-wall",5,4),new Obstacle("cave-wall",6,4),new Obstacle("cave-wall",7,4),new Obstacle("cave-wall",8,4),new Obstacle("cave-wall",9,4),new Obstacle("cave-wall",10,5),new Obstacle("cave-wall",10,6),new Obstacle("cave-wall",5,8),new Obstacle("cave-wall",9,8),new Obstacle("cave-wall",9,9),new Obstacle("cave-wall",5,9),new Obstacle("cave-wall",4,9),new Obstacle("cave-wall",5,11),new Obstacle("cave-wall",4,11),new Obstacle("cave-wall",9,11),new Obstacle("cave-wall",10,11),new Obstacle("cave-wall",10,9),new Obstacle("cave-wall",0,4),new Obstacle("cave-wall",1,3),new Obstacle("cave-wall",2,2),new Obstacle("cave-wall",3,1),new Obstacle("cave-wall",4,0),new Obstacle("cave-wall",10,0),new Obstacle("cave-wall",11,1),new Obstacle("cave-wall",12,2),new Obstacle("cave-wall",13,3),new Obstacle("cave-wall",14,4),new Obstacle("cave-wall",3,9),new Obstacle("cave-wall",2,8),new Obstacle("cave-wall",11,9),new Obstacle("cave-wall",12,8),new Obstacle("cave-wall",3,11),new Obstacle("cave-wall",2,11),new Obstacle("cave-wall",1,11),new Obstacle("cave-wall",11,11),new Obstacle("cave-wall",13,11),new Obstacle("cave-wall",12,11),new Obstacle("cave-wall",2,7),new Obstacle("cave-wall",2,6),new Obstacle("cave-wall",12,7),new Obstacle("cave-wall",12,6),new Obstacle("cave-wall",7,1),new Obstacle("cave-wall",7,2),new Obstacle("cave-wall",7,3),new Steppable("flag",7,0),new Obstacle("barrel",7,6),new Obstacle("barrel",3,13),new Obstacle("barrel",11,13),new Steppable("half-heart",4,8),new Steppable("half-heart",10,8),new Steppable("quarter-heart",14,14),new Steppable("quarter-heart",0,14),new Obstacle("water",0,0),new Obstacle("water",1,1),new Obstacle("water",0,1),new Obstacle("water",0,2),new Obstacle("water",0,3),new Obstacle("water",1,2),new Obstacle("water",2,1),new Obstacle("water",2,0),new Obstacle("water",1,0),new Obstacle("water",3,0),new Obstacle("water",12,0),new Obstacle("water",11,0),new Obstacle("water",12,1),new Obstacle("water",13,1),new Obstacle("water",13,0),new Obstacle("water",14,0),new Obstacle("water",14,1),new Obstacle("water",14,2),new Obstacle("water",13,2),new Obstacle("water",14,3),new Steppable("full-heart",7,5),];
enemies = [new Enemy("Brontosaurus",5,6,5),new Enemy("Plesiosaur",6,6,5),new Enemy("Plesiosaur",8,6,5),new Enemy("Brontosaurus",9,6,5),new Enemy("Bat",3,3,5),new Enemy("Bat",11,3,5),new Enemy("Bat",1,13,5),new Enemy("Bat",13,13,5)];
		allyPositions = [[7,12],[6,11],[8,11],[6,13],[8,13]];
		newAlly = new Ally('Bat',0,0,5,"Kal&igrave;&aacute;");
		startDialogues = [
			dNeutral("Kal&igrave;&aacute;","Bat","W-who are you?"),
			dCharacter("We're adventurers trying to get back to our own time. Who are you?"),
			dNeutral("Kal&igrave;&aacute;","Bat","My name is Kal&igrave;&aacute;, and I'm just a simple bat who lives in this cave. At least, I was, until these treasure hunters came along. I've been trying to fight them off, but I'm just too weak."),
			dCharacter("You could come with us, if you like."),
			dNeutral("Kal&igrave;&aacute;","Bat","I'd love to! I've been itching to suck their blood for some time now. I might not be able to do much physically, but my Vampire ability drains their life! Hehehe!")
		];
		break;
	case 5:
		background = 'dirt';
		grid = 'ddddddWdWdddddd ddWWddWdWddWWdd ddWWddWdWddWWdd ddddddWdWdddddd ddddddWdWdddddd ddddddWdWdddddd ddddddddddddddd ddddddddddddddd ddddddddddddddd ddddddWdWdddddd ddddddWdWdddddd ddddddWdWdddddd ddWWddWdWddWWdd ddWWddWdWddWWdd ddddddWdWdddddd ';
obstacles = [new Steppable("full-heart",7,14),new Steppable("full-heart",7,0),new Steppable("flag",14,0),new Obstacle("chair",11,3),new Obstacle("chair",13,5),new Obstacle("chair",9,1),new Obstacle("chair",9,8),new Obstacle("chair",10,5),new Obstacle("chair",13,1),new Obstacle("barrel",1,8),new Obstacle("barrel",3,6),new Obstacle("barrel",1,2),new Obstacle("barrel",5,11),new Obstacle("barrel",0,13),new Obstacle("barrel",2,5),new Steppable("half-heart",14,14),new Steppable("half-heart",0,0),];
enemies = [new Enemy("Ghost",7,4,5),new Enemy("Ghost",7,3,5),new Enemy("Ghost",7,10,5),new Enemy("Ghost",7,11,5),new Enemy("Bat",2,6,5),new Enemy("Bat",12,4,5),new Enemy("Bat",10,13,5),new Enemy("Bat",4,3,5),new Enemy("Triceratops",7,7,6),];
		allyPositions = [[1,10],[1,13],[0,12],[3,11],[5,13]];	
		startDialogues = [
			dNeutral("Hitchhiker","Bear","Aagh... hi... looks... like... you're... adventurers... too..."),
			dCharacter("What happened?"),
			dNeutral("Hitchhiker","Bear","I... came here for... vacation... went spelunking... aagh... ran into these ghosts..."),
			dNeutral("Hitchhiker","Bear","Listen... these ghosts... they're not hurt by... by normal attacks... only bats or ducks or such... can kill them with special attacks... leave them alone... if you aren't one of those..."),
			dCharacter("Are you OK, sir?"),
			dNeutral("Hitchhiker","Bear","Spent... a little too much time... around those ghosts... I'll be OK... you watch out for yourself...")
		];
		endDialogues = [
			dCharacter("Hey look, there's a teleporter here! It says here it'll take us to the top of Mauna Churo! Let's go!")
		];
		break;
	case 6:
		background = 'wood';
		grid = 'wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww ';
		obstacles = [new Obstacle("barrel",14,3),new Obstacle("barrel",13,3),new Obstacle("barrel",12,3),new Obstacle("barrel",11,3),new Obstacle("barrel",14,11),new Obstacle("barrel",13,11),new Obstacle("barrel",12,11),new Obstacle("barrel",11,11),new Obstacle("barrel",11,4),new Obstacle("barrel",11,5),new Obstacle("barrel",11,6),new Obstacle("barrel",11,8),new Obstacle("barrel",11,9),new Obstacle("barrel",11,10),new Obstacle("chair",1,3),new Obstacle("chair",2,2),new Obstacle("chair",3,3),new Obstacle("chair",2,4),new Obstacle("chair",5,12),new Obstacle("chair",6,11),new Obstacle("chair",7,12),new Obstacle("chair",6,13),new Obstacle("chair",4,6),new Obstacle("chair",5,6),new Obstacle("chair",6,6),new Obstacle("chair",4,8),new Obstacle("chair",5,8),new Obstacle("chair",6,8),new Obstacle("chair",9,1),new Obstacle("chair",10,1),new Obstacle("chair",11,1),new Obstacle("chair",10,13),new Obstacle("chair",11,13),new Obstacle("chair",12,13),new Obstacle("chair",0,10),new Obstacle("chair",1,9),new Obstacle("chair",2,10),new Obstacle("chair",1,11),new Steppable("flag",2,0),new Steppable("half-heart",12,4),new Steppable("half-heart",12,10),new Steppable("quarter-heart",1,6),new Steppable("quarter-heart",13,1),new Steppable("quarter-heart",9,10),];
		enemies = [new Enemy("TRex",5,1,5,1),new Enemy("TRex",2,13,5),new Enemy("TRex",8,7,5),new Enemy("Pterodactyl",13,6,6),new Enemy("Pterodactyl",13,8,6),new Enemy("Pterodactyl",11,7,5)];
		allyPositions = [[5,10],[4,5],[8,11],[2,6],[10,2]];		
		startDialogues = [
			dCharacter("What the- where are we?"),
			dNeutral("Waiter", "Triceratops", "You're currently in Mauna Churo's famous Mountaintop Caf&eacute;. And I'm currently running for my life."),
			dEnemy("TRex","OM NOM NOMZ"),
			dEnemy("Pterodactyl","Sorry, please excuse my Tyrannosaurus friends. They have a totally nonexistant understanding of pop culture."),
			dNeutral("Second Waiter","Brontosaurus","I'll say. Anyway, since we're about to get eaten anyway, can I get you anything to eat? Today's specialty is green bean casserole."),
			dEnemy("TRex","WAITER! Y U NO SERVE MEAT?!?!?!"),
			dCharacter("Er... right. I think I'll have to pass. And get out of here.")
		];
		break;
	case 7:
		background = 'concrete';
		grid = 'WWWWcccccccWWWW WWWWcccccccWWWW WWWcccccccccWWW WWcccccccccccWW ccccccccccccccc cccccWcccWccccc ccccccWcWcccccc cccccccWccccccc ccccccWcWcccccc cccccWcccWccccc ccccccccccccccc WWcccccccccccWW WWWcccccccccWWW WWWWcccccccWWWW WWWWcccccccWWWW ';
		obstacles = [new Obstacle("tree",10,14),new Obstacle("tree",10,13),new Obstacle("tree",11,12),new Obstacle("tree",12,11),new Obstacle("tree",13,10),new Obstacle("tree",14,10),new Obstacle("tree",0,10),new Obstacle("tree",1,10),new Obstacle("tree",2,11),new Obstacle("tree",3,12),new Obstacle("tree",4,13),new Obstacle("tree",4,14),new Obstacle("tree",0,4),new Obstacle("tree",1,4),new Obstacle("tree",2,3),new Obstacle("tree",3,2),new Obstacle("tree",4,1),new Obstacle("tree",4,0),new Obstacle("tree",10,0),new Obstacle("tree",10,1),new Obstacle("tree",11,2),new Obstacle("tree",12,3),new Obstacle("tree",13,4),new Obstacle("tree",14,4),new Obstacle("tree",6,7),new Obstacle("tree",7,6),new Obstacle("tree",8,7),new Obstacle("tree",7,8),new Obstacle("sign",3,7),new Obstacle("sign",7,3),new Obstacle("sign",7,11),new Obstacle("sign",11,7),
		new Steppable("full-heart",7,14),new Steppable("full-heart",7,0), new Steppable("half-heart",9,7), new Steppable("half-heart",5,7), new Steppable("flag",0,7)];
		enemies = [new Enemy("TRex",1,5,6),new Enemy("TRex",2,9,6),new Enemy("Plesiosaur",0,8,6),new Enemy("Triceratops",2,7,6),new Enemy("Triceratops",1,6,6),new Enemy("Pterodactyl",4,6,6),];		
		allyPositions = [[12,7],[13,7],[14,7],[13,6],[13,8]];
		startDialogues = [
			dEnemy("Plesiosaur","OK guys, I've traced the Treasure of the Croissant to behind one of the time machines. Split up and give me a holler when youn find it."),
			dEnemy("Triceratops","Er... what's this Treasure of the Croissant?"),
			dEnemy("Plesiosaur","Oh, new recruit, huh? Apparently there's a massive treasure trove of donuts hidden on Mauna Churo. So hurry up and find it, guys, we didn't travel back in time 60 million years for nothing!"),
			dEnemy("TRex","ALL YOUR DONUTS ARE BELONG TO US"),
			dEnemy("Triceratops","Can I PLEASE maim him? Or at least hit him? Please? I've put up with all his terrible memes, but this... I seriously feel like I'm going to blow up!"),
			dEnemy("TRex","Did someone say 'blow up'? KAMIKAZE!!!!!!","Bob the TRex"),
			dEnemy("Plesiosaur","Shame. Poor Bob. Such a dull mind, gone to waste.")
		];
		break;
	case 8:
		background = 'concrete';
		grid = 'ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ccccccccccccccc ';
		obstacles = [new Obstacle("tree",1,0),new Obstacle("tree",1,1),new Obstacle("tree",1,2),new Obstacle("tree",1,3),new Obstacle("tree",1,4),new Obstacle("tree",1,5),new Obstacle("tree",13,0),new Obstacle("tree",13,1),new Obstacle("tree",13,2),new Obstacle("tree",13,3),new Obstacle("tree",13,4),new Obstacle("tree",13,5),new Obstacle("tree",3,0),new Obstacle("tree",3,1),new Obstacle("tree",3,2),new Obstacle("tree",3,3),new Obstacle("tree",3,4),new Obstacle("tree",3,5),new Obstacle("tree",11,0),new Obstacle("tree",11,1),new Obstacle("tree",11,2),new Obstacle("tree",11,3),new Obstacle("tree",11,4),new Obstacle("tree",11,5),new Obstacle("tree",5,0),new Obstacle("tree",5,1),new Obstacle("tree",5,2),new Obstacle("tree",5,3),new Obstacle("tree",5,4),new Obstacle("tree",5,5),new Obstacle("tree",9,0),new Obstacle("tree",9,1),new Obstacle("tree",9,2),new Obstacle("tree",9,3),new Obstacle("tree",9,4),new Obstacle("tree",9,5),new Obstacle("tree",7,5),new Obstacle("tree",7,4),new Obstacle("tree",7,3),new Obstacle("tree",7,2),new Obstacle("tree",7,1),new Obstacle("tree",7,0),new Steppable("flag",6,0),new Steppable("half-heart",0,0),new Steppable("half-heart",2,0),new Steppable("half-heart",4,0),new Steppable("half-heart",8,0),new Steppable("half-heart",10,0),new Steppable("half-heart",12,0),new Steppable("half-heart",14,0),new Obstacle("shop",3,8),new Obstacle("shop",11,12),new Obstacle("hotel",5,11),new Obstacle("hotel",7,7),new Obstacle("house2",9,9),new Obstacle("house2",10,10),new Obstacle("hydrant",0,11),new Obstacle("hydrant",2,13),new Obstacle("hydrant",11,9),new Obstacle("hydrant",12,7),new Obstacle("building",7,12),];
		enemies = [new Enemy("TRex",6,1,6),new Enemy("TRex",12,1,6),new Enemy("Plesiosaur",8,1,6),new Enemy("Plesiosaur",4,1,6),new Enemy("Triceratops",10,1,6),new Enemy("Brontosaurus",0,1,6),new Enemy("Brontosaurus",7,9,6,1), new Enemy("Pterodactyl",14,1,6),new Enemy("Pterodactyl",2,1,6)];	
		allyPositions = [
			[6,12], [8,12], [10,13], [4,11], [8,14]
		];
		startDialogues = [
			dEnemy("TRex","GUYS! GUYS! WE FOUND THE TREASURE! BOSS IS DIGGING IT UP RIGHT NOW!"),
			dEnemy("Plesiosaur","Shut up! Someone's going to hear!"),
			dEnemy("TRex","WHAT? I CAN'T HEAR YOU!"),
			dCharacter("Could you keep it down? Please?"),
			dEnemy("Triceratops","Hey, it's that kid who's been killing all the T-Rex's!"),
			dEnemy("Pterodactyl","Yeah, it is! I'm honored! Can we have your autograph?"),
			dEnemy("Plesiosaur","Shut up! And get them!")
		];
		endDialogues = [
			dCharacter("Well, that's the last of them. Now to get rid of this \"Boss\" they were talking about and take a time machine out of here."),
			dSign("Time machine #74 &uArr;"),
			dCharacter("Hey, that's convenient.")
		];
		break;
	case 9:
		background = 'concrete';
		grid = 'WWWWWWWdWWWWWWW WWcccWWdWWcccWW WcccccWdWcccccW cccccccpccccccc cccccccpccccccc ccccccWpWcccccc cccccccpccccccc cccWccWpWccWccc ccWcWccpccWcWcc cccWccWpWccWccc cccccccpccccccc ccccccWpWcccccc cccccccpccccccc ccccccWpWcccccc cccccccpccccccc ';
		obstacles = [new Obstacle("tree",3,8),new Obstacle("tree",11,8),new Steppable("flag",7,0),new Obstacle("tree",3,3),new Obstacle("tree",11,3),new Obstacle("tree",3,12),new Obstacle("tree",11,12),new Steppable("full-heart",3,1),new Steppable("full-heart",11,1),new Steppable("half-heart",2,7),new Steppable("half-heart",12,7),new Steppable("quarter-heart",7,8),new Steppable("secret-entrance",7,6)];
		enemies = [new Boss("Brontosaurus","Charlotte Bront&euml;",7,1,8)];
		allyPositions = [[7,12],[3,11],[11,11],[5,9],[9,9]];	
		startDialogues = [
			dEnemy("Brontosaurus","Hey, you're the guys who killed off all my goons, right?","Charlotte Bront&euml;"),
			dCharacter("Er... yeah..."),
			dEnemy("Brontosaurus","Then I want to thank you so much. Those idiots were just getting in my way. Plus, when I find the Treasure of the Croissant, I get all the credit - and the cash - to myself.","Charlotte Bront&euml;"),
			dCharacter("Credit? Cash?"),
			dEnemy("Brontosaurus","What? You don't know? Dr. Llama commissioned me to take a gang of my guys back to 60 million BC to find this massive stash of donuts. Apparently there are more donuts in this stash than he's collected so far IN TOTAL. It's huge.","Charlotte Bront&euml;"),
			dCharacter("I'm not quite sure how I can break this to you, but I..."),
			dEnemy("Brontosaurus","Let me guess - you want the Treasure for yourself. Fair enough. But I'm going to have to fight you for it. And you're not going to win.","Charlotte Bront&euml;")
		];
		endDialogues = [
			dNeutral("Operator","Plesiosaur","Whoa, dude! That was, like, a totally rad takedown! Righteous!"),
			dCharacter("Er... right. So how do I use this time machine?"),
			dNeutral("Operator","Plesiosaur","Whoa, man, leaving so soon? We had a rad party and everything planned for you, dude! Can't leave now!"),
			dCharacter("Sorry, but I really need to be going to take down the evil Dr. Llama."),
			dNeutral("Operator","Plesiosaur","Whatever you say, dude... I've set it for 60 million years in the future. Good luck bro, stay cool. But before you go, could I, like, get your autograph?"),
			dCharacter("Sorry, \"bro\", but I can't stay long. I've got to get back..."),
			dCharacter("<b>TO THE FUTURE!</b>")
		];
		break;
	case SECRET_STAGE:
		background = 'concrete';
		grid = 'cccccccccccWWcc ccccccccccddWcc cccccccccdddddd ccccccccddddddd ccccccccddddddc cWWWcccccWddddc cWccccccccWddcc cccdccccccccccc ccddccccccccccc cccccWccccccccc cccccWccccWWccc ccccWWcccccWccd cccccccddccWccc ccccccccccccccd cccccccdccccccd ';
		obstacles = [new Obstacle("box",9,2),new Obstacle("box",11,5),new Obstacle("box",13,3),new Obstacle("box",3,7),new Obstacle("box",3,8),new Obstacle("box",8,12),new Obstacle("box",7,9),new Obstacle("box",14,10),new Obstacle("box",13,7),new Obstacle("box",10,3),new Steppable("flag",11,3),new Steppable("half-heart",3,6),new Steppable("half-heart",14,11),new Steppable("half-heart",14,0),new Obstacle("barrel",6,6),new Obstacle("barrel",8,1),new Obstacle("barrel",1,13),new Obstacle("barrel",12,8),];
		enemies = [new Enemy("Alligator",6,11,6, 0.4),new Enemy("Alligator",9,4,6, 0.4),new Enemy("Sheep",11,4,6, 0.2),new Enemy("Tiger",2,8,6, 0.4),new Enemy("Tiger",12,3,6, 0.4),];
		allyPositions = [[2,12],[6,13],[4,14],[0,11],[7,14]];
		startDialogues = [
			dEnemy("Sheep","Baaah Gahd, that's a lotta donuts.", "Brad"),
			dEnemy("Tiger","Roger that. I've filled up these 3 boxes with donuts. I believe we have some empty ones over there. Roger?", "Ted"),
			dEnemy("Tiger","Mmm... yeah? what? Oh, yeah, I've got plenty of... mmm... space here. Bring me some donuts with extra sprinkles, please. No - bring those jelly-filled ones.", "Roger"),
			dEnemy("Alligator","<em>What on this prehistoric earth do you possibly think you're doing, Rog?!?!? We discover the Treasure of the Croissant conveniently lying here in this patch of dirt, and you EAT it?!?!</em>", "Chuck"),
			dEnemy("Tiger","Eh? OK, OK, fine, you can have this chocolate one. Never liked chocolate anyway. I'm definitely NOT cuckoo for Cocoa--", "Roger"),
			dNeutral("Commentator","Ostrich","This segment has been censored because, frankly, we don't want to get sued for copyright infringement. No animals were harmed in the making of this game. Except those who were. Now back to your regularly scheduled programming."),
			dCharacter("I don't even know what to say anymore.")
		];
		endDialogues = [
 			dCharacter("Nice meeting you boys. Anyway, I've got a teleporter to ride. I'd love to chat, but I've got to get back..."),
			dCharacter("<b>TO THE FUTURE!</b>")		
		];
		break;
	}

	return new Level(3,levelNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly);
}));