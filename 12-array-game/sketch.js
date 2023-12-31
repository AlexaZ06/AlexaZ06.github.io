// Paint by Number
// Alexandra Zhu
// November XX 2023
//
// Extra for Experts:
// Please consider the text in the box as my extra for experts
// - https://p5js.org/reference/#/p5/text was used for help
//
// - Help from Mr Schellenberg to get colours from cat image and toggling the cells
// - Erika also helped with toggling the cells
//
// To play:
// - 0 is white, 1 is light grey, 2 is grey, 3 is pink, and 4 is black
// - Click on the cell witht he coresponding colour to change the cell to that colour, clicking again changes it back
// - if you want to restart reload the page and if you set the grid size too small the gridd will be empty
// - That's it, have fun!

//set variables and constants
let grid;
const GRID_SIZE = 40;
let cellSize;
let cat;
let catColour;
let blockNumber;
let colour;

//load image to colour
function preload() {
  cat = loadImage("cat.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  if (height > width) {
    cellSize = width / GRID_SIZE;
  }
  else {
    cellSize = height / GRID_SIZE;
  }

  if (GRID_SIZE >= 40) {
    cat.resize(GRID_SIZE, GRID_SIZE);
    catColour = getCatColors(GRID_SIZE, GRID_SIZE);
    blockNumber = number(GRID_SIZE, GRID_SIZE);
  }
  else {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}

function draw() {
  displayGrid();
}

//change colour of fill base on key
function keyTyped() {
  if (key === "0") {
    colour = 0;
  }
  else if (key === "1") {
    colour = 1;
  }
  else if (key === "2") {
    colour = 2;
  }
  else if (key === "3") {
    colour = 3;
  }
  else if (key === "4") {
    colour = 4;
  }
}

//fill in cell with colour when 
function mousePressed() {
  let y = Math.floor(mouseY / cellSize);
  let x = Math.floor(mouseX / cellSize);

  toggleCell(x, y);   //current cell
}

function toggleCell(x, y) {
  //check that we are within the grid, then toggle
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
    // check for right colour then toggle to colour
    if (blockNumber[y][x] < 10) {
      if (colour === 0 && blockNumber[y][x] === 0) {
        blockNumber[y][x] += 10;
      }
      else if (colour === 1 && blockNumber[y][x] === 1) {
        blockNumber[y][x] += 11;
      }
      else if (colour === 2 && blockNumber[y][x] === 2) {
        blockNumber[y][x] += 20;
      }
      else if (colour === 3 && blockNumber[y][x] === 3) {
        blockNumber[y][x] += 30;
      }
      else if (colour === 4 && blockNumber[y][x] === 4) {
        blockNumber[y][x] += 40;
      }
    }
    //change block back to original colour
    else if (blockNumber[y][x] >= 10) {
      if (colour === 0 && blockNumber[y][x] === 10) {
        blockNumber[y][x] -= 10;
      }
      else if (colour === 1 && blockNumber[y][x] === 12) {
        blockNumber[y][x] -= 11;
      }
      else if (colour === 2 && blockNumber[y][x] === 22) {
        blockNumber[y][x] -= 20;
      }
      else if (colour === 3 && blockNumber[y][x] === 33) {
        blockNumber[y][x] -= 30;
      }
      else if (colour === 4 && blockNumber[y][x] === 44) {
        blockNumber[y][x] -= 40;
      }
    }
  }
}

//show image in numbers
function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (GRID_SIZE >= 40) {
        //block colour
        fill("lightblue");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);

        if (blockNumber[y][x] < 10) {
          //fill in grid with numbers
          fill("black");
          textAlign(CENTER, CENTER);
          text(blockNumber[y][x], x * cellSize, y * cellSize, cellSize, cellSize);
        }
        else {
          //colour/fill in cells
          if (blockNumber[y][x] === 10) {
            fill("white");
          }
          else if (blockNumber[y][x] === 12) {
            fill("lightgrey");
          }
          else if (blockNumber[y][x] === 22) {
            fill("grey");
          }
          else if (blockNumber[y][x] === 33) {
            fill("pink");
          }
          else if (blockNumber[y][x] === 44) {
            fill("black");
          }
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }

      else {
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
  }
}

//create grid
function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

//gather colours of cat
function getCatColors(cols, rows) {
  let colours = [];
  for (let y = 0; y < rows; y++) {
    colours.push([]);
    for (let x = 0; x < cols; x++) {
      colours[y].push(cat.get(x, y));
    }
  }
  return colours;
}

//assign numbers to colours
function number(cols, rows) {
  let blocknum = [];
  for (let y = 0; y < rows; y++) {
    blocknum.push([]);
    for (let x = 0; x < cols; x++) {

      //white
      if (catColour[y][x][0] >= 210 && catColour[y][x][1] >= 210 && catColour[y][x][2] >= 210
        || catColour[y][x][3] <= 40) {
        blocknum[y].push(0);
      }

      //light grey
      else if (catColour[y][x][0] < 210 && catColour[y][x][0] >= 140 &&
        catColour[y][x][1] < 210 && catColour[y][x][1] >= 140 &&
        catColour[y][x][2] < 210 && catColour[y][x][2] >= 140) {
        blocknum[y].push(1);
      }

      //dark grey
      else if (catColour[y][x][0] < 140 && catColour[y][x][0] > 40 &&
        catColour[y][x][1] < 140 && catColour[y][x][1] > 40 &&
        catColour[y][x][2] < 140 && catColour[y][x][2] > 40) {
        blocknum[y].push(2);
      }

      //pink 
      else if (catColour[y][x][0] > catColour[y][x][1] && catColour[y][x][0] > catColour[y][x][2]) {
        blocknum[y].push(3);
      }

      //black
      else if (catColour[y][x][0] <= 40 && catColour[y][x][1] <= 40 && catColour[y][x][2] <= 40
        || catColour[y][x][3] >= 200) {
        blocknum[y].push(4);
      }

    }
  }
  return blocknum;
}