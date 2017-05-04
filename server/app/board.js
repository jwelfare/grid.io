var Cell = require('./cell');

function Board(boardSize) {
	this.boardSize = boardSize;
	this.cellsArray = [];

	for (var nCol = 0; nCol < this.boardSize; nCol++) {
		this.cellsArray[nCol] = [];
		for (var nRow = 0; nRow < this.boardSize; nRow++) {
			this.cellsArray[nCol].push(new Cell(nCol, nRow));
		}
	}
}

Board.prototype.cellClicked = function(e, player) {
	var cell = this.getCell(e.col, e.row);

	if(cell.isOwner(player)) {
		return;
	}

	if(!player.hasCells() || this.playerOwnsAdjacent(cell, player)) {
		switch(cell.powerup) {
			//case Constants.CELL_POWERUP_ENTIRECOL:
				//return this.entireColCellClick(cell, player)
			//case Constants.CELL_POWERUP_SMALLEXPLOSION:
				//return this.smallExplosionCellClick(cell, player)
			default:
				return this.singleCellClick(cell, player);
		}
	} else {
		return;
	}

	//todo: refactor out switch statement, have a new method that gets affected cells based on selected cells powerup
	
}

/* validates that the user has only clicked a cell adjacent to another owned cell */
Board.prototype.playerOwnsAdjacent = function(cell, player) {
	for (var cell of this.getAdjacentCells(cell)) {
		if (cell.owner && cell.owner.playerId === player.playerId)
			return true;
	}

	return false;
}

Board.prototype.getAdjacentCells = function(cell) {
	var adjacentCells = [];

	if (cell.col != 0) 
		adjacentCells.push(this.getCell(cell.col - 1, cell.row));

	if (cell.col != this.boardSize - 1)
		adjacentCells.push(this.getCell(cell.col + 1, cell.row));

	if (cell.row != 0)
		adjacentCells.push(this.getCell(cell.col, cell.row - 1));

	if (cell.row != this.boardSize -1)
		adjacentCells.push(this.getCell(cell.col, cell.row + 1));

	return adjacentCells;
}

Board.prototype.singleCellClick = function(cell, player) {
	cell.assignOwner(player);
	return [ cell.getAsBroadcastable() ];
}

// smallExplosionCellClick(cell, player) {
// 	var cells = [cell]

// 	if (cell.col != 0) 
// 		cells.push(this.getCell(cell.col - 1, cell.row))

// 	if (cell.col != Constants.BOARD_SIZE - 1)
// 		cells.push(this.getCell(cell.col + 1, cell.row))

// 	if (cell.row != 0)
// 		cells.push(this.getCell(cell.col, cell.row - 1))

// 	if (cell.row != Constants.BOARD_SIZE -1)
// 		cells.push(this.getCell(cell.col, cell.row + 1))

// 	return cells.map((c) => {
// 		c.assignOwner(player)
// 		return c.getAsBroadcastable()
// 	})
// }

Board.prototype.getCell = function(col, row) {
	return this.cellsArray[col][row];
}

Board.prototype.getRandomCell = function() {
	var row = Math.floor(Math.random(0, this.boardSize)),
		col = Math.floor(Math.random(0, this.boardSize));

	return this.cellsArray[row][col];
}

Board.prototype.getBoard = function() {
	return this.cellsArray.map(function(row) {
		return row.map(function(c) {
			return c.getAsBroadcastable();
		})
	})
}

Board.prototype.updatePowerups = function() {
	var updatedCells = [],
		currentCell;

	for(var p = 0; p < Constants.POWERUP_NUMBER; p++) {
		currentCell = this.getRandomCell();

		currentCell.powerup = this.powerupFactory.getRandomPowerup();
		updatedCells.push(currentCell);
	}

	return updatedCells;
}


module.exports = Board;