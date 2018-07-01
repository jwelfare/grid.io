import * as Constants from '../constants'
import { Socket } from 'dgram';

export default class GridCanvas {
	constructor(htmlCanvas, socket) {
        this.htmlCanvas = htmlCanvas
        this.socket = socket

        this.initKeyHandlers()
        this.initMouseHandlers()
        this.initDefaultEvents()

        this.htmlCanvas.width = Constants.CELL_SIZE * boardSize + Constants.CELL_BUFFER * boardSize;
        this.htmlCanvas.height = Constants.CELL_SIZE * boardSize + Constants.CELL_BUFFER * boardSize;
        this.htmlCanvas.focus()
    }

    initDefaultEvents() {
        this.htmlCanvas.onselectstart = function(e) { e.preventDefault() }
        this.htmlCanvas.onblur = function(e) { 
            e.preventDefault()
            htmlCanvas.focus() 
        }
    }

    initKeyHandlers() {
        this.htmlCanvas.onclick = function() {
            e.preventDefault()

            /*
            * left 37
            * down 40
            * up 38
            * right 39
            * shift 16
            * space 32
            */
        }
    }

    initMouseHandlers() {
        let socket = this.socket;

        this.htmlCanvas.onclick = function(e) {
            let rect = this.getBoundingClientRect()
            let col = Math.floor((e.clientX - rect.left) / (Constants.CELL_SIZE + Constants.CELL_BUFFER))
            let row = Math.floor((e.clientY - rect.top) / (Constants.CELL_SIZE + Constants.CELL_BUFFER))

            socket.emit(Constants.CELL_CLICKED, {
                col,
                row
            })
        }
    }
}