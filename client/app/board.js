import Cell from './cell'

export default class Board {
	constructor(canvasContext, socketCellsArray) {
		this.canvasContext = canvasContext

		this.cellsArray = socketCellsArray.map((row) => {
			return row.map((cell) => {
				return new Cell(this.canvasContext, cell.cellColor, cell.col, cell.row)
			})
		})
	}

	updateCells(updatedCells) {
		updatedCells.map((cell) => {
			Object.assign(this.cellsArray[cell.col][cell.row], cell) 
		})
	}

	render() {
		this.cellsArray.map((row) => {
			row.map((cell) => { 
				cell.render() 
			})
		})
	}
}