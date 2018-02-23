exports.onUpdate = (playerList, socketList, mapData) => {

  setInterval(() => {
    var pack = [];
    for (var i in playerList) {
      if (socketList.hasOwnProperty(i)) {
        var player = playerList[i];
        player.updatePos(mapData);
        pack.push({
          x:player.x,
          y: player.y,
          name:player.name,
          height: player.height,
          width: player.width
        });
      }
    }
    for (var i in socketList) {
        let socket = socketList[i];
        socket.emit('newPos', pack);
    }
  }, 1000/60);
}
