var bg , backGround;
var character , girlWalking , girlDucking , girlJumping , girlStop;
var boy , boyWalking , boyDucking , boyJumping; 
var Corona , virus 
var mask , sanitizer , vaccine;
var invisibleGround ;
var life1 , life2 ,life3,life4,life5 , lifeImage
var lives = 5;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var virusGroup , protectionGroup ;
var protectionValue = 0;
var protectionImage , protectionImg 
function preload(){
  bg= loadImage("Background.jpg");
  corona = loadImage("Corona Image.png")
  virus = loadImage("Viruses.png")
 mask = loadImage("Mask.png")
 vaccine = loadImage("Vaccine.png")
 sanitizer = loadImage("Sanitizer.png")
 lifeImage = loadImage("life.png");
 protectionImg = loadImage("protection.png")
 girlWalking = loadAnimation("Girl_assets/girl_1_walking.png","Girl_assets/girl_2_walking.png","Girl_assets/girl_3_walking.png","Girl_assets/girl_4_walking.png","Girl_assets/girl_5_walking.png","Girl_assets/girl_6_walking.png")
 girlDucking = loadAnimation("Girl_assets/girl_ducking_1.png","Girl_assets/girl_ducking_2.png","Girl_assets/girl_ducking_3.png","Girl_assets/girl_ducking_4.png","Girl_assets/girl_ducking_5.png","Girl_assets/girl_ducking_6.png")
 girlStop = loadAnimation("Girl_assets/girl_3_walking.png")
 girlJumping = loadAnimation("Girl_assets/girl_jumping_1.png","Girl_assets/girl_jumping_2.png","Girl_assets/girl_jumping_3.png","Girl_assets/girl_jumping_4.png","Girl_assets/girl_jumping_5.png","Girl_assets/girl_jumping_6.png")
 boyJumping = loadAnimation("Boy_assets/boy_jumping_1.png","Boy_assets/boy_jumping_2.png","Boy_assets/boy_jumping_3.png","Boy_assets/boy_jumping_4.png","Boy_assets/boy_jumping_5.png","Boy_assets/boy_jumping_6.png")
 boyDucking = loadAnimation("Boy_assets/boy_ducking_1.png","Boy_assets/boy_ducking_2.png","Boy_assets/boy_ducking_3.png","Boy_assets/boy_ducking_4.png","Boy_assets/boy_ducking_5.png","Boy_assets/boy_ducking_6.png")
}

function setup() {
  createCanvas(1350, 650);
  backGround = createSprite(0,325,1550,650)
  backGround.addImage(bg);
  backGround.velocityX = -4;
  backGround.scale = 0.3;
  character = createSprite(100,520)
  character.addAnimation("girlWalking",girlWalking)
  character.scale = 0.3
  invisibleGround = createSprite(width/2,620,width, 20) 
  protectionImage = createSprite(1000,30,20,20)
 protectionImage.addImage(protectionImg)
  

 protectionImage.scale = 0.1
  life1 = createSprite(30,30)
  life1.addImage(lifeImage);
  life1.scale = 0.1

  life2 = createSprite(70,30)
  life2.addImage(lifeImage);
  life2.scale = 0.1

  life3 = createSprite(110,30)
  life3.addImage(lifeImage);
  life3.scale = 0.1

  life4 = createSprite(150,30)
  life4.addImage(lifeImage);
  life4.scale = 0.1

  life5 = createSprite(190,30)
  life5.addImage(lifeImage);
  life5.scale = 0.1
  
  virusGroup = new Group()
  protectionGroup = new Group()
}

function draw() {
  background(0);
  if (gameState === PLAY){
  
  invisibleGround.visible = false;
  if(backGround.x < 0){
    backGround.x = 400
 
  }

  if(keyDown("UP_ARROW")){
    character.velocityY = -10
    character.addAnimation("girlJumping",girlJumping)
  character.changeAnimation("girlJumping");
 }
  character.velocityY = character.velocityY+0.5
 if(keyDown("DOWN_ARROW")){
  character.addAnimation("girlDucking",girlDucking)
  character.changeAnimation("girlDucking",girlDucking);
 }
 if(keyDown("RIGHT_ARROW")){
  character.addAnimation("girlWalking",girlWalking)
  character.changeAnimation("girlWalking")
 }

 for (var i = 0; i < virusGroup.length; i++) {
  if (virusGroup.get(i).isTouching(character)) {
    virusGroup.get(i).destroy();
    lives = lives-1
      
            
  }
}
 
 if(lives === 4){
   life5.visible = false;
 }
 if(lives === 3){
  life4.visible = false;
}
if(lives === 2){
  life3.visible = false;
}
if(lives === 1){
  life2.visible = false;
}
if(lives === 0){
  life1.visible = false;
  gameState = "End";
}


for (var i = 0; i < protectionGroup.length; i++) {
  if (protectionGroup.get(i).isTouching(character)) {
    protectionGroup.get(i).destroy();
    protectionValue = protectionValue + 1
          
  }
}


 if(character.isTouching(protectionGroup)){
  character.protectionBar = character.protectionBar-1
}
fill("white")  
rect(1100,30,185,20)  
fill("green")  
rect(1100,30,protectionValue,20)  

  spawnObstacles();
  spwanProtection()
 

 }
 else if (gameState === END) {
 character.velocityX = 0
 protectionGroup.velocityX = 0;
 virusGroup.velocityX = 0;
backGround.velocityX = 0;
character.changeAnimation("girlStop",girlStop);
 gameOver();



 }
 drawSprites();
 character.collide(invisibleGround);
}
function keyPressed(){
  

}
function spawnObstacles(){
 if(frameCount%120 === 0){
  var Virus = createSprite(1350,490,40,10);
    Virus.y = Math.round(random(300,600));
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: Virus.addImage(corona);
      Virus.scale = 0.05
              break;
      case 2: Virus.addImage(virus);
      Virus.scale = 0.3
              break;
      default: break;
    }
    
    Virus.velocityX = -4 
    Virus.lifetime = 338;
    virusGroup.add(Virus)
 }

}

 function spwanProtection(){

  if(frameCount%200 === 0){
    var Protection = createSprite(1350,490,40,10);
      Protection.y = Math.round(random(300,600));
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: Protection.addImage(mask);
        Protection.scale = 0.3
                break;
        case 2: Protection.addImage(vaccine);
        Protection.scale = 0.3
                break;
        case 3: Protection.addImage(sanitizer);
        Protection.scale = 0.3
                break;
        default: break;
      }
      Protection.velocityX = -4
      Protection.lifetime = 338;
      protectionGroup.add(Protection);
 }
  
}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost the race....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}


