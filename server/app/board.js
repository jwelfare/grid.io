import * as Constants from '../../constants/constants'
import Cell from './cell'

export default class Board {
	constructor(boardSize) {
		this.boardSize = boardSize
		this.cellsArray = []

		for (let nCol = 0; nCol < this.boardSize; nCol++) {
			this.cellsArray[nCol] = []
			for (let nRow = 0; nRow < this.boardSize; nRow++) {
				this.cellsArray[nCol].push(new Cell(nCol, nRow))
			}
		}
	}

	cellClicked(e, player) {
		let cell = this.getCell(e.col, e.row)

		if(!player.hasCells() || this.playerOwnsAdjacent(cell, player)) {
			switch(cell.powerup) {
				//case Constants.CELL_POWERUP_ENTIRECOL:
					//return this.entireColCellClick(cell, player)
				//case Constants.CELL_POWERUP_SMALLEXPLOSION:
					//return this.smallExplosionCellClick(cell, player)
				default:
					return this.singleCellClick(cell, player)
			}
		} else {
			return []
		}

		//todo: refactor out switch statement, have a new method that gets affected cells based on selected cells powerup
		
	}

	/* validates that the user has only clicked a cell adjacent to another owned cell */
	playerOwnsAdjacent(cell, player) {
		for (let cell of this.getAdjacentCells(cell)) {
			if (cell.owner && cell.owner.playerId === player.playerId)
				return true
		}

		return false
	}

	getAdjacentCells(cell) {
		let adjacentCells = []

		if (cell.col != 0) 
			adjacentCells.push(this.getCell(cell.col - 1, cell.row))

		if (cell.col != Constants.BOARD_SIZE - 1)
			adjacentCells.push(this.getCell(cell.col + 1, cell.row))

		if (cell.row != 0)
			adjacentCells.push(this.getCell(cell.col, cell.row - 1))

		if (cell.row != Constants.BOARD_SIZE -1)
			adjacentCells.push(this.getCell(cell.col, cell.row + 1))

		return adjacentCells;
	}

	singleCellClick(cell, player) {
		cell.assignOwner(player)
		return [ cell.getAsBroadcastable() ]
	}

	// smallExplosionCellClick(cell, player) {
	// 	let cells = [cell]

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

	getCell(col, row) {
		return this.cellsArray[col][row]
	}

	getBoard() {
		return this.cellsArray.map((row) => {
			return row.map((c) => {
				return c.getAsBroadcastable()
			})
		})
	}
}