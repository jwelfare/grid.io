import Cell from './cell'
import * as Constants from '../constants'

export default class Board {
	constructor(gameCanvasContext, socketCellsArray) {
		this.gameCanvasContext = gameCanvasContext

		this.cellsArray = socketCellsArray.map((row) => {
			return row.map((cell) => {
				return new Cell(this.gameCanvasContext, cell.cellColor, cell.col, cell.row)
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