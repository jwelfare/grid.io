/*
	./server/app/game.js
	author: jwelfare
	desc.: maintains the overall game state including connected clients
*/

import * as Constants from '../../constants/constants'
import * as EventConstants from '../../constants/event_constants'
import Board from './board'
import Cell from './cell'
import Player from './Player'

export default class Game { 
	constructor(io) {
		this.board = new Board(Constants.BOARD_SIZE)
		this.players = {}
	}

	newPlayer(e, playerId) {
		this.players[playerId] = new Player(e.playerName, playerId)
	}

	deletePlayer(playerId) {
		delete this.players[playerId]
	}

	cellClicked(e, playerId) {
		return this.board.cellClicked(e, this.players[playerId])
	}

	getPlayer(playerId) { 
		return this.players[playerId]
	}

	getBoard() {
		return this.board.getBoard()
	}

	setLoop(socket) { 
		setInterval(() => {
			socket.emit('test-event', {})
		}, 1000);
	}
	// setGameLoop(io) {
	// 	setInterval(() => {
	// 		io.on(EventConstants.SERVER_CONNECT, (socket) => {
	// 			socket.emit('test-event', {})
	// 		}, EventConstants.GAME_LOOP_FREQ)
	// 	}, 1000);

	// }
}
