var Ghost , Tower ;
var GhostImage ;
var DoorImage , ClimberImage , TowerImage ;
   var doorsGroup, climbersGroup,invisibleBlockGroup;
var gameState = "start"; 
    
function preload() {
  GhostImage = loadImage ("ghost-standing.png");
  DoorImage = loadImage ("door.png");
  ClimberImage = loadImage ("climber.png");
  TowerImage = loadImage ("tower.png");
  
}
function setup() {
  createCanvas=(600,600)
   Tower=createSprite(300,300);
  Tower.addImage(TowerImage);
  Tower.velocityY = 4
 Ghost=createSprite(300,300);
  Ghost.scale = 0.2 ;
  Ghost.addImage(GhostImage);
  invisibleBlockGroup=new Group();
  climbersGroup=new Group();
  doorsGroup=new Group();
  
  
}
function draw() {
  if (gameState === "start"){
    
if (keyDown(RIGHT_ARROW)){
  Ghost.x = Ghost.x+3
}      
  if (keyDown(LEFT_ARROW)){
    Ghost.x = Ghost.x-3
  }
 if (keyDown("space")){
   Ghost.velocityY = -3
 } 
  Ghost.velocityY = Ghost.velocityY+0.5
  if (Tower.y > 400){
    Tower.y = 300
  }
  SpawnDoor();
  
  if (climbersGroup.isTouching(Ghost)){
    Ghost.velocityY = 0 ;
  }
  if (invisibleBlockGroup.isTouching(Ghost) || Ghost.y > 600){
    Ghost.destroy () ;
    gameState = "End" ;
  }
  
  drawSprites();
  }
  if (gameState === "End"){
    stroke ("Yellow");
    fill ("Yellow");
    textSize(30);
    text ("Game Over",230,250);
  }
}
function SpawnDoor(){
 if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(DoorImage);
    climber.addImage(ClimberImage);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    Ghost.depth = door.depth;
    Ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
   
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }

  
  
  
}


