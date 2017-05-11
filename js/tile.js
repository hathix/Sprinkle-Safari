/**
 * Contains a background image and (possibly) an Actor as its contents. It can also be highlighted.
 * The Actor's div floats on top of this tile.
 * This is unique; there is only one Tile with a certain pair of coordinates.
 * 
 * API:
 * Tile(Coords, String background)
 * String getID() //call $('#' + tile.getID()) to access this tile's table cell
 * void addContents(Actor) //puts contents in tile
 * Actor getContents() //returns null if no contents
 * Actor relinquish() //removes contents and returns them
 * void setHighlight(String cssClass, callback) //highlights tile, calls callback(this tile as param) when clicked
 * void unhighlight() //removes highlighting
 * 
 * Accessible: (instance vars)
 * Coords coords
 * Actor contents //or use getContents()
 */

var Tile = new Cobra.Class({
    
/**
 * Creates a new, empty tile.
 * @param {Coords} coords   the coordinates of this tile.
 * @param {String} background   the type of background this tile has. Pass just the name; the directory will be found later.
 */
__init__: function(self, coords, background){
    self.coords = coords;
    self.background = background;
    self.contents = null; //no contents right now
    self.highlight = null; //highlight css class
    self.path = null; //cached data stored here; path from some tile to this
    
    //build td - the table cell contains its bg, the content layer, and the highlight layer
    //bg -> the td's background itself
    //content layer -> absolute on top of td
    //highlight layer -> absolute on top of content layer
    self.td = $('<td></td>');
    self.setBackground(background);
    self.td.attr('id', self.getID());
    
    /*self.contentLayer = $('<div></div>'); //goes on top of td
    self.contentLayer.addClass("content-layer");
    self.td.append(self.contentLayer);*/
    
    self.highlightLayer = $('<div></div>'); //this goes on top of contents
    self.highlightLayer.addClass("highlight-layer");
    self.highlightLayer.hide(); //don't let it show
    self.highlightLayer.css({ //it's absolute, so make it float on top of this
        top: self.coords.getYPixels(),
        left: self.coords.getXPixels()    
    });
    self.td.append(self.highlightLayer);   
},

/**
 * Returns a unique identifier for this tile based on its coordinates.
 * This is registered with the table cell that houses this tile.
 * So, you can find this tile's table cell with $('#' + tile.getID()).
 */
getID: function(self){
    return "t-" + self.coords.x + "-" + self.coords.y;
},

/**
 * Puts this tile in the DOM view.
 * Adds this tile's table cell to the given DOM parent, and puts the contents (if any) in the proper place. 
 * @param {$tr} parent  the jQuery <tr> element to add this tile to. The contents of this tile will be put in their own location.
 */
addToView: function(self, parent){
    parent.append(self.td);
    if(self.contents){
        $('#actors').append(self.contents);
    }
},

/**
 * Updates this tile's background-image.
 * @param {String} background   the type of background this tile has. Pass just the name; the directory will be found later.
 */
setBackground: function(self, background){
    self.td.css('background', 'url(images/tiles/' + self.background + '.png)'); //use bg image    
},

/**
 * Sets the contents of the tile. The contents' div is also moved.
 * @param {Actor/null} newContents the new contents to occupy this tile, null if it should be empty
 */
setContents: function(self, newContents){
    //if contents, put it in; else get rid of whatever's in here
    if(newContents != null){
        self.contents = newContents;
        //move the contents to on top of this
        /*self.contents.div.css({
            top: self.coords.getYPixels(),
            left: self.coords.getXPixels()    
        });*/
        //self.contentLayer.append(self.contents.div);
    }
    else{
        //no contents, clear the html
        //self.contentLayer.empty();
        self.contents = null; //set it after removing it so no nullpointerexception
    }
},

/**
 * Takes the given Actor and places it in this tile. 
 * @param {Actor} object   the object to place in this tile. It will be notified that it has been put in.
 */
addContents: function(self,object){
    self.setContents(object);
},

/**
 * Returns the contents of this tile, or null if it's empty.
 */
getContents: function(self){
    return self.contents;
},

/**
 * Removes the contents of the tile, making it empty again.
 * @return {Actor} what used to occupy this tile. 
 */
relinquishContents: function(self){
    var oldContents = self.contents;
    self.setContents(null);
    return oldContents;
},

/**
 * Highlights this tile the given color. When clicked, it will call a callback.
 * @param {String} cssClass    a css class to style the tile (should specify a bg color.)
 * @param {function} callback   a function to be called when this tile is clicked. It will be given this tile as a parameter. Use this to do something useful.
 * @param {function} callback2  [optional] another function like callback. This is called after the first callback. Use this to clean up - for example, unhighlight the other tiles.
 */
setHighlight: function(self, cssClass, callback, callback2){
    if(self.highlight)
        self.highlightLayer.removeClass(highlight);
    self.highlightLayer.show();
    self.highlightLayer.addClass(cssClass);
    self.highlight = cssClass;
    self.highlightLayer.click(function(){
        callback(self);
        if(callback2) callback2(self);
    })
},

/**
 * Makes this tile unhighlighted (removes the highlighting).
 */
unhighlight: function(self){
    //hide and remove click
    self.highlightLayer.hide();
    self.highlightLayer.unbind('click');
    if(self.highlight)
        self.highlightLayer.removeClass(self.highlight);
    self.highlight = null;
},

setPathTo: function(self, path){
    self.path = path;
},

getPathTo: function(self){
    return self.path;  
},

/**
 * Returns the manhattan distance between this tile and the other. 
 * @param {Tile} other
 */
distanceTo: function(self, other){
    return astar.manhattan(self.coords, other.coords);    
}

});
