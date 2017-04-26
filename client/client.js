// /*
// 	./src/client.js
// 	author: jwelfare
// 	desc.: client-side script, show single user view, emits events on interaction, and listens for server emitted events
// */
import io from 'socket.io-client'
import * as Constants from '../constants/constants'
import Board from './app/board'

var gameCanvas = document.getElementById('gameCanvas'),
	gameCanvasContext = gameCanvas.getContext('2d'),
	signon = document.getElementById('signon'),
	signonName = document.getElementById('signon_name'),
	signonSubmit = document.getElementById('signon_submit'),
	socket = io('/'),
	board


gameCanvas.width = Constants.CELL_SIZE * Constants.BOARD_SIZE;
gameCanvas.height = Constants.CELL_SIZE * Constants.BOARD_SIZE;

signonSubmit.onclick = function() {
	socket.emit('player-new', {
		playerName: signonName.value
	})

	signon.style.display = "none"
	gameCanvas.style.display = "block"
}

socket.on('board-load', (data) => {
	console.log('board-load event fired')
	console.log(data)
	board = new Board(gameCanvasContext, data)
	console.log(board)
	board.render()
})

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



// class Tile {
// 	constructor(canvasContext, x, y, size, owner = null) {
// 		this.canvasContext = canvasContext

// 		this.owner = null
// 		this.x = x
// 		this.y = y
// 	 	this.size = size
// 	}

// 	render() {
// 	}

// 	giveControl(owner) {
// 		this.owner = owner
// 	}
// }