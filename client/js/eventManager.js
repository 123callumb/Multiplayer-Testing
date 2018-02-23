
function addPlayerEvents(socket) {
  document.onkeydown = function(e){
    if (e.keyCode === 68) { //d
      socket.emit('keyPress', {inputID: 'right', state: true});
    }else if (e.keyCode === 65) { //a
      socket.emit('keyPress', {inputID: 'left', state: true});
    }else if(e.keyCode === 87){ //W
      socket.emit('keyPress', {inputID: 'up', state: true});
    }else if(e.keyCode === 83){ //S
      socket.emit('keyPress', {inputID: 'down', state: true});
    }
  }

  document.onkeyup = function(e){
    if (e.keyCode === 68) { //d
      socket.emit('keyPress', {inputID: 'right', state: false});
    }else if (e.keyCode === 65) { //a
        socket.emit('keyPress', {inputID: 'left', state: false});
    }else if(e.keyCode === 87){ //W
      socket.emit('keyPress', {inputID: 'up', state: false});
    }else if(e.keyCode === 83){ //S
      socket.emit('keyPress', {inputID: 'down', state: false});
    }
  }

}

function initiatePlayerData(socket, playerName, playerColor){
  socket.emit('initPlayer', {name: playerName});
}
