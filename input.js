// Stores the active TCP connection object.
let connection;

let move; // stores the intervalID for a direction
const keys = { // this translates a key to a direction
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right'
};
let lastkey = ''; // stores the last pressed key to prevent it

const setupInput = (conn) => {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on("data", handleUserInput);
  return stdin;
};

const handleUserInput = function(key) {
  if (lastkey !== key) { // this fixes bad inputs
    if (keys.hasOwnProperty(key)) {
      connection.write(`Move: ${keys[key]}`); // snappy initial input
      clearInterval(move); // needed to only have one interval
      move = setInterval(() => {
        connection.write(`Move: ${keys[key]}`); // interval a direction
      }, 200);
    } else if (key === 'n') {
      connection.write('Say: nom');
    } else if (key === 'm') {
      connection.write('Say: danger');
    } else if (key === '\u0003') {
      process.exit();
    }
    lastkey = key;
  }
};


module.exports = setupInput;