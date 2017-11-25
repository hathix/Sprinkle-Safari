 /**
	Act 3, Before Cream
*/

acts.push(new Act(4,function(levelNum){
	var grid;
	var background = 'savannah';
	var obstacles;
	var enemies;
	var allyPositions;
	var startDialogues;
	var endDialogues;
	var newAlly;
	
	switch(levelNum){
	case 1:
		grid = 'vvvpvvvvvvvvvvv vvvppvvvvvvvvvv vvvvppvvvvvvppp vvvvvpvvvvpppvv vvvvvppvpppvvvv vvvvvvpppvvvvvv vvvvvvvpvvvvvvv vvvvvvvpvvvWvvv vvvvvvvpvvWWWWv vvvvppppvvvWWWv vvvppvvpvvvvvvv vvppvvvpvvvvvvv vvvvvvdddvvvvvv vvvvvvdddvvvvvv vvvvvvdddvvvvvv ';
		obstacles = [new Steppable("flag",14,2),new Obstacle("bank",14,1),new Obstacle("hotel",1,11),new Obstacle("house3",2,0),new Obstacle("house2",4,3),new Obstacle("house1",5,1),new Obstacle("house3",5,5),new Obstacle("house1",7,4),new Obstacle("house2",8,8),new Obstacle("hydrant",6,10),new Obstacle("hydrant",9,3),new Obstacle("tree",1,5),new Obstacle("tree",2,6),new Obstacle("tree",11,12),new Obstacle("tree",13,11),new Obstacle("building",2,10),new Obstacle("hotel",3,12),new Steppable("half-heart",1,10),new Steppable("half-heart",12,7),new Steppable("half-heart",3,0),];
		enemies = [new Enemy("Zebra",13,2,6),new Enemy("Giraffe",6,4,6),new Enemy("Giraffe",2,11,6),new Enemy("Gnu",7,5,6),new Enemy("Leopard",3,10,6),];
		allyPositions = [[7,12],[7,13],[7,14],[6,13],[8,13]];
		startDialogues = [
			dCharacter("Oof... where am I?"),
			dNeutral("Zoe","Cat","Huh? What? Who are YOU?"),
			dCharacter("Well, we're adventurers trying to find Dr. Llama, who's stolen all the donuts. I'm in the right time period, right?"),
			dNeutral("Zoe","Cat","Depends. Do you know what an internet meme is?"),
			dCharacter("Unfortunately. You're not a 'Lolcat' by any chance, are you?"),
			dNeutral("Zoe","Cat","Yup, you're in the right time period. Congrats. And if you're looking for Dr. Llama, you're just a bit off. You're in West Sprinklestan, he lives off to the east."),
			dCharacter("Well then, thanks for your help. Guess I'll be off now."),
			dNeutral("Zoe","Cat","Wait! Before you go, talk to Sheriff Wilson over at the bank! He said he needs help with some criminals and I think you guys might be able to do something."),
			dCharacter("I'll see what I can do.")
		];
		break;	
	case 2:
		grid = 'wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww wwwwwwwwwwwwwww ';
		obstacles = [new Obstacle("chair",7,0),new Obstacle("chair",6,0),new Obstacle("chair",8,0),new Obstacle("chair",5,1),new Obstacle("chair",9,1),new Obstacle("chair",4,2),new Obstacle("chair",3,3),new Obstacle("chair",3,4),new Obstacle("chair",3,5),new Obstacle("chair",3,6),new Obstacle("chair",10,2),new Obstacle("chair",11,3),new Obstacle("chair",11,4),new Obstacle("chair",11,5),new Obstacle("chair",11,6),new Obstacle("chair",4,7),new Obstacle("chair",5,8),new Obstacle("chair",6,8),new Obstacle("chair",10,7),new Obstacle("chair",9,8),new Obstacle("chair",8,8),new Obstacle("chair",3,10),new Obstacle("chair",2,11),new Obstacle("chair",2,12),new Obstacle("chair",3,13),new Obstacle("chair",11,10),new Obstacle("chair",12,11),new Obstacle("chair",12,12),new Obstacle("chair",11,13),new Obstacle("chair",7,11),new Steppable("flag",7,1),new Steppable("full-heart",5,0),new Steppable("full-heart",9,0),new Steppable("half-heart",0,5),new Steppable("half-heart",14,5),new Steppable("quarter-heart",7,10),];
		enemies = [new Enemy("Giraffe",1,1,7),new Enemy("Giraffe",13,1,7),new Enemy("Zebra",5,4,7),new Enemy("Zebra",9,4,6),new Enemy("Leopard",7,12,6, 1),new Enemy("Monkey",7,2,6),];
		allyPositions = [[7,13],[6,13],[8,13],[6,14],[8,14]];	
		startDialogues = [
			dNeutral("Sheriff Wilson","Gnu","HELP! Someone save me!"),
			dEnemy("Monkey","Shut up, old man. Besides, all your donuts are gone. Screaming and kicking isn't going to get them back. Nothing is, actually. He he he.")
		];	
		endDialogues = [
			dCharacter("Sheriff! Are you OK?"),
			dNeutral("Sheriff Wilson","Gnu","Just fine, thanks. Lemme introduce myself, folks. Sheriff Wilson of the West Sprinklestan Police Force. Pleasure ta meetcha."),
			dCharacter("Has there been a robbery or something?"),
			dNeutral("Sheriff Wilson","Gnu","Oh, you betcha, youngin'. Some thugs - Dr. Llama's, methinks - came in and right absconded - ah say, <i>absconded</i> with all the donuts in this 'ere bank! And it ain't any ol' bank - it's the First Bank of West Sprinklestan!"),
			dCharacter("What did they steal?"),
			dNeutral("Sheriff Wilson","Gnu","Donuts. And tons of 'em, bucko. I swear, there was mounds and mounds of them in the safes - musta been at least two thousand. But they just came in and <i>absconded</i> with 'em! Ah say!"),
			dCharacter("Sorry to hear that, Sheriff. Any way I can help?"),
			dNeutral("Sheriff Wilson","Gnu","You betcha, kiddo. I heard they was makin' off for Llama's castle off to the west. If'n ya hurry up you can probably catch their leader - that's the danger'is outlaw Dirty Benny - before 'e reaches the castle."),
			dCharacter("Sure... but are you going to come along?"),
			dNeutral("Sheriff Wilson","Gnu","Don't be crazy! I'm not suicidal - I mean young. Yeh, that's what ah meant, young. Good luck though, bucko. You'll need it.")
		];
		break;
	case 3:
		grid = 'vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv ppvvvvvvvvvvvpp vpppvvvvvvvvvpv vvvpppvvvpppppv vvvvvpppppvvvvv vvvvvvvpvvvvvvv vvvvvvvpvvvvvww vvvvvvvpvvvwwwW wwvvvwwwwwwwWBW WwwwwwwwwwwwWBW WWBWwwwwwwwwWBW WWBWwwwwwWwwWBW WWBWWBWBWWWBWWW WWWWWBWWWWWBWWW ';
		obstacles = [new Steppable("flag",14,2),new Obstacle("shop",1,8),new Obstacle("shop",10,8),new Obstacle("house2",4,9),new Obstacle("house3",13,6),new Obstacle("barrel",5,11),new Obstacle("barrel",8,10),new Obstacle("barrel",10,11),new Steppable("half-heart",2,13),new Steppable("half-heart",13,12),new Steppable("half-heart",0,2),];
		enemies = [new Enemy("Leopard",2,12,7),new Enemy("Leopard",13,11,7),new Enemy("Monkey",7,5,7),new Enemy("Zebra",3,7,7),new Enemy("Monkey",9,8,7),];
		allyPositions = [[7,11],[5,12],[11,13],[5,14],[7,13]];	
		newAlly = new Ally("Hippo",0,0,7,"May");
		startDialogues = [
			dNeutral("Captain May","Hippo","Hey, hathix! Didn't you travel on my ship to North Icington the other day?"),
			dCharacter("Wait... yeah, I did! Nice to see you again, Captain!"),
			dNeutral("Captain May","Hippo","You can just call me May. So what are you doing here?"),
			dCharacter("Well, I'm still on my mission to reclaim the donuts from Dr. Llama. It's been a long journey but I'm almost there. How about you?"),
			dNeutral("Captain May","Hippo","Me? I'm off for a few weeks, so I came over here to meet the family. Little did I realize that Llama's goons would be infesting the place."),
			dCharacter("While you're off duty, would you like to come with me? I'm sure you'd like to do in Llama as much as I would."),
			dAlly("May","Hippo","You betcha! I've been itching to sock it to these guys ever since they ransacked my favorite ship back in North Icington! Let's go!")
		];
		break;
	case 4:
		grid = 'vvvpppppppppvvv vvvpvvvvvvvpppv vvvpvWWWWvvvvpp vvppvWWWWWWWvvp vvpvWWWWWWWWWvp vvpvvWWWWWWWvvp vppvWWWWWWWWvvp vpvvWWWWWWWWvvp ppvWWWWWWWWWvvp vvvWWWWWWWWWvvv vvvvWWWWWWWWWWv vvvWWWWWWWWWWWv vvvvWWWWWWWWWWv vvvvWWWWWWWWWvv vvvvvvvvvvvvvvv ';
		obstacles = [new Steppable("flag",14,8),new Obstacle("tree",3,13),new Obstacle("tree",14,14),new Obstacle("tree",1,3),new Obstacle("tree",14,1),new Obstacle("hydrant",6,1),new Obstacle("hydrant",13,6),new Obstacle("hydrant",1,9),];
		enemies = [new Enemy("Monkey",12,9,8),new Enemy("Hippo",3,2,7),new Enemy("Zebra",7,14,7),new Enemy("Leopard",9,0,7),];		
		allyPositions = [
			[0,8],[1,8],[1,7],[1,6],[2,6]
		];
		startDialogues = [
			dEnemy("Hippo","Hey! Someone's coming! RUN!","Ted"),
			dEnemy("Monkey","What? Guys! Wait in ambush! They'll never know what hit 'em! Especially after I go bananas on them... ooh, that'll leave a mark...","Jorge"),
			dEnemy("Leopard","Yeah, in you. No, Reflex is where it's at. Not only do they miss, they hit <i>themselves</i>. Can Zeebs say that? I didn't think so!","Tisch"),
			dEnemy("Zebra","What? What? Stop picking on me!","Zeebs")
		];
		break;
	case 5:
		grid = 'vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv ';
		obstacles = [new Steppable("flag",14,0),];
		enemies = [new Enemy("Hippo",6,1,7),new Enemy("Rhino",7,1,7),new Enemy("Zebra",10,8,8, 0.5),new Enemy("Leopard",8,5,7),new Enemy("Gnu",13,5,8, 0.5),];		
		allyPositions = [[3,10],[10,11],[11,10],[0,9],[7,14]];
		startDialogues = [
			dEnemy("Leopard","What? Seriously? They put us in THIS level? Come on!"),
			dEnemy("Gnu","Yeah, I know! Did the guy who made this game have NO creativity at all?"),
			dCharacter("Well, to be fair, game developers don't get paid enough."),
			dEnemy("Rhino","Yeah, but that's no excuse for not even putting something in here. How long would it take to put in a tile of water? A second?"),
			dCharacter("Wait, why am I talking with you? And why are we suddenly realizing we're just blobs of pixels and bytes on a computer somewhere?"),
			dEnemy("Zebra","Dudes, he knows too much. He must be taken down. Like, now.")
		];
	}
	
	/*
	 * 1 Welcome back
	 * 2 Bank
	 * 3 Port (May)
	 * 4 Watering Hole
	 * 5 Totally Empty
	 * 6 Gnu Herd
	 * 7 Path to the Castle
	 * 8 Courtyard
	 * B At the gate
	 * 
	 */

	return new Level(4,levelNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly);
}));