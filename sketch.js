var dog,dogImage,happyDogImage, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1000, 1000);
  database = firebase.database();
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  //Creation of the dog.
  dog = createSprite(250,400,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods)
  
}


function draw() { 

  background("#1E8E3E")
  foodObj.display();

  fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM", 350,30);
  }

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
 }
 
 function feedDog(){
   dog.addImage(happyDogImage)
   foodObj.updateFoodStock(foodObj.getFoodStock()-1);

   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
   })
 }