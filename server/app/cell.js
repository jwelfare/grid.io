export default class Cell {
	constructor(x, y, owner = null) {
		this.owner = owner
		this.x = x
		this.y = y
	}

	assignOwner(owner) {
		this.owner = owner
	}
}
