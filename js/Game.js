class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("c1", i1);
    car2 = createSprite(300,200);
    car2.addImage("c2", i2);
    car3 = createSprite(500,200);
    car3.addImage("c3", i3);
    car4 = createSprite(700,200);
    car4.addImage("c4", i4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(102, 102, 102);
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      var index = 0;

      var x = 180;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>=4460){
      gameState = 2;
    }

    drawSprites();
  }

  end(){
    var e = createElement('h1');
    e.html("Game Over");
    e.position(displayWidth/2 - 100, 300);
  }
}
