var dashPlayer,dashPlayerImage;
var spike1,spike2,spike3;
var spike1Img,spike2Img,spike3Img;
var robot,robotImg;
var background,backgroundImg;
var spikeGroup;
var score,highestScore
var gameState
var PLAY=0
var END=0
var gameState=PLAY;
var jump,die,check;
var x
var invisibleGround,ground,invisibleGround2;

function preload(){
dashPlayerImage=loadImage("images/dash_player.png")
spike1Img=loadImage("images/spike1.png")
spike2Img=loadImage("images/spike2.png")
spike3Img=loadImage("images/spike3.png")
robotImg=loadImage("images/robot_(1).png")
backgroundImg=loadImage("images/bg.jpg")
jump=loadSound("jump.mp3")
die=loadSound("die.mp3");
  check=loadSound("checkPoint.mp3");
  gameoverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
}
function setup(){
createCanvas(1500,800)
x=0

dashPlayer=createSprite(150,630)
dashPlayer.addImage(dashPlayerImage)
dashPlayer.scale=0.35

spike1=createSprite(300,635)
spike1.addImage(spike1Img)
spike1.scale=0.4

spike2=createSprite(190,640)
spike2.addImage(spike2Img);
spike2.scale=0.6

spike3=createSprite(250,640)
spike3.addImage(spike3Img);
spike3.scale=0.5

ground=createSprite(750,700,1500,70)
ground.shapeColor="green"
ground.x = ground.width/2;
ground.velocityX=-4;

var invisibleGround2=createSprite(1400,random(450,550),200,20)
invisibleGround2.shapeColor="green"
invisibleGround2.visibile=false

invisibleGround=createSprite(750,700,1500,70)
invisibleGround.shapeColor="green"
invisibleGround.visibile=false
}
function draw(){
  background("skyblue")

  if(ground.x>0){
   ground.x=750
  }
  if(keyDown("space") && dashPlayer.y>=450){
    dashPlayer.velocityY=-2
  }
  dashPlayer.velocityY=dashPlayer.velocityY+0.3
   
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    //dashPlayer.collide(invisibleGround2)
  
    //spike1.collide(invisibleGround)
    //spike2.collide(invisibleGround)
    //spike3.collide(invisibleGround)
drawSprites();
}