let gamer;
let foodPos;
let width = 800;
let height = 800;
let cols = width/20;
let rows = height/20;

function setup(){
    createCanvas(width, height);
    // gamer = new Scales(140,140, 0,1,1);
    frameRate(20);
    gamer = new Snake(floor(random(cols))*20,floor(random(cols))*20);
    foodPos = foodJump();
    
}

function foodJump(){
  

  pos = createVector(floor(random(cols)), floor(random(rows)));
  pos.mult(20)
  return pos;
  
}


function isLost(headPos){
  let wallCollide = ((headPos[0] > width-20) || (headPos[0] < 0)) || 
                    ((headPos[1] > height-20) || (headPos[1] < 0))
  

  return wallCollide
}


function draw(){
    background(0);
    fill(255);
    textSize(20);
    text(gamer.len, width-30, 20)
    gamer.render();
    let bodyCollide = gamer.run();


    if (bodyCollide || isLost(gamer.headPos)){
      textSize(32);
      fill(255);
      text('you lose', 200,200);
      noLoop();
    }

    if (gamer.headPos[0] == foodPos.x && gamer.headPos[1] == foodPos.y){
      foodPos = foodJump();
      gamer.grow();
    }

    fill(255, 0, 255);
    ellipse(foodPos.x, foodPos.y, 20,20);
  }


function keyPressed() {
    if (keyCode === DOWN_ARROW) {
      gamer.change_direction(1,1);

    } 
    
    else if (keyCode === UP_ARROW) {
      gamer.change_direction(1,-1);
    }


    else if (keyCode === LEFT_ARROW) {
        gamer.change_direction(0,-1)
      }

    
    else if (keyCode === RIGHT_ARROW) {
      

        gamer.change_direction(0,1)
      }
    }


