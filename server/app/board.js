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

		//todo: refactor out switch statement, have a new method that gets affected cells based on selected cells powerup
		switch(cell.powerup) {
			//case Constants.CELL_POWERUP_ENTIRECOL:
				//return this.entireColCellClick(cell, player)
			default:
				return this.cellClick(cell, player)
		}
	}

	cellClick(cell, player) {
		let cells = [cell]

		if (cell.col != 0) 
			cells.push(this.getCell(cell.col - 1, cell.row))

		if (cell.col != Constants.BOARD_SIZE - 1)
			cells.push(this.getCell(cell.col + 1, cell.row))

		if (cell.row != 0)
			cells.push(this.getCell(cell.col, cell.row - 1))

		if (cell.row != Constants.BOARD_SIZE -1)
			cells.push(this.getCell(cell.col, cell.row + 1))

		return cells.map((c) => {
			c.assignOwner(player)
			return c.getAsBroadcastable()
		})
	}

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