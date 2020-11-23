var trex, trex_runs, edges, groundimage, cloud, o1, o2, o3, o4, o5, o6, Cloudgroup,gameover,restart, Cactusgroup, Gamestate = 0,tc,chekpoint,die,jump,score=0;


function preload() {
  cloud = loadImage("cloud.png")
  trex_runs = loadAnimation("trex1.png", "trex2.png", "trex3.png")
tc=loadAnimation("trex_collided.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  gameover=loadImage("gameOver.png")
  restart=loadImage("restart.png")
  groundimage = loadImage("ground.png")
  chekpoint=loadSound("checkPoint.mp3")
  jump=loadSound("jump.mp3")
   die=loadSound("die.mp3")
}

function setup() {

  createCanvas(windowWidth, windowHeight)
  trex = createSprite(30, height-20, 20, 20);
  trex.addAnimation("runs", trex_runs);
  trex.addAnimation("collided",tc)
  trex.scale = 0.5
  ground = createSprite(width/2, height-15, width, 20)
  edges = createEdgeSprites()
  ground.velocityX = -5
  ground.addImage(groundimage)
  invisibleground = createSprite(width/2, height-5, width, 10)
  invisibleground.visible = false
  Cloudgroup = new Group()

  Cactusgroup = new Group()
  G=createSprite(width/2,height/2,20,20)
  G.addImage(gameover)
  G.scale=0.5
  A=createSprite(width/2,(height/2)+30,20,20)
  A.addImage(restart)
  A.scale=0.5
  G.visible=false
  A.visible=false
  

}

function draw() {



  background(255);
  text("score: "+score,width-100,40)
  console.log(trex.y)
  if (Gamestate == 0) {
    if (Cactusgroup.isTouching(trex)) {
       trex.y=height-20
      
      trex.x=30
      trex.velocityY=0
      die.play() 
     
      Gamestate = 1;  
    }
    score=score+Math.round(frameCount/60)

    if (keyDown("space")||touches.length>0){// && trex.y >= height-30) {
      console.log("s")
      trex.velocityY = -12;
      jump.play()
    }

    trex.velocityY = trex.velocityY + 0.5
    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    clouds()
    cactus()
  } else if (Gamestate == 1) {
    ground.velocityX = 0;
    Cloudgroup.setVelocityXEach(0)
    Cactusgroup.setVelocityXEach(0)
    trex.changeAnimation("collided")
    Cloudgroup.setLifetimeEach(-1)
    Cactusgroup.setLifetimeEach(-1)
    G.visible=true
    A.visible=true
    if(mousePressedOver(A)||touches.length>0){
      Cactusgroup.destroyEach()
      Cloudgroup.destroyEach()
      Gamestate=0
       console.log(91)
       }
  }




  trex.collide(invisibleground)

  drawSprites();

  fill(0)
  text(mouseX + "," + mouseY, mouseX, mouseY)
}

function clouds() {
  if (frameCount % 60 == 0) {


    var c = createSprite(width, Math.round(random(20,height-100)), 10, 10)
    c.lifetime = width / 4
    c.velocityX = -4
    c.addImage(cloud)
    c.depth = trex.depth
    trex.depth = trex.depth + 1
    Cloudgroup.add(c)

  }
}

function cactus() {
  if (frameCount % 100 == 0) {
    var alyssa = createSprite(width, height-30, 10, 10)
    alyssa.velocityX = -3
    Cactusgroup.add(alyssa)
    var sanjo = Math.round(random(1, 6))
    switch (sanjo) {
      case 1:
        alyssa.addImage(o1);
        break;
      case 2:
        alyssa.addImage(o2);
        break;
      case 3:
        alyssa.addImage(o3);
        alyssa.scale = 0.7
        break;
      case 4:
        alyssa.addImage(o4);
        alyssa.scale = 0.8
        break;
      case 5:
        alyssa.addImage(o5);
        alyssa.y = height-30;
        alyssa.scale = 0.5
        break;
      case 6:
        alyssa.addImage(o6);
        alyssa.y = height-50 ;
        alyssa.scale = 0.8
        break;
    }
    alyssa.lifetime = width/ 3
  }
}