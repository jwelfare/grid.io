// /*
// 	./src/client.js
// 	author: jwelfare
// 	desc.: client-side script, show single user view, emits events on interaction, and listens for server emitted events
// */
import io from 'socket.io-client'

var gameCanvas = document.getElementById('gameCanvas'),
	signon = document.getElementById('signon'),
	signonName = document.getElementById('signon_name'),
	signonSubmit = document.getElementById('signon_submit'),
	socket = io('/')

signonSubmit.onclick = function() {
	socket.emit('new-player', {
		name: signonName.value
	})

	signon.style.display = "none"
	gameCanvas.style.display = "block"
}

socket.on('new-player', (data) => alert("new player: " + data.name))

// const TILE_SIZE = 30;
// const BOARD_SIZE = 20;

// document.addEventListener('DOMContentLoaded', function() {
// 	var canvas = document.getElementById('gameCanvas'),
// 		context = canvas.getContext('2d'),
// 		width = window.innerWidth,
// 		height = window.innerHeight

// 	canvas.width = TILE_SIZE * BOARD_SIZE;
// 	canvas.height = TILE_SIZE * BOARD_SIZE;

// 	var board = new Board(context, BOARD_SIZE, BOARD_SIZE)
// 	var player = new Player("Jace")

//     board.render()

// 	canvas.onclick = function(e) { 
// 	    var rect = canvas.getBoundingClientRect()
// 	    var x = Math.floor((event.clientX - rect.left) / TILE_SIZE)
// 	    var y = Math.floor((event.clientY - rect.top) / TILE_SIZE)
	    
// 	    board.getTile(x, y).giveControl(player)
// 	    board.render()
// 	}
// })

// class Player {
// 	constructor(name) {
// 		this.playerColor = 'rgb('+
// 		    (50 + Math.floor(Math.random()*206)) +','+
// 		    (50 + Math.floor(Math.random()*206)) +','+
// 		    (50 + Math.floor(Math.random()*206)) +')'
// 	}

// 	getFillStyle() {
// 		return this.playerColor
// 	}
// }

// class Board {
// 	constructor(canvasContext, nTilesX, nTilesY) {
// 		this.tilesArray = []
// 		this.canvasContext = canvasContext

// 		for (var nX = 0; nX < nTilesX; nX++) {
// 			this.tilesArray.push([]);
// 			for (var nY = 0; nY < nTilesY; nY++) {
// 				this.tilesArray[nX].push(new Tile(canvasContext, nX, nY, TILE_SIZE))
// 			}
// 		}
// 	}

// 	getTile(x, y) {
// 		return this.tilesArray[x][y];
// 	}

// 	render() {
// 		for (var x = 0; x < BOARD_SIZE; x++) {
// 			for (var y = 0; y < BOARD_SIZE; y++) { 
// 				this.tilesArray[x][y].render()
// 			}
// 		}
// 	}
// }

// class Tile {
// 	constructor(canvasContext, x, y, size, owner = null) {
// 		this.canvasContext = canvasContext

// 		this.owner = null
// 		this.x = x
// 		this.y = y
// 	 	this.size = size
// 	}

// 	render() {
// 		this.canvasContext.fillStyle = (this.owner) ? this.owner.getFillStyle() : "#000000"
// 		this.canvasContext.fillRect(this.x * this.size, this.y * this.size, this.size, this.size)
// 	}

// 	giveControl(owner) {
// 		this.owner = owner
// 	}
// }