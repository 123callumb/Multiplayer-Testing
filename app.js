const express = require('express');
const app = express();
const serv = require('http').Server(app);
const socket = require('socket.io')(serv, {});
const eventListener = require(__dirname + '/server/events/eventListener.js');
const update = require(__dirname + '/server/update.js');
const map1 = require(__dirname + '/server/map/map1.js');

let SOCKET_LIST = {};
let PLAYER_LIST = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/map1', (req, res) => {
  res.json(map1.map);
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);

socket.sockets.on('connection', (socket) => {
  var player = eventListener.firstJoin(socket, SOCKET_LIST, PLAYER_LIST, map1.map);
  eventListener.handleEvents(socket, SOCKET_LIST, PLAYER_LIST);

});

update.onUpdate(PLAYER_LIST, SOCKET_LIST, map1.map);
