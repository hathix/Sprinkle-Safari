	
	//for coins
	const GET_POINTS = function(){
		//player earns points
		switch(this.pictureName){
			case "red_coin":
				player.earnPoints(RED_POINTS);
				break;
			case "yellow_coin":
				player.earnPoints(YELLOW_POINTS);
				break;
			case "blue_coin":
				player.earnPoints(BLUE_POINTS);
				break;
			case "green_coin":
				player.earnPoints(GREEN_POINTS);
				break;
		}
		//remove from list of stuff on grid and board
		currentLevel.removeObjectFromBoard(this);
		currentLevel.removeObjectFromGrid(this);
	}
	
	/*
		Used only for hearts, lets you earn health
	*/
	const GAIN_HEALTH = function(stepper){
		if(stepper.isAlly){
			var healPercent = 0;
			
			switch(this.name){
				case 'full_heart':
					healPercent = FULL_HEART;
					break;
				case 'half_heart':
					healPercent = HALF_HEART;
					break;
				case 'quarter_heart':
					healPercent = QUARTER_HEART;
					break;
			}
			
			stepper.gainHPPercent(healPercent / 100);
			this.disappear();
		}
	}