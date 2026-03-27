var gridWidth = 32;
var gridHeight = 8;

var tileSize = 32;
var gap = 8;
var xBorder = 8;
var yBorder = 240;

var defaultColor = "#000000";
var backgroundColor = "#f2f2f2";
var selcolor = defaultColor;
var colors = ['#ffffff', '#000000', '#ff0000','#00ff00', '#008800', '#0000ff', '#ffff00', '#00ffff', '#ff99ff', '#ff8800', '#990099'];
var colorShortcodes = ['wh', 'bk', 'rd', 'lm', 'gn', 'bu', 'yl', 'cy', 'pk', 'or', 'pu'];

var bitmap = [];
for (let h = 0; h < gridHeight; h++) {
    bitmap[h] = [];
    console.log(bitmap[h]);
    for (let w = 0; w < gridWidth; w++) {
        bitmap[h][w] = 'none';
    };
};

var isMouseDown = false;

var output = document.getElementById("result");

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

//handle inputs
function onMouseDown(event) {
    isMouseDown = true;
};

function onMouseUp(event) {
    isMouseDown = false;
};

function onLeave(evetn) {
    isMouseDown = false;
};

function onClick(event) {
    tileX = Math.floor((event.clientX - xBorder) / (tileSize + gap));
    tileY = Math.floor((event.clientY - yBorder) / (tileSize + gap));
    
    if (tileY == gridHeight) {
        if (tileX < colors.length) {
            selcolor = colors[tileX];
            updateColor(colors.length, gridHeight, selcolor);
        };
    } else {
        draw(tileX, tileY);
    };
};

function onMouseMove(event) {
    tileX = Math.floor((event.clientX - xBorder) / (tileSize + gap));
    tileY = Math.floor((event.clientY - yBorder) / (tileSize + gap));
    if (isMouseDown) {
        draw(tileX, tileY)
    };
};

function initializeBoard() {
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            tileX = x * (tileSize + gap) + xBorder;
            tileY = y * (tileSize + gap) + yBorder;
            context.fillStyle = defaultColor;
            context.fillRect(tileX, tileY, tileSize, tileSize);
        };
    };
    
    for (let h = 0; h < gridHeight; h++) {
        bitmap[h] = []
        for (let w = 0; w < gridWidth; w++) {
            bitmap[h][w] = colorShortcodes[colors.indexOf(defaultColor)];
        }
    };

    for (let c = 0; c < colors.length; c++) {
        tileX = c * (tileSize + gap) + xBorder;
        tileY = gridHeight * (tileSize + gap) + yBorder;
        context.fillStyle = colors[c];
        context.fillRect(tileX, tileY, tileSize, tileSize);
    };
    updateColor(colors.length, gridHeight, defaultColor);
};

function draw(x, y) {
    if (y >= 0 && y < gridHeight) {
        if (x >= 0 && x < gridWidth) {
            updateColor(x, y, selcolor);
            bitmap[y][x] = colorShortcodes[colors.indexOf(selcolor)];
        };    
    output.textContent = bitmap;
    };
};

function updateColor(x, y, color) {
    context.fillStyle = color;
    tileX = x * (tileSize + gap) + xBorder;
    tileY = y * (tileSize + gap) + yBorder;
    context.fillRect(tileX, tileY, tileSize, tileSize);
};
