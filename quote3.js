let letters = [];
let quote = "Let yourself be carried along, events will not tolerate your interference. You are nameless. The ease of everything is priceless.";
let finalPositions = [];
let isBlowing = false;
let startTime;
let bgImage;

// 🎯 Define fan position
let fanX = 1200; // Original right position
let fanY = 400; // Original up position

// 🎯 Adjust "CLICK" position
let clickOffsetX = -100; // Move Left
let clickOffsetY = 50;   // Move Down
let clickX = fanX + clickOffsetX;
let clickY = fanY + clickOffsetY;

// 🎯 Define letter starting position separately from the fan
let letterStartX = fanX - 100;
let letterStartY = fanY - 100;

function preload() {
    bgImage = loadImage("ben11.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(28);
    textAlign(CENTER, CENTER);
    textFont("Courier New");

    let startX = (width - quote.length * 10) / 2;
    let startY = (height / 2) - 50;
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

    if (!isBlowing) {
        // Show "CLICK" in the new position
        fill(255);
        textSize(24);
        text("CLICK", clickX, clickY);
    } else {
        // Show letters after clicking
        for (let i = 0; i < letters.length; i++) {
            letters[i].update();
            letters[i].display();
        }
    }
}

function mousePressed() {
    let d = dist(mouseX, mouseY, clickX, clickY); // ✅ Updated click detection area
    if (!isBlowing && d < 30) { // Activate if clicked near "CLICK"
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

            if (elapsed < 2000) {
                this.x += this.dx;
                this.y += this.dy;
                this.x += sin(frameCount * 0.05) * this.floatX;
                this.y += cos(frameCount * 0.05) * this.floatY;
            } else {
                this.x = lerp(this.x, this.targetX, 0.05);
                this.y = lerp(this.y, this.targetY, 0.05);
                this.finalSize = 50;
            }
        }
    }

    display() {
        let elapsed = millis() - startTime;
        let t = map(elapsed, 0, 3000, 0, 1);
        t = constrain(t, 0, 1);

        let colorTransition = lerpColor(color(255, 222, 232), color(0, 21, 112), t);
        fill(colorTransition);

        text(this.letter, this.x, this.y);
    }
}