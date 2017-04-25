import Cell from './cell'

export default class Board {
	constructor(boardSize) {
		this.boardSize = boardSize
		this.cells = []

		this.initBoard()
	}

	initBoard() {
		for (var nCol = 0; nCol < this.boardSize; nCol++) {
			this.cells.push([]);

			for (var nRow = 0; nRow < this.boardSize; nRow++) {
				this.cells[nCol].push(new Cell(nCol, nRow))
			}
		}
	}

	getTile(col, row) {
		return this.cells[col][row]
	}

	getBoard() {
		return this.cells
	}
}