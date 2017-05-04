const GAME_LOOP_FREQ = 1000
const SERVER_CONNECT = 'connection'
const SERVER_DISCONNECT = 'disconnect'
const PLAYER_NEW = 'player-new'
const CELL_CLICKED = 'cell-clicked'
const CELL_CHANGES = 'cell-changes'
const POWERUP_CHANGES = 'powerup-changes',
const POWERUP_CHANGE_FREQ = 20,
const POWERUP_NUMBER = 5
const BOARD_DRAW = 'board-draw'
const BOARD_SIZE = 40
const CELL_DEFAULT_COLOR = '#F1F1F1'

module.exports = {
	GAME_LOOP_FREQ: GAME_LOOP_FREQ,
	SERVER_CONNECT: SERVER_CONNECT,
	SERVER_DISCONNECT: SERVER_DISCONNECT,
	PLAYER_NEW: PLAYER_NEW,
	CELL_CLICKED:  CELL_CLICKED,
	CELL_CHANGES: CELL_CHANGES,
	POWERUP_CHANGES: POWERUP_CHANGES,
	POWERUP_CHANGE_FREQ: POWERUP_CHANGE_FREQ,
	POWERUP_NUMBER: POWERUP_NUMBER,
	BOARD_DRAW: BOARD_DRAW,
	BOARD_SIZE: BOARD_SIZE,
	CELL_DEFAULT_COLOR: CELL_DEFAULT_COLOR
}