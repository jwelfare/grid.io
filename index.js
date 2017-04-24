var express = require('express'),
	http = require('http'),
	socketIo = require('socket.io'),
	bodyParser = require('body-parser'),
	webpack = require('webpack'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpackConfig = require('./webpack.config.js');

var app = express();
// var server = http.createServer(app);
// var io = socketIo(server);

app.use(express.static(__dirname + '/public'));
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000);