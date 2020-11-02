
//Create variables here
var database;
var dog, dogNormal;
var happyDog, foodS, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;
var gameState, readState,  bedroomImg, washroomImg, gardenImg;
var currentTime;




function preload()
{
  //load images here\
  dogNormal = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png");

  bedroomImg = loadImage("images/Bed Room.png");
  washroomImg = loadImage("images/Wash Room.png");
gardenImg = loadImage("images/Garden.png");
 


  feed = createButton("feed the dog");
  feed.position(600, 700);
  feed.mousePressed(dogFeed);

  addFood = createButton("Add food");
  addFood.position(800, 700);
  addFood.mousePressed(Foodadd);
}

function setup() {
  database = firebase.database();
	createCanvas(800, 800);
  
  dog = createSprite(400,400,5,5);
  
  

 

foodObj = new Food();
readState = database.ref('gameState');
readState.on("value", function (data){
  gameState = data.val();
});


}


function draw() {  
  
background(46,139,87);



fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
 
})

if(gameState === "Hungry"){
  feed.show();
  addFood.show();
 
  dog.addImage(dogNormal);
  
 
}else{
  feed.hide();
  addFood.hide();
  dog.remove();
}
currentTime = hour();
if(currentTime == (lastFed + 1)){
update("Playing");
foodObj.garden();
}else if(currentTime == (lastFed + 2)){
  update("Sleeping");     
  foodObj.bedroom();
  }else  if(currentTime >(lastFed + 1) && currentTime <= (lastFed + 4) ){
    update("Bathing");
    foodObj.washroom();
    }else {
      update("Hungry");
      foodObj.display();
      }
  drawSprites();
  //add styles here
  textSize(20);
  fill("black");
  stroke(20);
  if(lastFed >= 12){
    text("Last Fed :" + lastFed%12 + "PM", 600,50);
  }else if(lastFed === 0){
    text("Last Fed : 12 AM", 600,50);
  }else{
    text("Last Fed :" + lastFed%12 + "AM", 600,50);
  }
  
text("Food: " +  foodObj.foodStock,500,50);
textSize(15)


}

/*function readStock(data){
 foodS = data.val();
 console.log(fedTime)
}*/

function Foodadd(){
  foodObj.foodStock++;
  database.ref('/').update({
    food: foodObj.foodStock,
    test : 2
  })
  
}
function dogFeed(){

hour();

  dog.addImage(dogHappy)
  foodObj.foodStock = foodObj.foodStock - 1;
console.log(gameState)
 database.ref('/').update({
  food: foodObj.foodStock,
  FeedTime : hour()
 })
  
}
function update(state){
  database.ref('/').update({
    gameState : state
  })
}