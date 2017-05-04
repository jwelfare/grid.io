/*
	./server/app/game.js
	author: jwelfare
	desc.: maintains the overall game state including connected clients
*/
var Board = require('./board'),
	Player = require('./Player'),
	Constants = require('../constants');

function Game(observers) {
	this.observers = observers;
	this.board = new Board(Constants.BOARD_SIZE);
	this.players = {};
}

Game.prototype.newPlayer = function(e, playerId) {
	this.players[playerId] = new Player(e.playerName, playerId);
}

Game.prototype.deletePlayer = function(playerId) {
	delete this.players[playerId];
}

Game.prototype.cellClicked = function(e, playerId) {
	return this.board.cellClicked(e, this.players[playerId]);
}

Game.prototype.getPlayer = function(playerId) { 
	return this.players[playerId];
}

Game.prototype.getBoard = function() {
	return this.board.getBoard();
}

Game.prototype.startLoop = function(io) {
	var loopCount = 0;

	io.on(Constants.SERVER_CONNECT, function(socket) {
		setInterval(function() {
			loopCount++;

			if (loopCount % Constants.POWERUP_CHANGE_FREQ == 0)
				io.emit(Constants.POWERUP_CHANGES, this.updatePowerups());

		}, Constants.GAME_LOOP_FREQ);
	});
}

Game.prototype.updatePowerups = function() {
	return this.board.updatePowerups();
}

module.exports = Game;