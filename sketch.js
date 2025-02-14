let letters = [];
let quote = "Let yourself be carried along, events will not tolerate your interference. You are nameless. The ease of everything is priceless.";
let finalPositions = [];
let isBlowing = false;
let startTime;
let bgImage;

// 🎯 FIX: Define fanX and fanY globally
let fanX = 1200; // Move right
let fanY = 400; // Move up

// 🎯 FIX: Define letter starting position separately from the fan
let letterStartX = fanX - 100;
let letterStartY = fanY - 100; // Letters start slightly above the fan

function preload() {
    bgImage = loadImage("ben11.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(18);
    textAlign(CENTER, CENTER);

    let startX = width / 4;
    let startY = height / 2;
    let x = startX;
    let y = letterStartY;

    for (let i = 0; i < quote.length; i++) {
        if (quote[i] === " ") {
            x += 10;
        }
        finalPositions.push({ x: x, y: y });
        x += 15;
        if (x > width - 200) {
            x = startX;
            y += 30;
        }
    }

    for (let i = 0; i < quote.length; i++) {
        letters.push(new Letter(letterStartX, letterStartY, finalPositions[i].x, finalPositions[i].y, quote[i]));
    }
}

function draw() {
    background(bgImage);

    fill(100);
    ellipse(fanX, fanY, 50, 50); // 🎯 FIX: Use the global fanX and fanY

    for (let i = 0; i < letters.length; i++) {
        letters[i].update();
        letters[i].display();
    }
}

function mousePressed() {
    let d = dist(mouseX, mouseY, fanX, fanY); // Check if click is near fan
    if (!isBlowing && d < 30) { // Only activate if clicked close to the fan
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
                this.x += this.dx;
                this.y += this.dy;
                this.x += sin(frameCount * 0.05) * this.floatX;
                this.y += cos(frameCount * 0.05) * this.floatY;
            } else {
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