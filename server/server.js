/*
	./websocket/server.js
	author: jwelfare
	desc.: server-side socket code, passes data from client to and from the game
*/
import Game from './app/game'

let game = new Game();

module.exports = function(io) {
	/*	socket.io functions for broadcasting events to different audiences: 
			socket.broadcast.emit - all clients EXCEPT socket client
			socket.emit - socket client
			io.emit - all connected clients
    */
	io.on('connection', function(socket) {
		socket.on('player-new', (data) => {
			console.log('new player connected: ' + data.playerName + ' (' + socket.id + ')')
			game.newPlayer(data, socket.id)

			socket.emit('board-load', game.getBoard())
		})

		socket.on('disconnect', () => { game.deletePlayer(socket.id) })

		socket.on('cell-clicked', (data) => {
			let cellChanges = game.cellClicked(data, socket.id)
			io.emit('cell-changes', cellChanges)
		})
	})
}