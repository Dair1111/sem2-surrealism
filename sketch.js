let letters = [];
let quote = "Let yourself be carried along, events will not tolerate your interference. You are nameless. The ease of everything is priceless.";
let finalPositions = [];
let isBlowing = false;
let startTime;
let font;

function setup() {
    createCanvas(800, 400);
    textSize(18);
    textAlign(CENTER, CENTER);

    // Define final positions for the quote
    let startX = 150;
    let startY = 200;
    let x = startX;
    let y = startY;

    for (let i = 0; i < quote.length; i++) {
        if (quote[i] === " ") {
            x += 10; // Space width
        }
        finalPositions.push({ x: x, y: y });
        x += 15;
        if (x > width - 100) {
            x = startX;
            y += 30;
        }
    }

    // Initialize letters at fan position
    for (let i = 0; i < quote.length; i++) {
        letters.push(new Letter(50, height - 50, finalPositions[i].x, finalPositions[i].y, quote[i]));
    }
}

function draw() {
    background(220);
    
    // Draw the fan
    fill(100);
    ellipse(50, height - 50, 50, 50);

    for (let i = 0; i < letters.length; i++) {
        letters[i].update();
        letters[i].display();
    }
}

function mousePressed() {
    if (!isBlowing) {
        isBlowing = true;
        startTime = millis();

        for (let i = 0; i < letters.length; i++) {
            letters[i].blowAway();
        }
    }
}

class Letter {
    constructor(x, y, targetX, targetY, letter) {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.letter = letter;
        this.dx = random(1, 5) * (random() > 0.5 ? 1 : -1);
        this.dy = random(-3, -1);
        this.floatX = random(-50, 50);
        this.floatY = random(-50, 50);
        this.blowing = false;
    }

    blowAway() {
        this.blowing = true;
    }

    update() {
        if (isBlowing) {
            let elapsed = millis() - startTime;

            if (elapsed < 5000) {
                // Move letters outward and let them float
                this.x += this.dx;
                this.y += this.dy;
                this.x += sin(frameCount * 0.05) * this.floatX;
                this.y += cos(frameCount * 0.05) * this.floatY;
            } else {
                // Move letters back to final position
                this.x = lerp(this.x, this.targetX, 0.05);
                this.y = lerp(this.y, this.targetY, 0.05);
            }
        }
    }

    display() {
        fill(0);
        text(this.letter, this.x, this.y);
    }
}