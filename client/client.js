// /*
// 	./src/client.js
// 	author: jwelfare
// 	desc.: client-side script, show single user view, emits events on interaction, and listens for server emitted events
// */

//todo: refactor JS file (separate emitters/listeners from UI)
import io from 'socket.io-client'
import * as Constants from './constants'
import Board from './app/board'

let gameCanvas = document.getElementById('gameCanvas'),
	gameCanvasContext = gameCanvas.getContext('2d'),
	signon = document.getElementById('signon'),
	signonName = document.getElementById('signon_name'),
	signonSubmit = document.getElementById('signon_submit'),
	socket = io('/'),
	board

signonSubmit.onclick = function() {
	socket.emit(Constants.PLAYER_NEW, {
		playerName: signonName.value
	})

	signon.style.display = "none"
	gameCanvas.style.display = "block"
}

socket.on(Constants.BOARD_DRAW, (data) => {
	board = new Board(gameCanvasContext, data)
	let boardSize = data.length;
	gameCanvas.width = Constants.CELL_SIZE * boardSize + Constants.CELL_BUFFER * boardSize;
	gameCanvas.height = Constants.CELL_SIZE * boardSize + Constants.CELL_BUFFER * boardSize;
	board.render()
})

socket.on(Constants.CELL_CHANGES, (cellChanges) => {
	board.updateCells(cellChanges)
	board.render()
})

gameCanvas.onclick = function(e) {
    let rect = gameCanvas.getBoundingClientRect()
    let col = Math.floor((e.clientX - rect.left) / (Constants.CELL_SIZE + Constants.CELL_BUFFER))
    let row = Math.floor((e.clientY - rect.top) / (Constants.CELL_SIZE + Constants.CELL_BUFFER))

    console.log(col + ", " + row)

    socket.emit(Constants.CELL_CLICKED, {
    	col,
    	row
    })
}

gameCanvas.onmousedown = function(e) {
	e.preventDefault()
}

gameCanvas.onselectstart = function(e) {
	e.preventDefault()
}