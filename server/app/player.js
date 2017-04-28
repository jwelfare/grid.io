export default class Player {
	constructor(playerName, playerId) {
		this.playerName = playerName
		this.playerId = playerId
		this.playerCells = []

		//todo: select your color / pattern (?)
		this.playerColor = 'rgb('+
		    (50 + Math.floor(Math.random()*206)) +','+
		    (50 + Math.floor(Math.random()*206)) +','+
		    (50 + Math.floor(Math.random()*206)) +')'
	}

	assignCell(cellToAssign) {
		this.playerCells.push(cellToAssign)
	}

	// unassignCell(cellToUnassign) {
	// 	for(let cell of this.playerCells) {
	// 		if(cell.col === cellToUnassign.col && cell.row === cellToUnassign.row) {
	// 			delete cell
	// 			return
	// 		}
	// 	}
	// }

	hasCells() {
		return this.playerCells ? (this.playerCells.length > 0 ? true : false) : false
	}

	getPlayerColor() {
		return this.playerColor
	}

	getPlayerCellCount() {
		return this.playerCells.length
	}
}