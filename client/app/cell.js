import * as Constants from '../constants'

export default class Cell {
	constructor(canvasContext, cellColor, col, row) {
		this.canvasContext = canvasContext
		this.col = col
		this.row = row
		this.cellColor = cellColor
	}

	render() {
		this.canvasContext.fillStyle = this.cellColor

		this.canvasContext.fillRect(
			this.col * Constants.CELL_SIZE + this.col * Constants.CELL_BUFFER, 
			this.row * Constants.CELL_SIZE + this.row * Constants.CELL_BUFFER, 
			Constants.CELL_SIZE, 
			Constants.CELL_SIZE
		)
	}
}