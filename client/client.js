// /*
// 	./src/client.js
// 	author: jwelfare
// 	desc.: client-side script, show single user view, emits events on interaction, and listens for server emitted events
// */
import io from 'socket.io-client'
import * as Constants from '../constants/constants'
import Board from './app/board'

let gameCanvas = document.getElementById('gameCanvas'),
	gameCanvasContext = gameCanvas.getContext('2d'),
	signon = document.getElementById('signon'),
	signonName = document.getElementById('signon_name'),
	signonSubmit = document.getElementById('signon_submit'),
	socket = io('/'),
	board

gameCanvas.width = Constants.CELL_SIZE * Constants.BOARD_SIZE + Constants.BOARD_SIZE * Constants.CELL_BUFFER;
gameCanvas.height = Constants.CELL_SIZE * Constants.BOARD_SIZE + Constants.BOARD_SIZE * Constants.CELL_BUFFER;

signonSubmit.onclick = function() {
	socket.emit('player-new', {
		playerName: signonName.value
	})

	signon.style.display = "none"
	gameCanvas.style.display = "block"
}

socket.on('board-load', (data) => {
	board = new Board(gameCanvasContext, data)
	board.render()
})

gameCanvas.onclick = function(e) {
	console.log(e)
	console.log(Constants.CELL_SIZE)

    let rect = gameCanvas.getBoundingClientRect()
    let col = Math.floor((e.clientX - rect.left) / Constants.CELL_SIZE)
    let row = Math.floor((e.clientY - rect.top) / Constants.CELL_SIZE)


    console.log(col + ", " + row)

    socket.emit('cell-clicked', {
    	col,
    	row
    })
}