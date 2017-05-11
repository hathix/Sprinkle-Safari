 /**
	Act 5, Llama Llodge
*/

acts.push(new Act(5,function(levelNum){
	var grid;
	var background = 'tile';
	var obstacles;
	var enemies;
	var allyPositions;
	var startDialogues;
	var endDialogues;
	var newAlly;
	
	switch(levelNum){
	case 1:
		grid = 'ttttttttttttttt tttttttWttttttt ttttttWWWtttttt tttttttWttttttt ttttttttttttttt gttttttttttttWt ggttttttttttWWt gggttttttttWWtt ggttttttttttWWt gttttttttttttWt ttttttttttttttt tttttttWttttttt ttttttWWWtttttt tttttttWttttttt ttttttttttttttt ';
		obstacles = [new Steppable("flag",13,7),new Steppable("full-heart",5,10),new Steppable("full-heart",5,4),new Obstacle("chair",6,7),new Obstacle("chair",7,6),new Obstacle("chair",7,8),new Obstacle("chair",8,7),new Obstacle("chair",11,12),new Obstacle("chair",12,11),new Obstacle("chair",13,12),new Obstacle("chair",12,13),new Obstacle("chair",11,2),new Obstacle("chair",12,3),new Obstacle("chair",12,1),new Obstacle("chair",13,2),];
		enemies = [new Enemy("Panda",9,9,8),new Enemy("Panda",10,10,8),new Enemy("Panda",11,9,8),new Enemy("Peacock",9,5,8),new Enemy("Peacock",10,4,8),new Enemy("Peacock",11,5,8),new Enemy("Llama",4,7,8,0.3),];	
		allyPositions = [[0,5],[0,6],[0,7],[0,8],[0,9]];
		startDialogues = [
			dEnemy("Llama","Oy! What are you doing here?!?"),
			dCharacter("Er, uh, yeah, about that... oh, hey, look behind you!"),
			dEnemy("Panda","PAIN TO DA PEACOCKS!"),
			dEnemy("Peacock","SLIGHTLY MORE PAIN TO DA PANDAS!"),
			dEnemy("Llama","Oh, great. Sorry about that. Pandas and peacocks are archenemies. Mongoose and cobra have <em>nothing</em> on those two rabid species. Sorry we had to get in the way of your, \"er, about that.\""),
			dCharacter("I knew you'd understand&mdash;"),
			dEnemy("Panda","DEATH TO DA PEACOCKS!"),
			dEnemy("Peacock","SLIGHTLY MORE DEATH TO DA PANDAS!"),
			dCharacter("That doesn't even make sense&mdash;"),
			dEnemy("Panda","OK, TEAM, CHAAARRRGE!"),
			dEnemy("Peacock","OK TEAM, CHAAARRRGE (SLIGHTLY MORE)!"),		
		];
		endDialogues = [
			dCharacter("The stairs! The stairs! Couldn't have come soon enough.")
		];
		break;
	case 2:
		grid = 'ttttttttccccccc ttttttttccccccc ttttttttccccccc ttttttttccccccc ttttttttccccccc ttttttttccccccc ttttttttccccccc ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ';
		obstacles = [new Obstacle("wall",8,6),new Obstacle("wall",8,5),new Obstacle("wall",8,4),new Obstacle("wall",8,3),new Obstacle("wall",8,2),new Obstacle("wall",8,1),new Obstacle("wall",8,0),new Obstacle("wall",9,0),new Obstacle("wall",10,0),new Obstacle("wall",12,0),new Obstacle("wall",11,0),new Obstacle("wall",13,0),new Obstacle("wall",14,0),new Obstacle("wall",14,1),new Obstacle("wall",14,2),new Obstacle("wall",14,3),new Obstacle("wall",14,4),new Obstacle("wall",14,5),new Obstacle("wall",14,6),new Obstacle("wall",13,6),new Obstacle("wall",12,6),new Obstacle("wall",11,6),new Obstacle("wall",10,6),new Obstacle("pillar",8,7),new Obstacle("pillar",8,8),new Obstacle("pillar",10,7),new Obstacle("pillar",10,8),new Obstacle("pillar",8,9),new Obstacle("pillar",8,10),new Obstacle("pillar",8,11),new Obstacle("pillar",8,12),new Obstacle("pillar",10,12),new Obstacle("pillar",10,11),new Obstacle("pillar",10,10),new Obstacle("pillar",10,9),new Obstacle("chair",4,1),new Obstacle("chair",3,2),new Obstacle("chair",3,3),new Obstacle("chair",4,4),new Obstacle("chair",6,1),new Obstacle("chair",7,2),new Obstacle("chair",7,3),new Obstacle("chair",6,4),new Obstacle("chair",2,8),new Obstacle("chair",1,9),new Obstacle("chair",1,10),new Obstacle("chair",2,11),new Obstacle("chair",4,8),new Obstacle("chair",5,9),new Obstacle("chair",5,10),new Obstacle("chair",4,11),new Obstacle("sign",2,5),new Obstacle("barrel",10,14),new Obstacle("barrel",8,13),new Obstacle("barrel",12,11),new Obstacle("barrel",14,13),new Obstacle("barrel",13,7),new Obstacle("barrel",11,9),new Obstacle("barrel",14,9),new Obstacle("barrel",2,14),new Obstacle("barrel",7,7),new Obstacle("barrel",1,7),new Obstacle("barrel",2,0),new Steppable("flag",14,7),new Steppable("full-heart",13,1),new Steppable("half-heart",12,13),new Steppable("half-heart",3,6),];
		enemies = [new Enemy("Ostrich",4,5,8),new Enemy("Llama",9,11,9),new Enemy("Llama",9,10,8),new Enemy("Llama",9,9,8),new Enemy("Peacock",2,9,9),new Enemy("Peacock",4,9,9),];
		allyPositions = [[1,5],[1,4],[1,6],[2,3],[2,7]];
		newAlly = new Ally("Panda",11,3,9,"Rocky");	
		startDialogues = [
			dSign("Hey! Don't press that big red button!"),
			dCharacter("Well, seeing as I'm in here to overthrow the place, I might as well press it."),
			dEnemy("Ostrich","NO NO NO YOU IDIOT&mdash;", "Warden"),
			dNeutral("Rocky","Panda","Hahaha! I'm free! Thanksabunch, elephant dude! Now let's bust our way outta here!"),
			dCharacter("...our?"),
			dAlly("Rocky","Panda","Of course! I'm on your side now. I heard what you said about overthrowing the place, that's righteous, man."),
			dAlly("Rocky","Panda","Why wait? Let's goooo! I'm gonna show 'em the ol' one-two! After all, two hits are better than one! One good smack deserves another! Strike one, strike two... and YOU'RE OUT!"),
			dEnemy("Ostrich","Why'd you do that? Now we have to listen to his terrible wordplay again!", "Warden"),
			dAlly("Rocky","Panda","With my good ol' Bamboomerang - I made that name myself, you like it? - they won't know what hit 'em. Twice. So what are we waiting for, elephant dude?!? Two can play at this game! Let's goooooo!"),
			dEnemy("Ostrich","Grrr... HEY! GUARDS! GET 'EM! The intruders, and the panda with the bad puns!", "Warden")
		];
		break;
	case 3:
		grid = 'tttWtgtttsttWtt ttttttttWtttrtt vttWgttwWtWtptW ttWttttWWWWtrtt ttttttWWWWWtWst tbtWttttWWtWttt tttttttWWtttttw tttttsttttWtttt tWWWtttttwttttt ttWWtvttttsWstt wttttttgttttttB ttttWttttWttttt ttttttWtWWttttt tWtttWtttttttWt tgtttttvtttgttt ';
		obstacles = [new Steppable("flag",9,4),new Steppable("full-heart",3,8),new Steppable("full-heart",2,8),new Steppable("full-heart",2,9),new Steppable("full-heart",1,8),new Steppable("full-heart",3,9),new Steppable("half-heart",12,3),new Steppable("half-heart",7,14),new Steppable("half-heart",6,1),new Steppable("flag",14,10),new Obstacle("hotel",6,8),new Obstacle("tree",10,6),new Obstacle("pillar",2,12),new Obstacle("chair",0,7),new Obstacle("shop",7,9),new Obstacle("house1",8,7),new Obstacle("sign",4,3),new Obstacle("house2",9,12),new Obstacle("chair",8,1),new Obstacle("barrel",4,13),new Obstacle("box",13,10),new Obstacle("bank",12,12),new Obstacle("tree",14,12),new Obstacle("shop",12,11),];
		enemies = [new Enemy("Turkey",5,5,9),new Enemy("Turkey",11,9,9,1),new Enemy("Turkey",8,7,9),new Enemy("Turkey",1,9,9),new Enemy("Turkey",12,13,9),new Enemy("Turkey",10,1,9),];	
		allyPositions = [[2,3],[1,5],[0,7],[0,2],[3,6]];
		startDialogues = [
			dCharacter("Wh- what the&mdash;"),
			dEnemy("Turkey","Do you like it? I've been redecorating! Hehehe!"),
			dCharacter("Oh, uh, nicely done... I like the, er, turkeys on houses... and the chair in the water... and that oddly-placed bit of snow..."),
			dEnemy("Turkey","Don't worry! Everything in this world is an <em>illusion</em>!"),
			dSign("<strong>WARNING!</strong> Insane Asylum. DO NOT EAT.")
		];
		endDialogues = [
			dCharacter("Does this place just get weirder and weirder each floor I go?"),
			dSign("Maybe, maybe not.<br /><em>(Eerily psychic response provided courtesy of Sychic Signs, Inc., South Sprinklestan 50515)</em>")
		];
		break;
	case 4:
		grid = 'wwWWWwwwWWWWWwW WwwwwwWwwwwWwww wwWwWWWWWWwwwWw WWWwwwWwwwWWWww WwwwWwwwWwwWwwW WwWWWWWWwwWWWwW wwwWwWwwwWWWwwW wWwWwWwWWwwWwWW WWWWwwwwWWwWWww WWwwwWWWWWwwwwW WWwWwwwWWwwwWWW WwWWwWwWwwWwwWw wwwwwWwwwWWwWww WwWWwWWwWWwwwwW WWwwwWwwWWwWWww ';
		obstacles = [new Steppable("flag",14,11),new Steppable("full-heart",12,7),new Steppable("full-heart",0,12),new Steppable("full-heart",7,8)];
		enemies = [new Enemy("Panda",11,2,9),new Enemy("Panda",0,7,9),new Enemy("Panda",2,10,10),new Enemy("Bunny",9,7,10,0.5),new Enemy("Mouse",13,13,9),new Enemy("Turkey",8,6,9),];
		allyPositions = [[12,4],[4,6],[0,0],[2,14],[2,7]];		
		startDialogues = [
			dCharacter("What? Seriously? I was kidding!"),
			dEnemy("Bunny","Oh, our apologies. Here, take this yummy and nutritious easter egg."),
			dCharacter("Oh, sure, thanks&mdash; <strong>*BOOM*</strong>"),
			dEnemy("Bunny","Silly me, I forgot to mention that it was an <em>explosive</em> egg. Hehe."),
			dCharacter("I was going to smack you down anyway, so that doesn't really make much of a difference. But what I want to know is, how do you get water up here on the 4th floor of a tower?"),
			dEnemy("Panda","Running water, genius. <em>Duh</em>."),
			dEnemy("Turkey","*snigger*"),
			dCharacter("Hey, turkey! Let me guess, you designed this floor too?"),
			dEnemy("Turkey","Hehehehehehehehehehe!")
		];
		endDialogues = [
			dCharacter("This place gets weirder and weirder... bickering thugs, insane turkeys, and this strange maze... what next?")
		];
		break;
	case 5:	
		grid = 'ttttttttttttttt ttcccctttcccctt ttcccctttcccctt ttcccctttcccctt ttcccctttcccctt ttcccctttcccctt ttttttttttttttt ttttttttttttttt ttttttttttttttt ttcccctttcccctt ttcccctttcccctt ttcccctttcccctt ttcccctttcccctt ttcccctttcccctt ttttttttttttttt ';
		obstacles = [new Obstacle("barrel",7,5),new Obstacle("barrel",6,5),new Obstacle("barrel",6,4),new Obstacle("barrel",7,3),new Obstacle("barrel",8,2),new Obstacle("barrel",6,0),new Obstacle("barrel",7,6),new Obstacle("sign",6,7),new Obstacle("box",6,8),new Obstacle("box",6,9),new Obstacle("box",7,10),new Obstacle("box",8,8),new Obstacle("box",8,7),new Obstacle("box",10,7),new Obstacle("box",9,8),new Obstacle("chair",2,11),new Obstacle("chair",0,11),new Obstacle("chair",1,12),new Obstacle("chair",1,11),new Obstacle("chair",0,13),new Obstacle("box",8,14),new Obstacle("box",6,12),new Obstacle("wall",2,2),new Obstacle("wall",2,1),new Obstacle("wall",3,1),new Obstacle("wall",4,1),new Obstacle("wall",5,1),new Obstacle("wall",5,2),new Obstacle("wall",5,4),new Obstacle("wall",5,5),new Obstacle("wall",4,5),new Obstacle("wall",3,5),new Obstacle("wall",2,5),new Obstacle("wall",2,4),new Obstacle("wall",2,10),new Obstacle("wall",2,9),new Obstacle("wall",3,9),new Obstacle("wall",4,9),new Obstacle("wall",5,9),new Obstacle("wall",5,10),new Obstacle("wall",2,12),new Obstacle("wall",2,13),new Obstacle("wall",3,13),new Obstacle("wall",4,13),new Obstacle("wall",5,13),new Obstacle("wall",5,12),new Obstacle("wall",9,10),new Obstacle("wall",9,9),new Obstacle("wall",10,9),new Obstacle("wall",11,9),new Obstacle("wall",12,9),new Obstacle("wall",12,10),new Obstacle("wall",9,12),new Obstacle("wall",9,13),new Obstacle("wall",10,13),new Obstacle("wall",11,13),new Obstacle("wall",12,13),new Obstacle("wall",12,12),new Obstacle("wall",9,4),new Obstacle("wall",9,5),new Obstacle("wall",10,5),new Obstacle("wall",11,5),new Obstacle("wall",12,5),new Obstacle("wall",12,4),new Obstacle("wall",9,2),new Obstacle("wall",9,1),new Obstacle("wall",10,1),new Obstacle("wall",11,1),new Obstacle("wall",12,1),new Obstacle("wall",12,2),new Steppable("flag",3,10),new Obstacle("chair",14,3),new Obstacle("chair",13,4),new Obstacle("chair",13,5),new Obstacle("chair",12,6),new Obstacle("chair",14,6),new Steppable("half-heart",4,4),new Steppable("half-heart",10,2),new Steppable("half-heart",10,10),];
		enemies = [new Enemy("Ostrich",5,6,10),new Enemy("Mouse",10,12,9),new Enemy("Bunny",4,10,10),new Enemy("Ostrich",11,2,9),new Enemy("Bunny",3,2,10),];
		allyPositions = [[1,6],[2,7],[1,8],[3,6],[3,8]];
		startDialogues = [
			dCharacter("Great. Now what could this be?"),
			dEnemy("Ostrich","SHUT UP! BE QUIET! THUGS ARE TRYING TO SLEEP HERE!","Guard"),
			dCharacter("Oh, I'm sorry. Didn't notice. Say, what's with the strategically placed boxes and stuff?"),
			dEnemy("Ostrich","READ THE SIGN! AND DIDN'T I TELL YOU TO SHUT UP?!?","Guard"),
			dSign("Please excuse the clutter - we're busy sleeping!"),
			dEnemy("Bunny","If you're going upstairs, could you do us a favor? Don't tell the boss we're sleeping! We've been in the barracks for three weeks now, and our pizza hasn't run out just yet - how are those pizza reserves looking, Mike?", "Bob"),
			dEnemy("Mouse","T-minus three weeks and counting. Well, two and a half if you consider the 20 boxes Ben just lugged off.", "Mike"),
			dEnemy("Bunny","TWENTY?!? ARE YOU KIDDING?!? No friend of mine eats twenty boxes of pizza! Come on, man, I eat at least <em>fifty</em>!", "Bob"),
			dCharacter("That doesn't even make mathematical sense!"),
			dEnemy("Mouse","Since when did anything here make sense?","Mike")
		];
		endDialogues = [
			dNeutral("Rabid Rabbit","Bunny","Psst! Elephant! Want an easter egg?"),
			dCharacter("Er, metaphorically, sure..."),
			dNeutral("Rabid Rabbit","Bunny","Well, before you start playing (on the main menu screen), click on the llama's left eyeball. That is all.")
		];
		break;
	case 6:
		grid = 'tttttcccccccccc tttttwwwwwwwwww tttttcccccccccc ttttttttttttttt tttttcccccccccc tttttwwwwwwwwww tttttcccccccccc ttttttttttttttt tttttcccccccccc tttttwwwwwwwwww tttttcccccccccc ttttttttttttttt tttttcccccccccc tttttwwwwwwwwww tttttcccccccccc ';
		obstacles = [new Obstacle("pillar",5,3),new Obstacle("pillar",6,3),new Obstacle("pillar",7,3),new Obstacle("pillar",8,3),new Obstacle("pillar",9,3),new Obstacle("pillar",10,3),new Obstacle("pillar",11,3),new Obstacle("pillar",12,3),new Obstacle("pillar",13,3),new Obstacle("pillar",14,3),new Obstacle("pillar",14,7),new Obstacle("pillar",13,7),new Obstacle("pillar",12,7),new Obstacle("pillar",11,7),new Obstacle("pillar",10,7),new Obstacle("pillar",9,7),new Obstacle("pillar",8,7),new Obstacle("pillar",7,7),new Obstacle("pillar",6,7),new Obstacle("pillar",5,7),new Obstacle("pillar",5,11),new Obstacle("pillar",6,11),new Obstacle("pillar",7,11),new Obstacle("pillar",8,11),new Obstacle("pillar",9,11),new Obstacle("pillar",10,11),new Obstacle("pillar",11,11),new Obstacle("pillar",12,11),new Obstacle("pillar",13,11),new Obstacle("pillar",14,11),new Steppable("flag",14,9),new Steppable("full-heart",14,1),new Steppable("full-heart",14,5),new Steppable("full-heart",14,13),new Obstacle("chair",3,0),new Obstacle("chair",2,0),new Obstacle("chair",1,0),new Obstacle("chair",1,2),new Obstacle("chair",2,2),new Obstacle("chair",3,2),new Obstacle("chair",3,4),new Obstacle("chair",2,4),new Obstacle("chair",1,4),new Obstacle("chair",1,6),new Obstacle("chair",2,6),new Obstacle("chair",3,6),new Obstacle("chair",3,8),new Obstacle("chair",2,8),new Obstacle("chair",1,8),new Obstacle("chair",1,10),new Obstacle("chair",2,10),new Obstacle("chair",3,10),new Obstacle("chair",3,12),new Obstacle("chair",2,12),new Obstacle("chair",1,12),new Obstacle("chair",1,14),new Obstacle("chair",2,14),new Obstacle("chair",3,14),];
		enemies = [new Enemy("Mouse",4,1,9),new Enemy("Mouse",4,13,10),new Enemy("Ostrich",4,5,9),new Enemy("Ostrich",4,9,10),new Enemy("Panda",3,5,10),new Enemy("Panda",3,9,10),];	
		allyPositions = [[1,1],[2,1],[1,5],[1,9],[1,13]];
		startDialogues = [
			dEnemy("Mouse","Hey! Watch what you're doing! Can't you see I'm trying to bowl here?"),
			dCharacter("Well, judging from the bad graphics, not really."),
			dEnemy("Mouse","Hey, shut up, you pinheaded pachyderm!"),
			dEnemy("Panda","Yeah, we're trying to <em>relax</em> here! Can't you see we're busy?"),
			dCharacter("Well, guys, I'm an invader, so aren't you being paid to stop me?"),
			dEnemy("Ostrich","Heh heh. We're being paid, all right, but we weren't intending on stopping you. But now that you cost me that strike with your stupid interruptions, consider yourself dead.")
		];
		break;
	case 7:
		grid = 'ttttttttttttttt ttttttttttttttt RRRRRRRRRtttttt RRRRRRRRRtttttt RRRRRRRRRtttttt ttttttRRRtttttt ttttttRRRtttttt tttttttRttttttt tttttttwttttttt tttttttwttttttt tttttttwttttttt tttttttwttttttt tttttttwttttttt tttttttwttttttt tttttttwttttttt ';
		obstacles = [new Obstacle("pillar",6,7),new Obstacle("pillar",5,7),new Obstacle("pillar",4,7),new Obstacle("pillar",3,7),new Obstacle("pillar",2,7),new Obstacle("pillar",1,7),new Obstacle("pillar",0,7),new Obstacle("pillar",8,7),new Obstacle("pillar",9,7),new Obstacle("pillar",10,7),new Obstacle("pillar",11,7),new Obstacle("pillar",12,7),new Obstacle("pillar",13,7),new Obstacle("pillar",14,7),new Steppable("flag",0,3),new Obstacle("barrel",2,5),new Obstacle("barrel",3,5),new Obstacle("barrel",4,5),new Obstacle("barrel",2,1),new Obstacle("barrel",3,1),new Obstacle("barrel",4,1),new Obstacle("box",11,2),new Obstacle("box",11,3),new Obstacle("box",11,3),new Obstacle("box",11,4),new Obstacle("barrel",2,11),new Obstacle("barrel",12,9),new Obstacle("barrel",9,14),new Obstacle("box",6,8),new Obstacle("box",1,14),new Obstacle("box",10,9),new Obstacle("box",14,13),new Obstacle("chair",10,11),new Obstacle("chair",6,11),new Obstacle("chair",2,8),new Obstacle("chair",8,13),new Obstacle("chair",1,13),new Obstacle("box",4,13),new Obstacle("box",14,11),new Obstacle("barrel",8,9),new Steppable("full-heart",12,3),new Steppable("full-heart",0,14),];
		enemies = [new Enemy("Turkey",6,10,10),new Enemy("Bunny",5,10,10),new Enemy("Ostrich",7,7,10,1),new Enemy("Mouse",7,3,10),new Enemy("Llama",2,3,10),new Enemy("Bunny",7,5,10),];
		allyPositions = [[7,13],[3,12],[9,12],[10,14],[5,14]];
		startDialogues = [
			dEnemy("Bunny","Yo, Turks! Want some pizza?"),
			dEnemy("Turkey","Nah, I'll take some wings. Extra sauce, man."),
			dCharacter("A turkey? Eating wings?"),
			dEnemy("Ostrich","Hey! What are you guys doing?!?"),
			dEnemy("Ostrich","How dare you not save me some wings!"),
			dEnemy("Llama","'Tis a most excellent morning, is it not, my good rodent?"),
			dEnemy("Mouse","I concur wholly. Would you care for some biscuits?"),
			dEnemy("Llama","I would most definitely enjoy some comestibles. Marmalade, if you will, sir."),
			dCharacter("What's up with them?"),
			dEnemy("Bunny","Yo, what? Oh, they're on the 'prim and proper' side. Little bit of red carpet makes 'em think they're <em>sooo</em> fancy and important."),
			dEnemy("Turkey","Yeah, we know what's <em>really</em> important. Junk food, TV, and relaxation. It's a good life.")
		];
		break;
	case 8:
			grid = 'ttttttWRWtttttt ttttttWRWtttttt ttttttbRbtttttt ttttttWRWtttttt ttttWWWRWWWtttt ttttWRRRRRWtttt WWBWWRRRRRWWBWW RRRRRRRRRRRRRRR WWBWWRRRRRWWBWW ttttWRRRRRWtttt ttttWWWRWWWtttt ttttttWRWtttttt ttttttbRbtttttt ttttttWRWtttttt ttttttWRWtttttt ';
		obstacles = [new Steppable("flag",0,7),new Obstacle("pillar",0,9),new Obstacle("pillar",1,9),new Obstacle("pillar",2,9),new Obstacle("pillar",3,9),new Obstacle("barrel",5,7),new Obstacle("barrel",8,5),new Obstacle("barrel",9,13),new Obstacle("barrel",11,4),new Obstacle("barrel",5,0),new Obstacle("barrel",1,3),new Obstacle("barrel",1,13),new Obstacle("barrel",4,12),new Obstacle("barrel",11,11),new Obstacle("barrel",13,7),new Obstacle("barrel",12,1),new Obstacle("barrel",14,2),new Obstacle("barrel",7,3),new Steppable("full-heart",7,6),new Steppable("half-heart",8,12),new Steppable("half-heart",6,2),];
		enemies = [new Enemy("Llama",7,7,10,0.5),new Enemy("Ostrich",13,10,10),new Enemy("Peacock",2,8,10),new Enemy("Ostrich",10,3,10),new Enemy("Mouse",3,1,10),new Enemy("Bunny",7,0,10),];
		allyPositions = [[3,10],[1,2],[12,13],[11,0],[5,9]];
		startDialogues = [
			dEnemy("Llama","Behold! I have found that which hath escaped me! The defilers themselves!"),
			dCharacter("Dr. L-l-llama?"),
			dEnemy("Llama","Yes, foolish pachyderm! Thou thinkest that I would sit alone like the others? Ha! Thou art a general offense!"),
			dCharacter("So, Dr. Llama, I've always wanted to know two things: why'd you steal all the donuts, and what's your first name?"),
			dEnemy("Llama","My reasons for the misappropriation of the aforementioned pastries are profound, and far beyond the scope of the mind of a mere mortal such as yourself! My mind is an enigma!"),
			dCharacter("OK, so what's your first name?"),
			dEnemy("Llama","Er, uh, my... <em>premier</em>... <em>sobriquet</em>... let's see... is... uh... curse you, thesaurus! Why must you fail so much!"),
			dCharacter("Right. Where's the real Dr. Llama?"),
			dEnemy("Mouse","Right upstairs.")
		];
		endDialogues = [
			dCharacter("Here we go... let's hope the real guy isn't as much of a thesaurus-thug as that last guy.")
		];
		break;
	case 9:
		grid = 'twwwwwtttwwwwwt ttwRwtttttwRwtt tttRtttttttRttt tttRtttttttRttt tttRtttttttRttt tttRtttttttRttt tttRtttttttRttt tttRRRRRRRRRttt tttttttRttttttt tttttttRttttttt tttttttRttttttt ttRttttRttttRtt tRRRtttRtttRRRt ttRttttRttttRtt tttttttRttttttt ';
		obstacles = [new Obstacle("barrel",8,7),new Obstacle("barrel",9,7),new Obstacle("barrel",10,7),new Obstacle("barrel",11,7),new Obstacle("barrel",11,6),new Obstacle("barrel",11,5),new Obstacle("barrel",11,4),new Obstacle("barrel",11,3),new Obstacle("barrel",11,2),new Obstacle("chair",8,0),new Obstacle("chair",9,1),new Obstacle("chair",10,2),new Obstacle("chair",12,2),new Obstacle("chair",13,1),new Obstacle("chair",0,0),new Obstacle("chair",1,1),new Obstacle("chair",2,2),new Obstacle("chair",4,2),new Obstacle("chair",5,1),new Obstacle("chair",6,0),new Obstacle("pillar",1,9),new Obstacle("pillar",2,9),new Obstacle("pillar",3,9),new Obstacle("pillar",11,9),new Obstacle("pillar",12,9),new Obstacle("pillar",13,9),new Steppable("full-heart",4,10),new Steppable("full-heart",10,10),new Steppable("full-heart",7,4),new Steppable("flag",3,0),new Obstacle("barrel",4,14),new Obstacle("barrel",5,13),new Obstacle("barrel",6,12),new Obstacle("barrel",8,12),new Obstacle("barrel",9,13),new Obstacle("barrel",10,14),new Steppable("secret-entrance",11,0)];
		enemies = [new Boss("Llama","Dr. Llama",3,1,10)];
		allyPositions = [[7,12],[3,12],[11,12],[1,12],[13,12]];
		startDialogues = [
			dEnemy("Llama","Oh, hello! So nice of you to drop in on such short notice... please, sit down. Tea or coffee?", "Dr. Llama"),
			dCharacter("Er, are you... OK?"),
			dEnemy("Llama","Oh, yes, perfectly chipper, actually. My plan to steal all of the world's donuts is quite nearly successful; I am in possession of in excess of one million donuts. There was, I believe, an elephant who often showed up at just the wrong time to thwart some of my plans, a rather unfortunate coincidence.", "Dr. Llama"),
			dEnemy("Llama"," However, I have developed bigger and better plans, and I hear that said elephant is in my castle at this very moment. As such, I will have my minions crush him and, with nothing standing in my way, proceed to finish my quest. Cream and sugar?", "Dr. Llama"),
			dCharacter("Oh, no... I prefer my coffee black. But&mdash;"),
			dEnemy("Llama","Oh my, I apologize for the confusion. I meant your donut. Cream and sugar? Vanilla or chocolate? I've a vast variety of donuts at my disposal. Perhaps try this blueberry and tomato one? Very tasty, actually.", "Dr. Llama"),
			dCharacter("Well, I hate to break it to you, doctor, but <em>I'm</em> that elephant you were talking about."),
			dEnemy("Llama","Elephant? What elephant? Oh! Were you the one who was going to perform the inspection of my donut stock? Rest assured, sir, that I keep my donuts properly stored and preserved.","Dr. Llama"),
			dCharacter("No! I'm that one who you said was thwarting all your plans, showing up at just the wrong time, remember? The one you said you were going to crush?"),
			dEnemy("Llama","Oh, yes, yes, I remember now. Nice to meet you. Well, then, we must settle this dispute in a fair and equitable way, should we not? Do you know any bridge?", "Dr. Llama"),
			dCharacter("Call me crazy, but I was thinking about, you know, <em>fighting</em> it out, seeing as that's all I've been doing for the last, oh, two hundred-odd minions of yours?"),
			dEnemy("Llama","Ah, the old gentlemen's duel. Very well. I'll be there in a jiffy; this imported coffee isn't going to drink itself, what?", "Dr. Llama"),
			dCharacter("Say, I've always wondered, doctor, why do you want to steal all the world's donuts?"),
			dEnemy("Llama","A fair question, young sir. To be honest, I have no idea. Just a passing whim. But if you were a multimillionaire with nothing better to do, I'm sure you'd see where I'm coming from. And now, we must, ah, fight. Good luck.", "Dr. Llama")
		];
		endDialogues = [
			dEnemy("Llama","Ah... I knew... we should have played bridge... you win this battle, young pachyderm, and the donuts are yours... well done...", "Dr. Llama"),
			dEnemy("Llama","But... if you think... you've defeated all the evil in this world... then, my friend, you are sorely mistaken... do you see that darkened circle behind the other throne?... Try again next time... and He will be waiting...", "Dr. Llama")
		];
		break;
	case SECRET_STAGE:
		grid = 'tttWWRRRRRWWttt ttWWRRRRRRRWWtt tttWWRRRRRWWttt ttttWWRRRWWtttt tttWWWWRWWWWttt ttWWWtttttWWWtt tWWWtttttttWWWt tWWtttttttttWWt tWtttttttttttWt tRtttttttttttRt tWtttttttttttWt tWWWRtttttRWWWt ttWWWWWRWWWWWtt tttWWWWtWWWWttt ttttttttttttttt ';
		obstacles = [new Obstacle("pillar",5,7),new Obstacle("pillar",5,8),new Obstacle("pillar",5,9),new Obstacle("pillar",9,7),new Obstacle("pillar",9,8),new Obstacle("pillar",9,9),new Obstacle("pillar",4,8),new Obstacle("pillar",10,8),new Obstacle("pillar",1,1),new Obstacle("pillar",2,2),new Obstacle("pillar",3,3),new Obstacle("pillar",2,4),new Obstacle("pillar",1,5),new Obstacle("pillar",13,5),new Obstacle("pillar",12,4),new Obstacle("pillar",11,3),new Obstacle("pillar",12,2),new Obstacle("pillar",13,1),new Obstacle("pillar",1,12),new Obstacle("pillar",2,13),new Obstacle("pillar",12,13),new Obstacle("pillar",13,12),new Steppable("full-heart",7,8),new Steppable("full-heart",0,14),new Steppable("full-heart",14,14),new Steppable("full-heart",14,0),new Steppable("full-heart",0,0),new Steppable("flag",7,0),];
		enemies = [new Boss("Elephant","Donald Trunk",7,1,10)];
		allyPositions = [[7,12],[1,9],[13,9],[4,11],[10,11]];
		startDialogues = [
			dCharacter("What the...? Who are you?"),
			dEnemy("Elephant_Boss","Me? I am none other than the famed tycoon Donald Trunk! You should know me and my hair by now!", "Donald Trunk"),
			dCharacter("But... what about Dr. Llama?"),
			dEnemy("Elephant_Boss","You think I'd let that idiotic, crumpet-eating camelid handle the affairs of this entire operation? No! It takes a genius to run such a huge affair, and I am an official card-carrying genius.","Donald Trunk"),
			dCharacter("But then why would you use Llama anyway?"),
			dEnemy("Elephant_Boss","He was rich and stupid! I was going to make him <em>seem</em> like the guy who stole all the donuts, then kill him and look like a hero. Imagine the huge amounts of fame I'd amass! I'd be trending on Twitter for weeks - no, years! - on end!", "Donald Trunk"),
			dCharacter("But you're famous enough as is."),
			dEnemy("Elephant_Boss","Yeah, sure. But imagine the free publicity that would be given to all my TV shows, rental properties, and presidential bids!","Donald Trunk"),
			dCharacter("So you stole all the world's donuts as a publicity stunt?"),
			dEnemy("Elephant_Boss","Mostly. But imagine, I could give back only a fraction of the donuts - then sell the remainder at massive prices! You can never be too rich or too famous!", "Donald Trunk"),
			dCharacter("OK, this does it. You caused us all this pain and suffering, everyone, and for what? For more cash and fame!"),
			dEnemy("Elephant_Boss","Isn't it... beautiful? I knew you'd agree, it was a great plan. And because you killed Dr. Llama, I can't have you escape, now can I? Looks like you'll have to go too if I want my plan to succeed.","Donald Trunk"),
			dCharacter("You're not getting away with this! EN GARDE!")
		];
		break;
	}
	return new Level(5,levelNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly);
}));