var Constants = require('../constants');

function Cell(col, row, owner = null) {
	this.owner = owner;
	this.col = col;
	this.row = row;

	this.powerup = null;
}

Cell.prototype.assignOwner = function(player) {
	this.owner = player;
	player.assignCell(this);
}

/*
	params:
		-
	description: returns a "client-safe" version of the cell (i.e. contains no exploitable information such as the socket id)
*/
Cell.prototype.getAsBroadcastable = function() {
	return {
		col: this.col,
		row: this.row,
		cellColor: this.owner ? this.owner.getPlayerColor() : Constants.CELL_DEFAULT_COLOR,
		powerup: this.powerup
	};
}

Cell.prototype.isOwner = function(player) {
	if (this.owner)
		return this.owner.playerId == player.playerId

	return false;
}

module.exports = Cell;