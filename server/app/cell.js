export default class Cell {
	constructor(col, row, owner = null) {
		this.owner = owner
		this.col = col
		this.row = row

		this.powerup = null
	}

	assignOwner(player) {
		this.owner = player
	}

	getAsBroadcastable() {
		var color = 'rgb('+
		    (50 + Math.floor(Math.random()*206)) +','+
		    (50 + Math.floor(Math.random()*206)) +','+
		    (50 + Math.floor(Math.random()*206)) +')'

		return {
			col: this.col,
			row: this.row,
			// cellColor: this.owner ? this.owner.getPlayerColor() : "#000000"
			cellColor: color
		}
	}
}
