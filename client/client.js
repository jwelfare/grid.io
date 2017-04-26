// /*
// 	./src/client.js
// 	author: jwelfare
// 	desc.: client-side script, show single user view, emits events on interaction, and listens for server emitted events
// */

//todo: refactor JS file (separate emitters/listeners from UI)
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

gameCanvas.width = Constants.CELL_SIZE * Constants.BOARD_SIZE
gameCanvas.height = Constants.CELL_SIZE * Constants.BOARD_SIZE

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

socket.on('cell-changes', (cellChanges) => {
	board.updateCells(cellChanges)
	board.render()
})

gameCanvas.onclick = function(e) {
    let rect = gameCanvas.getBoundingClientRect()
    let col = Math.floor((e.clientX - rect.left) / Constants.CELL_SIZE)
    let row = Math.floor((e.clientY - rect.top) / Constants.CELL_SIZE)

    console.log(col + ", " + row)

    socket.emit('cell-clicked', {
    	col,
    	row
    })
}