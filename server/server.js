/*
	./websocket/server.js
	author: jwelfare
	desc.: server-side socket code, maintains game states and listens/emits events on user interaction
*/

import * as Constants from './app/constants'
import Board from './app/board'
import Cell from './app/cell'
import Player from './app/Player'

var board = new Board(Constants.BOARD_SIZE)
board.initBoard()

var players = []

module.exports = function(io) {
	/* socket.broadcast.emit - all clients EXCEPT socket client
	   socket.emit - socket client
	   io.emit - all connected clients
    */

	io.on('connection', function(socket) {
		socket.on('new-player', function(data) {
			console.log('new player: ' + data.name + ' has joined the match')
			players.push(new Player(data.name, socket.id))
			io.emit('new-player', { name: data.name })
		})
	})
}