/**
	Starting point of the page. Controls the game, the help, etc.
*/

/*
	Controller of entire page, not just game.
*/

$(document).ready(function(){
	//jQueryUI initialization
	verticalAlign($('#main-menu'));
	randomBackground();
	
	$('button').button();
	
	//help
	$('#help-tabs').tabs({

	});
	$('#help-dialog').dialog({
		autoOpen: false, //reusable
		height: 530,
		width: 640
	});
	//centerOnPage($('#help'));
	/*$('#help-close').button({
		icons: {
			//primary: 'ui-icon-closethick',
		},
		text: true,
	});*/
	
	//initialize header bar
	/*$('#header-background').mouseover(function(){
		$(this).animate(
			{
				opacity: 1
			},
			200
		);
	});
	$('#header-background').mouseout(function(){
		$(this).animate(
			{
				opacity: 0
			},
			200
		);
	});*/
	
	/* clicks for main menu */
	if(navigator.appVersion.indexOf("Chrome") == -1){
		//it's NOT Chrome, so hide the link to download on the app store
		$('#main-chrome').parent().hide();
	}
	
	if(isSavedGame() == false){
		//remove continue button, there is no saved game to continue
		//hide continue cell, stretch new game cell
		$('#main-continue').parent().hide();
		$('#main-new').parent().attr('colspan','2');
	}
	$('#main-continue').click(function(){
		//continue saved game
		hideStartScreen();
		continueGame();
	});
	
	$('#main-new').click(function(){	
		if(isSavedGame()){
			//ask if they want to clear data and start again
			var confirm = $('<div title="Starting a new game">There is already saved data; you must overwrite the saved data if you want to start a new game. Is this OK?</div>');
			confirm.dialog({
				resizable: false,
				height: 200,
				width: 500,
				modal: true,
				buttons: {
					"Overwrite saved data": function() {
						newGame();
						$(this).dialog("close");
					},
					"Cancel": function() {
						$(this).dialog("close");
					}
				}
			});			
		}
		else{
			//just start a new game
			newGame();
		}
	});
	
	$('#main-mini').click(function(){
		//start a minigame
		startMinigame();
	});
	
	$('#main-help').click(showHelp);
	
	//clicks for header bar
	$('#header-help').click(showHelp);
	
	//clicks for help dialog
	$('#help-close').click(hideHelp);
	
	//$('#main-new').click();
});


function randomBackground(){
	var backgrounds = [ 'grass', 'snow', 'water', 'wood', 'savannah', 'tile' ];
	//get random one
	var background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
	$('#startscreen').css('background-image', 'url(images/tiles/translucent/' + background + '.png)');
	$('#main-menu').css('background-image', 'url(images/tiles/' + background + '.png)');	
}

/**
	Hides the start screen and main menu using jQueryUI's .hide() function.
*/
function hideStartScreen(){
	$('#startscreen').hide('scale', {}, 1000);
}

function showHelp(){
	$('#help-dialog').dialog('open');
}

function hideHelp(){
	$('#help-dialog').dialog('close');
}