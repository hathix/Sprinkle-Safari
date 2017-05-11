/**
 * Coordinates contain a simple x and y. 
 * This is not unique; there can be many Coords objects with the same x and y.
 * 
 * Access:
 *  Coords.x    the x-value (the col)
 *  Coords.y    the y-value (the row)
 * Methods:
 *  int getXPixels()
 *  int getYPixels()
 */

var Coords = new Cobra.Class({
__init__: function(self, x, y){
    self.x = x;
    self.y = y;
},

/**
 * Returns the number of pixels from the left this should be. 
 */
getXPixels: function(self){
    return self.x * TILE_SIZE;
},

/**
 * Returns the number of pixels from the top this should be.
 */
getYPixels: function(self){
    return self.y * TILE_SIZE;
},

toString: function(self){
    return "[" + self.x + ", " + self.y + "]";    
}
});
