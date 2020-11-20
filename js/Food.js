class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }

    display(){
        var x = 80;
        var y = 100;

        if(foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x = x+30;
            }
        }
    }

     updateFoodStock(foodStock){
        this.foodStock = foodStock
      }

   getFoodStock(){
       return this.foodStock
    }
    
    deductFood(){
        if(this.foodStock > 0 ){
            this.foodStock -= 1;
        }
    }
   
    getFeedTime(lastFed){
        this.lastFed = lastFed;
    }
}