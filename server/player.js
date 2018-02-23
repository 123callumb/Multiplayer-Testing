let allowedMovement = {right: true, left: true, up: true, down: true};

exports.Player = (id) => {
  var self = {
    x:250,
    y:250,
    id:id,
    ctrlRight: false,
    ctrlLeft: false,
    ctrlUp: false,
    ctrlDown: false,
    maxSpd: 10,
    name: 'noname',
    width: '50',
    height: '50'
  }
  self.updatePos = (mapData) => {
    collisionCheck(self, mapData);
    if (self.ctrlRight && allowedMovement.right)
      self.x += self.maxSpd;
    if (self.ctrlLeft && allowedMovement.left)
      self.x -= self.maxSpd;
    if (self.ctrlUp && allowedMovement.up)
      self.y -= self.maxSpd;
    if(self.ctrlDown && allowedMovement.down)
      self.y += self.maxSpd;
  }
  return self;
}

let collisionCheck = (player, mapData) => {

  let plrCol = createCollisionRect(player.x, player.y, player.width, player.height);

  for (var i = 0; i < mapData.length; i++) {
      let mapItem = mapData[i];
      let objCol = createCollisionRect(mapItem['xPos'], mapItem['yPos'], mapItem['rectWidth'], mapItem['rectHeight']);
      //Top collisionCheck
      if(plrCol.p1.x >= objCol.p1.x && plrCol.p1.x <= objCol.p2.x //Check in X1 Range
         // &&
         // plrCol.p3.y >= objCol.p1.y && plrCol.p3.y <= objCol.p3.y //Check in Y Range
       ){
        allowedMovement.down = false;
      }else {
        allowedMovement.down = true;
      }
  }
}

function createCollisionRect(xPos, yPos, width, height){
  return {
          p1: {x: xPos, y:yPos},
          p2: {x: xPos + width, y:yPos},
          p3: {x: xPos, y:yPos + height},
          p4: {x: xPos + width, y:yPos + height}
        };
}
