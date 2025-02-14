let letters = [];
let quote = " I would like to sleep, in order to surrender myself to the dreamers, the way I surrender myself to those who read me with eyes wide open; in order to stop imposing, in this realm, the conscious rhythm of my thought.";
let umbrella;
let isRaining = false;
let bgImage;
let umbrellaY;
let umbrellaX;

function preload() {
    bgImage = loadImage("ben1.jpg");
    umbrella = loadImage("umbrella.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(18);
    textAlign(CENTER, CENTER);
    textFont("Courier New");

    umbrellaX = width / 2;
    umbrellaY = height - 100; // Initial position

    for (let i = 0; i < quote.length; i++) {
        if (quote[i] !== " ") {
            letters.push(new Letter(random(width), random(-500, -50), quote[i]));
        }
    }
}

function draw() {
    // black background 
    background(0, 0, 0);  

    // Scale the background image correctly
    let imgRatio = bgImage.width / bgImage.height;
    let canvasRatio = width / height;

    let newWidth, newHeight;
    if (canvasRatio > imgRatio) {
        newWidth = width;
        newHeight = width / imgRatio;
    } else {
        newHeight = height;
        newWidth = height * imgRatio;
    }

    // Center the image
    let offsetX = (width - newWidth) / 2;
    let offsetY = (height - newHeight) / 2;

    // opacity to the background image
    tint(255, 150); // Adjust transparency (0 = fully transparent, 255 = full opacity)
    image(bgImage, offsetX, offsetY, newWidth, newHeight);
    noTint(); // Reset tint so other elements don't inherit it

    // Move umbrella
    if (isRaining) {
        umbrellaY -= 5; // unbrella move how fast
    }

    //umbrella transparency
    tint(255, 255);
    image(umbrella, umbrellaX - 300, umbrellaY, 600, 400);
    noTint();

    // falling letters
    for (let i = letters.length - 1; i >= 0; i--) {
        letters[i].update();
        letters[i].display();
    }
}

function mousePressed() {
    // Only start rain if the umbrella is clicked
    if (!isRaining && dist(mouseX, mouseY, umbrellaX, umbrellaY) < 75) {
        isRaining = true;
    }
}

class Letter {
    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.letter = letter;
        this.speed = random(5, 10); // how fast letters fall
    }

    update() {
        if (isRaining) {
            this.y += this.speed; // Letters fall like rain
        }
    }

    display() {
        fill(0);
        text(this.letter, this.x, this.y);
    }
}
