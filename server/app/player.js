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

	getPlayerColor() {
		return this.playerColor
	}

	getPlayerCellCount() {
		return this.playerCells.length
	}
}