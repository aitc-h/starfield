const
  dZ = 8,
  maxR = 4,
  starCount = 400;

class Star {
  constructor() {
    this.reset()
  }

  reset = () => {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    this.pz = this.z;
  }

  show = () => {
    fill(255);
    noStroke();

    this.sx = map(this.x / this.z, 0, 1, 0, width);
    this.sy = map(this.y / this.z, 0, 1, 0, height);

    // let r = map(this.z, 0, width / 2, maxR, 1);
    // ellipse(this.sx, this.sy, r, r);

    this.px = map(this.x / this.pz, 0, 1, 0, width);
    this.py = map(this.y / this.pz, 0, 1, 0, height);

    stroke(255);
    strokeWeight(0.5)
    line(this.px, this.py, this.sx, this.sy)
  }

  tick = () => {
    this.pz = this.z;
    this.z = this.z - dZ;

    if (
      this.z < 1 ||
      this.sx < -(width / 2) ||
      this.sx > width / 2 ||
      this.sy < -(height / 2) ||
      this.sy > height / 2
    ) {
      this.reset()
    }
  }
}

var stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0);
  translate(windowWidth / 2, windowHeight / 2)
  stars.forEach((star) => {
    star.tick();
    star.show();
  })
}
