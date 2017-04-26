import * as Constants from '../../constants/constants'

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

	/*
		params:
			-
		description: returns a "client-safe" version of the cell (i.e. contains no exploitable information such as the socket id)
	*/
	getAsBroadcastable() {
		return {
			col: this.col,
			row: this.row,
			cellColor: this.owner ? this.owner.getPlayerColor() : Constants.CELL_DEFAULT_COLOR
		}
	}
}
