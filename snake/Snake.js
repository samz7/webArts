class Scales{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.pos = [this.x, this.y];
        this.axis = 0
        this.direction = 1;
        this.turns = []
    }

    move(){
        this.change_direction();
        this.pos[this.axis] += this.direction*1

    }

    change_direction(){


        this.turns.forEach((turn)=>{
            let turningPoint = turn[0];
            let axis = turn[1];
            let direction = turn[2];


            if (this.direction < 0){
                if (this.pos[this.axis] < turningPoint){
                    
                    this.axis = axis;
                    this.direction = direction;
                    }
                    
                }
    
    
            else if (this.direction > 0){
                if (this.pos[this.axis] > turningPoint){
                    
        
                    this.axis = axis;
                    this.direction = direction;
                        
                    }
                        
                }
             
            
        })
    
        this.turns = []
    }
        
    

    addTurn(turningPoint, axis, direction){

        this.turns.push([turningPoint, axis, direction])

    }

    

    render(){
        rect(this.pos[0], this.pos[1], 20,20);
    }
}



class Snake{
    constructor(){
        this.body = []
        for (let i = 1; i < 4; i++){
            this.body.push(new Scales(i*20, 10))
        }
        this.axis = 0;
        this.turningPoint;
        this.direction = 1;
    }

    change_direction(axis, direction){
        this.axis = axis;
        this.direction = direction;
        let lastElement = this.body[this.body.length - 1]
        this.turningPoint = lastElement.pos[lastElement.axis]
        
    }


    run(){
        this.body.forEach((scale)=>{
            scale.addTurn(this.turningPoint, this.axis, this.direction)

            scale.move();
        })
    }

    render(){
        this.body.forEach((scale)=>{
            scale.render();
        })
    }
}