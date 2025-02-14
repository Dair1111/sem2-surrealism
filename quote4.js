let letters = [];
let quote = "I would like to sleep, in order to surrender myself to the dreamers, the way I surrender myself to those who read me with eyes wide open; in order to stop imposing, in this realm, the conscious rhythm of my thought.";
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
    textSize(24);
    textAlign(LEFT, CENTER); // Align text to the left for better spacing
    textFont("Courier New");

    umbrellaX = width / 2;
    umbrellaY = height - 100; // Initial position

    let quoteWidth = width * 0.75; // Quote takes up 75% of screen width
    let padding = (width - quoteWidth) / 2; // Centering with padding

    let words = quote.split(" ");
    let x = padding;
    let y = 100; // Vertical position of the quote
    let spacing = 12; // Letter spacing
    let lineHeight = 35; // Space between lines

    for (let i = 0; i < words.length; i++) {
        let wordWidth = textWidth(words[i] + " ");

        if (x + wordWidth > width - padding) {
            x = padding; // Move to new line
            y += lineHeight;
        }

        for (let j = 0; j < words[i].length; j++) {
            letters.push(new Letter(x, y, words[i][j]));
            x += spacing; // Letter spacing
        }
        
        x += spacing; // Space after words
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
    tint(255, 150);
    image(bgImage, offsetX, offsetY, newWidth, newHeight);
    noTint();

    // Move umbrella
    if (isRaining) {
        umbrellaY -= 5; // Umbrella moves up
    }

    // umbrella transparency
    tint(255, 255);
    image(umbrella, umbrellaX - 300, umbrellaY, 600, 400);
    noTint();

    // Draw letters
    for (let i = 0; i < letters.length; i++) {
        letters[i].update();
        letters[i].display();
    }

    // Draw and update letters
for (let i = letters.length - 1; i >= 0; i--) {
    letters[i].update();
    letters[i].display();

    // Calculate the umbrella's top Y position
    let umbrellaTop = umbrellaY + 50; // Adjust this value based on umbrella size

    // Check if the letter is touching the umbrella
    if (letters[i].y >= umbrellaTop &&  // Letter is at or below umbrella
        letters[i].x >= umbrellaX - 250 &&  // Letter is within left edge
        letters[i].x <= umbrellaX + 250) { // Letter is within right edge
        letters.splice(i, 1); // Remove the letter
    }
}
    
}

function mousePressed() {
    // Only start rain if the umbrella is clicked
    if (!isRaining && dist(mouseX, mouseY, umbrellaX, umbrellaY) < 75) {
        isRaining = true;

        // Start making letters fall
        for (let letter of letters) {
            letter.falling = true;
        }
    }
}

class Letter {
    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.originalY = y; // Store the original position
        this.letter = letter;
        this.speed = random(2, 10); // letter fall speed
        this.falling = false; // Initially not falling
    }

    update() {
        if (this.falling) {
            this.y += this.speed; // Letters fall when activated
        }
    }

    display() {
        fill(207, 186, 176); // font color
        text(this.letter, this.x, this.y);
    }
}
