let width = window.innerWidth;
let height = window.innerHeight;

//sound effects
let bite_sound;
let bluetooth;
let box_box;
let fortnite_death;
let heavenly;
let hello_there;
let mario_jump;
let metal_pipe;
let romance;

let buttons_top = [];
let buttons_middle = [];
let buttons_bottom = [];
let canvas;
let currentSound = null;

function soundPath(fileName) {
  return `sound_effects/${fileName}`;
}

function setup() {
  canvas = createCanvas(width, height);
  
  bgColor = color('#293681');
  baseFill = color('#121826');

  bite_sound = loadSound(soundPath('bite_sound.mp3'));
  bluetooth = loadSound(soundPath('bluetooth.mp3'));
  box_box = loadSound(soundPath('box_box.mp3'));
  fortnite_death = loadSound(soundPath('fortnite_death.mp3'));
  heavenly = loadSound(soundPath('heavenly.mp3'));
  hello_there = loadSound(soundPath('hello_there.mp3'));
  mario_jump = loadSound(soundPath('mario_jump.mp3'));
  metal_pipe = loadSound(soundPath('metal_pipe.mp3'));
  romance = loadSound(soundPath('romance.mp3'));

  let b1 = new Button(width/3, height/3, 200, 80, color('#88BDA4'), color('#659287'), bite_sound);
  let b2 = new Button(width/2, height/3, 200, 80, color('#B5BAFF'), color('#9FA1FF'), bluetooth);
  let b3 = new Button(2*width/3, height/3, 200, 80, color('#4B5694'), color('#111844'), box_box);

  buttons_top.push(b1);
  buttons_top.push(b2);
  buttons_top.push(b3);

  let b4 = new Button(width/3, height/2, 200, 80, color('#AE2448'), color('#6E1A37'), romance);
  let b5 = new Button(width/2, height/2, 200, 80, color('#FFAE6E'), color('#EC6530'), heavenly);
  let b6 = new Button(2*width/3, height/2, 200, 80, color('#CBF1F5'), color('#A6E3E9'), hello_there);

  buttons_middle.push(b4);
  buttons_middle.push(b5);
  buttons_middle.push(b6);

  let b7 = new Button(width/3, 2*height/3, 200, 80, color('#048ba8'), color('#035d71'), mario_jump);
  let b8 = new Button(width/2, 2*height/3, 200, 80, color('#731d89'), color('#441151'), metal_pipe);
  let b9 = new Button(2*width/3, 2*height/3, 200, 80, color('#e56e7a'), color('#D72638'), fortnite_death);

  buttons_bottom.push(b7);
  buttons_bottom.push(b8);
  buttons_bottom.push(b9);
}

function draw() {
  background(bgColor);
  noStroke();
  for(let i=0; i<buttons_top.length; i++) {
    buttons_top[i].show();
    buttons_middle[i].show();
    buttons_bottom[i].show();
  }
}

function mousePressed() {
  for(let i=0; i<buttons_top.length; i++) {
    buttons_top[i].clicked(mouseX, mouseY);
    buttons_middle[i].clicked(mouseX, mouseY);
    buttons_bottom[i].clicked(mouseX, mouseY);
  }
}

function mouseReleased() {
  for(let i=0; i<buttons_top.length; i++) {
    buttons_top[i].y = height/3;
    buttons_middle[i].y = height/2;
    buttons_bottom[i].y = 2*height/3;
  }
}

class Button {
  constructor(x, y, w, h, color, accent, song) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.accent = accent;
    this.song = song;
  }

  show() {
    noStroke();

    fill(this.color);
    rect((this.x-100), this.y, this.w, 50);

    fill(this.accent);
    ellipse(this.x, this.y, this.w, this.h);

    fill(this.color);
    arc(this.x, (this.y+50), this.w, this.h, TWO_PI, PI);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);

    if(d < this.w / 2) { // if the distance is less than half of the width of the button
      if (currentSound && currentSound.isPlaying()) {
        currentSound.stop();
      }

      bgColor = color(random(255), random(255), random(255));

      currentSound = this.song;
      this.y += 10; // add 10 units to the y position (aka press it)
      this.song.play(); 
    }
  }
}