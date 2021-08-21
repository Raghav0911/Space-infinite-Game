var path,rocket,meteor,star;
var pathImg,rocketImg,starsImg,meteorImg,endImg;
var score = 0;
var stars = 0;
var starG,meteorG;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("path.jpg");
  rocketImg = loadImage("rocket.png");
  starsImg = loadImage("star.png");
  meteorImg = loadImage("meteor.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);

path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;



rocket= createSprite(100,500,20,20);
rocket.addImage(rocketImg);
rocket.scale=0.3;
  
  
starG=new Group();
meteorG=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  
  edges= createEdgeSprites();
  rocket.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createstar();
    createmeteor();

    if (starG.isTouching(rocket)) {
      starG.destroyEach();
      score=score+50;
      stars = stars + 1;
    }
    else{
      if(meteorG.isTouching(rocket)) {
      gameState=END;
      rocket.addImage(endImg);
      rocket.x=200;
      rocket.y=300;
      rocket.scale=0.5;
      starG.destroyEach();
      meteorG.destroyEach();
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("score: "+ score,150,30);
  text("stars: "+ stars,150,60);
  }

}

function createstar() {
  if (World.frameCount % 200 == 0) {
  var star = createSprite(Math.round(random(50, 350),40, 10, 10));
  star.addImage(starsImg);
  star.scale=0.12;
  star.velocityY = 3;
  star.lifetime = 150;
  starG.add(star);
  }
}

function createmeteor() {
  if (World.frameCount % 300 == 0) {
  var meteor = createSprite(Math.round(random(50, 350),40, 10, 10));
  meteor.addImage(meteorImg);
  meteor.scale=0.5;
  meteor.velocityY = 3;
  meteor.lifetime = 150;
  meteorG.add(meteor);
}
}

