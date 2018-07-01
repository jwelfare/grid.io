// /*
// 	./src/client.js
// 	author: jwelfare
// 	desc.: client-side script, show single user view, emits events on interaction, and listens for server emitted events
// */
import io from 'socket.io-client'
import * as Constants from './constants'
import Board from './app/board'
import GridCanvas from './app/gridCanvas'

let socket = io('/'),
	htmlCanvas = document.getElementById(Constants.GAME_CANVAS_ID),
	gridCanvas = new GridCanvas(htmlCanvas, socket),
	signonSubmit = document.getElementById('signon_submit'),
	board

//Handles submission of the user signup form and displays the canvas
signonSubmit.onclick = function() {
	socket.emit(Constants.PLAYER_NEW, {
		playerName: document.getElementById('signon_name').value
	})

	document.getElementById('signon').style.display = "none"
	htmlCanvas.style.display = "block"
}

//Initialises canvas and board when a user signs up
socket.on(Constants.BOARD_DRAW, (data) => {
	board = new Board(htmlCanvas.getContext("2d"), data)
	board.render()
})

//Handles redrawing of the game's cells when changes are emitted by the server
socket.on(Constants.CELL_CHANGES, (cellChanges) => {
	board.updateCells(cellChanges)
	board.render()
})