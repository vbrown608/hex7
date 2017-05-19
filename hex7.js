"use strict";
var blessed = require('blessed');

var screen = blessed.screen({
  smartCSR: true
});
screen.title = 'Hex7';

var n = 7;
var board = blessed.box({
  top: 'center',
  left: 'center',
  width: widthOfBoard(n),
  height: heightOfBoard(n),
  content: makeBoard(n),
	tags: true,
	border: {
		type: 'line'
	},
});
screen.append(board);

for (let i = -3; i <= 3; i++) {
  for (let j = -3; j <= 3; j++) {
    let c = squish(rotate(i, j, Math.PI/4));
    let cell = blessed.box({
      top: Math.round(c.x) + 20,
      left: Math.round(c.y) + 20,
      height: 2,
      width: 2,
      content: "XX\nXX",
    });

    screen.append(cell);
  }
}

function rotate(x, y) {
  return {
    x: x-y,
    y: x+y
  }
}

// function expand
function squish(c) {
  return {
    x: c.x,
    y: c.y*3
  }
}

screen.render();

function heightOfBoard(n) { return 2*n + 4; }
function widthOfBoard(n) { return 6*n; }

function makeBoard(n)  {
  var board = [];
  var hex_base_top = `▁▁╱  ╲`;
  var hex_base_bottom = `╲▁▁╱  `;
  var top_rows = n+1;

  // Build the top half of the board.
  for (var i = 0; i < top_rows; i++) {
    board[i] = repeatString(" ", 3*(top_rows-i-1));
    board[i] += repeatString(hex_base_top, i);
    board[i] += `▁▁`;
  }

  // Build the bottom half of the board.
  for (var i = 0; i < n; i++) {
    board[top_rows+i] = repeatString(" ", 3*i+2);
    board[top_rows+i] += repeatString(hex_base_bottom, n-i);
  }

  // Clean up the left and right edges of the board.
  board[n] = board[n].slice(0, -2);
  board[n+1] = board[n+1].slice(0, -2);
  return board.map(row => { return row.slice(2) })
              .join("\n");
}

function repeatString(str, n) {
  return Array(n).fill().reduce(acc => {
    return acc + str;
  }, "");
}
