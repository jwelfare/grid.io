/*
	./app.js
	author: jwelfare
	desc.: sets up express server and initiates socket io listeners
*/

var express = require('express'),
	http = require('http'),
	socketIo = require('socket.io'),
	bodyParser = require('body-parser'),
	webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackClientConfig = require('./webpack.client.config.js')

var app = express()
var server = http.createServer(app)
var io = socketIo(server)

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackClientConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

require('./server/server.js')(io)

server.listen(3000)