// Example based on: https://editor.p5js.org/piecesofuk/sketches/rJxOzAKvm
// And also: https://www.youtube.com/watch?v=urR596FsU68
// 5.17: Introduction to Matter.js - The Nature of Code by @shiffman

// Setup the physics world
let Engine = Matter.Engine,
  //    Render = Matter.Render,
  World = Matter.World,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies,
  engine,
  world;

// The elements in our world
let canvas;
let grounds = [];
let boxes = [];
let totalBoxes = 60; 

function setup() {
  // Setup the canvas & world
  canvas = createCanvas(600, 400);
  engine = Engine.create();
  world = engine.world;
  // Engine.run(engine);
  // Create some boundaries for objects to bounce against: x, y, w, h
  grounds.push(new Boundary(x=50, height/2, 5, height));// Left wall
  grounds.push(new Boundary(width-50, height/2, 5, height));// Right wall
  grounds.push(new Boundary(150, width-50, width, 5));// Ceiling
  grounds.push(new Boundary(150, height-50, width, 5)); // Floor
  // Add the boundaries to the world
  World.add(world, grounds);
}

let count = 0;
function draw() {
  // Make the background burgundy
  background(103, 22, 22);

  // Create a new box every 5 frames
  // Stop after we have created totalBoxes
  if (frameCount % 5 === 0 && count <= totalBoxes) {
    let size = 30,
        r = random(-10, 10),
        x = r+width/2, 
        y = 80,
        w = 50,
        h = 50
    boxes.push(new Box(x, y, w, h));
    count++; 
  }
  Engine.update(engine);
  
  // Display the boxes
  for (let box of boxes) {
    box.show();
  }
  
  // Display the barriers (code can be commented out)
  for (let ground of grounds) {
    ground.show();
  }
}

// GENERATE THE BOX - declare a variable to hold an image
let img;

function preload() {
  //Loading my image
  img = loadImage('images/popcorn-png-9449.png');
}

class Box {
  constructor(x, y, w, h) {
    //Including the image parameter in the constructor
    this.img = img;

    let options = {
      friction: 0.1,
      restitution: 0.2
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    //rectMode(CENTER);
    imageMode(CENTER); // Setting the image to CENTER
    //Draw an image instead of a rectangle
    //strokeWeight(1);
    //stroke(0, 0, 128);
    //fill(127);
    image(this.img, 0, 0, this.w, this.h);
    // Add any other shape or image here
    //rect(0, 0, this.w, this.h);
    pop();
  }
}

