function Player(playerName, playerId) {
	this.playerName = playerName;
	this.playerId = playerId;
	this.playerCells = [];

	this.ammo = 5;
	this.statuses = [];

	//todo: select your color / pattern (?)
	this.playerColor = 'rgb('+
	    (50 + Math.floor(Math.random()*206)) +','+
	    (50 + Math.floor(Math.random()*206)) +','+
	    (50 + Math.floor(Math.random()*206)) +')';
}

Player.prototype.assignCell = function(cellToAssign) {
	this.playerCells.push(cellToAssign);
}

// unassignCell(cellToUnassign) {
// 	for(let cell of this.playerCells) {
// 		if(cell.col === cellToUnassign.col && cell.row === cellToUnassign.row) {
// 			delete cell
// 			return
// 		}
// 	}
// }

Player.prototype.hasCells = function() {
	return this.playerCells ? (this.playerCells.length > 0 ? true : false) : false;
}

Player.prototype.getPlayerColor = function() {
	return this.playerColor;
}

Player.prototype.getPlayerCellCount = function() {
	return this.playerCells.length;
}

Player.prototype.giveAmmo = function(amount) {
	this.ammo += amount; 
}

module.exports = Player;