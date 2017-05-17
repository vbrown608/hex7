// var blessed = require('blessed');

// var screen = blessed.screen({
//   smartCSR: true
// });

function makeBoard(n)  {
  var board = [];
  var leader = `╱  `;
  var ender = `╲`;
  var hex_base = `╲▁▁╱  `;

  for (var i = 0; i < n; i++) {
    board[i] = repeatString(" ", 3*(n-i-1));
    board[i] += leader;
    board[i] += repeatString(hex_base, i);
    board[i] += ender;
  }
  return board;
}

function repeatString(str, n) {
  if (n > 0) {
    return str + repeatString(str, n-1);
  }
  return "";
}

console.log(makeBoard(7));
