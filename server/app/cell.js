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
		return {
			col: this.col,
			row: this.row,
			cellColor: this.owner ? this.owner.getPlayerColor() : "#f1f1f1"
		}
	}
}
