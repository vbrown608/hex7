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
  width: 'shrink',
  height: 'shrink',
  content: makeBoard(n),
	tags: true,
	border: {
		type: 'line'
	},
});
screen.append(board);

for (let i = -3; i <= 3; i++) {
  for (let j = -3; j <= 3; j++) {
    let c = mapToBoard(rotate(i, j));
    let cell = blessed.box({
      top: stringifyPosition(50, c.x),
      left: stringifyPosition(50, c.y),
      height: 2,
      width: 2,
      content: `\n▁▁`,
      tags: true,
      parent: board,
    });
    screen.append(cell);

    cell.on('click', m => {
      cell.setContent('▄▄\n▁▁');
      screen.render();
    });

  }
}

function rotate(x, y) {
  return {
    x: x-y,
    y: x+y
  }
}

function mapToBoard(c) {
  return {
    x: c.x -1,
    y: c.y*3 -1
  }
}

function stringifyPosition(percent, offset) {
  if (offset >= 0) {
    return percent + '%+' + offset;
  } else {
    return percent + '%-' + Math.abs(offset);
  }
}

screen.render();

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});


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
