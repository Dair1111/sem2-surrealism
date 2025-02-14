let letters = [];
let quote = "I would like to sleep, in order to surrender myself to the dreamers, the way I surrender myself to those who read me with eyes wide open; in order to stop imposing, in this realm, the conscious rhythm of my thought.";
let umbrella;
let isRaining = false; // Tracks if rain has started
let bgImage;
let umbrellaY;
let umbrellaX;
let dragging = false; // Tracks if umbrella is being dragged
let offsetX, offsetY; // Mouse offset when dragging
let showClickText = true; // Controls the "Click Me" text visibility

function preload() {
    bgImage = loadImage("ben1.jpg");
    umbrella = loadImage("umbrella.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(24);
    textAlign(LEFT, CENTER);
    textFont("Courier New");

    umbrellaX = width / 2;
    umbrellaY = height - 170; // unbrella Initial position

    let quoteWidth = width * 0.75;
    let padding = (width - quoteWidth) / 2;

    let words = quote.split(" ");
    let x = padding;
    let y = 100;
    let spacing = 12;
    let lineHeight = 35;

    for (let i = 0; i < words.length; i++) {
        let wordWidth = textWidth(words[i] + " ");
        if (x + wordWidth > width - padding) {
            x = padding;
            y += lineHeight;
        }
        for (let j = 0; j < words[i].length; j++) {
            letters.push(new Letter(x, y, words[i][j]));
            x += spacing;
        }
        x += spacing;
    }
}

function draw() {
    background(0, 0, 0);

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

    let offsetX = (width - newWidth) / 2;
    let offsetY = (height - newHeight) / 2;

    tint(255, 150);
    image(bgImage, offsetX, offsetY, newWidth, newHeight);
    noTint();

    // Draw and update letters
    for (let i = letters.length - 1; i >= 0; i--) {
        letters[i].update();
        letters[i].display();

        let umbrellaTop = umbrellaY + 50;

        if (letters[i].y >= umbrellaTop &&
            letters[i].x >= umbrellaX - 250 &&
            letters[i].x <= umbrellaX + 250) {
            letters.splice(i, 1);
        }
        
    }

    // Draw umbrella
    tint(255, 255);
    image(umbrella, umbrellaX - 300, umbrellaY, 600, 400);
    noTint();

    // 🔹 Show "Click Me" text on the umbrella (before first click)
    if (showClickText) {
        fill(255, 255, 255);
        textSize(18);
        textAlign(CENTER, CENTER);
        text("CLICK and DRAG", umbrellaX, umbrellaY + 130); // Positioning text on umbrella
    }
}

// ✅ Start rain when clicking the umbrella
function mousePressed() {
    let d = dist(mouseX, mouseY, umbrellaX, umbrellaY);
    
    if (!isRaining && d < 300) { 
        isRaining = true;
        showClickText = false; // 🔹 Hide text after first click
        for (let letter of letters) {
            letter.falling = true;
        }
    }

    // Enable dragging if clicking the umbrella
    if (d < 300) { 
        dragging = true;
        offsetX = mouseX - umbrellaX;
        offsetY = mouseY - umbrellaY;
    }
}

// ✅ Allow dragging while rain continues
function mouseDragged() {
    if (dragging) {
        umbrellaX = mouseX - offsetX;
        umbrellaY = mouseY - offsetY;
    }
}

// ✅ Stop dragging when releasing mouse
function mouseReleased() {
    dragging = false;
}

// ✅ Letter class for falling effect
class Letter {
    constructor(x, y, letter) {
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.letter = letter;
        this.speed = random(5, 18);
        this.falling = false;
    }

    update() {
        if (this.falling) {
            this.y += this.speed;
        }
    }

    display() {
        fill(207, 186, 176);
        text(this.letter, this.x, this.y);
    }
}