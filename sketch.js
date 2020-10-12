var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 2;

  ghost = createSprite(300, 500, 20, 20);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5


  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  spookySound.loop();
}

function draw() {
  background("black");

  if (gameState === "play") {
    if (tower.y > 600) {
      tower.y = 300;
    }

    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 5;
    }


    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 5;
    }

    if (ghost.isTouching(climbersGroup)) {
      ghost.setVelocity(0, 0);
    }
    spawnDoor();

    if (ghost.isTouching(invisibleBlockGroup) || ghost.y > 600) {
      gameState = "end";
    }

    drawSprites();


  } else if (gameState === "end") {
    textSize(40);
    fill("blue");
    text("Game Over", 250, 300);

  }














}

function spawnDoor() {
  if (frameCount % 100 === 0) {
    door = createSprite(Math.round(random(100, 500)), -10);
    door.addImage(doorImg);
    door.velocityY = 2;
    doorsGroup.add(door);
    door.lifetime = 300;

    climber = createSprite(door.x, 40);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climbersGroup.add(climber);
    climber.lifetime = 300;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    invisibleBlock = createSprite(door.x, 50, climber.width, 10);
    invisibleBlock.velocityY = 2;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 300;
    invisibleBlock.visible = false;

  }


}