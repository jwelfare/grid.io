import * as Constants from '../../constants/constants'
import Cell from './cell'

export default class Board {
	constructor(boardSize) {
		this.boardSize = boardSize
		this.cellsArray = []

		this.initBoard()
	}

	initBoard() {
		for (var nCol = 0; nCol < this.boardSize; nCol++) {
			this.cellsArray[nCol] = []
			for (var nRow = 0; nRow < this.boardSize; nRow++) {
				this.cellsArray[nCol].push(new Cell(nCol, nRow))
			}
		}
	}

	cellClicked(e, player) {
		var cell = this.getCell(e.col, e.row)

		switch(cell.powerup) {
			default:
				return this.regularClick(cell, player)
		}
	}

	regularClick(cell, player) {
		var cells = [cell]

		if (cell.col != 0) 
			cells.push(this.getCell(cell.col - 1, cell.row))

		if (cell.col != Constants.BOARD_SIZE - 1)
			cells.push(this.getCell(cell.col + 1, cell.row))

		if (cell.row != 0)
			cells.push(this.getCell(cell.col, cell.row - 1))

		if (cell.row != Constants.BOARD_SIZE - 1)
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