//logging functions

const Logger = {
	numEntries: 0,
	logDiv: null,
	
	/**
		Logs a standard piece of text.
		@param text [string] text to add to the battle log
	*/
	log: function(text){
		if(!this.logDiv)
			this.logDiv = get("log");
	
		var div = new Div();
		div.className = this.numEntries % 2 == 0 ? "log_standard" : "log_alternate";
		div.innerHTML = text;
		
		//add to front
		try{
			this.logDiv.insertBefore(div,this.logDiv.childNodes[0]);
		}
		catch(e){
			//first entry
			this.logDiv.appendChild(div);
		}
		
		this.numEntries++;
	},
};