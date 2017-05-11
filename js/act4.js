 /**
	Act 4, Sprinkle Savannah
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
			dNeutral("Sheriff Wilson","Gnu","You betcha, kiddo. I heard they was makin' off for Llama's castle off to the east. If'n ya hurry up you can probably catch their leader - that's the danger'is outlaw Dirty Benny - before 'e reaches the castle."),
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
		break;
	case 6:
		grid = 'vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvWvvvv pppppvvvvWWWvvv vvvvpvvvvWWWWvv vvvvpppvvvvWvvv vvvvvvpvvvWWvvv vvvvvvppvvvvvvv vvvvvvvpppvvvvv vvvvvvvvvpvvvvv vvvvvvvvvppppvv vvWWWvvvvvvvpvv vWWWWWvvvvvvpvv vvWvWWvvvvvvppv vvvvvvvvvvvvvpv ';
		obstacles = [new Steppable("flag",13,14),new Steppable("half-heart",3,13),new Steppable("half-heart",10,5),];
		enemies = [new Enemy("Gnu",7,8,7,1),new Enemy("Gnu",7,7,8),new Enemy("Gnu",8,8,8),new Enemy("Gnu",7,9,8),new Enemy("Gnu",6,8,8),new Enemy("Hippo",4,3,7),];
		allyPositions = [[1,3],[1,4],[0,3],[0,4],[0,2]];
		startDialogues = [
			dEnemy("Hippo","Yo! Yo! Elephant at, uhh... one two four... nine o'clock!","Scout"),
			dEnemy("Gnu","Oh, good. The game's on and it should end... at 8:30.", "Chuck"),
			dEnemy("Gnu","No, you idiot! This game's going into extras! No way it'll be done by 9!", "Gerald"),
			dEnemy("Hippo","You guys is so smart!","Scout"),
		];
		break;
	case 7:
		grid = 'vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvWvvvvvvv vvvvvvWWWvvvvvv vvvvvvvWvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv ppppppppppppppp vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvWvvvvvvv vvvvvvWWWvvvvvv vvvvvvvWvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv';
		obstacles = [new Obstacle("tree",0,6),new Obstacle("tree",1,6),new Obstacle("tree",2,6),new Obstacle("tree",4,6),new Obstacle("tree",5,6),new Obstacle("tree",6,6),new Obstacle("tree",8,6),new Obstacle("tree",9,6),new Obstacle("tree",10,6),new Obstacle("tree",12,6),new Obstacle("tree",13,6),new Obstacle("tree",14,6),new Obstacle("tree",14,8),new Obstacle("tree",13,8),new Obstacle("tree",12,8),new Obstacle("tree",10,8),new Obstacle("tree",9,8),new Obstacle("tree",8,8),new Obstacle("tree",6,8),new Obstacle("tree",5,8),new Obstacle("tree",4,8),new Obstacle("tree",2,8),new Obstacle("tree",1,8),new Obstacle("tree",0,8),new Steppable("flag",14,7),new Steppable("full-heart",1,2),new Steppable("full-heart",1,12),new Obstacle("house2",11,3),new Obstacle("house2",11,11),];
		enemies = [new Enemy("Rhino",7,7,8),new Enemy("Rhino",13,7,8),new Enemy("Rhino",12,7,8),new Enemy("Hippo",11,7,8),new Enemy("Monkey",5,3,8),new Enemy("Leopard",5,11,8),];
		allyPositions = [[3,7],[2,7],[1,7],[0,7],[4,7]];
		startDialogues = [
			dEnemy("Rhino","WHOA WHOA WHOA! GET OFF MAH LAWN!","Groundskeeper"),
			dCharacter("Er, sure... uh, if you'd just move out of the way..."),
			dEnemy("Rhino","Y'all think y'all's talkin' t' an idjit?","Groundskeeper"),
			dEnemy("Monkey","Ah think 'e knows <em>now</em>!"),
			dEnemy("Leopard","*snickah*"),
			dEnemy("Rhino","Would y'alls stop tramplin' mah flowuhs? Ah say, kids these days! NO RESPECT FO' THEY-UH ELDAHS! When will y'all learn? Y'all's nevah hadda job, hasn't ya? No, once y'all learn RESPONSIBILITY and THE VALUE OF HAHD WORK &mdash;","Groundskeeper"),
			dCharacter("Sorry to interrupt, but could we get on with, er, whatever we were doing?")
		];
		break;
	case 8:
		grid = 'vvvvvvvvvpppppp vvvvvvvWWBWvvvv vvvvvvWWvvWWvvv WWWWWWWvvvWWWWv WWWWWWvvvvvvWWW vvvvvvvvvvvvvvW vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv vvvvvvvvWWBWWvv vvvvvvvvWvvvWvv vvvvvvvvbvvvbvv vvvvvvvvWvvvWvv vvvvvvvvWWBWWvv vvvvvvvvvvvvvvv vvvvvvvvvvvvvvv ';
		obstacles = [new Obstacle("tree",0,9),new Obstacle("tree",1,9),new Obstacle("tree",2,9),new Obstacle("tree",3,9),new Obstacle("tree",5,14),new Obstacle("tree",5,13),new Obstacle("tree",5,12),new Obstacle("tree",5,11),new Obstacle("sign",2,12),new Steppable("flag",14,0),new Steppable("full-heart",0,0),new Steppable("half-heart",10,10),new Steppable("quarter-heart",5,9),new Obstacle("house3",2,7),new Obstacle("house2",12,14),new Obstacle("house1",3,1),new Obstacle("house2",9,5),new Obstacle("tree",9,4),new Obstacle("tree",10,5),new Obstacle("tree",12,13),new Obstacle("tree",13,14),new Obstacle("tree",1,7),new Obstacle("tree",2,6),new Steppable("quarter-heart",13,13),new Obstacle("tree",6,6),new Obstacle("tree",13,7),];
		enemies = [new Enemy("Rhino",9,10,8),new Enemy("Rhino",10,11,8),new Enemy("Rhino",9,1,8),new Enemy("Giraffe",4,9,8),new Enemy("Zebra",5,10,8),new Enemy("Leopard",8,5,8),];
		allyPositions = [[1,12],[2,13],[1,13],[0,12],[2,14]];
		startDialogues = [
			dSign("<span style='text-align: center;'><h3>Now entering Dr. Llama's courtyard!</h3><p>Be scared. <strong> Very scared.</p></span>"),
			dEnemy("Giraffe","Where d'you think YOU'RE going, partner?"),
			dEnemy("Zebra","Yeah!"),
			dCharacter("Well, uh, seeing as this is Dr. Llama's courtyard, I'm guessing his castle's back there beyond the river. Right?"),
			dEnemy("Zebra","Yeah!"),
			dEnemy("Giraffe","No, you ignominious cretin. This is the courtyard for a reason, partner. Llama's gardens are over there. Then there's a path to his castle."),
			dEnemy("Zebra","Yeah!"),
			dEnemy("Giraffe","But don't bother going any farther. Our boss, Benjamin Squeekycleen - a.k.a. Dirty Benny - is back there and there's no way you twits are going anywhere."),
			dEnemy("Zebra","Yeah!"),
			dEnemy("Giraffe","Do you want me to punch you in the face?"),
			dEnemy("Zebra","Yeah!")
		];
		endDialogues = [
			dCharacter("Hey, I think I can see a castle over there...")
		];
		break;
	case 9:
		grid = 'vvvvvvvpWWWWWWv ppppppvpvvvvvWv pvvvvpvpvWWWvWv pvppvpvpvWvWvWv pvpvvpvpvWvvvWv pvppppvpvWWWWWv pvvvvvvpvvvvvvv ppppppppppppppp vvvvvvvpvvvvvvp vdddddvpvppppvp vdvvvdvpvpvvpvp vdvdvdvpvpvppvp vdvdddvpvpvvvvp vdvvvvvpvpppppp vddddddpvvvvvvv ';
		obstacles = [new Obstacle("tree",4,6),new Obstacle("tree",3,6),new Obstacle("tree",2,6),new Obstacle("tree",1,6),new Obstacle("tree",1,5),new Obstacle("tree",1,4),new Obstacle("tree",1,3),new Obstacle("tree",1,2),new Obstacle("tree",2,2),new Obstacle("tree",3,2),new Obstacle("tree",4,2),new Obstacle("tree",4,3),new Obstacle("tree",4,4),new Obstacle("tree",3,4),new Obstacle("tree",11,10),new Obstacle("tree",10,10),new Obstacle("tree",10,11),new Obstacle("tree",10,12),new Obstacle("tree",11,12),new Obstacle("tree",12,12),new Obstacle("tree",13,12),new Obstacle("tree",13,11),new Obstacle("tree",13,10),new Obstacle("tree",13,9),new Obstacle("tree",13,8),new Obstacle("tree",12,8),new Obstacle("tree",11,8),new Obstacle("tree",10,8),new Obstacle("tree",6,6),new Obstacle("tree",6,8),new Obstacle("tree",8,8),new Obstacle("tree",8,6),new Steppable("flag",10,3),new Steppable("full-heart",3,3),new Steppable("full-heart",11,11),new Steppable("full-heart",3,11),new Steppable("half-heart",7,7),new Steppable("secret-entrance", 14, 1)];
		enemies = [new Boss("Monkey","Dirty Benny",8,1,8),];
		allyPositions = [[5,9],[2,3],[12,11],[0,7],[7,14]];
		startDialogues = [
			dEnemy("Mouse","Do you have the donuts?"),
			dEnemy("Monkey","Of CO-AHSE ah have the donuts! Whatcha take me fer, a fool?", "Dirty Benny"),
			dEnemy("Mouse","Judging from your shocking lack of intellect, yes."),
			dEnemy("Monkey","Ah have no ah-dea what yew and yer fancy cahllege-edjicayted mouth is sayin', but listen 'ere, ah have the donuts from the bank - two thousind of 'em - an' ah'm gonna take it ta Llama meself. So outta mah way.", "Dirty Benny"),
			dEnemy("Mouse","Shush, you louche louse! Someone's coming!"),
			dCharacter("Hey, er, is that Llama's castle back there?"),
			dEnemy("Mouse","Maybe it is, maybe it isn't. What do you want?"),
			dCharacter("Well, er, I just had some donuts to drop off to Mr. Llama &mdash;"),
			dEnemy("Mouse","WHOA WHOA WHOA! That's DOCTOR Llama to you, kid! You're a fake! No, we instill the qualities of RESPECT in our army of thieves, liars, and guys with no better way to spend their time!"),
			dEnemy("Mouse","...but we don't instill the value of courage. You, primate, fight him. I'm outta here!"),
			dEnemy("Monkey","Let me guess... y'all wants mah donuts, doncha? Huh? Well they're MAHNE! (And never mind how ah carried them all over here.)", "Dirty Benny"),
			dCharacter("Well, Benny, looks like we're going to have to <em>clean</em> your clock. Har har har. (I've been itching to crack a bad joke since level 1-1.)")
		];
		endDialogues = [
			dCharacter("Finally! We're at Llama's castle! He's right up at the top of these stairs!"),
			dNeutral("Terrorized Villager","Cow","Aren't you going to return the donuts?!?"),
			dCharacter("Er, good point. After I take care of Llama."),
			dSign("You want to beat Dr. Llama? Good luck with that!<br /><em>(Eerily psychic response provided courtesy of Sychic Signs, Inc., South Sprinklestan 50515)</em>")
		];
		break;
	case SECRET_STAGE:
		background = 'tile';
		grid = 'ttttttttttttttt ttttttttttttttt ttttttttttWWttt tttttttWWWWWWtt ttttttttWWWWWWt tttttttWWWWtWWW ttttttWWWWWBWWW tttttWWWWWWBWWt ttttWWttWWWBWtt tttWWWWtttWtWtt WWBWttttttttttt WWttttttttttttt ttttttttttttttt ttttttttttttttt ttttttttttttttt ';
		obstacles = [new Obstacle("barrel",6,12),new Obstacle("barrel",10,11),new Obstacle("barrel",13,13),new Obstacle("barrel",10,14),new Obstacle("box",3,3),new Obstacle("box",1,5),new Obstacle("box",5,1),new Obstacle("box",4,5),new Obstacle("box",14,0),new Steppable("flag",11,5),new Steppable("full-heart",14,2),new Steppable("half-heart",3,13),];
		enemies = [new Enemy("Bee",2,8,8,0.5),new Enemy("Duck",6,8,8,0.3),new Enemy("TRex",11,6,8,0.3),new Enemy("Cow",11,1,8,0.3),new Enemy("Chicken",8,13,8,0.3),];	
		allyPositions = [[2,1],[3,2],[4,2],[2,3],[1,3]];
		startDialogues = [
			dSign("THE LLAMA LLODGE - Basement 1"),
			dEnemy("Duck","Hey! Are you the repair guy? Glad you came. Mr. Lolcat over here busted a pipe by jumping up and down and pretending he was a kitten."),
			dEnemy("TRex","Can haz help?", "Mr. Lolcat"),
			dEnemy("Duck","Again, excuse us all for that dinosaur's stupidity. I swear, I think Llama puts 'Low IQ a bonus' on his Goon Application Forms (tm)."),
			dEnemy("TRex","Lol! I haz earz, u no!!1111", "Mr. Lolcat"),
			dEnemy("Bee","Why'd you \"lol\" at that?!?"),
			dEnemy("TRex","I dunno. Teh boss haz teh answers. And teh donutz.", "Mr. Lolcat"),
			dCharacter("If you don't mind, could I just go upstairs? I've got some, er, cheeseburgers to deliver."),
			dEnemy("Cow","Oh, no..."),
			dEnemy("Trex","U HAZ CHEEZBURGER?!? I MUST HAZ CHEEZBURGER!!!!", "Mr. Lolcat"),
			dEnemy("Cow","Hey, dude, you <em>might</em> want to run. Fast. Now.")
		];
		endDialogues = [
			dCharacter("What was that? I feel a good bit dumber after that incident. Oh, my head. Let's get out of here."),
			dSign("What? There are still 9 floors to go!<br /><em>(Eerily psychic response provided courtesy of Sychic Signs, Inc., South Sprinklestan 50515)</em>")
		];
		break;
	}

	return new Level(4,levelNum,grid,background,obstacles,enemies,allyPositions,startDialogues,endDialogues,newAlly);
}));