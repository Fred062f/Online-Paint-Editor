// Initialize variables
let canvasColor = document.querySelector('#canvas-color').value;
let brushColor = document.querySelector('#brush-color').value;
let brushSize = document.querySelector('#brush-size').value;
let brushStyle = document.querySelector('#brush-style').value;
let brushStyleChange = document.querySelector('#brush-style');
let clearCanvas = document.querySelector('#clear-canvas');
let erase = document.querySelector('#erase');
let lines = [];
let texting;

// Listen for changes in canvas color and brush color
document.addEventListener('input', function () {
    canvasColor = document.querySelector('#canvas-color').value;
    brushColor = document.querySelector('#brush-color').value;
    background(canvasColor);
});

// Listen for changes in brush size
document.addEventListener('change', function () {
    brushSize = document.querySelector('#brush-size').value;
});

// Handle brush style changes, including "Text and emojis"
brushStyleChange.addEventListener('change', function () {
    brushStyle = document.querySelector('#brush-style').value;
    if (brushStyle === "Text and emojis") {
        texting = prompt("Please enter text or one or more emojis");
        while (texting === "") {
            alert('Please provide text and/or one or more emojis');
            texting = prompt("Please enter text or one or more emojis");
        }
    }
});

// Clear the canvas and reset canvas color
clearCanvas.addEventListener('click', function () {
    lines = [];
    background(255);
    document.getElementById('canvas-color').value = '#ffffff';
});

// Handle eraser button click
erase.addEventListener('click', function () {
    brushStyle = "Pen 🖌";
    brushColor = canvasColor;
});

// Add event listener to emoji elements to copy to clipboard
let emojis = document.querySelector('.emoji');
emojis.addEventListener('click', function () {
    let listOfEmojis = document.querySelectorAll('.emoji li a');
    for (let emoji of listOfEmojis) {
        emoji.onclick = function () {
            console.log(`${emoji.innerText} has been copied to your clipboard`);
            navigator.clipboard.writeText(emoji.innerText);
        }
    }
});

// Preload an image for the canvas
let img;
function preload(){
    img = loadImage('intro.png');
}

// Define a class for drawing lines
class MyLine {
    constructor(brushColor, brushSize, brushStyle, texting) {
        this.px = pmouseX;
        this.py = pmouseY;
        this.x = mouseX;
        this.y = mouseY;
        this.brushColor = brushColor;
        this.brushSize = brushSize;
        this.brushStyle = brushStyle;
        this.txt = texting;
    }

    // Display the line based on the selected brush style
    display() {
        stroke(this.brushColor);
        textSize(this.brushSize);
        strokeWeight(this.brushSize);
        if (this.brushStyle === "Pen 🖌") {
            line(this.px, this.py, this.x, this.y);
        }
        if (this.brushStyle === "Text and emojis") {
            if (!this.txt) {
                line(this.px, this.py, this.x, this.y);
            }
            else {
                stroke(0, 0, 0, 0);
                text(this.txt, this.px, this.py, this.x, this.y);
            }
        }
    }
}

// Setup function to create the canvas
function setup() {
    let myCanvas = createCanvas(1350, 915);
    myCanvas.parent('canvas');
    image(img, 10, 10, 1350, 915);
}

// Draw function to handle drawing lines on the canvas
function draw() {
    if (mouseIsPressed === true) {
        let line = new MyLine(brushColor, brushSize, brushStyle, texting);
        lines.push(line);
    }
    for (let line of lines) {
        line.display();
    }
}