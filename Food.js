class Food{
    constructor(){   
   

      this.foodStock = 20;
     
        
      
      this.image = loadImage("images/Milk.png")
    }
    getFoodStock(){
          var foodStockRef = database.ref("food");
          foodStockRef.on("value", function(data){
            this.foodStock = data.val();
          })
      }
      updateFoodStock(stock){
          database.ref('/').update({food: stock});
      }
      deductFoodStock(){
    
      }
      bedroom(){
        background(bedroomImg,550,500);
      }
      washroom(){

        background(washroomImg,550,500);
      }
      garden(){
        background(gardenImg,550,500);
      }
    
    display(){
        var x = 80, y = 100;
        imageMode(CENTER);
        
        if(this.foodStock !== 0){
          for(var i = 0; i < this.foodStock; i++){
            if(i%10 === 0){
              x = 80;
              y = y+50;
            }
            image(this.image , x, y , 50, 50);
            x = x+10;
          }
        }
         }
        }
