//all the players' stats and data

var team = []; //user's team of animals
var selectedAnimal = null; //animal that will move

/**
	Finds the number of team members the player has.
	@return [int] the number of team members.
*/
function numTeammates(){
	return team.length;
}

/**
	Heals all members of the team.
*/
function fullHealTeam(){
	for(var i=0;i<numTeammates();i++){
		team[i].fullHeal();
	}
}

/**
	Adds a teammate.
	@param teammate [Animal] a new teammate.
*/
function addTeammate(teammate){
	if(numTeammates() >= MAX_TEAMMATES){
		return;
	}
	teammate.isAlly = true;
	team.push(teammate);
}

/**
	Removes a teammate from the team.
	@param teammate [Animal] a teammate to remove.
*/
function removeTeammate(teammate){
	if(selectedAnimal == teammate){
		deselectAnimal(teammate);
	}
	for(var i=0;i<numTeammates();i++){
		if(team[i].hash == teammate.hash){
			team.splice(i,1);
		}
	}
}

/**
	Finds the ally closest to the given animal.
	@param animal [Animal]
	@return [Animal] the ally that's closest
*/
function getClosestTeammate(animal){
	//load values
	var distances = [];
	var dictionary = [];
	for(var i=0;i<numTeammates();i++){
		var dist = distanceBetween(team[i],animal);
		distances.push(dist);
		var item = {
			distance: dist,
			teammate: team[i],
		}
		dictionary.push(item);
	}
	
	//find closest value
	var closest = distances.sort()[0];
	//find teammate with that value
	for(var i=0;i<numTeammates();i++){
		if(dictionary[i].distance == closest){
			return dictionary[i].teammate;
		}
	}
	
	//some sort of error...
	return team[0];
}

/**
	Selects an animal to be moved.
	@param animal [Animal] the animal that was clicked
*/
function selectAnimal(animal){
	if(selectedAnimal && animal == selectedAnimal){
		//you're clicking this again, so deselect it
		deselectAnimal(animal);
	}
	else{
		//deselect previous
		if(selectedAnimal)
			deselectAnimal(selectedAnimal);
		selectedAnimal = animal;
		animal.elem.className = "selected_ally";
	}
}

/**
	Deselects an animal to be moved.
	@param animal [Animal] the animal to be deselected
*/
function deselectAnimal(animal){
	selectedAnimal = null;
	animal.elem.className = "ally";
}