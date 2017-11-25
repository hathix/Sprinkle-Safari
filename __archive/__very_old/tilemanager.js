
//manages the fact that we have a 15x15 grid instead of 10x10

var list = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e']; //10 becomes a, 12 becomes c, etc.

/**
	Gets the td cell at the specified row and column.
	@param row the row (x-coordinate)
	@param column the column (y-coordinate)
	@return the td object found
*/
function getTile(row,column){
	var tile = document.getElementById(list[row] + "" + list[column]);
	return tile;
}



