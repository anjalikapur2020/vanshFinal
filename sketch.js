
var bgimg, splash
var gameState = "wait"
var goteggimg, eggimg, eggmissedimg, playbutton, nextbutton, eggsGroup,bombimg
var score = 0
var lostscore = 0
var score1 = 0
var lostscore1 = 0
var bomb,bombsGroup ,bgmusic,got,lost


function preload() {

   splash = loadImage("assets/BigWings!!.gif")
   goteggimg = loadImage("assets/gotegg.png")
   eggimg = loadImage("assets/egg.png")
   eggmissedimg = loadImage("assets/eggmissed.png")
   bgimg = loadImage("assets/bg3.jpg")
   basketimg = loadImage("assets/basket.png")
   birdimg = loadImage("assets/bird.gif")
   bombimg=loadImage("assets/bomb.png")
   bgmusic=loadSound("bgMusic.mp3")
   got=loadSound("winclap1.mp3")
   lost=loadSound("die1.mp3")

}

function setup() {
   createCanvas(windowWidth, windowHeight)

   playbutton = createImg("assets/start.png")
   playbutton.position(width / 2 - 120, height - 230)
   playbutton.size(300, 300)

   // move ground horizontally
   push()
   // imageMode(CENTER)
   ground = createSprite(width / 4, height / 150)
   // ground.x = ground.width /2;
   ground.addImage("ground", bgimg)
   ground.scale = 1.25
   ground.visible = false
   pop()


   // invisible ground to collide the player
   invisibleGround = createSprite(width / 2, height - 10, width, 20)
   invisibleGround.visible = false

   basket = createSprite(70, height - 40)
   basket.addImage("basket", basketimg)
   // basket.debug=true
   basket.setCollider("circle", 0, -2, 40)
   basket.addImage("got", goteggimg)
   basket.visible = false


   bird = createSprite(width / 2, 100)
   bird.addImage(birdimg)
   bird.visible = false
   bird.velocityX = 4

   // egg = createSprite(bird.x,bird.y)
   // egg.addImage(eggimg)
   // egg.visible = false
   // egg.scale=0.25
   // egg.velocityX = 4
   eggsGroup = new Group()
   bombsGroup= new Group()


bgmusic.setVolume(0.1)
// got.setVolume(0.1)
// lost.setVolume(0.1)

bgmusic.play()
}

function draw() {

   if (!bgmusic.isPlaying()) {
bgmusic.play()

      
   }
   if (gameState == "wait") {
      playbutton.show()
      background(splash)
   }

   basket.collide(invisibleGround)
   playbutton.mousePressed(() => {
      playbutton.hide()
      gameState = "about"
   })

   if (gameState == "about") {

      popabout()
   }

   if (bird.x > width) {
      bird.x = 50
   }



   if (gameState == "level1") {
      background(0)
      ground.visible = true
      basket.visible = true
      bird.visible = true
      ground.velocityX = -4


      if (ground.x < 0) {

         ground.x = ground.width / 2;
      }

      movememt()
      layeggs()

      for (i = 0; i < eggsGroup.length; i++) {
         if (basket.isTouching(eggsGroup.get(i))) {
            // basket.changeImage("got")
            eggsGroup.get(i).remove()
            console.log("got it")
            score += 5
// got.play()
         }

         if (invisibleGround.isTouching(eggsGroup.get(i))) {
            // basket.changeImage("got")
            eggsGroup.get(i).changeImage("missed")
            // eggsGroup.get(i).remove()
            console.log("got it")
            // lost.play()
            if(score>=5 && invisibleGround.isTouching(eggsGroup.get(i))){
            lostscore1 = score-2
            // score -=2
         }

         }
       }



       if(score>=10  ){
         level1won()
         
      //  got.play()
       }
      }


if(gameState=="level2"){
   background(0)
   ground.visible = true
   basket.visible = true
   bird.visible = true
   ground.velocityX = -4


   if (ground.x < 0) {

      ground.x = ground.width / 2;
   }

   movememt()
   layeggslevel2()


   for (i = 0; i < eggsGroup.length; i++) {
      if (basket.isTouching(eggsGroup.get(i))) {
         // basket.changeImage("got")
         eggsGroup.get(i).remove()
         console.log("got it")
         score1 += 5

      }


      if (invisibleGround.isTouching(eggsGroup.get(i))) {
         // basket.changeImage("got")
         eggsGroup.get(i).changeImage("missed")
         // eggsGroup.get(i).remove()
         console.log("got it")
         if(score1>=5 && invisibleGround.isTouching(eggsGroup.get(i))){
         lostscore = score1-2
         // score -=2
      }

      }
    }
    for (i = 0; i < bombsGroup.length; i++) {
      if (basket.isTouching(bombsGroup.get(i))) {
         // basket.changeImage("got")
         bombsGroup.get(i).remove()
         console.log("lost")
     gameState="over"

      }
   }

    if(score1>=30  ){
      level2won()
    
    }

}
   drawSprites()


   if (gameState == "level1") {
      fill("darkgreen")
      stroke("yellow")
      strokeWeight(4)
      textSize(20)
      text("SCORE : " + score, width/2, 50)
      text("LEVEL 1", 100, 50)
      // text("BROKEN EGGS : " + lostscore, width -200, 50)
   }

   if (gameState == "level2") {
      fill("darkgreen")
      stroke("yellow")
      strokeWeight(4)
      textSize(20)
      text("SCORE : " + score1, width/2, 50)
      text("LEVEL 2", 100, 50)
      // text("LIFE : " + lostscore, width -200, 50)
   }


if(gameState=="over")
{
gameOver()


}

}

function popabout() {
   swal({
      title: "Enter the World of EGGs!! \n Aim of the Game is to Collect the GOLDEN EGG!!",
      text: "To win!! collect eggs and move a level UP!!",
      imageUrl: "assets/gotegg.png",
      imageSize: "200x200",
      confirmButtonText: "START ",
      confirmButtonColor: "green"

   },
      function () {
         gameState = "level1"
      })


}

function level1won() {
   swal({
      title: "Now it's fot the Eggs to be deadly!!",
       text: "To win!! collect eggs and move a level UP!!",
      imageUrl: "assets/bomb.png",
      imageSize: "200x200",
      confirmButtonText: "START ",
      confirmButtonColor: "green"

   },
      function () {
         gameState = "level2"
      })


}


function level2won() {
   swal({
      title: "You are a PRO!!",
       text: "You have collected enough eggs to PARTY!!",
      imageUrl: "up.png",
      imageSize: "200x200",
      confirmButtonText: "RESTART ",
      confirmButtonColor: "green"

   },
      function () {
         window.location.reload();
      })


}


function gameOver() {
   swal({
       title: `Game Over`,
       text: "Oops you lost the game....!!!",
       imageUrl: "down.png",
       imageSize: "100x100",
       confirmButtonColor: '#DD6B55',
       confirmButtonText: 'Replay'
   },

       function () {

           window.location.reload();
       }
   );
}
// movememt
function movememt() {

   if (keyDown("RIGHT_ARROW")) {
      basket.x += 5
   }
   if (keyDown("LEFT_ARROW")) {
      basket.x -= 5
   }

   if (basket.x < 10) {
      basket.x = 70
   }

   if (basket.x > width) {
      basket.x = width - 70

   }

   // if (keyDown("space")) {
   //    egg = createSprite(bird.x, bird.y)
   //    egg.addImage(eggimg)
   //    egg.visible = false
   //    egg.scale = 0.2
   //    basket.x -= 2
   //    // egg.x = bird.x
   //    egg.visible = true
   //    egg.velocityY = 4
   //    bird.depth=egg.depth
   //    egg.depth =1

   // }

}
function layeggs() {
   if (frameCount % 60 == 0) {
      egg = createSprite(bird.x, bird.y)
      egg.addImage("egg", eggimg)
      egg.addImage("missed", eggmissedimg)
      egg.visible = false
      egg.scale = 0.2
      basket.x -= 2
      // egg.x = bird.x
      egg.visible = true
      egg.velocityY = 4
      bird.depth = egg.depth
      egg.depth = 1

      eggsGroup.add(egg)

   }

}



function layeggslevel2() {

   var randobject = Math.round(random(1, 2))
   basket.x -= 2
   switch (randobject) {

      case 1:
         if (frameCount % 60 == 0) {
            egg = createSprite(bird.x, bird.y)
            egg.addImage("egg", eggimg)
            egg.addImage("missed", eggmissedimg)
            egg.visible = false
            egg.scale = 0.2
         
            // egg.x = bird.x
            egg.visible = true
            egg.velocityY = 4
            bird.depth = egg.depth
            egg.depth = 1
            eggsGroup.add(egg)

         }

            break


      case 2:
         if (frameCount % 90 == 0) {
            bomb = createSprite(bird.x, bird.y)
            bomb.addImage("bomb", bombimg)
            // bomb.addImage("missed", eggmissedimg)
            bomb.visible = false
            bomb.scale = 0.4
           
            // egg.x = bird.x
            bomb.visible = true
            bomb.velocityY = 4
            bird.depth = bomb.depth
            bomb.depth = 1

            bombsGroup.add(bomb)

         }
            break;


default: break;

         
      }

   
   }


// function keyPressed(){
//    if(keyCode==37){
//       basket.x -=5
//    }

//    if(keyCode==39){
//       basket.x +=5
//    }
// }
