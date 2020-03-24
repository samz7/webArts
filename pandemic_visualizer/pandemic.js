

let W = 2000;
let H = 2000;
let plaza;
function setup(){
    createCanvas(W, H);
    plaza =  new Plaza(200, 2, W, H);
    frameRate(20)
}


function draw(){
    background(255);
    plaza.render();
    plaza.move_population();
    plaza.spread();
    

}



class Plaza{
    constructor(population, infected_population, W, H){
        this.width = W;
        this.height = H;
        this.healthy_population = [];
        this.infected_population = [];
        
        for (let i = 0; i < population; i++){
            this.add_healthy();
        }

        for (let i = 0; i < infected_population; i++){
            this.add_infected();
        }

        this.population = this.healthy_population.concat(this.infected_population);

    }

    add_healthy(){
        this.healthy_population.push(new Entity(random(this.width), random(this.height), 0, this.width, this.height))
    }

    add_infected(){
        this.infected_population.push(new Entity(random(this.height), random(this.height), 1, this.width, this.height))
    }

    move_population(){
        this.population.forEach((entity)=>{
            entity.move();
        })
    }

    spread(){
        for(let i = 0; i < this.infected_population.length; i++){
            for (let h = 0; h < this.healthy_population.length; h++){
                if (this.infected_population[i].intersect(this.healthy_population[h])){
                    let infected_entity = this.healthy_population[h];
                    infected_entity.infected = 1;
                    this.infected_population.push(infected_entity);
                    this.healthy_population.splice(h, 1);
                }
            }
        }
    
        this.population = this.healthy_population.concat(this.infected_population);
    }

    render(){
        this.population.forEach((entity)=>{
            entity.render();
        })
    }
}







class Entity{
    constructor(x, y, isInfected, W, H){
        this.pos = createVector(x, y);
        this.beginX = x;
        this.beginY = y;
        this.radius = 10;
        this.endX = random(0, W-this.radius);
        this.endY = random(0, H-this.radius);
        this.step = 0.01;
        this.pct = 0.0;
        this.distX = this.endX - this.beginX;
        this.distY = this.endY - this.beginY;
        this.exponent = random(0,4);
        this.width = W;
        this.height = H



        this.infected = isInfected;
        
        
    }

    intersect(other){
        let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (distance < this.radius*2){
            return true;
        }

        else{
            return false;
        }
        
    }

    move(){

        this.pct += this.step;
        if (this.pct < 1.0){
            this.pos.x = this.beginX + this.pct * this.distX
            this.pos.y = this.beginY + pow(this.pct, this.exponent) * this.distY;
        }

        else{
            this.pct = 0.0;
            this.beginX = this.pos.x;
            this.beginY = this.pos.y;
            this.endX = random(0,this.width-this.radius);
            this.endY = random(0, this.height-this.radius);
            this.distX = this.endX - this.beginX;
            this.distY = this.endY - this.beginY;
              
        }


    }

    render(){
        let col = color(255*this.infected, 255*(1-this.infected),0, 160)
        fill(col);
        strokeWeight(2);
        stroke(0);
        ellipse(this.pos.x, this.pos.y, this.radius);
    }
}