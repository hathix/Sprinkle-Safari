/**
	Starting point of the page. Controls the game, the help, etc.
*/

/*
	Controller of entire page, not just game.
*/

$(document).ready(function(){
    Cobra.install();
    
	if($('html').hasClass('oldie')){
		return;
	}
	
	//start loading synced data in background
	//move this to later if you want to show a success message
	/*if(hasSync()){
	    downloadData($.store.get(SL_KEYS.passcode));
	}*/
	
	//jQueryUI initialization
	verticalAlign($('#main-menu'));
	verticalAlign($('#all'));
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
	
	//info tabs
	$('#info-tabs').tabs({
		select: function(event, ui){
			//some tab was clicked on, so refresh the team view
			updateTeamInfo();
		}
	});
	
	//tutorial
	$('#tutorial-ok').click(function(){
		//hide the tutorial
		$('#tutorial-overlay').hide();
		startActiveLevelStartDialogues(); 
	});
	
	//easter egg: clicking elephant in splash screen gives you shiny starter
	$('#hidden-elephant').click(function(){
		secretElephantClicked = true;
	});
	//also: clicking llama's left eye makes all animals appear shiny
	$('#hidden-llama-eye').click(function(){
		Animal.prototype.isShiny = function(){ return true; };
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
	
	//preload qtip for dialogue
	$('#dialogue-image').qtip({
		id:	'dialogue',
		content: {
			text: 'HI!',
			title: {
				text: 'Some title text',
				//button: true
			}
		},	
		position: {
			my: 'bottom left',
			at: 'top right',
			adjust: {
				method: 'none none'
			}
		},
		show: {
		    event: false,
			solo: true
		},
		hide: false, //never hide automatically
		events: {
			/*hidden: function(event, api){
				hideDialogue();
			},*/
			/*show: function(event, api){
				alert('SHOWN');
			}*/
		},
		style: {
			classes: 'ui-tooltip-shadow ui-tooltip-rounded'
		}
	});
	
	
	/* clicks for main menu */
	
	//hide stuff
	if(navigator.appVersion.indexOf("Chrome") == -1){
		//it's NOT Chrome, so hide the link to download on the app store
		$('#main-chrome').parent().hide();
	}
	var docElm = document.documentElement;
	if(!docElm.requestFullscreen && !docElm.mozRequestFullScreen && !docElm.webkitRequestFullScreen){
		//no fullscreen API available (not supported), so don't show the button
		$('#main-fullscreen').parent().hide();
	}
	//if(hasSync()){
	    //sync has been set up (there is a passcode), so don't show this
	    //data will be auto-synced
	    $('#main-sync').parent().hide();
	//}

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
	
	$('#main-sync').click(function(){
	   //this button is only visible if there is no sync set up, so don't worry about that
	   //ask the user if they want to load data from server or make a new account
	   var dialog = $('<div title="Sync your Sprinkle Safari data"></div>');
	   dialog.append('<p>Play Sprinkle Safari across multiple devices? You can synchronize your data so that <strong>you can play from one device and pick up where you left off on another.</strong> All of your data - from your adventure to your statistics - is automatically synced each time you play!</p>');
	   dialog.append('<p>If you\'ve never used sync before and want to start syncing your data across computers, you can <strong>set up sync</strong>.</p>')
	   dialog.append('<p>If you\'ve set up your sync already from another computer, you can enter your passcode to <strong>load your data</strong> on this computer.</p>');
	   
	   dialog.dialog({
	      height: 370,
	      width: 600,
	      modal: true,
	      buttons: {
	           "Set up my sync": function(){
	               setUpSync();
	               $(this).dialog("close"); 
	            },
	           "Load my data": function(){
	               loadSync();
	               $(this).dialog("close");
	           }
	      }
	   });
	});
	
	$('#main-help').click(showHelp);
	
	$('#main-fullscreen').click(function(){
		//go into fullscreen
		var docElm = document.documentElement;
		if (docElm.requestFullscreen) {
		    docElm.requestFullscreen();
		}
		else if (docElm.mozRequestFullScreen) {
		    docElm.mozRequestFullScreen();
		}
		else if (docElm.webkitRequestFullScreen) {
		    docElm.webkitRequestFullScreen();
		}
	});
	
	//clicks for header bar
	$('#header-help').click(showHelp);
	
	//clicks for help dialog
	$('#help-close').click(hideHelp);
	
	//$('#main-new').click();
	
	
	//now that all loading is done, hide the loading screen
	//but delay hiding so the user sees the loading screen at all
	//make it really fast so loading seems snappy
	setTimeout(function(){
		$('#loadingscreen').hide('puff', {}, 'slow');
	}, 250);
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

/**
 * Creates and shows a dialog asking the user to set up the sync (upload data to server) feature.
 * The user is asked to create a passcode. 
 */
function setUpSync(){
    var dialog = $('<div title="Start syncing your data"></div>');
    dialog.append('<p>Your data is saved <strong>securely and anonymously on hathix.com\'s servers</strong>. We don\'t use any of your personal information besides a passcode, which is used to identify your information.</p>');
    dialog.append('<p>Please enter a passcode. Please make sure that it\'s <strong>unique and memorable</strong>. A few examples of good passcodes:</p>');
    dialog.append('<ul style="font-style: italic;"><li>llamas make bad pets</li><li>all hail the donut</li><li>insert witty catchphrase</li></ul>');
    dialog.append('<input type="text" id="enter-passcode" />');
    
    dialog.dialog({
       height: 400,
       width: 600,
       modal: true,
       buttons: {
           "Start syncing!": function(){
               var passcode = $('#enter-passcode').val();
               if(passcode != ""){
                   //save it and sync data
                   $.store.set(SL_KEYS.passcode, passcode);
                   uploadData(passcode);
                   alert("Your sync has been successfully set up. Remember the passcode '" + passcode + "'!");
               }
               
               $(this).dialog("close");
           }
       } 
    });
}

/**
 * Creates and shows a dialog asking the user for their passcode, which is used to start syncing the user's data.
 * The data is downloaded from the server. 
 */
function loadSync(){
    var dialog = $('<div title="Sync data from another computer"></div>');
    dialog.append('<p>If you\'ve set up sync and created a passcode from another computer, you can connect this computer. <strong>You can continue what you started on your other computer, and any progress you make here will be synced back to your other computer.</strong></p>');
    dialog.append('<p>Please enter your passcode to start syncing.</p>');
    dialog.append('<input type="text" id="enter-passcode" />');
    
    dialog.dialog({
       height: 320,
       width: 600,
       modal: true,
       buttons: {
           "Get my data!": function(){
               var passcode = $('#enter-passcode').val();
               $.store.set(SL_KEYS.passcode, passcode);
               downloadData(passcode);
               alert("Your data should have been downloaded; sync should now be set up on this computer.");
               
               $(this).dialog("close");
           }
       } 
    });    
}

function showHelp(){
	$('#help-dialog').removeClass('hidden');
	$('#help-dialog').dialog('open');
}

function hideHelp(){
	$('#help-dialog').dialog('close');
}