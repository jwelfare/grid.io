/*
	./websocket/server.js
	author: jwelfare
	desc.: server-side socket code, passes data from client to and from the game
*/
import * as EventConstants from '../constants/event_constants'
import Game from './app/game'

module.exports = function(io) {
	let game  = new Game();
	/*	socket.io functions for broadcasting events to different audiences: 
			socket.broadcast.emit - all clients EXCEPT socket client
			socket.emit - socket client
			io.emit - all connected clients
    */
	io.on(EventConstants.SERVER_CONNECT, function(socket) {
		game.setLoop(socket);
		
		socket.on(EventConstants.PLAYER_NEW, (data) => {
			game.newPlayer(data, socket.id)

			socket.emit(EventConstants.BOARD_DRAW, game.getBoard())
		})

		socket.on(EventConstants.SERVER_DISCONNECT, () => { game.deletePlayer(socket.id) })

		socket.on(EventConstants.CELL_CLICKED, (data) => {
			let cellChanges = game.cellClicked(data, socket.id)

			if (cellChanges.length)
				io.emit(EventConstants.CELL_CHANGES, cellChanges)
		})
		/* main game loop: notifies game class and emits any events returned */

	})
}