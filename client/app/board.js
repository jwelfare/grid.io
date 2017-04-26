import Cell from './cell'

export default class Board {
	constructor(canvasContext, socketCellsArray) {
		this.canvasContext = canvasContext

		this.cellsArray = socketCellsArray.map((row) => {
			return row.map((c) => {
				console.log(c)
				return new Cell(this.canvasContext, c.cellColor, c.col, c.row)
			})
		})
	}

	render() {
		this.cellsArray.map((row) => {
			row.map((c) => { c.render() })
		})
	}
}