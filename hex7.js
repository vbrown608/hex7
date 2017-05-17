// var blessed = require('blessed');

// var screen = blessed.screen({
//   smartCSR: true
// });

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
    board[top_rows+i] = repeatString(" ", 3*(i)+2);
    board[top_rows+i] += repeatString(hex_base_bottom, n-i);
  }

  // Clean up the left and right edges of the board.
  board[n] = board[n].slice(0, -2);
  board[n+1] = board[n+1].slice(0, -2);
  return board.map(row => { return row.slice(2) });
}

function repeatString(str, n) {
  return Array(n).fill().reduce(acc => {
    return acc + str;
  }, "");
}
console.log(makeBoard(10));
