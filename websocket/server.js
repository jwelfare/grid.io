/*
	./websocket/server.js
	author: jwelfare
	desc.: server-side socket code, maintains game states and listens/emits events on user interaction
*/

module.exports = function(io) {
	io.on('connection', function(socket) {
		socket.emit('connection-made', {})
	})
}