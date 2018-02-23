window.onload = function(){

  var connectBtn = document.getElementById('connectBtn');

  connectBtn.addEventListener('click', function(){

    var playerName = document.getElementById('playerName').value;

    if (playerName != null && playerName.length > 0) {

      connectBtn.remove();
      document.getElementById('playerName').readOnly = true;

      var canvas;
      var socket = io();

      addPlayerEvents(socket);
      initiatePlayerData(socket, playerName, null);

      canvas = document.getElementById("canvas").getContext("2d");
      canvas.font = '20px Arial';

      var maps;
      $.getJSON('/map1', function(res){ maps = res; });

      socket.on('newPos', function(data){

          canvas.clearRect(0,0,1024,720);

          //this will also be a seperate method later on but i dont know if its best to render the map every frame or just have it static
          if (maps != null) {
            for (var i = 0; i < maps.length; i++) {
              var mapItem = maps[i];
              canvas.fillStyle = mapItem['rectColor'];
              canvas.fillRect(mapItem['xPos'], mapItem['yPos'], mapItem['rectWidth'], mapItem['rectHeight']);
            }
          }

          //This wil be a seperate method later on
          for (var i = 0; i < data.length; i++) {
            canvas.textAlign = "center";
            canvas.fillText(data[i].name , data[i].x + (data[i].width/2), data[i].y - 10);
            canvas.fillStyle = "rgb(134, 35, 175)";
            canvas.fillRect(data[i].x, data[i].y, data[i].width, data[i].height);
          }

      });

    }else {
      console.log("Please set a player name");
    }

  });

}
