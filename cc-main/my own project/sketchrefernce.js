var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY=1;
var END=0;
var gamestate=PLAY;

var highestScore;
var gameOver,gameOverImage,restart,restartImage;
var jump,die,check;

var x;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
   
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  check=loadSound("checkPoint.mp3");
  
}

function setup() {
  createCanvas(600, 200);

  x=0;

  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
    trex.addAnimation("collided", trex_collided);

  trex.scale = 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver=createSprite(300,80,20,20);
  gameOver.addImage("gameOver.png",gameoverImage);
  gameOver.scale=0.5;
  
  gameOver.visible=false;
  
  restart=createSprite(300,120,20,20);
  restart.addImage("restart.png",restartImage);
  restart.scale=0.5;
  
  restart.visible=false;
  
  highestScore=0
  
  
  score = 0;
}

function draw() {
  background(180);
   text("Score: "+ score, 400,50); 
     text("highestScore: "+ highestScore, 300,50); 

  if(gamestate===PLAY){
  if(score>0 && score%100===0){
    check.play();
  }
  x++;
  score = score + Math.round(x/60);
 
  
  if(keyDown("space") && trex.y>=130) {
    trex.velocityY = -10;
    jump.play();
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
   if(obstaclesGroup.isTouching(trex)){
     gamestate=END;
     die.play();
   }
  }
  else if(gamestate===END){
    ground.velocityX=0;
    restart.visible=true;
    gameOver.visible=true;
    trex.velocityY=0;
    trex.changeAnimation("collided",trex_collided);
     obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
    reset();
    }
  }
    
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
gamestate=PLAY;
gameOver.visible=false;
restart.visible=false;
obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  if(highestScore<score){
  highestScore=score;
  }
  score=0;
  x=0;
  trex.changeAnimation("running");
}