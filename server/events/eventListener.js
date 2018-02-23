const p = require(__dirname + '/../../server/player.js');

exports.firstJoin = (socket, socketList, playerList, mapData) => {
  console.log("We have a new connection from the socket");

  socket.id = Math.random();
  socketList[socket.id] = socket;

  var player = p.Player(socket.id, mapData);
  playerList[socket.id] = player;
  console.log("New player created on the socket id:" + socket.id);

  return player;
}

exports.handleEvents = (socket, socketList, playerList) => {

  var player = playerList[socket.id];

  socket.on('disconnect', () => {
    delete socketList[socket.id];
    delete playerList[socket.id];
  });

  socket.on('keyPress', (data) => {
    if (data.inputID === 'right'){
      player.ctrlRight = data.state;
    }else if (data.inputID === 'left') {
      player.ctrlLeft = data.state;
    }else if (data.inputID === 'up') {
      player.ctrlUp = data.state;
    }else if (data.inputID === 'down') {
      player.ctrlDown = data.state;
    }
  });

  socket.on('initPlayer', (data) => {
    if(data.name !== null){
      player.name = data.name;
    }
  });
}
