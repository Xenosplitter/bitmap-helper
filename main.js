var gridWidth = 32;
var gridHeight = 8;

var tileSize = 32;
var gap = 4;
var xBorder = 8;
var yBorder = 240;

var defaultColor = "#000000";
var backgroundColor = "#f2f2f2";
var selColor = defaultColor;
var colors = ['#000000', '#ffffff', '#ff0000','#00ff00', '#008800', '#0000ff', '#ffff00', '#00ffff', '#ff99ff', '#ff8800', '#990099'];
var colorShortcodes = ['wh', 'bk', 'rd', 'lm', 'gn', 'bu', 'yl', 'cy', 'pk', 'or', 'pu'];

var bitmap = [];

var isMouseDown = false;

var output = document.getElementById("result");

//canvas to draw 
var canvas = document.createElement("canvas")
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.style.zIndex=10000;
canvas.style.pointerEvents="none";
document.body.appendChild(canvas)

var context = canvas.getContext("2d");

initializeBoard();

function gridSetup() {
    //initialize as background color before adjusting values
    //this draws over the old tiles with the background color
    initializeBoard(backgroundColor);
    //saves new values
    frm = document.getElementById("gridConfig");
    gridWidth = frm.elements[0].valueAsNumber;
    gridHeight = frm.elements[1].valueAsNumber;
    tileSize = frm.elements[2].valueAsNumber;
    gap = frm.elements[3].valueAsNumber;
    //draws new board
    initializeBoard();
};

//handle inputs

//allow drawing while mouse held down
function onMouseDown(event) {
    isMouseDown = true;
};

//stop drawing
function onMouseUp(event) {
    isMouseDown = false;
};

//prevent drawing after mouse leaves canvas
//mostly to prevent not detecting the mouse not being held down if released offscreen
function onLeave(evetn) {
    isMouseDown = false;
};

//select a new color or draw
function onClick(event) {
    tileX = Math.floor((event.clientX - xBorder) / (tileSize + gap));
    tileY = Math.floor((event.clientY - yBorder) / (tileSize + gap));
    
    if (tileY == gridHeight) {
        if (tileX < colors.length) {
            selColor = colors[tileX];
            updateColor(colors.length, gridHeight, selColor);
        };
    } else {
        draw(tileX, tileY);
    };
};

//draw per tile a cursor is moved over
function onMouseMove(event) {
    tileX = Math.floor((event.clientX - xBorder) / (tileSize + gap));
    tileY = Math.floor((event.clientY - yBorder) / (tileSize + gap));
    if (isMouseDown) {
        draw(tileX, tileY)
    };
};

function initializeBoard(color = defaultColor) {
    //draw the grid
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            tileX = x * (tileSize + gap) + xBorder;
            tileY = y * (tileSize + gap) + yBorder;
            context.fillStyle = color;
            context.fillRect(tileX, tileY, tileSize, tileSize);
        };
    };
    
    //reset the bitmap array
    for (let h = 0; h < gridHeight; h++) {
        bitmap[h] = []
        for (let w = 0; w < gridWidth; w++) {
            bitmap[h][w] = colorShortcodes[colors.indexOf(defaultColor)];
        };
    };

    //draw the color palette
    for (let c = 0; c < colors.length; c++) {
        tileX = c * (tileSize + gap) + xBorder;
        tileY = gridHeight * (tileSize + gap) + yBorder;
        if (color == backgroundColor) {
            context.fillStyle = backgroundColor;
        } else {
            context.fillStyle = colors[c];
        };
        context.fillRect(tileX, tileY, tileSize, tileSize);
    };
    selColor = defaultColor;
    updateColor(colors.length, gridHeight, color);
};

//put current selColor at given XY tile coordinate
function draw(x, y) {
    if (y >= 0 && y < gridHeight) {
        if (x >= 0 && x < gridWidth) {
            updateColor(x, y, selColor);
            bitmap[y][x] = colorShortcodes[colors.indexOf(selColor)];
        };
    output.textContent = bitmap;
    };
};

//draw provided color at the corresponding XY tile coordinate
function updateColor(x, y, color) {
    context.fillStyle = color;
    tileX = x * (tileSize + gap) + xBorder;
    tileY = y * (tileSize + gap) + yBorder;
    context.fillRect(tileX, tileY, tileSize, tileSize);
};
