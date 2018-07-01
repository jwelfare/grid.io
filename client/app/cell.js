import * as Constants from '../constants'

export default class Cell {
	constructor(gameCanvasContext, cellColor, col, row) {
		this.gameCanvasContext = gameCanvasContext
		this.col = col
		this.row = row
		this.cellColor = cellColor
	}

	render() {
		this.gameCanvasContext.fillStyle = this.cellColor

		this.gameCanvasContext.fillRect(
			this.col * Constants.CELL_SIZE + this.col * Constants.CELL_BUFFER, 
			this.row * Constants.CELL_SIZE + this.row * Constants.CELL_BUFFER, 
			Constants.CELL_SIZE, 
			Constants.CELL_SIZE
		)
	}
}