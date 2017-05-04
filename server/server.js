/*
	./websocket/server.js
	author: jwelfare
	desc.: server-side socket code, passes data from client to and from the game
*/
var Constants = require('./constants'),
	Game = require('./app/game');

module.exports = function(io) {
	var game  = new Game();
	/*	socket.io functions for broadcasting events to different audiences: 
			socket.broadcast.emit - all clients EXCEPT socket client
			socket.emit - socket client
			io.emit - all connected clients
    */

	io.on(Constants.SERVER_CONNECT, function(socket) {
		socket.on(Constants.PLAYER_NEW, function(data) {
			game.newPlayer(data, socket.id);
			socket.emit(Constants.BOARD_DRAW, game.getBoard());
		});

		socket.on(Constants.SERVER_DISCONNECT, function() { 
			game.deletePlayer(socket.id);
		});

		socket.on(Constants.CELL_CLICKED, function(data) {
			var cellChanges = game.cellClicked(data, socket.id)

			if (cellChanges)
				io.emit(Constants.CELL_CHANGES, cellChanges)
		});

		// game.setLoop(socket);
		/* main game loop: notifies game class and emits any events returned */
	})
}